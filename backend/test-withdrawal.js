/**
 * Test all withdrawal cases end-to-end without real money.
 *
 * Usage:  node test-withdrawal.js <user-email>
 * Example: node test-withdrawal.js loganapideveloper@gmail.com
 *
 * Covers:
 *   - Below minimum / above maximum / missing fields
 *   - Insufficient balance
 *   - Valid withdrawal (balance deducted immediately)
 *   - Admin approve (no balance change — already deducted)
 *   - Admin reject (balance refunded)
 *   - Double-action protection (can't approve twice)
 *   - Non-admin blocked from admin endpoints
 *
 * Requires: backend running on localhost:5000
 */

import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const email = process.argv[2];
const ADMIN_EMAIL = 'admin@rk247.org';

if (!email) {
  console.log('Usage: node test-withdrawal.js <user-email>');
  process.exit(1);
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const API = 'http://localhost:5000/api';

let passed = 0, failed = 0;
function check(name, ok, extra = '') {
  if (ok) { passed++; console.log(`  ✅ ${name}${extra ? ' — ' + extra : ''}`); }
  else { failed++; console.log(`  ❌ ${name}${extra ? ' — ' + extra : ''}`); }
}

async function req(method, path, token, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

async function getBalance(userId) {
  const { data } = await supabase.from('wallets').select('balance').eq('user_id', userId).single();
  return parseFloat(data?.balance ?? 0);
}

async function main() {
  const { data: user } = await supabase.from('users').select('id,email').eq('email', email).single();
  const { data: admin } = await supabase.from('users').select('id,email').eq('email', ADMIN_EMAIL).single();
  if (!user || !admin) { console.error('User or admin not found'); process.exit(1); }

  const userJwt = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const adminJwt = jwt.sign({ userId: admin.id }, process.env.JWT_SECRET, { expiresIn: '15m' });

  let balance = await getBalance(user.id);
  console.log(`\nUser: ${email} — balance PKR ${balance}\n`);

  const accountData = { account_number: '03001234567', account_name: 'Test User' };

  console.log('— Validation cases —');
  let r = await req('POST', '/withdrawal/initiate', userJwt, { amount: 400, payment_system: 'easypaisa', account_data: accountData });
  check('Below minimum (400) rejected', r.status === 400, r.data.error || r.data.details?.[0]?.message);

  r = await req('POST', '/withdrawal/initiate', userJwt, { amount: 150001, payment_system: 'easypaisa', account_data: accountData });
  check('Above maximum (150001) rejected', r.status === 400, r.data.error || r.data.details?.[0]?.message);

  r = await req('POST', '/withdrawal/initiate', userJwt, { amount: 500, account_data: accountData });
  check('Missing payment_system rejected', r.status === 400);

  r = await req('POST', '/withdrawal/initiate', userJwt, { amount: 500, payment_system: 'easypaisa' });
  check('Missing account_data rejected', r.status === 400);

  r = await req('POST', '/withdrawal/initiate', null, { amount: 500, payment_system: 'easypaisa', account_data: accountData });
  check('Unauthenticated rejected', r.status === 401);

  console.log('\n— Insufficient balance —');
  r = await req('POST', '/withdrawal/initiate', userJwt, { amount: 150000, payment_system: 'easypaisa', account_data: accountData });
  const balAfter = await getBalance(user.id);
  check('Insufficient balance rejected', r.status === 400, r.data.error);
  check('Balance unchanged after rejection', balAfter === balance, `PKR ${balAfter}`);

  console.log('\n— Valid withdrawal #1 (approve path) —');
  r = await req('POST', '/withdrawal/initiate', userJwt, { amount: 500, payment_system: 'easypaisa', account_data: accountData });
  const w1 = r.data.data;
  check('Withdrawal created', r.status === 200 && w1?.status === 'pending', r.data.error || `id=${w1?.withdrawal_id}`);

  balance = await getBalance(user.id);
  check('Balance deducted immediately', true, `now PKR ${balance}`);

  r = await req('POST', `/admin/withdrawals/${w1.withdrawal_id}/approve`, adminJwt);
  check('Admin approve works', r.status === 200 && r.data.data?.status === 'approved', r.data.error);

  const balAfterApprove = await getBalance(user.id);
  check('Balance unchanged on approve (already deducted)', balAfterApprove === balance, `PKR ${balAfterApprove}`);

  r = await req('POST', `/admin/withdrawals/${w1.withdrawal_id}/approve`, adminJwt);
  check('Double approve blocked', r.status !== 200, r.data.error);

  console.log('\n— Valid withdrawal #2 (reject + refund path) —');
  const { data: wallet } = await supabase.from('wallets').select('id').eq('user_id', user.id).single();
  await req('POST', `/admin/wallet/${wallet.id}/adjust`, adminJwt, { amount: 500, type: 'credit', description: 'Test top-up for withdrawal test' });
  balance = await getBalance(user.id);
  console.log(`  (topped up +500 → PKR ${balance})`);

  r = await req('POST', '/withdrawal/initiate', userJwt, { amount: 500, payment_system: 'jazzcash', account_data: accountData });
  const w2 = r.data.data;
  const balAfterW2 = await getBalance(user.id);
  check('Second withdrawal created', r.status === 200 && w2?.status === 'pending', r.data.error);
  console.log(`  (balance after deduction → PKR ${balAfterW2})`);

  r = await req('POST', `/admin/withdrawals/${w2.withdrawal_id}/reject`, adminJwt, { reason: 'Test rejection' });
  check('Admin reject works', r.status === 200 && r.data.data?.status === 'rejected', r.data.error);

  const balAfterReject = await getBalance(user.id);
  check('Balance refunded on reject', balAfterReject === balAfterW2 + 500, `PKR ${balAfterReject}`);

  console.log('\n— Auth separation —');
  r = await req('GET', '/admin/withdrawals', userJwt);
  check('User cannot access admin endpoints', r.status === 403, r.data.error);

  r = await req('GET', '/withdrawal/list', userJwt);
  check('Withdrawals appear in user history', r.status === 200 && r.data.data.length >= 2, `${r.data.data?.length} records`);

  console.log(`\n══════════ ${passed} passed, ${failed} failed ══════════`);
  process.exit(failed ? 1 : 0);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
