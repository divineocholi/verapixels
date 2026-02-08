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
    unsubscribeLink = '{{UNSUBSCRIBE_LINK}}'
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
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 30px; text-align: center;">
                            <a href="https://verapixels.com" style="font-size: 24px; font-weight: 700; color: #ffffff; text-decoration: none; letter-spacing: -0.5px;">
                                VERAPIXELS
                            </a>
                            <div style="color: #94a3b8; font-size: 13px; margin-top: 8px; text-transform: uppercase; letter-spacing: 1px;">
                                ${edition} • ${date}
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Hero Section -->
                    <tr>
                        <td style="background: linear-gradient(180deg, #0f172a 0%, #1e3a8a 100%); padding: 50px 30px; text-align: center; color: #ffffff;">
                            <h1 style="font-size: 32px; font-weight: 800; line-height: 1.2; margin: 0 0 16px 0; letter-spacing: -1px; color: #ffffff;">
                                ${heroTitle}
                            </h1>
                            ${heroSubtitle ? `
                              <p style="font-size: 18px; color: #cbd5e1; line-height: 1.5; margin: 0 auto; max-width: 500px;">
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
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background: #f8fafc; padding: 40px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <div style="margin-bottom: 24px;">
                                <a href="https://verapixels.com" style="color: #64748b; text-decoration: none; margin: 0 12px; font-size: 14px;">Website</a>
                                <a href="https://verapixels.com/blog" style="color: #64748b; text-decoration: none; margin: 0 12px; font-size: 14px;">Blog</a>
                                <a href="https://verapixels.com/portfolio" style="color: #64748b; text-decoration: none; margin: 0 12px; font-size: 14px;">Portfolio</a>
                                <a href="https://verapixels.com/contact" style="color: #64748b; text-decoration: none; margin: 0 12px; font-size: 14px;">Contact</a>
                            </div>
                            
                            <div style="margin: 24px 0;">
                                <a href="https://twitter.com/verapixels" style="display: inline-block; margin: 0 8px; width: 32px; height: 32px; background: #e2e8f0; border-radius: 50%; text-align: center; line-height: 32px; color: #475569; text-decoration: none;">𝕏</a>
                                <a href="https://linkedin.com/company/verapixels" style="display: inline-block; margin: 0 8px; width: 32px; height: 32px; background: #e2e8f0; border-radius: 50%; text-align: center; line-height: 32px; color: #475569; text-decoration: none;">in</a>
                                <a href="mailto:info@verapixels.com" style="display: inline-block; margin: 0 8px; width: 32px; height: 32px; background: #e2e8f0; border-radius: 50%; text-align: center; line-height: 32px; color: #475569; text-decoration: none;">✉</a>
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

// Example usage and export
export { generateNewsletterHTML };

// For testing
if (require.main === module) {
  const exampleData = {
    edition: 'Week 6, 2025',
    date: 'February 9, 2025',
    heroTitle: 'The Future of Web Development',
    heroSubtitle: 'Discover cutting-edge trends reshaping digital experiences',
    heroImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    sections: [
      {
        title: '🚀 This Week\'s Highlights',
        content: '<p>Exciting developments in the tech world this week. From AI breakthroughs to new framework releases, here\'s what caught our attention.</p>',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
        link: 'https://verapixels.com/blog/weekly-highlights',
        linkText: 'Read Full Article'
      },
      {
        title: '💡 Industry Insights',
        content: '<p><strong>Key trends we\'re watching:</strong></p><ul><li>Progressive Web Apps gaining momentum</li><li>Edge computing revolutionizing performance</li><li>AI-powered development tools</li></ul>',
        link: 'https://verapixels.com/insights',
        linkText: 'Learn More'
      }
    ],
    ctaTitle: 'Ready to Transform Your Digital Presence?',
    ctaButton: 'Book Free Consultation',
    ctaLink: 'https://verapixels.com/contact'
  };

  console.log(generateNewsletterHTML(exampleData));
}