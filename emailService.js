// emailService.js - FIXED VERSION FOR RESEND
import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Debug logging
console.log('🔧 Email Service Initialization:');
console.log('   RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
console.log('   FROM_EMAIL:', process.env.FROM_EMAIL);

// Initialize Resend
let resend;
try {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is missing from environment variables');
  }
  resend = new Resend(process.env.RESEND_API_KEY);
  console.log('✅ Resend initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Resend:', error.message);
  process.exit(1);
}

// ============================================================
// BASE LAYOUT WRAPPER
// ============================================================
const baseTemplate = (headerGradient, headerContent, bodyContent) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verapixels</title>
</head>
<body style="
  margin: 0;
  padding: 20px;
  background-color: #0f172a;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
">
  <div style="
    max-width: 600px;
    margin: 0 auto;
    background: #1e293b;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #334155;
  ">
    <!-- HEADER -->
    <div style="
      background: ${headerGradient};
      padding: 36px 32px;
      text-align: center;
    ">
      ${headerContent}
    </div>

    <!-- BODY -->
    <div style="
      padding: 36px 32px;
      background: #1e293b;
    ">
      ${bodyContent}
    </div>

    <!-- FOOTER -->
    <div style="
      padding: 24px 32px;
      background: #0f172a;
      border-top: 1px solid #334155;
      text-align: center;
    ">
      <p style="margin: 0; color: #64748b; font-size: 13px;">
        © Verapixels &nbsp;|&nbsp; info@verapixels.com &nbsp;|&nbsp; Lagos, Nigeria
      </p>
      <p style="margin: 8px 0 0; color: #475569; font-size: 12px;">
        If you have questions, reply to this email or call <strong style="color: #94a3b8;">+234 707 1333 709</strong>
      </p>
    </div>
  </div>
</body>
</html>
`;

// ============================================================
// HELPER FUNCTIONS
// ============================================================
const tableRow = (label, value) => `
  <tr style="border-bottom: 1px solid #334155;">
    <td style="padding: 14px 0; font-weight: 600; color: #64748b; width: 42%; font-size: 14px;">${label}</td>
    <td style="padding: 14px 0; color: #e2e8f0; font-size: 14px;">${value}</td>
  </tr>
`;

const infoBox = (bgColor, borderColor, textColor, content) => `
  <div style="
    background: ${bgColor};
    border: 1px solid ${borderColor};
    border-radius: 10px;
    padding: 18px 20px;
    margin: 24px 0;
  ">
    ${content}
  </div>
