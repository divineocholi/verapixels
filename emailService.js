// emailService.js - COMPLETE PROFESSIONAL EMAIL SERVICE
import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// ==================== CONFIGURATION ====================
// SET YOUR LOGO HERE (Choose one option):
// Option A: Hosted image URL (Recommended)
const LOGO_URL = process.env.LOGO_URL || 'https://res.cloudinary.com/dpqntm1tb/image/upload/v1770247783/offical_main_glzsmp.jpg'; // CHANGE THIS TO YOUR LOGO URL

// Option B: Base64 encoded image
// const LOGO_BASE64 = 'data:image/png;base64,YOUR_BASE64_STRING_HERE';

// Debug logging
console.log('🔧 Email Service Initialization:');
console.log('   RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
console.log('   FROM_EMAIL:', process.env.FROM_EMAIL);
console.log('   LOGO_URL:', LOGO_URL);

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
// BASE LAYOUT WRAPPER (PROFESSIONAL DESIGN WITH LOGO)
// ============================================================
const baseTemplate = (headerGradient, headerContent, bodyContent, includeSocial = true) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verapixels</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body style="
  margin: 0;
  padding: 20px;
  background-color: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
">
  <!-- MAIN CONTAINER -->
  <div style="
    max-width: 600px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid #e2e8f0;
  ">
    
    <!-- HEADER WITH LOGO -->
    <div style="
      background: ${headerGradient};
      padding: 35px 40px 25px;
      text-align: center;
    ">
      <!-- LOGO & BRAND -->
      <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 25px;">
        <img src="${LOGO_URL}" 
             alt="Verapixels Logo"
             style="
               width: 60px;
               height: 60px;
               object-fit: contain;
               margin-right: 16px;
               border-radius: 14px;
               background: white;
               padding: 10px;
               box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
             ">
        <div style="text-align: left;">
          <h1 style="
            color: #ffffff;
            margin: 0;
            font-size: 32px;
            font-weight: 800;
            letter-spacing: -0.5px;
            line-height: 1.1;
          ">Verapixels</h1>
          <p style="
            color: rgba(255, 255, 255, 0.95);
            margin: 6px 0 0;
            font-size: 15px;
            font-weight: 400;
          ">Digital Excellence Studio</p>
        </div>
      </div>
      
      <!-- HEADER CONTENT -->
      ${headerContent}
    </div>

    <!-- BODY CONTENT -->
    <div style="
      padding: 40px;
      background: #ffffff;
      color: #334155;
    ">
      ${bodyContent}
      
      <!-- RESCHEDULE BUTTON -->
      ${includeSocial ? `
      <div style="text-align: center; margin: 40px 0 30px;">
        <a href="mailto:info@verapixels.com?subject=Reschedule%20Consultation&body=Hello%20Verapixels%2C%20I%20would%20like%20to%20reschedule%20my%20appointment." 
           style="
             display: inline-block;
             background: linear-gradient(135deg, #3b82f6, #1d4ed8);
             color: white;
             padding: 18px 40px;
             text-decoration: none;
             border-radius: 14px;
             font-weight: 700;
             font-size: 16px;
             border: none;
             cursor: pointer;
             transition: all 0.3s ease;
             box-shadow: 0 6px 20px rgba(59, 130, 246, 0.25);
             letter-spacing: 0.3px;
           "
           onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 25px rgba(59, 130, 246, 0.35)';"
           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 6px 20px rgba(59, 130, 246, 0.25)';">
           <i class="fas fa-calendar-alt" style="margin-right: 10px;"></i> Reschedule Appointment
        </a>
        <p style="color: #94a3b8; font-size: 14px; margin: 12px 0 0;">
          Need to change your appointment time? Click above.
        </p>
      </div>
      ` : ''}
      
      <!-- SOCIAL MEDIA SECTION -->
      ${includeSocial ? `
      <div style="
        text-align: center;
        padding: 35px 0 25px;
        border-top: 1px solid #e2e8f0;
        border-bottom: 1px solid #e2e8f0;
        margin: 40px 0 30px;
      ">
        <p style="
          color: #475569;
          font-size: 16px;
          margin: 0 0 25px;
          font-weight: 600;
        ">
          <i class="fas fa-share-alt" style="color: #3b82f6; margin-right: 8px;"></i>
          Connect With Us
        </p>
        
        <div style="display: flex; justify-content: center; gap: 18px; margin-bottom: 25px; flex-wrap: wrap;">
          <!-- Instagram -->
          <a href="https://www.instagram.com/verapixels_?igsh=MXZtajE2Y2Jxc3BiOA==" target="_blank"
             style="
               display: inline-flex;
               align-items: center;
               justify-content: center;
               width: 50px;
               height: 50px;
               background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);
               border-radius: 14px;
               color: white;
               text-decoration: none;
               transition: all 0.3s ease;
               box-shadow: 0 5px 15px rgba(195, 42, 163, 0.2);
             "
             onmouseover="this.style.transform='translateY(-4px) scale(1.05)'; this.style.boxShadow='0 10px 25px rgba(195, 42, 163, 0.3)';"
             onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 5px 15px rgba(195, 42, 163, 0.2)';">
            <i class="fab fa-instagram" style="font-size: 22px;"></i>
          </a>
          
          <!-- TikTok -->
          <a href="https://www.tiktok.com/@verapixels_?_r=1&_t=ZS-93eYCe4Wq4A" target="_blank"
             style="
               display: inline-flex;
               align-items: center;
               justify-content: center;
               width: 50px;
               height: 50px;
               background: #000000;
               border-radius: 14px;
               color: white;
               text-decoration: none;
               transition: all 0.3s ease;
               box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
             "
             onmouseover="this.style.transform='translateY(-4px) scale(1.05)'; this.style.boxShadow='0 10px 25px rgba(0, 0, 0, 0.3)';"
             onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 5px 15px rgba(0, 0, 0, 0.2)';">
            <i class="fab fa-tiktok" style="font-size: 22px;"></i>
          </a>
          
          <!-- X (Twitter) -->
          <a href="https://x.com/verapixels" target="_blank"
             style="
               display: inline-flex;
               align-items: center;
               justify-content: center;
               width: 50px;
               height: 50px;
               background: #000000;
               border-radius: 14px;
               color: white;
               text-decoration: none;
               transition: all 0.3s ease;
               box-shadow: 0 5px 15px rgba(29, 161, 242, 0.2);
             "
             onmouseover="this.style.transform='translateY(-4px) scale(1.05)'; this.style.boxShadow='0 10px 25px rgba(29, 161, 242, 0.3)';"
             onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 5px 15px rgba(29, 161, 242, 0.2)';">
            <i class="fab fa-x-twitter" style="font-size: 22px;"></i>
          </a>
          
          <!-- LinkedIn -->
          <a href="https://www.linkedin.com/company/verapixels" target="_blank"
             style="
               display: inline-flex;
               align-items: center;
               justify-content: center;
               width: 50px;
               height: 50px;
               background: #0077b5;
               border-radius: 14px;
               color: white;
               text-decoration: none;
               transition: all 0.3s ease;
               box-shadow: 0 5px 15px rgba(0, 119, 181, 0.2);
             "
             onmouseover="this.style.transform='translateY(-4px) scale(1.05)'; this.style.boxShadow='0 10px 25px rgba(0, 119, 181, 0.3)';"
             onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 5px 15px rgba(0, 119, 181, 0.2)';">
            <i class="fab fa-linkedin-in" style="font-size: 22px;"></i>
          </a>
          
          <!-- WhatsApp -->
          <a href="https://wa.me/2347071333709" target="_blank"
             style="
               display: inline-flex;
               align-items: center;
               justify-content: center;
               width: 50px;
               height: 50px;
               background: #25D366;
               border-radius: 14px;
               color: white;
               text-decoration: none;
               transition: all 0.3s ease;
               box-shadow: 0 5px 15px rgba(37, 211, 102, 0.2);
             "
             onmouseover="this.style.transform='translateY(-4px) scale(1.05)'; this.style.boxShadow='0 10px 25px rgba(37, 211, 102, 0.3)';"
             onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 5px 15px rgba(37, 211, 102, 0.2)';">
            <i class="fab fa-whatsapp" style="font-size: 22px;"></i>
          </a>
        </div>
        
        <p style="
          color: #64748b;
          font-size: 14px;
          margin: 0 0 5px;
          font-weight: 500;
        ">
          <i class="fab fa-whatsapp" style="color: #25D366; margin-right: 8px;"></i>
          Chat directly: +234 816 084 7613
        </p>
        <p style="
          color: #94a3b8;
          font-size: 13px;
          margin: 0;
        ">
          Follow for design tips, updates & exclusive offers
        </p>
      </div>
      ` : ''}
    </div>

    <!-- FOOTER -->
    <div style="
      padding: 35px 40px;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      text-align: center;
    ">
      <!-- CONTACT INFO -->
      <div style="margin-bottom: 25px;">
        <h3 style="
          color: #475569;
          margin: 0 0 20px;
          font-size: 16px;
          font-weight: 700;
        ">
          <i class="fas fa-headset" style="color: #3b82f6; margin-right: 10px;"></i>
          Contact Support
        </h3>
        
        <div style="display: flex; flex-direction: column; gap: 12px; max-width: 300px; margin: 0 auto;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
            <div style="
              width: 36px;
              height: 36px;
              background: #3b82f6;
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
            ">
              <i class="fas fa-phone"></i>
            </div>
            <div style="text-align: left;">
              <p style="color: #64748b; margin: 0 0 2px; font-size: 13px; font-weight: 500;">Phone</p>
              <p style="color: #1e293b; margin: 0; font-size: 15px; font-weight: 700;">+234 816 084 7613</p>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
            <div style="
              width: 36px;
              height: 36px;
              background: #8b5cf6;
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
            ">
              <i class="fas fa-envelope"></i>
            </div>
            <div style="text-align: left;">
              <p style="color: #64748b; margin: 0 0 2px; font-size: 13px; font-weight: 500;">Email</p>
              <p style="color: #1e293b; margin: 0; font-size: 15px; font-weight: 700;">info@verapixels.com</p>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
            <div style="
              width: 36px;
              height: 36px;
              background: #10b981;
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
            ">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div style="text-align: left;">
              <p style="color: #64748b; margin: 0 0 2px; font-size: 13px; font-weight: 500;">Location</p>
              <p style="color: #1e293b; margin: 0; font-size: 15px; font-weight: 700;">Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- COPYRIGHT -->
      <div style="border-top: 1px solid #e2e8f0; padding-top: 25px;">
        <p style="
          color: #94a3b8;
          font-size: 12px;
          margin: 0 0 15px;
          line-height: 1.6;
        ">
          © ${new Date().getFullYear()} Verapixels Digital Studio. All rights reserved.<br>
          This email was sent regarding your consultation booking.
        </p>
        
        <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 15px;">
          <a href="#" style="
            color: #3b82f6;
            text-decoration: none;
            font-size: 12px;
            font-weight: 500;
          ">Unsubscribe</a>
          <span style="color: #cbd5e1;">•</span>
          <a href="#" style="
            color: #3b82f6;
            text-decoration: none;
            font-size: 12px;
            font-weight: 500;
          ">Privacy Policy</a>
          <span style="color: #cbd5e1;">•</span>
          <a href="#" style="
            color: #3b82f6;
            text-decoration: none;
            font-size: 12px;
            font-weight: 500;
          ">Terms of Service</a>
        </div>
        
        <p style="
          color: #cbd5e1;
          font-size: 11px;
          margin: 0;
        ">
          If you have any questions, reply to this email or call us directly.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;

// ============================================================
// HELPER FUNCTIONS
// ============================================================
const tableRow = (label, value) => `
  <tr>
    <td style="
      padding: 16px 0;
      font-weight: 600;
      color: #475569;
      width: 35%;
      font-size: 14px;
      vertical-align: top;
      border-bottom: 1px solid #f1f5f9;
    ">${label}</td>
    <td style="
      padding: 16px 0;
      color: #0f172a;
      font-size: 14px;
      font-weight: 500;
      vertical-align: top;
      border-bottom: 1px solid #f1f5f9;
    ">${value}</td>
  </tr>
`;

const infoBox = (icon, title, content, type = 'info') => {
  const colors = {
    info: { bg: '#f0f9ff', border: '#bae6fd', iconColor: '#0ea5e9', iconBg: '#0ea5e9' },
    warning: { bg: '#fef3c7', border: '#fde68a', iconColor: '#d97706', iconBg: '#d97706' },
    success: { bg: '#d1fae5', border: '#a7f3d0', iconColor: '#059669', iconBg: '#059669' },
    urgent: { bg: '#fee2e2', border: '#fecaca', iconColor: '#dc2626', iconBg: '#dc2626' }
  };
  
  const color = colors[type] || colors.info;
  
  return `
    <div style="
      background: ${color.bg};
      border: 1.5px solid ${color.border};
      border-radius: 14px;
      padding: 22px 24px;
      margin: 30px 0;
    ">
      <div style="display: flex; align-items: flex-start;">
        <div style="
          background: ${color.iconBg};
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(${parseInt(color.iconBg.slice(1,3), 16)}, ${parseInt(color.iconBg.slice(3,5), 16)}, ${parseInt(color.iconBg.slice(5,7), 16)}, 0.2);
        ">
          <i class="${icon}" style="color: white; font-size: 18px;"></i>
        </div>
        <div style="flex: 1;">
          <h4 style="
            color: ${color.iconColor};
            margin: 0 0 10px;
            font-size: 16px;
            font-weight: 700;
          ">${title}</h4>
          <div style="color: #475569; font-size: 14px; line-height: 1.6;">
            ${content}
          </div>
        </div>
      </div>
    </div>
  `;
};

// ============================================================
// CORE SEND FUNCTION
// ============================================================
export const sendEmail = async ({ to, subject, html, replyTo }) => {
  try {
    console.log('📧 Attempting to send email:');
    console.log('   To:', to);
    console.log('   Subject:', subject);
    console.log('   From:', process.env.FROM_EMAIL || 'info@verapixels.com');
    console.log('   Reply-To:', replyTo);

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
    <div style="text-align: center;">
      <div style="
        background: rgba(255, 255, 255, 0.15);
        display: inline-block;
        padding: 12px 24px;
        border-radius: 12px;
        margin-bottom: 15px;
        border: 1px solid rgba(255, 255, 255, 0.2);
      ">
        <i class="fas fa-calendar-plus" style="color: white; font-size: 24px; margin-bottom: 10px;"></i>
      </div>
      <h2 style="
        color: #ffffff;
        margin: 0 0 8px;
        font-size: 22px;
        font-weight: 700;
        letter-spacing: -0.3px;
      ">New Consultation Booking</h2>
      <p style="
        color: rgba(255, 255, 255, 0.9);
        margin: 0;
        font-size: 14px;
      ">Client: ${userName} • ID: <span style="font-family: 'Courier New', monospace; font-weight: 600;">${consultationId}</span></p>
    </div>
  `;

  const body = `
    <h3 style="
      color: #1e293b;
      margin: 0 0 25px;
      font-size: 20px;
      font-weight: 700;
      padding-bottom: 15px;
      border-bottom: 2px solid #f1f5f9;
    ">
      <i class="fas fa-clipboard-list" style="color: #3b82f6; margin-right: 10px;"></i>
      Booking Details
    </h3>
    
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px;">
      ${tableRow('👤 Client Name',  `
        <span style="color: #1e293b; font-weight: 700; font-size: 16px;">
          ${userName}
        </span>`)}
      ${tableRow('📧 Email Address', `
        <div>
          <a href="mailto:${userEmail}" 
             style="color: #3b82f6; text-decoration: none; font-weight: 700; font-size: 15px;">
             ${userEmail}
          </a>
          <div style="margin-top: 5px;">
            <a href="mailto:${userEmail}" 
               style="color: #64748b; font-size: 13px; text-decoration: none; background: #f1f5f9; padding: 4px 10px; border-radius: 6px; display: inline-block;">
               <i class="fas fa-reply"></i> Reply to Client
            </a>
          </div>
        </div>`)}
      ${tableRow('📱 Phone Number', `
        <div>
          <a href="tel:${userPhone}" 
             style="color: #1e293b; text-decoration: none; font-weight: 700; font-size: 16px;">
             ${userPhone}
          </a>
          <div style="margin-top: 5px;">
            <a href="https://wa.me/${userPhone.replace(/\D/g, '')}" 
               target="_blank"
               style="color: #25D366; font-size: 13px; text-decoration: none; background: #f0fdf4; padding: 4px 10px; border-radius: 6px; display: inline-block; margin-right: 8px;">
               <i class="fab fa-whatsapp"></i> WhatsApp
            </a>
            <a href="tel:${userPhone}" 
               style="color: #3b82f6; font-size: 13px; text-decoration: none; background: #f0f9ff; padding: 4px 10px; border-radius: 6px; display: inline-block;">
               <i class="fas fa-phone"></i> Call
            </a>
          </div>
        </div>`)}
      ${tableRow('📞 Contact Method', `
        <span style="
          background: ${contactMethod === 'WhatsApp Call' ? 'linear-gradient(135deg, #25D366, #128C7E)' : 
                      contactMethod === 'Phone Call' ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 
                      contactMethod === 'Video Call' ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : 'linear-gradient(135deg, #64748b, #475569)'};
          color: white;
          padding: 8px 16px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          display: inline-block;
          letter-spacing: 0.3px;
        ">
          <i class="${contactMethod === 'WhatsApp Call' ? 'fab fa-whatsapp' : 
                    contactMethod === 'Phone Call' ? 'fas fa-phone' : 
                    'fas fa-video'}"></i>
          ${contactMethod}
        </span>`)}
      ${tableRow('📅 Consultation Date', `
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="
            background: #f0f9ff;
            width: 40px;
            height: 40px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #3b82f6;
            font-size: 18px;
          ">
            <i class="fas fa-calendar-day"></i>
          </div>
          <span style="color: #1e293b; font-weight: 700; font-size: 16px;">
            ${bookingDate}
          </span>
        </div>`)}
      ${tableRow('🕐 Client Local Time', `
        <div>
          <span style="color: #1e293b; font-weight: 700; font-size: 16px;">
            ${bookingTime}
          </span>
          <div style="color: #64748b; font-size: 13px; margin-top: 5px; background: #f8fafc; padding: 6px 10px; border-radius: 6px;">
            <i class="fas fa-globe"></i> ${userTimezone}
          </div>
        </div>`)}
      ${tableRow('🕐 Lagos Time (WAT)', `
        <div>
          <span style="color: #3b82f6; font-weight: 800; font-size: 18px; background: #f0f9ff; padding: 8px 16px; border-radius: 10px; display: inline-block;">
            ${businessTime}
          </span>
          <div style="color: #64748b; font-size: 13px; margin-top: 8px;">
            <i class="fas fa-clock"></i> Nigeria Time Zone (GMT+1)
          </div>
        </div>`)}
      ${tableRow('💬 Additional Message', `
        <div style="
          background: #f8fafc;
          border-radius: 10px;
          padding: 16px;
          border-left: 4px solid #3b82f6;
        ">
          <p style="color: #475569; margin: 0; font-size: 14px; line-height: 1.6;">
            ${message || '<span style="color: #94a3b8; font-style: italic;">No additional message provided</span>'}
          </p>
        </div>`)}
    </table>

    ${infoBox(
      'fas fa-tasks',
      'Action Required',
      `
      <p style="margin: 0 0 12px; font-weight: 600;">Please prepare for this consultation and contact the client via <strong>${contactMethod}</strong>.</p>
      <div style="background: white; border-radius: 10px; padding: 15px; margin-top: 15px;">
        <p style="color: #475569; margin: 0 0 10px; font-size: 14px; font-weight: 600;">📋 Checklist:</p>
        <ul style="margin: 0; padding-left: 20px; color: #475569;">
          <li>Review client information and needs</li>
          <li>Set calendar reminder for <strong>${bookingDate} at ${businessTime}</strong></li>
          <li>Prepare consultation materials and questions</li>
          <li>Test communication tools (if video/phone call)</li>
          <li>Reach out to client 15 minutes before appointment</li>
        </ul>
      </div>
      `,
      'warning'
    )}
    
    <div style="
      background: #f0f9ff;
      border-radius: 14px;
      padding: 20px;
      margin: 30px 0;
      text-align: center;
      border: 2px dashed #bae6fd;
    ">
      <p style="color: #0c4a6e; margin: 0; font-weight: 600; font-size: 15px;">
        <i class="fas fa-lightbulb" style="margin-right: 8px;"></i>
        Tip: Add this to your calendar with a 30-minute reminder
      </p>
    </div>
  `;

  const html = baseTemplate(
    'linear-gradient(135deg, #1e3a8a, #3b82f6)',
    header,
    body,
    false  // No social media in admin emails
  );

  console.log('📧 Sending admin notification...');
  
  return await sendEmail({
    to: process.env.FROM_EMAIL || 'info@verapixels.com',
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
    <div style="text-align: center;">
      <div style="
        background: rgba(255, 255, 255, 0.2);
        display: inline-block;
        padding: 14px 28px;
        border-radius: 14px;
        margin-bottom: 15px;
        border: 2px solid rgba(255, 255, 255, 0.3);
      ">
        <i class="fas fa-calendar-check" style="color: white; font-size: 28px;"></i>
      </div>
      <h2 style="
        color: #ffffff;
        margin: 0 0 10px;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: -0.3px;
      ">Booking Confirmed!</h2>
      <p style="
        color: rgba(255, 255, 255, 0.95);
        margin: 0;
        font-size: 16px;
        font-weight: 500;
      ">Hello ${userName}, we're excited to work with you!</p>
    </div>
  `;

  const body = `
    <p style="
      color: #475569;
      font-size: 16px;
      margin: 0 0 30px;
      line-height: 1.7;
    ">
      Thank you for choosing Verapixels! Your free consultation has been scheduled. 
      We're looking forward to helping you achieve your digital goals.
    </p>

    <!-- APPOINTMENT CARD -->
    <div style="
      background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
      border: 2px solid #bae6fd;
      border-radius: 18px;
      padding: 30px;
      margin-bottom: 35px;
      box-shadow: 0 8px 30px rgba(14, 165, 233, 0.12);
      position: relative;
      overflow: hidden;
    ">
      <div style="
        position: absolute;
        top: 0;
        right: 0;
        width: 120px;
        height: 120px;
        background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(56, 189, 248, 0.05));
        border-radius: 0 0 0 100px;
      "></div>
      
      <h3 style="
        color: #0c4a6e;
        margin: 0 0 25px;
        font-size: 20px;
        font-weight: 700;
        display: flex;
        align-items: center;
      ">
        <i class="fas fa-calendar-alt" style="margin-right: 12px; background: #0ea5e9; color: white; width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center;"></i>
        Your Appointment Details
      </h3>
      
      <table style="width: 100%; border-collapse: collapse;">
        ${tableRow('📅 Consultation Date', `
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="
              background: white;
              width: 44px;
              height: 44px;
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #0ea5e9;
              font-size: 20px;
              box-shadow: 0 4px 12px rgba(14, 165, 233, 0.15);
            ">
              <i class="fas fa-calendar-day"></i>
            </div>
            <span style="color: #1e293b; font-weight: 800; font-size: 18px;">
              ${bookingDate}
            </span>
          </div>`)}
        ${tableRow('🕐 Your Local Time', `
          <div>
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
              <div style="
                background: white;
                width: 44px;
                height: 44px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #0ea5e9;
                font-size: 20px;
                box-shadow: 0 4px 12px rgba(14, 165, 233, 0.15);
              ">
                <i class="fas fa-clock"></i>
              </div>
              <span style="color: #1e293b; font-weight: 800; font-size: 18px;">
                ${bookingTime}
              </span>
            </div>
            <div style="color: #64748b; font-size: 14px; background: #f1f5f9; padding: 8px 12px; border-radius: 8px; display: inline-block;">
              <i class="fas fa-globe-americas"></i> Your timezone: ${userTimezone}
            </div>
          </div>`)}
        ${tableRow('🕐 Lagos Time (WAT)', `
          <div>
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
              <div style="
                background: linear-gradient(135deg, #0ea5e9, #3b82f6);
                width: 44px;
                height: 44px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 20px;
                box-shadow: 0 6px 20px rgba(14, 165, 233, 0.3);
              ">
                <i class="fas fa-flag"></i>
              </div>
              <span style="color: #3b82f6; font-weight: 900; font-size: 20px;">
                ${businessTime}
              </span>
            </div>
            <div style="color: #64748b; font-size: 14px;">
              <i class="fas fa-map-marker-alt"></i> Nigeria Time Zone (GMT+1)
            </div>
          </div>`)}
        ${tableRow('📞 Meeting Method', `
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="
              background: ${contactMethod === 'WhatsApp Call' ? '#25D366' : 
                          contactMethod === 'Phone Call' ? '#3b82f6' : 
                          '#8b5cf6'};
              width: 44px;
              height: 44px;
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 20px;
              box-shadow: 0 6px 20px rgba(${contactMethod === 'WhatsApp Call' ? '37, 211, 102' : 
                                          contactMethod === 'Phone Call' ? '59, 130, 246' : 
                                          '139, 92, 246'}, 0.3);
            ">
              <i class="${contactMethod === 'WhatsApp Call' ? 'fab fa-whatsapp' : 
                        contactMethod === 'Phone Call' ? 'fas fa-phone' : 
                        'fas fa-video'}"></i>
            </div>
            <span style="
              background: linear-gradient(135deg, 
                ${contactMethod === 'WhatsApp Call' ? '#25D366, #128C7E' : 
                 contactMethod === 'Phone Call' ? '#3b82f6, #1d4ed8' : 
                 '#8b5cf6, #7c3aed'});
              color: white;
              padding: 10px 20px;
              border-radius: 12px;
              font-size: 15px;
              font-weight: 700;
              letter-spacing: 0.3px;
            ">
              ${contactMethod}
            </span>
          </div>`)}
      </table>
      
      <!-- REFERENCE ID -->
      <div style="
        background: white;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        padding: 20px;
        margin-top: 30px;
        text-align: center;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      ">
        <p style="
          color: #64748b;
          margin: 0 0 10px;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        ">
          <i class="fas fa-hashtag"></i>
          Your Reference Number
        </p>
        <p style="
          color: #1e293b;
          margin: 0;
          font-size: 20px;
          font-family: 'Courier New', monospace;
          font-weight: 800;
          letter-spacing: 1.5px;
          background: #f8fafc;
          padding: 12px;
          border-radius: 10px;
          border: 1px dashed #cbd5e1;
        ">${consultationId}</p>
        <p style="
          color: #94a3b8;
          margin: 12px 0 0;
          font-size: 13px;
        ">
          Please keep this reference number for all communications
        </p>
      </div>
    </div>

    ${infoBox(
      'fas fa-lightbulb',
      'How to Prepare',
      `
      <p style="margin: 0 0 15px; font-weight: 600; color: #0c4a6e;">To make the most of our consultation, please prepare:</p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
        <div style="background: white; border-radius: 10px; padding: 15px; border: 1px solid #e2e8f0;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <div style="background: #f0f9ff; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #0ea5e9;">
              <i class="fas fa-bullseye"></i>
            </div>
            <p style="color: #1e293b; margin: 0; font-weight: 600; font-size: 14px;">Project Goals</p>
          </div>
          <p style="color: #64748b; margin: 0; font-size: 13px;">Define what you want to achieve</p>
        </div>
        
        <div style="background: white; border-radius: 10px; padding: 15px; border: 1px solid #e2e8f0;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <div style="background: #f0f9ff; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #0ea5e9;">
              <i class="fas fa-question-circle"></i>
            </div>
            <p style="color: #1e293b; margin: 0; font-weight: 600; font-size: 14px;">Questions</p>
          </div>
          <p style="color: #64748b; margin: 0; font-size: 13px;">List your questions & concerns</p>
        </div>
      </div>
      `,
      'info'
    )}
    
    ${infoBox(
      'fas fa-comments',
      'Need Help or Changes?',
      `
      <p style="margin: 0 0 15px; color: #475569;">We're here to help! If you need to make any changes:</p>
      <div style="background: white; border-radius: 12px; padding: 20px; margin-top: 15px;">
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #f1f5f9;">
          <div style="
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            width: 40px;
            height: 40px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 18px;
          ">
            <i class="fas fa-phone"></i>
          </div>
          <div>
            <p style="color: #1e293b; margin: 0 0 4px; font-weight: 700;">Call Us Directly</p>
            <p style="color: #3b82f6; margin: 0; font-size: 16px; font-weight: 800;">+234 816 084 7613</p>
          </div>
        </div>
        
        <div style="display: flex; align-items: center; gap: 15px;">
          <div style="
            background: linear-gradient(135deg, #10b981, #059669);
            width: 40px;
            height: 40px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 18px;
          ">
            <i class="fas fa-envelope"></i>
          </div>
          <div>
            <p style="color: #1e293b; margin: 0 0 4px; font-weight: 700;">Email Support</p>
            <p style="color: #10b981; margin: 0; font-size: 16px; font-weight: 800;">info@verapixels.com</p>
          </div>
        </div>
      </div>
      `,
      'success'
    )}
    
    <div style="
      background: linear-gradient(135deg, #fef3c7, #fde68a);
      border: 2px solid #fbbf24;
      border-radius: 14px;
      padding: 20px;
      margin: 30px 0;
      text-align: center;
    ">
      <p style="color: #92400e; margin: 0; font-weight: 700; font-size: 15px;">
        <i class="fas fa-exclamation-circle" style="margin-right: 8px;"></i>
        Important: Please be available 5 minutes before your scheduled time
      </p>
    </div>
  `;

  const html = baseTemplate(
    'linear-gradient(135deg, #059669, #10b981)',
    header,
    body,
    true  // Include social media in user emails
  );

  console.log('📧 Sending user confirmation...');
  
  return await sendEmail({
    to: userEmail,
    subject,
    html,
    replyTo: process.env.FROM_EMAIL || 'info@verapixels.com'
  });
};

// ============================================================
// EMAIL 3: URGENT ADMIN CHAT ALERT
// ============================================================
export const sendAdminChatNotification = async ({
  conversationId, reason, messagePreview, userName, userEmail
}) => {
  const subject = `🚨 [URGENT] Admin Request — Chat ${conversationId}`;

  const header = `
    <div style="text-align: center;">
      <div style="
        background: rgba(255, 255, 255, 0.15);
        display: inline-block;
        padding: 14px;
        border-radius: 50%;
        margin-bottom: 15px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        animation: pulse 2s infinite;
      ">
        <i class="fas fa-exclamation-triangle" style="color: white; font-size: 28px;"></i>
      </div>
      <h2 style="
        color: #ffffff;
        margin: 0 0 8px;
        font-size: 22px;
        font-weight: 700;
        letter-spacing: -0.3px;
      ">Admin Intervention Required</h2>
      <p style="
        color: rgba(255, 255, 255, 0.9);
        margin: 0;
        font-size: 14px;
        font-weight: 500;
      ">User waiting in live chat • Immediate attention needed</p>
    </div>
    <style>
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
    </style>
  `;

  const body = `
    <div style="
      background: linear-gradient(135deg, #fee2e2, #fecaca);
      border: 3px solid #fca5a5;
      border-radius: 18px;
      padding: 30px;
      margin-bottom: 35px;
      position: relative;
      overflow: hidden;
    ">
      <div style="
        position: absolute;
        top: 0;
        right: 0;
        width: 100px;
        height: 100px;
        background: rgba(220, 38, 38, 0.1);
        border-radius: 0 0 0 100px;
      "></div>
      
      <h3 style="
        color: #991b1b;
        margin: 0 0 25px;
        font-size: 20px;
        font-weight: 700;
        display: flex;
        align-items: center;
      ">
        <i class="fas fa-comment-medical" style="margin-right: 12px; background: #dc2626; color: white; width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center;"></i>
        Urgent Chat Request
      </h3>
      
      <table style="width: 100%; border-collapse: collapse;">
        ${tableRow('💬 Chat Session ID', `
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="
              background: #dc2626;
              width: 44px;
              height: 44px;
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 20px;
              box-shadow: 0 6px 20px rgba(220, 38, 38, 0.3);
            ">
              <i class="fas fa-comments"></i>
            </div>
            <span style="font-family: 'Courier New', monospace; font-size: 16px; color: #dc2626; font-weight: 800;">
              ${conversationId}
            </span>
          </div>`)}
        ${userName ? tableRow('👤 User Name', `
          <span style="color: #1e293b; font-weight: 700; font-size: 16px;">
            ${userName}
          </span>`) : ''}
        ${userEmail ? tableRow('📧 User Email', `
          <a href="mailto:${userEmail}" 
             style="color: #dc2626; text-decoration: none; font-weight: 700; font-size: 15px;">
             ${userEmail}
          </a>`) : ''}
        ${tableRow('📝 Reason for Escalation', `
          <span style="
            background: linear-gradient(135deg, #dc2626, #b91c1c);
            color: white;
            padding: 10px 18px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 0.3px;
            display: inline-block;
            box-shadow: 0 6px 20px rgba(220, 38, 38, 0.25);
          ">
            <i class="fas fa-exclamation-circle"></i>
            ${reason}
          </span>`)}
        ${tableRow('💬 Last Message', `
          <div style="
            background: white;
            border: 2px solid #fca5a5;
            border-radius: 12px;
            padding: 18px;
            margin-top: 10px;
            position: relative;
          ">
            <div style="
              position: absolute;
              top: -10px;
              left: 20px;
              background: #dc2626;
              color: white;
              padding: 4px 12px;
              border-radius: 6px;
              font-size: 12px;
              font-weight: 700;
            ">
              <i class="fas fa-quote-left"></i> Latest Message
            </div>
            <p style="
              color: #475569;
              margin: 8px 0 0;
              font-size: 14px;
              line-height: 1.6;
              font-style: italic;
            ">
              "${messagePreview}"
            </p>
          </div>`)}
        ${tableRow('⏰ Request Time', `
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="
              background: #fef3c7;
              width: 44px;
              height: 44px;
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #d97706;
              font-size: 20px;
            ">
              <i class="fas fa-clock"></i>
            </div>
            <div>
              <span style="color: #1e293b; font-weight: 700; font-size: 16px;">
                ${new Date().toLocaleString('en-US', {
                  timeZone: 'Africa/Lagos',
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
              <div style="color: #64748b; font-size: 13px; margin-top: 5px;">
                <i class="fas fa-map-marker-alt"></i> Lagos Time (GMT+1)
              </div>
            </div>
          </div>`)}
      </table>
      
      <div style="
        background: white;
        border: 2px dashed #fca5a5;
        border-radius: 12px;
        padding: 20px;
        margin-top: 25px;
        text-align: center;
      ">
        <a href="#" 
           style="
             display: inline-block;
             background: linear-gradient(135deg, #dc2626, #b91c1c);
             color: white;
             padding: 14px 32px;
             text-decoration: none;
             border-radius: 12px;
             font-weight: 700;
             font-size: 16px;
             border: none;
             cursor: pointer;
             transition: all 0.3s ease;
             box-shadow: 0 8px 25px rgba(220, 38, 38, 0.3);
             letter-spacing: 0.5px;
           "
           onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 12px 30px rgba(220, 38, 38, 0.4)';"
           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 25px rgba(220, 38, 38, 0.3)';">
           <i class="fas fa-sign-in-alt" style="margin-right: 10px;"></i> Join Chat Now
        </a>
        <p style="color: #dc2626; font-size: 14px; margin: 12px 0 0; font-weight: 600;">
          <i class="fas fa-bolt"></i> User is actively waiting - Immediate response needed
        </p>
      </div>
    </div>

    ${infoBox(
      'fas fa-user-headset',
      'Immediate Action Required',
      `
      <p style="margin: 0 0 15px; color: #dc2626; font-weight: 700; font-size: 15px;">
        ⚡ This user needs immediate assistance. Please join the chat session now.
      </p>
      <div style="background: white; border-radius: 12px; padding: 20px; margin-top: 15px;">
        <p style="color: #1e293b; margin: 0 0 15px; font-weight: 600; font-size: 14px;">Expected Actions:</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
          <div style="background: #fef2f2; border-radius: 10px; padding: 15px; border-left: 4px solid #dc2626;">
            <p style="color: #dc2626; margin: 0 0 8px; font-weight: 700; font-size: 14px;">1. Join Immediately</p>
            <p style="color: #64748b; margin: 0; font-size: 13px;">Enter the chat within 2-3 minutes</p>
          </div>
          
          <div style="background: #fef2f2; border-radius: 10px; padding: 15px; border-left: 4px solid #dc2626;">
            <p style="color: #dc2626; margin: 0 0 8px; font-weight: 700; font-size: 14px;">2. Assess Situation</p>
            <p style="color: #64748b; margin: 0; font-size: 13px;">Understand user's specific concern</p>
          </div>
          
          <div style="background: #fef2f2; border-radius: 10px; padding: 15px; border-left: 4px solid #dc2626;">
            <p style="color: #dc2626; margin: 0 0 8px; font-weight: 700; font-size: 14px;">3. Provide Solution</p>
            <p style="color: #64748b; margin: 0; font-size: 13px;">Offer expert assistance & resolution</p>
          </div>
          
          <div style="background: #fef2f2; border-radius: 10px; padding: 15px; border-left: 4px solid #dc2626;">
            <p style="color: #dc2626; margin: 0 0 8px; font-weight: 700; font-size: 14px;">4. Follow Up</p>
            <p style="color: #64748b; margin: 0; font-size: 13px;">Email follow-up if needed</p>
          </div>
        </div>
      </div>
      `,
      'urgent'
    )}
    
    <div style="
      background: linear-gradient(135deg, #dc2626, #b91c1c);
      border-radius: 14px;
      padding: 25px;
      margin: 30px 0;
      text-align: center;
      color: white;
      box-shadow: 0 10px 30px rgba(220, 38, 38, 0.2);
    ">
      <p style="margin: 0; font-weight: 700; font-size: 16px; letter-spacing: 0.5px;">
        <i class="fas fa-exclamation-circle" style="margin-right: 10px; font-size: 20px;"></i>
        PRIORITY: URGENT • RESPONSE TIME: < 5 MINUTES
      </p>
    </div>
  `;

  const html = baseTemplate(
    'linear-gradient(135deg, #991b1b, #dc2626)',
    header,
    body,
    false  // No social media in urgent alerts
  );

  console.log('📧 Sending admin chat alert...');
  
  return await sendEmail({
    to: process.env.FROM_EMAIL || 'info@verapixels.com',
    subject,
    html
  });
};

// ============================================================
// EMAIL 4: TEST EMAIL FUNCTION (OPTIONAL)
// ============================================================
export const sendTestEmail = async (testEmail) => {
  console.log('🧪 Sending test email...');
  
  return await sendUserConfirmation({
    userName: "Test User",
    userEmail: testEmail || process.env.FROM_EMAIL || 'info@verapixels.com',
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