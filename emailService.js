// emailService.js - PROFESSIONAL EMAIL SERVICE (MOBILE OPTIMIZED)
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

// ==================== CONFIGURATION ====================
const LOGO_URL = process.env.LOGO_URL || 'https://res.cloudinary.com/dpqntm1tb/image/upload/v1770247783/offical_main_glzsmp.jpg';

// ✅ Email addresses - Send from noreply, reply to info
const NOREPLY_EMAIL = process.env.NOREPLY_EMAIL || 'noreply@verapixels.com';
const REPLY_TO_EMAIL = process.env.REPLY_TO_EMAIL || 'info@verapixels.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@verapixels.com';

// Brand colors - Professional & Mature
const COLORS = {
  primary: '#2563eb',      // Professional blue
  primaryDark: '#1e40af',
  text: '#1e293b',
  textLight: '#64748b',
  background: '#ffffff',
  border: '#e2e8f0',
  subtle: '#f8fafc'
};

console.log('🔧 Email Service Initialization:');
console.log('   RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
console.log('   NOREPLY_EMAIL:', NOREPLY_EMAIL);
console.log('   REPLY_TO_EMAIL:', REPLY_TO_EMAIL);
console.log('   ADMIN_EMAIL:', ADMIN_EMAIL);
console.log('   LOGO_URL:', LOGO_URL);

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
// PROFESSIONAL BASE TEMPLATE (MOBILE RESPONSIVE)
// ============================================================
const baseTemplate = (headerContent, bodyContent, showSocial = false) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Verapixels</title>
  <!--[if mso]>
  <style type="text/css">
    table {border-collapse: collapse; border-spacing: 0; margin: 0;}
    div, td {padding: 0;}
  </style>
  <![endif]-->
  <style>
    /* ✅ MOBILE RESPONSIVE STYLES */
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
        max-width: 100% !important;
      }
      .mobile-padding {
        padding: 20px !important;
      }
      .mobile-text {
        font-size: 16px !important;
        line-height: 1.6 !important;
      }
      .mobile-heading {
        font-size: 24px !important;
      }
      .mobile-subheading {
        font-size: 18px !important;
      }
      .social-icon {
        width: 44px !important;
        height: 44px !important;
        margin: 0 6px !important;
      }
      .footer-text {
        font-size: 14px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        
        <!-- MAIN CONTAINER -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="container" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);">
          
          <!-- HEADER -->
          <tr>
            <td style="background-color: ${COLORS.primary}; padding: 40px; text-align: center;" class="mobile-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <img src="${LOGO_URL}" alt="Verapixels" width="80" height="80" style="display: block; width: 80px; height: 80px; margin: 0 auto 20px; border-radius: 8px; background-color: #ffffff; padding: 12px;">
                    <h1 class="mobile-heading" style="margin: 0 0 8px; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Verapixels</h1>
                    <p style="margin: 0; color: rgba(255, 255, 255, 0.9); font-size: 16px; font-weight: 500;">Building Digital Identity</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- HEADER CONTENT -->
          ${headerContent}
          
          <!-- BODY CONTENT -->
          <tr>
            <td style="padding: 40px; color: ${COLORS.text}; line-height: 1.6;" class="mobile-padding mobile-text">
              ${bodyContent}
            </td>
          </tr>
          
          <!-- SOCIAL MEDIA (OPTIONAL) -->
          ${showSocial ? `
          <tr>
            <td style="padding: 0 40px 40px; border-top: 1px solid ${COLORS.border};" class="mobile-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 30px 0 20px; text-align: center;">
                    <p style="margin: 0 0 20px; color: ${COLORS.text}; font-size: 16px; font-weight: 600;">Connect With Us</p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tr>
                        <!-- Instagram -->
                        <td style="padding: 0 8px;">
                          <a href="https://www.instagram.com/verapixels_?igsh=MXZtajE2Y2Jxc3BiOA==" target="_blank" style="display: inline-block; text-decoration: none;">
                            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" class="social-icon" style="width: 40px; height: 40px; border-radius: 8px;" />
                          </a>
                        </td>
                        <!-- TikTok -->
                        <td style="padding: 0 8px;">
                          <a href="https://www.tiktok.com/@verapixels_?_r=1&_t=ZS-93eYCe4Wq4A" target="_blank" style="display: inline-block; text-decoration: none;">
                            <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok" class="social-icon" style="width: 40px; height: 40px; border-radius: 8px;" />
                          </a>
                        </td>
                        <!-- X (Twitter) -->
                        <td style="padding: 0 8px;">
                          <a href="https://x.com/verapixels" target="_blank" style="display: inline-block; text-decoration: none;">
                            <img src="https://cdn-icons-png.flaticon.com/512/5968/5968830.png" alt="X" class="social-icon" style="width: 40px; height: 40px; border-radius: 8px;" />
                          </a>
                        </td>
                        <!-- LinkedIn -->
                        <td style="padding: 0 8px;">
                          <a href="https://www.linkedin.com/company/verapixels" target="_blank" style="display: inline-block; text-decoration: none;">
                            <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="LinkedIn" class="social-icon" style="width: 40px; height: 40px; border-radius: 8px;" />
                          </a>
                        </td>
                        <!-- WhatsApp -->
                        <td style="padding: 0 8px;">
                          <a href="https://wa.me/2347071333709" target="_blank" style="display: inline-block; text-decoration: none;">
                            <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" class="social-icon" style="width: 40px; height: 40px; border-radius: 8px;" />
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}
          
          <!-- FOOTER -->
          <tr>
            <td style="background-color: ${COLORS.subtle}; padding: 40px; border-top: 1px solid ${COLORS.border};" class="mobile-padding">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding-bottom: 20px;">
                    <p style="margin: 0 0 15px; color: ${COLORS.text}; font-size: 16px; font-weight: 600;">Contact Support</p>
                    <p class="footer-text" style="margin: 0 0 8px; color: ${COLORS.textLight}; font-size: 15px;">📞 +234 816 084 7613</p>
                    <p class="footer-text" style="margin: 0 0 8px; color: ${COLORS.textLight}; font-size: 15px;">✉️ <a href="mailto:${REPLY_TO_EMAIL}" style="color: ${COLORS.primary}; text-decoration: none;">${REPLY_TO_EMAIL}</a></p>
                    <p class="footer-text" style="margin: 0; color: ${COLORS.textLight}; font-size: 15px;">📍 Lagos, Nigeria</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px; border-top: 1px solid ${COLORS.border}; text-align: center;">
                    <p class="footer-text" style="margin: 0 0 12px; color: ${COLORS.textLight}; font-size: 14px;">© ${new Date().getFullYear()} Verapixels Building Digital Identity. All rights reserved.</p>
                    <p class="footer-text" style="margin: 0; color: ${COLORS.textLight}; font-size: 13px;">
                      <a href="#" style="color: ${COLORS.primary}; text-decoration: none;">Privacy Policy</a> • 
                      <a href="#" style="color: ${COLORS.primary}; text-decoration: none;">Terms</a> • 
                      <a href="#" style="color: ${COLORS.primary}; text-decoration: none;">Unsubscribe</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// ============================================================
// HELPER COMPONENTS (MOBILE RESPONSIVE)
// ============================================================
const infoCard = (title, content, bgColor = '#f8fafc') => `
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0;">
  <tr>
    <td style="background-color: ${bgColor}; border: 1px solid ${COLORS.border}; border-radius: 6px; padding: 20px;">
      <h3 class="mobile-subheading" style="margin: 0 0 12px; color: ${COLORS.text}; font-size: 18px; font-weight: 600;">${title}</h3>
      <div class="mobile-text" style="color: ${COLORS.textLight}; font-size: 15px; line-height: 1.6;">${content}</div>
    </td>
  </tr>
</table>
`;

const detailRow = (label, value) => `
<tr>
  <td style="padding: 12px 0; border-bottom: 1px solid ${COLORS.border};">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td style="width: 140px; color: ${COLORS.textLight}; font-size: 15px; font-weight: 500; vertical-align: top;">${label}</td>
        <td class="mobile-text" style="color: ${COLORS.text}; font-size: 15px; font-weight: 600; vertical-align: top;">${value}</td>
      </tr>
    </table>
  </td>
</tr>
`;

const button = (text, href, emoji = '') => `
<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 30px auto;">
  <tr>
    <td style="background-color: ${COLORS.primary}; border-radius: 6px; text-align: center;">
      <a href="${href}" class="mobile-text" style="display: inline-block; padding: 16px 32px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600;">${emoji ? emoji + ' ' : ''}${text}</a>
    </td>
  </tr>
</table>
`;

// ============================================================
// CORE SEND FUNCTION - ✅ UPDATED TO USE NOREPLY
// ============================================================
export const sendEmail = async ({ to, subject, html, replyTo }) => {
  try {
    console.log('📧 Sending email to:', to);

    const recipients = Array.isArray(to) ? to : [to];
    
    // ✅ Send from noreply@verapixels.com with reply-to info@verapixels.com
    const { data, error } = await resend.emails.send({
      from: `Verapixels <${NOREPLY_EMAIL}>`, // ✅ FROM: noreply@verapixels.com
      to: recipients,
      subject,
      html,
      reply_to: replyTo || REPLY_TO_EMAIL // ✅ REPLY-TO: info@verapixels.com
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Email sent from:', NOREPLY_EMAIL);
    console.log('✅ Reply-to set as:', replyTo || REPLY_TO_EMAIL);
    console.log('✅ Email ID:', data.id);
    return { success: true, messageId: data.id };

  } catch (error) {
    console.error('❌ Email failed:', error.message);
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
  const subject = `New Booking: ${userName} - ${bookingDate}`;

  const headerContent = `
  <tr>
    <td style="background-color: #ffffff; padding: 30px 40px; border-bottom: 1px solid ${COLORS.border};" class="mobile-padding">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td>
            <h2 class="mobile-heading" style="margin: 0 0 8px; color: ${COLORS.text}; font-size: 24px; font-weight: 700;">New Consultation Booking</h2>
            <p style="margin: 0; color: ${COLORS.textLight}; font-size: 15px;">ID: ${consultationId}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  `;

  const bodyContent = `
    <h3 class="mobile-subheading" style="margin: 0 0 20px; color: ${COLORS.text}; font-size: 20px; font-weight: 600;">Client Information</h3>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      ${detailRow('Name', userName)}
      ${detailRow('Email', `<a href="mailto:${userEmail}" style="color: ${COLORS.primary}; text-decoration: none;">${userEmail}</a>`)}
      ${detailRow('Phone', `<a href="tel:${userPhone}" style="color: ${COLORS.primary}; text-decoration: none;">${userPhone}</a> <a href="https://wa.me/${userPhone.replace(/\D/g, '')}" style="display: inline-block; margin-left: 8px; padding: 6px 10px; background-color: #25D366; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 13px;">WhatsApp</a>`)}
      ${detailRow('Contact Method', contactMethod)}
      ${detailRow('Date', bookingDate)}
      ${detailRow('Client Time', `${bookingTime} (${userTimezone})`)}
      ${detailRow('Lagos Time', `<strong style="color: ${COLORS.primary}; font-size: 17px;">${businessTime}</strong>`)}
      ${message ? detailRow('Message', `<div style="background-color: ${COLORS.subtle}; padding: 12px; border-radius: 4px; margin-top: 8px;">${message}</div>`) : ''}
    </table>

    ${infoCard('Action Required', `
      <p style="margin: 0 0 10px;">Please prepare for this consultation:</p>
      <ul style="margin: 0; padding-left: 20px; color: ${COLORS.textLight};">
        <li>Review client information</li>
        <li>Set calendar reminder for ${bookingDate} at ${businessTime}</li>
        <li>Prepare consultation materials</li>
        <li>Contact client via ${contactMethod}</li>
      </ul>
    `, '#fffbeb')}

    ${button('Reply to Client', `mailto:${userEmail}`, '✉️')}
  `;

  const html = baseTemplate(headerContent, bodyContent, false);
  
  // ✅ Send to admin, with reply-to set to client's email
  return await sendEmail({
    to: ADMIN_EMAIL,
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
  const subject = `Your Consultation is Confirmed - Verapixels`;

  const headerContent = `
  <tr>
    <td style="background-color: #ffffff; padding: 30px 40px; border-bottom: 1px solid ${COLORS.border};" class="mobile-padding">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td>
            <h2 class="mobile-heading" style="margin: 0 0 8px; color: ${COLORS.text}; font-size: 24px; font-weight: 700;">Booking Confirmed!</h2>
            <p style="margin: 0; color: ${COLORS.textLight}; font-size: 15px;">Hello ${userName}, we're looking forward to speaking with you.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  `;

  const bodyContent = `
    <p class="mobile-text" style="margin: 0 0 30px; color: ${COLORS.textLight}; font-size: 16px; line-height: 1.6;">
      Thank you for choosing Verapixels! Your free consultation has been scheduled. We're excited to help you achieve your digital goals.
    </p>

    ${infoCard('Your Appointment Details', `
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        ${detailRow('Date', bookingDate)}
        ${detailRow('Your Time', `<strong>${bookingTime}</strong> (${userTimezone})`)}
        ${detailRow('Lagos Time', `${businessTime} (GMT+1)`)}
        ${detailRow('Meeting Method', contactMethod)}
        ${detailRow('Reference ID', consultationId)}
      </table>
    `, '#f0f9ff')}

    ${infoCard('How to Prepare', `
      <p style="margin: 0 0 10px; color: ${COLORS.text};">To make the most of our consultation:</p>
      <ul style="margin: 0; padding-left: 20px; color: ${COLORS.textLight}; font-size: 15px;">
        <li>Define your project goals and requirements</li>
        <li>Prepare any questions you have about our services</li>
        <li>Have examples or references ready if applicable</li>
        <li>Be available 5 minutes before your scheduled time</li>
      </ul>
    `)}

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
      <tr>
        <td style="text-align: center;">
          <p style="margin: 0 0 15px; color: ${COLORS.text}; font-size: 16px; font-weight: 600;">Need to reschedule?</p>
          ${button('Contact Us', `mailto:${REPLY_TO_EMAIL}?subject=Reschedule%20Consultation`, '📅')}
        </td>
      </tr>
    </table>

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
      <tr>
        <td style="background-color: #fffbeb; border-left: 4px solid #fbbf24; padding: 16px; border-radius: 4px;">
          <p class="mobile-text" style="margin: 0; color: #78350f; font-size: 15px; font-weight: 500;">
            ⚠️ Important: Please be available at your scheduled time. We'll contact you via ${contactMethod}.
          </p>
        </td>
      </tr>
    </table>
  `;

  const html = baseTemplate(headerContent, bodyContent, true);
  
  // ✅ Send to user from noreply, reply-to info@verapixels.com
  return await sendEmail({
    to: userEmail,
    subject,
    html,
    replyTo: REPLY_TO_EMAIL
  });
};