`;

// ============================================================
// CORE SEND FUNCTION (FIXED)
// ============================================================
export const sendEmail = async ({ to, subject, html, replyTo }) => {
  try {
    console.log('📧 Attempting to send email:');
    console.log('   To:', to);
    console.log('   Subject:', subject);
    console.log('   From:', process.env.FROM_EMAIL || 'info@verapixels.com');
    console.log('   Reply-To:', replyTo);

    // Ensure 'to' is an array
    const recipients = Array.isArray(to) ? to : [to];

    const { data, error } = await resend.emails.send({
      from: `Verapixels <${process.env.FROM_EMAIL || 'info@verapixels.com'}>`,
      to: recipients,
      subject,
      html,
      reply_to: replyTo
    });

    if (error) {
      console.error('❌ Resend API error:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Email sent successfully!');
    console.log('   Message ID:', data.id);
    console.log('   Sent to:', recipients.join(', '));
    
    return { success: true, messageId: data.id };

  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    console.error('   Full error:', error);
    return { success: false, error: error.message };
  }
};

// ============================================================
// EMAIL 1: ADMIN NOTIFICATION
// ============================================================
export const sendAdminNotification = async ({
  userName, userEmail, userPhone, contactMethod,
  bookingDate, bookingTime, businessTime, userTimezone,
  message, consultationId
}) => {
  const subject = `📅 New Booking — ${userName} — ${bookingDate}`;

  const header = `
    <h1 style="color: #fff; margin: 0; font-size: 22px; font-weight: 700;">🔔 New Consultation Booking</h1>
    <p style="color: rgba(255,255,255,0.75); margin: 10px 0 0; font-size: 13px; font-family: monospace;">${consultationId}</p>
  `;

  const body = `
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px;">
      ${tableRow('👤 Name',  userName)}
      ${tableRow('📧 Email', `<a href="mailto:${userEmail}" style="color: #38bdf8; text-decoration: none;">${userEmail}</a>`)}
      ${tableRow('📱 Phone', userPhone)}
      ${tableRow('📞 Method', contactMethod)}
      ${tableRow('📅 Date',  bookingDate)}
      ${tableRow('🕐 User Time', `${bookingTime} <span style="color: #64748b; font-size: 13px;">(${userTimezone})</span>`)}
      ${tableRow('🕐 Lagos Time', `<span style="color: #38bdf8; font-weight: 700;">${businessTime}</span>`)}
      ${tableRow('💬 Message', message || 'No additional message')}
    </table>

    ${infoBox(
      'rgba(59, 130, 246, 0.1)',
      'rgba(59, 130, 246, 0.3)',
      '#93c5fd',
      `<p style="margin: 0; color: #93c5fd; font-size: 14px;">
        💡 <strong>Action needed:</strong> Prepare for this consultation and reach out to the user via <strong>${contactMethod}</strong>.
      </p>`
    )}
  `;

  const html = baseTemplate(
    'linear-gradient(135deg, #0063f4, #00bfff)',
    header,
    body
  );

  console.log('📧 Sending admin notification...');
  
  return await sendEmail({
    to: process.env.FROM_EMAIL || 'info@verapixels.com', // Admin email
    subject,
    html,
    replyTo: userEmail
  });
};

// ============================================================
// EMAIL 2: USER CONFIRMATION
// ============================================================
export const sendUserConfirmation = async ({
  userName, userEmail, contactMethod,
  bookingDate, bookingTime, businessTime,
  userTimezone, consultationId
}) => {
  const subject = `✅ Your Consultation is Confirmed — Verapixels`;

  const header = `
    <h1 style="color: #fff; margin: 0; font-size: 22px; font-weight: 700;">✅ Booking Confirmed!</h1>
    <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0; font-size: 14px;">Thanks for choosing Verapixels, ${userName}!</p>
  `;

  const body = `
    <p style="color: #94a3b8; font-size: 15px; margin: 0 0 28px; line-height: 1.6;">
      Your free consultation has been scheduled. Here are your details:
    </p>

    <div style="
      background: rgba(14, 165, 233, 0.08);
      border: 1px solid rgba(14, 165, 233, 0.25);
      border-radius: 12px;
      padding: 22px 24px;
      margin-bottom: 28px;
    ">
      <table style="width: 100%; border-collapse: collapse;">
        ${tableRow('📅 Date',       bookingDate)}
        ${tableRow('🕐 Your Time',  `${bookingTime} <span style="color: #64748b; font-size: 13px;">(${userTimezone})</span>`)}
        ${tableRow('🕐 Lagos Time', `<span style="color: #38bdf8; font-weight: 700;">${businessTime}</span>`)}
        ${tableRow('📞 Via',        contactMethod)}
      </table>
    </div>

    <p style="color: #64748b; font-size: 13px; margin: 0 0 6px;">
      📌 <strong style="color: #94a3b8;">Reference:</strong> <span style="font-family: monospace;">${consultationId}</span>
    </p>
    <p style="color: #64748b; font-size: 13px; margin: 0; line-height: 1.6;">
      Need to reschedule? Just reply to this email or call <strong style="color: #94a3b8;">+234 707 1333 709</strong>.
    </p>
  `;

  const html = baseTemplate(
    'linear-gradient(135deg, #059669, #10b981)',
    header,
    body
  );

  console.log('📧 Sending user confirmation...');
  
  return await sendEmail({
    to: userEmail, // User email
    subject,
    html,
    replyTo: process.env.FROM_EMAIL || 'info@verapixels.com'
  });
};

// ============================================================
// EMAIL 3: URGENT ADMIN CHAT ALERT
// ============================================================
export const sendAdminChatNotification = async ({
  conversationId, reason, messagePreview
}) => {
  const subject = `🚨 [URGENT] User wants an admin — Chat ${conversationId}`;

  const header = `
    <h1 style="color: #fff; margin: 0; font-size: 22px; font-weight: 700;">🚨 Admin Requested</h1>
    <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0; font-size: 13px;">A user is waiting in the live chat</p>
  `;

  const body = `
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px;">
      ${tableRow('💬 Conversation',  `<span style="font-family: monospace; font-size: 13px;">${conversationId}</span>`)}
      ${tableRow('📝 Reason',        reason)}
      ${tableRow('💬 Last Message',  `<em style="color: #94a3b8;">"${messagePreview}"</em>`)}
    </table>

    ${infoBox(
      'rgba(239, 68, 68, 0.12)',
      'rgba(239, 68, 68, 0.35)',
      '#fca5a5',
      `<p style="margin: 0; color: #fca5a5; font-size: 14px;">
        ⚡ <strong>Priority: URGENT</strong> — This user is waiting in the live chat right now. Please join as soon as possible.
      </p>`
    )}
  `;

  const html = baseTemplate(
    'linear-gradient(135deg, #dc2626, #f97316)',
    header,
    body
  );

  console.log('📧 Sending admin chat alert...');
  
  return await sendEmail({
    to: process.env.FROM_EMAIL || 'info@verapixels.com', // Admin email
    subject,
    html
  });
};