/**
 * Test a full deposit locally without real money.
 *
 * Usage:  node test-deposit.js <user-email> <amount>
 * Example: node test-deposit.js loganapideveloper@gmail.com 100
 *
 * What it does:
 *   1. Calls the REAL /api/wallet/deposit/initiate endpoint (real APay payment page)
 *   2. Simulates APay's webhook callback with a correctly-signed payload
 *   3. Prints the wallet balance before and after
 *
 * Requires: backend running on localhost:5000
 */

import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const email = process.argv[2];
const amount = parseFloat(process.argv[3]);

if (!email || !amount || amount <= 0) {
  console.log('Usage: node test-deposit.js <user-email> <amount>');
  console.log('Example: node test-deposit.js loganapideveloper@gmail.com 100');
  process.exit(1);
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const API = 'http://localhost:5000/api';

async function main() {
  // 1. Find the user
  const { data: user, error } = await supabase
    .from('users')
    .select('id, email, username')
    .eq('email', email)
    .single();

  if (error || !user) {
    console.error(`User not found: ${email}`);
    process.exit(1);
  }
  console.log(`User: ${user.email} (${user.username})`);

  // 2. Balance before
  const { data: walletBefore } = await supabase
    .from('wallets')
    .select('balance')
    .eq('user_id', user.id)
    .single();
  console.log(`Balance before: PKR ${walletBefore?.balance ?? 0}`);

  // 3. Initiate deposit through the real API (mints a user JWT locally)
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const initRes = await fetch(`${API}/wallet/deposit/initiate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ amount, payment_system: 'raast_p2p' })
  });
  const initData = await initRes.json();

  if (!initData.success) {
    console.error('Initiate failed:', initData);
    process.exit(1);
  }

  const { transaction_id, order_id, payment_url } = initData.data;
  console.log(`Deposit initiated — transaction: ${transaction_id}`);
  console.log(`APay order_id: ${order_id}`);
  console.log(`Payment URL (this is where a real user would pay): ${payment_url}`);

  // 4. Simulate APay's signed webhook callback (status: Success)
  const transactions = [{ order_id, status: 'Success', amount, currency: 'PKR' }];
  const signature = crypto
    .createHash('sha1')
    .update(
      process.env.APAY_ACCESS_KEY +
      process.env.APAY_PRIVATE_KEY +
      crypto.createHash('md5').update(JSON.stringify(transactions)).digest('hex')
    )
    .digest('hex');

  const cbRes = await fetch(`${API}/webhook/apay/callback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: process.env.APAY_ACCESS_KEY,
      signature,
      transactions
    })
  });
  const cbData = await cbRes.json();
  console.log('Webhook response:', cbData);

  // 5. Verify results
  const { data: tx } = await supabase
    .from('transactions')
    .select('status')
    .eq('id', transaction_id)
    .single();
  const { data: walletAfter } = await supabase
    .from('wallets')
    .select('balance')
    .eq('user_id', user.id)
    .single();

  console.log('---');
  console.log(`Transaction status: ${tx?.status}`);
  console.log(`Balance after: PKR ${walletAfter?.balance ?? 0}`);
  console.log(tx?.status === 'completed' ? '✅ Deposit completed and credited' : '❌ Something failed — check backend logs');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