// ============================================================
// EMAIL 3: URGENT ADMIN CHAT ALERT
// ============================================================
export const sendAdminChatNotification = async ({
  conversationId, reason, messagePreview, userName, userEmail
}) => {
  const subject = `[URGENT] Admin Request - Chat ${conversationId}`;

  const headerContent = `
  <tr>
    <td style="background-color: #fef2f2; padding: 30px 40px; border-bottom: 3px solid #dc2626;" class="mobile-padding">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td>
            <h2 class="mobile-heading" style="margin: 0 0 8px; color: #dc2626; font-size: 24px; font-weight: 700;">🚨 Admin Intervention Required</h2>
            <p style="margin: 0; color: #991b1b; font-size: 15px; font-weight: 500;">User waiting in live chat - Immediate attention needed</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  `;

  const bodyContent = `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
      <tr>
        <td style="background-color: #fef2f2; border: 2px solid #fecaca; border-radius: 6px; padding: 20px;">
          <h3 class="mobile-subheading" style="margin: 0 0 15px; color: #dc2626; font-size: 20px; font-weight: 600;">Urgent Chat Request</h3>
          
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            ${detailRow('Chat ID', conversationId)}
            ${userName ? detailRow('User', userName) : ''}
            ${userEmail ? detailRow('Email', `<a href="mailto:${userEmail}" style="color: ${COLORS.primary}; text-decoration: none;">${userEmail}</a>`) : ''}
            ${detailRow('Reason', `<strong style="color: #dc2626;">${reason}</strong>`)}
            ${detailRow('Last Message', `<div style="background-color: #ffffff; padding: 12px; border-radius: 4px; margin-top: 8px; font-style: italic; color: ${COLORS.textLight};">"${messagePreview}"</div>`)}
            ${detailRow('Time', new Date().toLocaleString('en-US', {
              timeZone: 'Africa/Lagos',
              dateStyle: 'medium',
              timeStyle: 'short'
            }) + ' (Lagos Time)')}
          </table>
        </td>
      </tr>
    </table>

    ${infoCard('Immediate Action Required', `
      <p style="margin: 0 0 12px; color: #dc2626; font-weight: 600;">⚡ This user needs immediate assistance.</p>
      <p style="margin: 0; color: ${COLORS.textLight}; font-size: 15px;">Expected response time: Less than 5 minutes</p>
    `, '#fef2f2')}

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 30px auto;">
      <tr>
        <td style="background-color: #dc2626; border-radius: 6px; text-align: center;">
          <a href="#" class="mobile-text" style="display: inline-block; padding: 16px 40px; color: #ffffff; text-decoration: none; font-size: 17px; font-weight: 600;">🔗 Join Chat Now</a>
        </td>
      </tr>
    </table>
  `;

  const html = baseTemplate(headerContent, bodyContent, false);
  
  // ✅ Send to admin from noreply
  return await sendEmail({
    to: ADMIN_EMAIL,
    subject,
    html,
    replyTo: userEmail || REPLY_TO_EMAIL
  });
};

// ============================================================
// EMAIL 4: TEST EMAIL
// ============================================================
export const sendTestEmail = async (testEmail) => {
  console.log('🧪 Sending test email...');
  
  return await sendUserConfirmation({
    userName: "Test User",
    userEmail: testEmail || REPLY_TO_EMAIL,
    contactMethod: "Video Call",
    bookingDate: new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    bookingTime: "2:00 PM",
    businessTime: "4:00 PM WAT",
    userTimezone: "EST (UTC-5)",
    consultationId: "TEST-" + Date.now().toString().slice(-6)
  });
};

export default {
  sendEmail,
  sendAdminNotification,
  sendUserConfirmation,
  sendAdminChatNotification,
  sendTestEmail
};
