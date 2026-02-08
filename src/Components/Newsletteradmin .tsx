import React, { useState, useEffect } from 'react';
import { Mail, Send, Users, TrendingUp, Calendar, CheckCircle, XCircle, Eye, Sparkles } from 'lucide-react';

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

  useEffect(() => {
    fetchSubscribers();
    fetchStats();
  }, []);

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
          testEmail: 'info@verapixels.com'
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
        fetchStats();
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
          <div className="header-badge">
            <Sparkles size={16} />
            <span>Professional Newsletter Builder</span>
          </div>
          <h1><Mail size={36} /> Verapixels Newsletter</h1>
          <p>Create stunning, professional newsletters that engage your audience</p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card stat-purple">
            <div className="stat-icon">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <h3>{subscribers.length}</h3>
              <p>Active Subscribers</p>
            </div>
          </div>
          
          <div className="stat-card stat-blue">
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats?.recentSends?.length || 0}</h3>
              <p>Campaigns Sent</p>
            </div>
          </div>
          
          <div className="stat-card stat-green">
            <div className="stat-icon">
              <Calendar size={24} />
            </div>
            <div className="stat-content">
              <h3>{newsletterData.edition}</h3>
              <p>Current Edition</p>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="quick-actions">
          <button onClick={loadExample} className="btn-action btn-outline">
            <Eye size={20} />
            <span>Load Example</span>
          </button>
          
          <button onClick={sendTestNewsletter} disabled={isLoading} className="btn-action btn-outline">
            <Send size={20} />
            <span>Send Test</span>
          </button>
          
          <button onClick={sendNewsletter} disabled={isLoading} className="btn-action btn-primary">
            <Mail size={20} />
            <span>Send to {subscribers.length} Subscribers</span>
          </button>
        </div>

        {sendStatus && (
          <div className={`status-alert ${sendStatus.type}`}>
            <div className="status-icon">
              {sendStatus.type === 'success' ? <CheckCircle size={24} /> : <XCircle size={24} />}
            </div>
            <div className="status-content">
              <strong>{sendStatus.message}</strong>
              {sendStatus.results && (
                <p>
                  ✓ {sendStatus.results.successful} sent | 
                  ✗ {sendStatus.results.failed} failed | 
                  {sendStatus.results.successRate} success rate
                </p>
              )}
            </div>
          </div>
        )}

        <div className="form-card">
          <div className="form-header">
            <h2>Newsletter Content</h2>
            <p>Craft your message with precision and style</p>
          </div>
          
          <div className="form-section">
            <h3>📰 Basic Information</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Edition Number</label>
                <input
                  type="text"
                  value={newsletterData.edition}
                  onChange={(e) => setNewsletterData({...newsletterData, edition: e.target.value})}
                  placeholder="Week 6, 2025"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Publication Date</label>
                <input
                  type="text"
                  value={newsletterData.date}
                  onChange={(e) => setNewsletterData({...newsletterData, date: e.target.value})}
                  placeholder="February 9, 2025"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>🎯 Hero Section</h3>
            
            <div className="form-group">
              <label>Hero Title <span className="required">*</span></label>
              <input
                type="text"
                value={newsletterData.heroTitle}
                onChange={(e) => setNewsletterData({...newsletterData, heroTitle: e.target.value})}
                placeholder="The Future of Web Development is Here"
                className="form-input input-large"
              />
            </div>

            <div className="form-group">
              <label>Hero Subtitle</label>
              <textarea
                value={newsletterData.heroSubtitle}
                onChange={(e) => setNewsletterData({...newsletterData, heroSubtitle: e.target.value})}
                placeholder="Discover the latest trends and innovations shaping the digital landscape..."
                className="form-textarea"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Hero Image URL</label>
              <input
                type="url"
                value={newsletterData.heroImage}
                onChange={(e) => setNewsletterData({...newsletterData, heroImage: e.target.value})}
                placeholder="https://images.unsplash.com/photo-..."
                className="form-input"
              />
              <span className="form-hint">Optional: Add a striking header image</span>
            </div>
          </div>

          <div className="form-section">
            <div className="section-header-row">
              <div>
                <h3>📝 Content Sections</h3>
                <p className="section-subtitle">Build your newsletter with engaging content blocks</p>
              </div>
              <button onClick={addSection} className="btn-add-section">
                + Add Section
              </button>
            </div>

            {newsletterData.sections.map((section, index) => (
              <div key={index} className="content-section-card">
                <div className="section-card-header">
                  <div className="section-number">Section {index + 1}</div>
                  {newsletterData.sections.length > 1 && (
                    <button onClick={() => removeSection(index)} className="btn-remove-section">
                      Remove
                    </button>
                  )}
                </div>

                <div className="form-group">
                  <label>Section Title</label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSection(index, 'title', e.target.value)}
                    placeholder="🚀 This Week's Highlights"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
  <label>Content</label>
  <textarea
    value={section.content}
    onChange={(e) => updateSection(index, 'content', e.target.value)}
    //                                                              ^ Add this closing parenthesis
    placeholder="Write your engaging content here. HTML is supported for formatting: <p>, <strong>, <ul>, etc."
    className="form-textarea"
    rows={8}
  />
  <span className="form-hint">HTML supported: &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;, &lt;li&gt;</span>
</div>
                <div className="form-grid-3">
                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      type="url"
                      value={section.image}
                      onChange={(e) => updateSection(index, 'image', e.target.value)}
                      placeholder="https://..."
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Button Link</label>
                    <input
                      type="url"
                      value={section.link}
                      onChange={(e) => updateSection(index, 'link', e.target.value)}
                      placeholder="https://verapixels.com/article"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Button Text</label>
                    <input
                      type="text"
                      value={section.linkText}
                      onChange={(e) => updateSection(index, 'linkText', e.target.value)}
                      placeholder="Read More"
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="form-section">
            <h3>🎯 Call-to-Action</h3>
            <p className="section-subtitle">Optional: Add a compelling CTA to drive engagement</p>
            
            <div className="form-group">
              <label>CTA Title</label>
              <input
                type="text"
                value={newsletterData.ctaTitle}
                onChange={(e) => setNewsletterData({...newsletterData, ctaTitle: e.target.value})}
                placeholder="Ready to Transform Your Digital Presence?"
                className="form-input"
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Button Text</label>
                <input
                  type="text"
                  value={newsletterData.ctaButton}
                  onChange={(e) => setNewsletterData({...newsletterData, ctaButton: e.target.value})}
                  placeholder="Book Free Consultation"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Button Link</label>
                <input
                  type="url"
                  value={newsletterData.ctaLink}
                  onChange={(e) => setNewsletterData({...newsletterData, ctaLink: e.target.value})}
                  placeholder="https://verapixels.com/contact"
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="subscribers-card">
          <div className="card-header">
            <h2>👥 Subscriber List</h2>
            <div className="subscriber-count">{subscribers.length} subscribers</div>
          </div>
          
          <div className="subscribers-list">
            {subscribers.slice(0, 10).map((sub, idx) => (
              <div key={idx} className="subscriber-item">
                <div className="subscriber-avatar">
                  {sub.email.charAt(0).toUpperCase()}
                </div>
                <div className="subscriber-info">
                  <span className="subscriber-email">{sub.email}</span>
                  <span className="subscriber-date">
                    Joined {new Date(sub.created_at).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            ))}
            {subscribers.length > 10 && (
              <div className="more-subscribers">
                <p>+ {subscribers.length - 10} more subscribers</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .newsletter-admin {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
          padding: 40px 20px;
        }

        .admin-header {
          max-width: 1200px;
          margin: 0 auto 40px;
        }

        .header-content {
          text-align: center;
          margin-bottom: 40px;
        }

        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .header-content h1 {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          font-size: 3rem;
          margin-bottom: 12px;
          color: #0f172a;
          letter-spacing: -1px;
        }

        .header-content p {
          color: #64748b;
          font-size: 1.125rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-top: 40px;
        }

        .stat-card {
          background: white;
          padding: 28px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }

        .stat-icon {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-purple .stat-icon {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .stat-blue .stat-icon {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: white;
        }

        .stat-green .stat-icon {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
        }

        .stat-content h3 {
          font-size: 2.25rem;
          margin-bottom: 4px;
          color: #0f172a;
          font-weight: 800;
        }

        .stat-content p {
          color: #64748b;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .admin-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .quick-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .btn-action {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .btn-primary {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        }

        .btn-outline {
          background: white;
          color: #0f172a;
          border: 2px solid #e2e8f0;
        }

        .btn-outline:hover {
          border-color: #2563eb;
          color: #2563eb;
          transform: translateY(-2px);
        }

        .btn-action:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .status-alert {
          display: flex;
          gap: 16px;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 32px;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .status-alert.success {
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          border: 2px solid #10b981;
        }

        .status-alert.error {
          background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
          border: 2px solid #ef4444;
        }

        .status-icon {
          flex-shrink: 0;
        }

        .status-alert.success .status-icon {
          color: #059669;
        }

        .status-alert.error .status-icon {
          color: #dc2626;
        }

        .status-content strong {
          display: block;
          margin-bottom: 4px;
          font-size: 1.05rem;
        }

        .status-alert.success .status-content {
          color: #065f46;
        }

        .status-alert.error .status-content {
          color: #991b1b;
        }

        .form-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          margin-bottom: 32px;
        }

        .form-header {
          margin-bottom: 40px;
          padding-bottom: 24px;
          border-bottom: 2px solid #f1f5f9;
        }

        .form-header h2 {
          font-size: 2rem;
          margin-bottom: 8px;
          color: #0f172a;
        }

        .form-header p {
          color: #64748b;
          font-size: 1rem;
        }

        .form-section {
          margin-bottom: 48px;
          padding-bottom: 48px;
          border-bottom: 1px solid #f1f5f9;
        }

        .form-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .form-section h3 {
          font-size: 1.5rem;
          margin-bottom: 8px;
          color: #0f172a;
        }

        .section-subtitle {
          color: #64748b;
          font-size: 0.9rem;
          margin-bottom: 24px;
        }

        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: block;
          margin-bottom: 10px;
          font-weight: 600;
          color: #0f172a;
          font-size: 0.95rem;
        }

        .required {
          color: #ef4444;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
          color: #0f172a;
          background: white;
          font-family: inherit;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }

        .input-large {
          font-size: 1.125rem;
          font-weight: 600;
        }

        .form-textarea {
          resize: vertical;
          line-height: 1.6;
        }

        .form-hint {
          display: block;
          margin-top: 8px;
          font-size: 0.875rem;
          color: #94a3b8;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .form-grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .content-section-card {
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          padding: 28px;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .content-section-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .section-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .section-number {
          font-weight: 700;
          color: #2563eb;
          font-size: 1.125rem;
        }

        .btn-add-section {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .btn-add-section:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
        }

        .btn-remove-section {
          background: #fee2e2;
          color: #dc2626;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-remove-section:hover {
          background: #fecaca;
        }

        .subscribers-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f1f5f9;
        }

        .card-header h2 {
          font-size: 1.75rem;
          color: #0f172a;
        }

        .subscriber-count {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          color: #1e40af;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .subscribers-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .subscriber-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: #f8fafc;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .subscriber-item:hover {
          background: #f1f5f9;
          transform: translateX(4px);
        }

        .subscriber-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.125rem;
          flex-shrink: 0;
        }

        .subscriber-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .subscriber-email {
          font-weight: 600;
          color: #0f172a;
          font-size: 0.95rem;
        }

        .subscriber-date {
          color: #64748b;
          font-size: 0.875rem;
        }

        .more-subscribers {
          text-align: center;
          padding: 20px;
          color: #64748b;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .newsletter-admin {
            padding: 20px 12px;
          }

          .header-content h1 {
            font-size: 2rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .quick-actions {
            flex-direction: column;
          }

          .btn-action {
            width: 100%;
            justify-content: center;
          }

          .form-card,
          .subscribers-card {
            padding: 24px;
          }

          .form-grid,
          .form-grid-3 {
            grid-template-columns: 1fr;
          }

          .section-header-row {
            flex-direction: column;
            gap: 16px;
          }

          .btn-add-section {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default NewsletterAdmin;