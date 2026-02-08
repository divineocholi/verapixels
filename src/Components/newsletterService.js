// newsletterService.js - NEWSLETTER MANAGEMENT SYSTEM
import { sendEmail } from "../../emailService.js";
import { generateNewsletterHTML } from './newsletter-template-generator.js';

// ==================== REUSABLE NEWSLETTER TEMPLATE ====================
// ✅ Use the professional template generator instead of inline HTML
const newsletterTemplate = (data) => {
  return generateNewsletterHTML(data);
};

// ==================== SEND NEWSLETTER FUNCTION ====================
export const sendNewsletter = async (newsletterData, subscribers) => {
  console.log(`📧 Preparing to send newsletter to ${subscribers.length} subscribers...`);
  
  const results = {
    success: [],
    failed: [],
    total: subscribers.length
  };

  const subject = `${newsletterData.edition} - ${newsletterData.heroTitle}`;

  // ✅ SEND ONE BY ONE with 600ms delay (safer than 500ms)
  for (let i = 0; i < subscribers.length; i++) {
    const subscriber = subscribers[i];
    
    try {
      console.log(`📧 [${i + 1}/${subscribers.length}] Sending to: ${subscriber.email}`);
      
      const personalizedHtml = newsletterTemplate({
        ...newsletterData,
        subscriberEmail: subscriber.email
      });

      const result = await sendEmail({
        to: subscriber.email,
        subject,
        html: personalizedHtml,
        from: 'newsletter@verapixels.com', 
        replyTo: 'info@verapixels.com'
      });

      if (result.success) {
        results.success.push(subscriber.email);
        console.log(`✅ [${i + 1}/${subscribers.length}] Sent to: ${subscriber.email}`);
      } else {
        results.failed.push({ email: subscriber.email, error: result.error });
        console.error(`❌ [${i + 1}/${subscribers.length}] Failed: ${subscriber.email} - ${result.error}`);
      }
      
    } catch (error) {
      results.failed.push({ email: subscriber.email, error: error.message });
      console.error(`❌ [${i + 1}/${subscribers.length}] Exception: ${subscriber.email} - ${error.message}`);
    }
    
    // ✅ WAIT 600ms between emails (1.6 emails/second to be safe)
    if (i < subscribers.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 600));
    }
  }

  console.log('\n📊 Newsletter Send Summary:');
  console.log(`✅ Successful: ${results.success.length}`, results.success);
  console.log(`❌ Failed: ${results.failed.length}`, results.failed);
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