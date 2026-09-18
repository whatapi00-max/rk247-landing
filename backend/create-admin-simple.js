import supabase from './src/config/database.js';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createAdmin() {
  console.log('=== Create Admin Account ===\n');
  console.log('Note: This will update an existing user to admin role\n');

  try {
    const email = await question('Enter the email of the user to make admin: ');

    // Check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('id, email, username, role')
      .eq('email', email)
      .single();

    if (fetchError || !existingUser) {
      console.error(`\n❌ User with email ${email} not found`);
      console.log('Please register this user first at http://localhost:5173/register');
      rl.close();
      process.exit(1);
    }

    if (existingUser.role === 'admin') {
      console.log(`\n✅ User ${email} is already an admin`);
      rl.close();
      process.exit(0);
    }

    // Update user to admin
    const { error } = await supabase
      .from('users')
      .update({ role: 'admin' })
      .eq('email', email);

    if (error) throw error;

    console.log(`\n✅ User ${email} (${existingUser.username}) updated to admin role`);
    console.log('\nYou can now login at http://localhost:5173/login');
    console.log('After login, you will be redirected to the admin dashboard');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    rl.close();
  }
}

createAdmin();
