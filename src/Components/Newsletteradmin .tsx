import React, { useState, useEffect } from 'react';
import { Mail, Send, Users, TrendingUp, Calendar, CheckCircle, XCircle, Eye } from 'lucide-react';

const NewsletterAdmin = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);
  
  const [newsletterData, setNewsletterData] = useState({
    edition: `Week ${Math.ceil((new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / 604800000)}, ${new Date().getFullYear()}`,
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    heroTitle: '',
    heroSubtitle: '',
    heroImage: '',
    sections: [
      { title: '', content: '', image: '', link: '', linkText: 'Read More' }
    ],
    ctaTitle: '',
    ctaButton: '',
    ctaLink: ''
  });

  // Fetch subscribers and stats on load
  useEffect(() => {
    fetchSubscribers();
    fetchStats();
  }, []);

  // API URL - automatically uses correct endpoint based on environment
// ✅ CORRECT - Automatically uses the right URL for each environment
const API_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.MODE === 'production' 
    ? 'https://verapixels-server.onrender.com'
    : 'http://localhost:5001'
);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/newsletter/subscribers`);
      const data = await response.json();
      if (data.success) {
        setSubscribers(data.subscribers);
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/newsletter/stats`);
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const loadExample = async () => {
    try {
      const response = await fetch(`${API_URL}/api/newsletter/example`);
      const data = await response.json();
      if (data.success) {
        setNewsletterData(data.example);
      }
    } catch (error) {
      console.error('Error loading example:', error);
    }
  };

  const sendTestNewsletter = async () => {
    setIsLoading(true);
    setSendStatus(null);
    
    try {
      const response = await fetch(`${API_URL}/api/newsletter/test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newsletterData,
          testEmail: 'info@verapixels.com' // Change this to your test email
        })
      });

      const data = await response.json();
      
      setSendStatus({
        type: data.success ? 'success' : 'error',
        message: data.message
      });

    } catch (error) {
      setSendStatus({
        type: 'error',
        message: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendNewsletter = async () => {
    if (!window.confirm(`Send newsletter to ${subscribers.length} subscribers?`)) {
      return;
    }

    setIsLoading(true);
    setSendStatus(null);

    try {
      const response = await fetch(`${API_URL}/api/newsletter/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsletterData)
      });

      const data = await response.json();
      
      setSendStatus({
        type: data.success ? 'success' : 'error',
        message: data.message,
        results: data.results
      });

      if (data.success) {
        fetchStats(); // Refresh stats after send
      }

    } catch (error) {
      setSendStatus({
        type: 'error',
        message: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addSection = () => {
    setNewsletterData({
      ...newsletterData,
      sections: [
        ...newsletterData.sections,
        { title: '', content: '', image: '', link: '', linkText: 'Read More' }
      ]
    });
  };

  const updateSection = (index, field, value) => {
    const newSections = [...newsletterData.sections];
    newSections[index][field] = value;
    setNewsletterData({ ...newsletterData, sections: newSections });
  };

  const removeSection = (index) => {
    const newSections = newsletterData.sections.filter((_, i) => i !== index);
    setNewsletterData({ ...newsletterData, sections: newSections });
  };

  return (
    <div className="newsletter-admin">
      <div className="admin-header">
        <div className="header-content">
          <h1><Mail size={32} /> Newsletter Manager</h1>
          <p>Create and send weekly newsletters to your subscribers</p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <Users size={24} />
            <div>
              <h3>{subscribers.length}</h3>
              <p>Total Subscribers</p>
            </div>
          </div>
          
          <div className="stat-card">
            <TrendingUp size={24} />
            <div>
              <h3>{stats?.recentSends?.length || 0}</h3>
              <p>Newsletters Sent</p>
            </div>
          </div>
          
          <div className="stat-card">
            <Calendar size={24} />
            <div>
              <h3>{newsletterData.edition}</h3>
              <p>Current Edition</p>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-content">
        {/* Quick Actions */}
        <div className="quick-actions">
          <button onClick={loadExample} className="btn-secondary">
            <Eye size={20} />
            Load Example Newsletter
          </button>
          
          <button onClick={sendTestNewsletter} disabled={isLoading} className="btn-secondary">
            <Send size={20} />
            Send Test Email
          </button>
          
          <button onClick={sendNewsletter} disabled={isLoading} className="btn-primary">
            <Mail size={20} />
            Send to All Subscribers ({subscribers.length})
          </button>
        </div>

        {/* Status Message */}
        {sendStatus && (
          <div className={`status-message ${sendStatus.type}`}>
            {sendStatus.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
            <div>
              <strong>{sendStatus.message}</strong>
              {sendStatus.results && (
                <p>
                  Successful: {sendStatus.results.successful} | 
                  Failed: {sendStatus.results.failed} | 
                  Success Rate: {sendStatus.results.successRate}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Newsletter Form */}
        <div className="form-section">
          <h2>Newsletter Content</h2>
          
          {/* Basic Info */}
          <div className="form-group">
            <label>Edition</label>
            <input
              type="text"
              value={newsletterData.edition}
              onChange={(e) => setNewsletterData({...newsletterData, edition: e.target.value})}
              placeholder="Week 6, 2025"
            />
          </div>

          <div className="form-group">
            <label>Hero Title *</label>
            <input
              type="text"
              value={newsletterData.heroTitle}
              onChange={(e) => setNewsletterData({...newsletterData, heroTitle: e.target.value})}
              placeholder="The Future of Web Development is Here"
            />
          </div>

          <div className="form-group">
            <label>Hero Subtitle</label>
            <input
              type="text"
              value={newsletterData.heroSubtitle}
              onChange={(e) => setNewsletterData({...newsletterData, heroSubtitle: e.target.value})}
              placeholder="Discover the latest trends..."
            />
          </div>

          <div className="form-group">
            <label>Hero Image URL (optional)</label>
            <input
              type="url"
              value={newsletterData.heroImage}
              onChange={(e) => setNewsletterData({...newsletterData, heroImage: e.target.value})}
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          {/* Sections */}
          <div className="sections-container">
            <div className="sections-header">
              <h3>Content Sections</h3>
              <button onClick={addSection} className="btn-add">+ Add Section</button>
            </div>

            {newsletterData.sections.map((section, index) => (
              <div key={index} className="section-card">
                <div className="section-header">
                  <h4>Section {index + 1}</h4>
                  {newsletterData.sections.length > 1 && (
                    <button onClick={() => removeSection(index)} className="btn-remove">Remove</button>
                  )}
                </div>

                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSection(index, 'title', e.target.value)}
                    placeholder="🚀 This Week's Highlights"
                  />
                </div>

                <div className="form-group">
                  <label>Content (HTML supported)</label>
                  <textarea
                    value={section.content}
                    onChange={(e) => updateSection(index, 'content', e.target.value)}
                    placeholder="<p>Your content here...</p>"
                    rows={6}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Image URL (optional)</label>
                    <input
                      type="url"
                      value={section.image}
                      onChange={(e) => updateSection(index, 'image', e.target.value)}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Link URL (optional)</label>
                    <input
                      type="url"
                      value={section.link}
                      onChange={(e) => updateSection(index, 'link', e.target.value)}
                      placeholder="https://verapixels.com/blog"
                    />
                  </div>

                  <div className="form-group">
                    <label>Link Text</label>
                    <input
                      type="text"
                      value={section.linkText}
                      onChange={(e) => updateSection(index, 'linkText', e.target.value)}
                      placeholder="Read More"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="cta-section">
            <h3>Call-to-Action (optional)</h3>
            
            <div className="form-group">
              <label>CTA Title</label>
              <input
                type="text"
                value={newsletterData.ctaTitle}
                onChange={(e) => setNewsletterData({...newsletterData, ctaTitle: e.target.value})}
                placeholder="Ready to Transform Your Digital Presence?"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Button Text</label>
                <input
                  type="text"
                  value={newsletterData.ctaButton}
                  onChange={(e) => setNewsletterData({...newsletterData, ctaButton: e.target.value})}
                  placeholder="Book Free Consultation"
                />
              </div>

              <div className="form-group">
                <label>Button Link</label>
                <input
                  type="url"
                  value={newsletterData.ctaLink}
                  onChange={(e) => setNewsletterData({...newsletterData, ctaLink: e.target.value})}
                  placeholder="https://verapixels.com/contact"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Subscribers List */}
        <div className="subscribers-section">
          <h2>Subscribers ({subscribers.length})</h2>
          <div className="subscribers-list">
           // Find this section (around line 250-260)
{subscribers.slice(0, 10).map((sub, idx) => (
  <div key={idx} className="subscriber-item">
    <Mail size={16} />
    <span>{sub.email}</span>
    <span className="date">
      {new Date(sub.created_at).toLocaleDateString()} {/* ← Changed from sub.subscribedAt */}
    </span>
  </div>
))}
            {subscribers.length > 10 && (
              <p className="more-subscribers">+ {subscribers.length - 10} more subscribers</p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .newsletter-admin {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .admin-header {
          margin-bottom: 40px;
        }

        .header-content h1 {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 2.5rem;
          margin-bottom: 8px;
          color: #1e293b;
        }

        .header-content p {
          color: #64748b;
          font-size: 1.125rem;
          margin-bottom: 32px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .stat-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 24px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 16px;
          color: white;
        }

        .stat-card svg {
          flex-shrink: 0;
        }

        .stat-card h3 {
          font-size: 2rem;
          margin: 0;
        }

        .stat-card p {
          margin: 4px 0 0;
          opacity: 0.9;
        }

        .quick-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .btn-primary, .btn-secondary, .btn-add, .btn-remove {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
          background: #f1f5f9;
          color: #1e293b;
        }

        .btn-secondary:hover {
          background: #e2e8f0;
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .status-message {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .status-message.success {
          background: #d1fae5;
          border: 1px solid #10b981;
          color: #065f46;
        }

        .status-message.error {
          background: #fee2e2;
          border: 1px solid #ef4444;
          color: #991b1b;
        }

        .form-section {
          background: white;
          padding: 32px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          margin-bottom: 24px;
        }

        .form-section h2 {
          margin: 0 0 24px;
          color: #1e293b;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #1e293b;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          color: #1e293b;
          background: white;
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #94a3b8;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .sections-container {
          margin: 32px 0;
        }

        .sections-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .section-card {
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 16px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .btn-add {
          background: #10b981;
          color: white;
          padding: 10px 20px;
          font-size: 0.9rem;
        }

        .btn-remove {
          background: #ef4444;
          color: white;
          padding: 8px 16px;
          font-size: 0.875rem;
        }

        .cta-section {
          margin-top: 32px;
          padding-top: 32px;
          border-top: 2px solid #e2e8f0;
        }

        .subscribers-section {
          background: white;
          padding: 32px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .subscribers-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 20px;
        }

        .subscriber-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f8fafc;
          border-radius: 6px;
        }

        .subscriber-item .date {
          margin-left: auto;
          color: #64748b;
          font-size: 0.875rem;
        }

        .more-subscribers {
          text-align: center;
          color: #64748b;
          font-size: 0.875rem;
          margin-top: 12px;
        }

        @media (max-width: 768px) {
          .quick-actions {
            flex-direction: column;
          }

          .btn-primary, .btn-secondary {
            width: 100%;
            justify-content: center;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default NewsletterAdmin;