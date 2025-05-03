'use server';

import { supabase } from '@/app/libs/supabase';

export async function addToWaitlist(email) {
  if (!email || !email.includes('@')) {
    return { success: false, message: 'Invalid email' };
  }

  // Check if the email already exists in the database
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('email')
    .eq('email', email)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') { // Ignore "no rows found" error
    console.error('Error checking for existing email:', fetchError);
    return { success: false, message: 'Database error while checking email' };
  }

  if (existingUser) {
    return { success: false, message: 'Email already added' };
  }

  // Insert the email into the database
  const { error: insertError } = await supabase.from('users').insert([{ email }]);

  if (insertError) {
    console.error('Error inserting email:', insertError);
    return { success: false, message: 'Database error while adding email' };
  }

  return { success: true };
}