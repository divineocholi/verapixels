// newsletterService.js - NEWSLETTER MANAGEMENT SYSTEM
import { sendEmail } from "../../emailService.js";

// ==================== REUSABLE NEWSLETTER TEMPLATE ====================
const newsletterTemplate = ({
  edition,
  date,
  heroTitle,
  heroSubtitle,
  heroImage,
  sections,
  ctaTitle,
  ctaButton,
  ctaLink,
  subscriberEmail // For personalized unsubscribe link
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verapixels Newsletter - ${edition}</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .mobile-padding { padding: 20px !important; }
      .mobile-text { font-size: 16px !important; line-height: 1.6 !important; }
      .mobile-heading { font-size: 24px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        
        <!-- Main Container -->
        <table role="presentation" width="600" class="container" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;" class="mobile-padding">
              <img src="https://res.cloudinary.com/dpqntm1tb/image/upload/v1770247783/offical_main_glzsmp.jpg" alt="Verapixels" width="80" height="80" style="border-radius: 12px; margin-bottom: 20px; background: white; padding: 8px;">
              <h1 style="margin: 0 0 8px; color: #ffffff; font-size: 28px; font-weight: 700;">Verapixels Newsletter</h1>
              <p style="margin: 0; color: rgba(255,255,255,0.9); font-size: 16px;">${edition} • ${date}</p>
            </td>
          </tr>
          
          <!-- Hero Section -->
          ${heroImage ? `
          <tr>
            <td style="padding: 0;">
              <img src="${heroImage}" alt="Newsletter Hero" width="600" style="width: 100%; height: auto; display: block;">
            </td>
          </tr>
          ` : ''}
          
          <tr>
            <td style="padding: 40px;" class="mobile-padding">
              <h2 class="mobile-heading" style="margin: 0 0 16px; color: #1e293b; font-size: 32px; font-weight: 800; line-height: 1.2;">${heroTitle}</h2>
              <p class="mobile-text" style="margin: 0 0 32px; color: #64748b; font-size: 18px; line-height: 1.6;">${heroSubtitle}</p>
              
              <!-- Sections -->
              ${sections.map(section => `
                <div style="margin-bottom: 40px;">
                  ${section.image ? `
                    <img src="${section.image}" alt="${section.title}" width="560" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 20px;">
                  ` : ''}
                  
                  <h3 style="margin: 0 0 12px; color: #1e293b; font-size: 24px; font-weight: 700;">${section.title}</h3>
                  
                  ${section.content}
                  
                  ${section.link ? `
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top: 20px;">
                      <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 6px;">
                          <a href="${section.link}" style="display: inline-block; padding: 14px 28px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600;">${section.linkText || 'Read More'}</a>
                        </td>
                      </tr>
                    </table>
                  ` : ''}
                </div>
              `).join('')}
              
              <!-- CTA Section -->
              ${ctaTitle ? `
                <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%); border: 1px solid rgba(102,126,234,0.2); border-radius: 12px; padding: 32px; text-align: center; margin-top: 40px;">
                  <h3 style="margin: 0 0 16px; color: #1e293b; font-size: 24px; font-weight: 700;">${ctaTitle}</h3>
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin-top: 20px;">
                    <tr>
                      <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; box-shadow: 0 4px 20px rgba(102,126,234,0.4);">
                        <a href="${ctaLink}" style="display: inline-block; padding: 16px 40px; color: #ffffff; text-decoration: none; font-size: 18px; font-weight: 700;">${ctaButton}</a>
                      </td>
                    </tr>
                  </table>
                </div>
              ` : ''}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 40px; border-top: 1px solid #e2e8f0;" class="mobile-padding">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="text-align: center; padding-bottom: 20px;">
                    <p style="margin: 0 0 16px; color: #1e293b; font-size: 16px; font-weight: 600;">Connect With Us</p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                      <tr>
                        <td style="padding: 0 8px;">
                          <a href="https://www.instagram.com/verapixels_" style="display: inline-block; width: 40px; height: 40px; background: rgba(102,126,234,0.1); border-radius: 8px; text-decoration: none;">
                            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="24" height="24" style="margin: 8px;">
                          </a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="https://x.com/verapixels" style="display: inline-block; width: 40px; height: 40px; background: rgba(102,126,234,0.1); border-radius: 8px; text-decoration: none;">
                            <img src="https://cdn-icons-png.flaticon.com/512/5968/5968830.png" alt="X" width="24" height="24" style="margin: 8px;">
                          </a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="https://www.linkedin.com/company/verapixels" style="display: inline-block; width: 40px; height: 40px; background: rgba(102,126,234,0.1); border-radius: 8px; text-decoration: none;">
                            <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="LinkedIn" width="24" height="24" style="margin: 8px;">
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
                    <p style="margin: 0 0 8px; color: #64748b; font-size: 14px;">
                      📍 Lagos, Nigeria<br>
                      ✉️ <a href="mailto:info@verapixels.com" style="color: #667eea; text-decoration: none;">info@verapixels.com</a><br>
                      🌐 <a href="https://verapixels.com" style="color: #667eea; text-decoration: none;">www.verapixels.com</a>
                    </p>
                    <p style="margin: 16px 0 8px; color: #64748b; font-size: 14px;">© ${new Date().getFullYear()} Verapixels. All rights reserved.</p>
                    <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                      <a href="https://verapixels-server.onrender.com/api/newsletter/unsubscribe/${encodeURIComponent(subscriberEmail)}" style="color: #64748b; text-decoration: underline;">Unsubscribe</a> from this newsletter
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

// ==================== SEND NEWSLETTER FUNCTION ====================
export const sendNewsletter = async (newsletterData, subscribers) => {
  console.log(`📧 Preparing to send newsletter to ${subscribers.length} subscribers...`);
  
  const results = {
    success: [],
    failed: [],
    total: subscribers.length
  };

  const subject = `${newsletterData.edition} - ${newsletterData.heroTitle}`;

  // Send to subscribers in batches (to avoid rate limits)
  const BATCH_SIZE = 50;
  
  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const batch = subscribers.slice(i, i + BATCH_SIZE);
    
    console.log(`📤 Sending batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(subscribers.length / BATCH_SIZE)}`);
    
    const batchPromises = batch.map(async (subscriber) => {
      try {
        // Generate personalized HTML with unsubscribe link
        const personalizedHtml = newsletterTemplate({
          ...newsletterData,
          subscriberEmail: subscriber.email
        });

        const result = await sendEmail({
          to: subscriber.email,
          subject,
          html: personalizedHtml,
          from: 'newsletter@verapixels.com', // ✅ Send from newsletter@
          replyTo: 'info@verapixels.com'     // ✅ Replies go to info@
        });

        if (result.success) {
          results.success.push(subscriber.email);
          console.log(`✅ Sent to: ${subscriber.email}`);
        } else {
          results.failed.push({ email: subscriber.email, error: result.error });
          console.error(`❌ Failed: ${subscriber.email} - ${result.error}`);
        }
      } catch (error) {
        results.failed.push({ email: subscriber.email, error: error.message });
        console.error(`❌ Error sending to ${subscriber.email}:`, error.message);
      }
    });

    await Promise.all(batchPromises);
    
    // Add delay between batches to respect rate limits
    if (i + BATCH_SIZE < subscribers.length) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
    }
  }

  console.log('\n📊 Newsletter Send Summary:');
  console.log(`✅ Successful: ${results.success.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`📈 Success Rate: ${((results.success.length / results.total) * 100).toFixed(2)}%`);

  return results;
};

// ==================== EXAMPLE NEWSLETTER CONTENT ====================
export const exampleNewsletterData = {
  edition: "Week 6, 2025",
  date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  heroTitle: "The Future of Web Development is Here",
  heroSubtitle: "Discover the latest trends, tools, and techniques shaping the digital landscape",
  heroImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop",
  
  sections: [
    {
      title: "🚀 This Week's Highlights",
      content: `
        <p style="margin: 0 0 12px; color: #64748b; font-size: 16px; line-height: 1.6;">
          We've been busy building amazing digital experiences! Here's what's new at Verapixels:
        </p>
        <ul style="margin: 0; padding-left: 24px; color: #64748b; font-size: 16px; line-height: 1.8;">
          <li>Launched 3 new client websites with cutting-edge designs</li>
          <li>Published comprehensive guide on modern UX principles</li>
          <li>Expanded our team with talented developers and designers</li>
        </ul>
      `,
      image: null,
      link: "https://verapixels.com/blog",
      linkText: "Read Our Blog"
    },
    {
      title: "💡 Featured Article: Mastering Responsive Design",
      content: `
        <p style="margin: 0 0 12px; color: #64748b; font-size: 16px; line-height: 1.6;">
          Mobile-first design isn't just a trend—it's essential. Learn how to create websites that look stunning on every device.
        </p>
        <p style="margin: 0; color: #64748b; font-size: 16px; line-height: 1.6;">
          In this deep-dive, we explore modern CSS techniques, performance optimization strategies, and real-world case studies.
        </p>
      `,
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=400&fit=crop",
      link: "https://verapixels.com/blog/responsive-design",
      linkText: "Read Full Article"
    },
    {
      title: "🎯 Client Success Story",
      content: `
        <p style="margin: 0 0 12px; color: #64748b; font-size: 16px; line-height: 1.6;">
          <strong style="color: #1e293b;">TechStartup Inc.</strong> saw a <strong style="color: #667eea;">300% increase in conversions</strong> after we redesigned their e-commerce platform.
        </p>
        <p style="margin: 0; color: #64748b; font-size: 16px; line-height: 1.6;">
          "Working with Verapixels transformed our business. Their attention to detail and user experience expertise is unmatched." - CEO, TechStartup Inc.
        </p>
      `,
      image: null,
      link: "https://verapixels.com/case-studies",
      linkText: "View Case Study"
    }
  ],
  
  ctaTitle: "Ready to Transform Your Digital Presence?",
  ctaButton: "Book Free Consultation",
  ctaLink: "https://verapixels.com/contact"
};

export default {
  sendNewsletter,
  exampleNewsletterData
};