// =====================================================
// SUPABASE NODE.JS SETUP
// =====================================================

// 1. Install Supabase client
// npm install @supabase/supabase-js

import { createClient } from '@supabase/supabase-js';

// 2. Replace with your Supabase credentials
const SUPABASE_URL = 'https://ciwsrafgkybmqhqzwnlm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_j9hjFcB49vfiKJt7FvG-Gg_6gZlV5pS';

// 3. Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =====================================================
// EXAMPLE USAGE - CHAT OPERATIONS
// =====================================================

// CREATE a new conversation
export async function createConversation(conversationData) {
  const { data, error } = await supabase
    .from('chat_conversations')
    .insert([{
      conversation_id: conversationData.conversation_id,
      user_timezone: conversationData.user_timezone,
      status: conversationData.status || 'active',
      started_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating conversation:', error);
    return null;
  }
  
  return data;
}

// GET all conversations
export async function getConversations(limit = 50) {
  const { data, error } = await supabase
    .from('chat_conversations')
    .select('*')
    .order('started_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching conversations:', error);
    return [];
  }
  
  return data;
}

// GET conversation by ID
export async function getConversationById(conversationId) {
  const { data, error } = await supabase
    .from('chat_conversations')
    .select('*')
    .eq('conversation_id', conversationId)
    .single();

  if (error) {
    console.error('Error fetching conversation:', error);
    return null;
  }
  
  return data;
}

// CREATE a new message
export async function createMessage(messageData) {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert([{
      message_id: messageData.message_id,
      conversation_id: messageData.conversation_id,
      sender_type: messageData.sender_type,
      sender_name: messageData.sender_name,
      message_text: messageData.message_text,
      timestamp: new Date().toISOString(),
      read_by_admin: messageData.read_by_admin || false,
      read_by_user: messageData.read_by_user || false
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating message:', error);
    return null;
  }
  
  return data;
}

// GET messages for a conversation
export async function getMessages(conversationId, limit = 100) {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('timestamp', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
  
  return data;
}

// UPDATE conversation status
export async function updateConversationStatus(conversationId, status) {
  const { data, error } = await supabase
    .from('chat_conversations')
    .update({ status, last_activity: new Date().toISOString() })
    .eq('conversation_id', conversationId)
    .select()
    .single();

  if (error) {
    console.error('Error updating conversation:', error);
    return null;
  }
  
  return data;
}

// MARK message as read by admin
export async function markMessageAsRead(messageId, readBy = 'admin') {
  const updateField = readBy === 'admin' ? 'read_by_admin' : 'read_by_user';
  
  const { data, error } = await supabase
    .from('chat_messages')
    .update({ [updateField]: true })
    .eq('message_id', messageId)
    .select()
    .single();

  if (error) {
    console.error('Error marking message as read:', error);
    return null;
  }
  
  return data;
}

// =====================================================
// REAL-TIME SUBSCRIPTIONS
// =====================================================

// Subscribe to new messages in a conversation
export function subscribeToMessages(conversationId, callback) {
  const subscription = supabase
    .channel(`messages:${conversationId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `conversation_id=eq.${conversationId}`
      },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();

  return subscription;
}

// Subscribe to all new conversations
export function subscribeToConversations(callback) {
  const subscription = supabase
    .channel('conversations')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_conversations'
      },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();

  return subscription;
}

// Subscribe to conversation updates
export function subscribeToConversationUpdates(conversationId, callback) {
  const subscription = supabase
    .channel(`conversation:${conversationId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'chat_conversations',
        filter: `conversation_id=eq.${conversationId}`
      },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();

  return subscription;
}

// Unsubscribe from real-time updates
export function unsubscribe(subscription) {
  if (subscription) {
    supabase.removeChannel(subscription);
  }
}

// =====================================================
// ADMIN NOTIFICATIONS
// =====================================================

// Create admin notification
export async function createNotification(notificationData) {
  const { data, error } = await supabase
    .from('admin_notifications')
    .insert([{
      notification_id: notificationData.notification_id,
      conversation_id: notificationData.conversation_id,
      notification_type: notificationData.notification_type,
      message_preview: notificationData.message_preview,
      priority: notificationData.priority || 'medium',
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating notification:', error);
    return null;
  }
  
  return data;
}

// Get pending notifications
export async function getPendingNotifications() {
  const { data, error } = await supabase
    .from('admin_notifications')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
  
  return data;
}

// =====================================================
// USAGE EXAMPLE
// =====================================================

async function example() {
  // Create a conversation
  const conversation = await createConversation({
    conversation_id: 'session_123',
    user_timezone: 'Africa/Lagos',
    status: 'active'
  });
  
  console.log('Created conversation:', conversation);
  
  // Create a message
  const message = await createMessage({
    message_id: 'msg_123',
    conversation_id: 'session_123',
    sender_type: 'user',
    sender_name: 'John Doe',
    message_text: 'Hello, I need help!'
  });
  
  console.log('Created message:', message);
  
  // Get all messages for the conversation
  const messages = await getMessages('session_123');
  console.log('All messages:', messages);
  
  // Subscribe to new messages (real-time)
  const subscription = subscribeToMessages('session_123', (newMessage) => {
    console.log('New message received:', newMessage);
  });
  
  // Later: unsubscribe
  // unsubscribe(subscription);
}

// Uncomment to run example
// example();