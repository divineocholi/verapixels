// server-admin-routes.js
import { createClient } from '@supabase/supabase-js';
import express from 'express';

const router = express.Router();

// Create Supabase client with service role key (server-side only)
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Create admin invite endpoint
router.post('/create-invite', async (req, res) => {
  const { email, role, createdBy } = req.body;

  try {
    // 1. Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('admins')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: 'An admin with this email already exists' 
      });
    }

    // 2. Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: 'TemporaryPassword123!',
      email_confirm: true,
      user_metadata: { name: 'New Admin' }
    });

    if (authError) {
      console.error('Auth error:', authError);
      throw authError;
    }

    // 3. Generate invite token
    const token = `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // 4. Create invite record
    const { error: inviteError } = await supabaseAdmin
      .from('admin_invites')
      .insert({
        token,
        email,
        role_assigned: role,
        expires_at: expiresAt.toISOString(),
        created_by: createdBy,
        auth_user_id: authData.user.id
      });

    if (inviteError) {
      console.error('Invite error:', inviteError);
      throw inviteError;
    }

    // 5. Generate invite URL
    const inviteUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/superadmin/register?token=${token}`;

    res.json({
      success: true,
      userId: authData.user.id,
      inviteUrl,
      token,
      email
    });

  } catch (error) {
    console.error('Error creating invite:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to create invite' 
    });
  }
});

export default router;
