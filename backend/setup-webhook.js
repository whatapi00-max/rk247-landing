import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = path.join(__dirname, '.env');

// Read existing .env file
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

// Updates to apply
const updates = {
  'APAY_CALLBACK_URL': 'http://localhost:5000/api/webhook/apay/callback',
  'APAY_RETURN_URL': 'http://localhost:5173/',
  'FRONTEND_URL': 'http://localhost:5173'
};

// Apply updates
let updated = false;
for (const [key, value] of Object.entries(updates)) {
  const regex = new RegExp(`^${key}=.*$`, 'm');
  if (envContent.match(regex)) {
    envContent = envContent.replace(regex, `${key}=${value}`);
    console.log(`✓ Updated ${key}`);
    updated = true;
  } else {
    envContent += `\n${key}=${value}`;
    console.log(`✓ Added ${key}`);
    updated = true;
  }
}

if (updated) {
  fs.writeFileSync(envPath, envContent);
  console.log('\n✅ .env file updated successfully!');
  console.log('\nNext steps:');
  console.log('1. Restart your backend server');
  console.log('2. Configure A-Pay webhook URL in your A-Pay dashboard:');
  console.log('   Webhook URL: http://localhost:5000/api/webhook/apay/callback');
  console.log('3. Test a new deposit payment');
} else {
  console.log('No updates needed - configuration already correct');
}
