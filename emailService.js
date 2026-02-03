import nodemailer from 'nodemailer';

// ============================================================
// ZOHO SMTP CONNECTION — this never changes unless you
// switch email providers. It reads from your .env file.
// ============================================================
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.ZOHO_USER,  // info@verapixels.com
    pass: process.env.ZOHO_PASS   // your password / app password
  }
});

// Test the connection when the server starts
transporter.verify()
  .then(() => console.log('✅ Zoho SMTP connected successfully'))
  .catch((err) => console.error('❌ Zoho SMTP failed:', err.message));


// ============================================================
// BASE LAYOUT WRAPPER
// ============================================================
// This is the "frame" that wraps every single email you send.
// Edit this ONE place to change the look of ALL your emails:
//   - background color
//   - max width
//   - border radius
//   - footer text
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

    <!-- ===== HEADER (gradient banner at top) ===== -->
    <div style="
      background: ${headerGradient};
      padding: 36px 32px;
      text-align: center;
    ">
      ${headerContent}
    </div>

    <!-- ===== BODY (main content area) ===== -->
    <div style="
      padding: 36px 32px;
      background: #1e293b;
    ">
      ${bodyContent}
    </div>

    <!-- ===== FOOTER (same on every email) ===== -->
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
// REUSABLE SMALL PIECES — use these inside your templates
// to keep things consistent without copy-pasting HTML
// ============================================================

// A single row in an info table (label on left, value on right)
const tableRow = (label, value) => `
  <tr style="border-bottom: 1px solid #334155;">
    <td style="padding: 14px 0; font-weight: 600; color: #64748b; width: 42%; font-size: 14px;">${label}</td>
    <td style="padding: 14px 0; color: #e2e8f0; font-size: 14px;">${value}</td>
  </tr>
`;

// A highlighted info box (like a callout / alert)
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
// CORE SEND FUNCTION
// All the helpers below call this. You never need to call
// this directly — just use sendAdminNotification, etc.
// ============================================================
export const sendEmail = async ({ to, subject, html, replyTo }) => {
  try {
    const info = await transporter.sendMail({
      from: `Verapixels <${process.env.ZOHO_USER}>`,
      to,
      subject,
      html,
      replyTo: replyTo || undefined
    });

    console.log('📧 Email sent:', { to, subject, messageId: info.messageId });
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('❌ Email failed:', error.message);
    return { success: false, error: error.message };
  }
};


// ============================================================
// EMAIL 1: ADMIN NOTIFICATION
// ————————————————————————————————————————————————————————————
// WHO RECEIVES IT: You (info@verapixels.com)
// WHEN: A user books a consultation
// WHAT IT SHOWS: All the user's booking details
//
// ➡️  TO EDIT THIS EMAIL, change the content inside
//     the baseTemplate() call below.
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
    'linear-gradient(135deg, #0063f4, #00bfff)',   // header gradient color
    header,
    body
  );

  return await sendEmail({
    to: process.env.ZOHO_USER,   // sends to your own inbox
    subject,
    html,
    replyTo: userEmail            // hitting "reply" goes to the user
  });
};


// ============================================================
// EMAIL 2: USER CONFIRMATION
// ————————————————————————————————————————————————————————————
// WHO RECEIVES IT: The user who just booked
// WHEN: Right after a successful booking
// WHAT IT SHOWS: Their booking summary + reassurance
//
// ➡️  TO EDIT THIS EMAIL, change the content inside
//     the baseTemplate() call below.
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

    <!-- The booking summary box -->
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
    'linear-gradient(135deg, #059669, #10b981)',   // green header for "confirmed" feel
    header,
    body
  );

  return await sendEmail({
    to: userEmail,
    subject,
    html,
    replyTo: process.env.ZOHO_USER
  });
};


// ============================================================
// EMAIL 3: URGENT ADMIN CHAT ALERT
// ————————————————————————————————————————————————————————————
// WHO RECEIVES IT: You (info@verapixels.com)
// WHEN: A user clicks "Talk to Human" in the chatbot
// WHAT IT SHOWS: Conversation ID + what the user said
//
// ➡️  TO EDIT THIS EMAIL, change the content inside
//     the baseTemplate() call below.
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
    'linear-gradient(135deg, #dc2626, #f97316)',   // red/orange header for urgency
    header,
    body
  );

  return await sendEmail({
    to: process.env.ZOHO_USER,
    subject,
    html
  });
};