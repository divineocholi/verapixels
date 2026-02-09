// newsletter-template-generator.js
// Professional newsletter HTML generator for email campaigns

function generateNewsletterHTML(data) {
  const {
    edition = 'Week 1, 2025',
    date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    heroTitle = '',
    heroSubtitle = '',
    heroImage = '',
    sections = [],
    ctaTitle = '',
    ctaButton = '',
    ctaLink = '',
    unsubscribeLink = '{{UNSUBSCRIBE_LINK}}',
    // ✅ FIXED: Logo now included automatically from environment/default
    logoUrl = 'https://res.cloudinary.com/dpqntm1tb/image/upload/v1770247783/offical_main_glzsmp.jpg'
  } = data;

  // Generate sections HTML
  const sectionsHTML = sections.map(section => {
    if (!section.title && !section.content) return '';
    
    return `
      <div style="padding: 40px 30px; border-bottom: 1px solid #e2e8f0;">
        ${section.title ? `
          <h2 style="font-size: 22px; font-weight: 700; margin-bottom: 16px; color: #0f172a; letter-spacing: -0.5px;">
            ${section.title}
          </h2>
        ` : ''}
        
        ${section.image ? `
          <img src="${section.image}" alt="${section.title || 'Section image'}" 
               style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 20px; display: block;" />
        ` : ''}
        
        ${section.content ? `
          <div style="font-size: 16px; line-height: 1.7; color: #475569; margin-bottom: 20px;">
            ${section.content}
          </div>
        ` : ''}
        
        ${section.link ? `
          <a href="${section.link}" 
             style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); 
                    color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
            ${section.linkText || 'Read More'}
          </a>
        ` : ''}
      </div>
    `;
  }).join('');

  // Generate CTA section if provided
  const ctaHTML = ctaTitle ? `
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 50px 30px; text-align: center;">
      <h2 style="font-size: 28px; font-weight: 700; color: #ffffff; margin-bottom: 16px; letter-spacing: -0.5px;">
        ${ctaTitle}
      </h2>
      <p style="font-size: 16px; color: #cbd5e1; margin-bottom: 30px;">
        Let's build something amazing together
      </p>
      ${ctaButton && ctaLink ? `
        <a href="${ctaLink}" 
           style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); 
                  color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
          ${ctaButton}
        </a>
      ` : ''}
    </div>
  ` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${heroTitle || 'Verapixels Newsletter'}</title>
    <!--[if mso]>
    <style type="text/css">
        body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
    </style>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <!-- Main Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; margin: 0 auto;">
                    
                    <!-- ✅ FIXED: Header with Logo -->
                    <tr>
                        <td style="background-color: #2563eb; padding: 40px 30px; text-align: center;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center">
                                        <!-- ✅ Company Logo -->
                                        <img src="${logoUrl}" alt="Verapixels Logo" width="80" height="80" style="display: block; width: 80px; height: 80px; margin: 0 auto 20px; border-radius: 8px; background-color: #ffffff; padding: 12px;">
                                        
                                        <a href="https://verapixels.com" style="font-size: 24px; font-weight: 700; color: #ffffff; text-decoration: none; letter-spacing: -0.5px;">
                                            VERAPIXELS
                                        </a>
                                        <div style="color: rgba(255, 255, 255, 0.9); font-size: 13px; margin-top: 8px; text-transform: uppercase; letter-spacing: 1px;">
                                            ${edition} • ${date}
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- ✅ FIXED: Hero Section - NO GRADIENT, just solid color -->
                    <tr>
                        <td style="background-color: #ffffff; padding: 50px 30px; text-align: center; color: #0f172a;">
                            <h1 style="font-size: 32px; font-weight: 800; line-height: 1.2; margin: 0 0 16px 0; letter-spacing: -1px; color: #0f172a;">
                                ${heroTitle}
                            </h1>
                            ${heroSubtitle ? `
                              <p style="font-size: 18px; color: #64748b; line-height: 1.5; margin: 0 auto; max-width: 500px;">
                                  ${heroSubtitle}
                              </p>
                            ` : ''}
                            ${heroImage ? `
                              <img src="${heroImage}" alt="Hero" 
                                   style="width: 100%; max-width: 540px; height: auto; margin-top: 30px; border-radius: 12px; display: block;" />
                            ` : ''}
                        </td>
                    </tr>
                    
                    <!-- Content Sections -->
                    <tr>
                        <td>
                            ${sectionsHTML}
                        </td>
                    </tr>
                    
                    <!-- CTA Section -->
                    ${ctaHTML ? `
                    <tr>
                        <td>
                            ${ctaHTML}
                        </td>
                    </tr>
                    ` : ''}
                    
                    <!-- ✅ FIXED: Social Media Icons (matching consultation template) -->
                    <tr>
                        <td style="padding: 40px 30px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding-bottom: 30px; text-align: center;">
                                        <p style="margin: 0 0 20px; color: #0f172a; font-size: 16px; font-weight: 600;">Connect With Us</p>
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                                            <tr>
                                                <!-- Instagram -->
                                                <td style="padding: 0 8px;">
                                                    <a href="https://www.instagram.com/verapixels_?igsh=MXZtajE2Y2Jxc3BiOA==" target="_blank" style="display: inline-block; text-decoration: none;">
                                                        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" style="width: 40px; height: 40px; border-radius: 8px;" />
                                                    </a>
                                                </td>
                                                <!-- LinkedIn -->
                                                <td style="padding: 0 8px;">
                                                    <a href="https://www.linkedin.com/company/verapixels" target="_blank" style="display: inline-block; text-decoration: none;">
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="LinkedIn" style="width: 40px; height: 40px; border-radius: 8px;" />
                                                    </a>
                                                </td>
                                                <!-- WhatsApp -->
                                                <td style="padding: 0 8px;">
                                                    <a href="https://wa.me/2347071333709" target="_blank" style="display: inline-block; text-decoration: none;">
                                                        <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" style="width: 40px; height: 40px; border-radius: 8px;" />
                                                    </a>
                                                </td>
                                                <!-- TikTok -->
                                                <td style="padding: 0 8px;">
                                                    <a href="https://www.tiktok.com/@verapixels_?_r=1&_t=ZS-93eYCe4Wq4A" target="_blank" style="display: inline-block; text-decoration: none;">
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok" style="width: 40px; height: 40px; border-radius: 8px;" />
                                                    </a>
                                                </td>
                                                <!-- X (Twitter) -->
                                                <td style="padding: 0 8px;">
                                                    <a href="https://x.com/verapixels" target="_blank" style="display: inline-block; text-decoration: none;">
                                                        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968830.png" alt="X" style="width: 40px; height: 40px; border-radius: 8px;" />
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background: #f8fafc; padding: 40px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <div style="margin-bottom: 24px;">
                                <a href="https://verapixels.com" style="color: #64748b; text-decoration: none; margin: 0 12px; font-size: 14px;">Website</a>
                                <a href="https://verapixels.com/blog" style="color: #64748b; text-decoration: none; margin: 0 12px; font-size: 14px;">Blog</a>
                                <a href="https://verapixels.com/portfolio" style="color: #64748b; text-decoration: none; margin: 0 12px; font-size: 14px;">Portfolio</a>
                                <a href="https://verapixels.com/contact" style="color: #64748b; text-decoration: none; margin: 0 12px; font-size: 14px;">Contact</a>
                            </div>
                            
                            <p style="font-size: 13px; color: #94a3b8; line-height: 1.6; margin: 0;">
                                You're receiving this because you subscribed to Verapixels updates.<br>
                                <strong>Verapixels</strong> • Lagos, Nigeria
                            </p>
                            
                            <a href="${unsubscribeLink}" style="color: #64748b; text-decoration: underline; font-size: 12px; margin-top: 16px; display: inline-block;">
                                Unsubscribe
                            </a>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

// ✅ FIXED: ES6 export instead of CommonJS
export { generateNewsletterHTML };