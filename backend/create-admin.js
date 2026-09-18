import bcrypt from 'bcryptjs';
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

  try {
    const email = await question('Enter admin email: ');
    const username = await question('Enter admin username: ');
    const password = await question('Enter admin password (min 8 characters): ');

    if (password.length < 8) {
      console.error('Password must be at least 8 characters');
      rl.close();
      process.exit(1);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id, email, role')
      .eq('email', email)
      .single();

    if (existingUser) {
      // Update existing user to admin
      const { error } = await supabase
        .from('users')
        .update({ 
          role: 'admin',
          password: hashedPassword,
          username
        })
        .eq('email', email);

      if (error) throw error;

      console.log(`\n✅ User ${email} updated to admin role`);
    } else {
      // Create new admin user
      const { error } = await supabase
        .from('users')
        .insert({
          email,
          username,
          password: hashedPassword,
          role: 'admin'
        });

      if (error) throw error;

      console.log(`\n✅ Admin account created for ${email}`);
    }

    console.log('\nYou can now login with these credentials at http://localhost:5173/login');
    console.log('After login, you will be redirected to the admin dashboard');
  } catch (error) {
    console.error('Error creating admin:', error.message);
  } finally {
    rl.close();
  }
}

createAdmin();
