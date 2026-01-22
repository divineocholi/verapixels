export interface SocketMessage {
  id: string;
  _id?: string;
  message_id: string;
  conversation_id: string;
  sender_type: 'user' | 'bot' | 'admin';
  sender_name: string;
  message_text: string;
  timestamp: Date | string;
  read_by_admin: boolean;
  read_by_user: boolean;
  intent_detected?: string;
  classification?: string;
  message_type?: string;
  metadata?: string;
  sender?: 'user' | 'bot' | 'admin';
}

export interface TypingIndicator {
  conversationId: string;
  isTyping: boolean;
  adminId?: string;
}

export interface ConversationData {
  conversationId: string;
  userId: string;
  userInfo: {
    timezone: string;
    isBooking?: boolean;
  };
}

export interface AdminNotification {
  conversationId: string;
  message: string;
  classification: string;
  timestamp: string;
  type?: string;
}

export interface TransferRequest {
  conversationId: string;
  reason: string;
  timestamp: string;
}

export interface ConversationStatus {
  status: 'active' | 'inactive' | 'awaiting_admin' | 'admin_handling' | 'resolved';
  message?: string;
  adminId?: string;
  adminName?: string;
}