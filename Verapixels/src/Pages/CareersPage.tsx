import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import {
  FiHeart,
  FiTrendingUp,
  FiUsers,
  FiZap,
  FiAward,
  FiCoffee,
  FiGlobe,
  FiMonitor,
  FiDollarSign,
  FiCalendar,
  FiMapPin,
  FiClock,
  FiArrowRight,
  FiCheck,
  FiStar,
  FiTarget,
  FiCode,
  FiPenTool,
  FiBriefcase,
  FiTrendingDown,
  FiSmile,
  FiShield,
  FiBook,
  FiFileText,
  FiUpload,
  FiCloud,
  FiDownload
} from "react-icons/fi";
// --- NEW APPWRITE IMPORTS ---
import { Client, Storage, ID } from 'appwrite';

// --- Configuration Constants ---
const EMAILJS_SERVICE_ID = "service_4kcqp2g"; // Your EmailJS Service ID
const ADMIN_TEMPLATE_ID = "template_kqilh1e"; // Template for Admin Notification
const USER_REPLY_TEMPLATE_ID = "template_1nrwffw"; 
const ADMIN_EMAIL = "career.verapixels@gmail.com"; // Your Admin Email

// --- NEW APPWRITE CONFIGURATION ---
const APPWRITE_ENDPOINT = 'https://fra.cloud.appwrite.io/v1';      // e.g., 'https://cloud.appwrite.io/v1'
const APPWRITE_PROJECT_ID = '6933f4610012182c4b1d';          // Replace with your Appwrite Project ID
const APPWRITE_CV_BUCKET_ID = '6934dd9e0027942fc6bb';      // Replace with your Appwrite Storage Bucket ID

// Initialize Appwrite Client and Storage
const client = new Client();
client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

const storage = new Storage(client);

// --- APPWRITE HELPER FUNCTION (Replaces uploadToCloudinary) ---
const uploadToAppwrite = async (
    file: File, 
    setUploadProgress: React.Dispatch<React.SetStateAction<number>>
): Promise<string> => {
    
    // Start progress (20-70% range for upload)
    setUploadProgress(20);

    try {
        // STEP 1: Upload the file
        const fileResponse = await storage.createFile(
            APPWRITE_CV_BUCKET_ID,
            ID.unique(), // Generates a unique file ID
            file
        );
        
        // Progress update after successful upload
        setUploadProgress(70);

        // STEP 2: Get the download URL
        // Appwrite provides a direct function to get a file download URL
        const downloadUrl = storage.getFileDownload(
            APPWRITE_CV_BUCKET_ID,
            fileResponse.$id // The unique ID of the uploaded file
        );
        
        return downloadUrl;

    } catch (error) {
        console.error("Appwrite upload failed:", error);
        // Note: For a real app, ensure you handle network errors, permissions, etc.
        throw new Error("Failed to upload CV to Appwrite Storage.");
    }
};


const CareersPage = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    coverLetter: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  // Renamed for clarity, though its usage (as the URL string) is the same.
  const [cvAppwriteUrl, setCvAppwriteUrl] = useState("");

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("owheZXN0TgbxngZvd"); // Your EmailJS Public Key
  }, []);


  const benefits = [
    // ... (Benefits array remains the same)
    {
      icon: <FiDollarSign />,
      title: "Competitive Salary",
      description: "Industry-leading compensation packages with performance bonuses",
      color: "#0063f4",
    },
    {
      icon: <FiGlobe />,
      title: "Remote First",
      description: "Work from anywhere in the world with flexible hours",
      color: "#00bfff",
    },
    {
      icon: <FiCalendar />,
      title: "Unlimited PTO",
      description: "Take time off when you need it, no questions asked",
      color: "#00ff88",
    },
    {
      icon: <FiTrendingUp />,
      title: "Growth Opportunities",
      description: "Clear career paths with mentorship and skill development",
      color: "#ffd700",
    },
    {
      icon: <FiHeart />,
      title: "Health & Wellness",
      description: "Premium health insurance and wellness programs",
      color: "#ff6b9d",
    },
    {
      icon: <FiMonitor />,
      title: "Latest Tech",
      description: "MacBook Pro, monitors, and any tools you need",
      color: "#9d4edd",
    },
    {
      icon: <FiBook />,
      title: "Learning Budget",
      description: "$2,000 annual budget for courses, books, and conferences",
      color: "#00d1ff",
    },
    {
      icon: <FiUsers />,
      title: "Team Events",
      description: "Regular team retreats and fun activities",
      color: "#ff9f43",
    },
  ];

  const values = [
    // ... (Values array remains the same)
    {
      icon: <FiTarget />,
      title: "Mission-Driven",
      description: "We're building products that make a real difference in people's lives",
    },
    {
      icon: <FiSmile />,
      title: "Work-Life Balance",
      description: "We believe great work comes from well-rested, happy people",
    },
    {
      icon: <FiShield />,
      title: "Trust & Autonomy",
      description: "We trust you to do your best work without micromanagement",
    },
    {
      icon: <FiUsers />,
      title: "Diversity & Inclusion",
      description: "We celebrate different perspectives and backgrounds",
    },
  ];

  const stats = [
    // ... (Stats array remains the same)
    { icon: <FiUsers />, value: "50+", label: "Team Members" },
    { icon: <FiGlobe />, value: "15+", label: "Countries" },
    { icon: <FiTrendingUp />, value: "200%", label: "Growth YoY" },
    { icon: <FiStar />, value: "4.9/5", label: "Glassdoor Rating" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const allowedExtensions = ['.pdf', '.doc', '.docx'];
      const fileName = file.name.toLowerCase();
      const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
      
      if (!allowedTypes.includes(file.type) && !hasValidExtension) {
        alert('Please upload only PDF, DOC, or DOCX files.');
        e.target.value = '';
        return;
      }
      
      // Max 10MB file size, same check applies for Appwrite
      const maxSize = 10 * 1024 * 1024; 
      if (file.size > maxSize) {
        alert('File size must be less than 10MB. Please compress your PDF or use a smaller file.');
        e.target.value = '';
        return;
      }
      
      setCvFile(file);
    }
  };

  // **MAIN SUBMIT FUNCTION WITH APPWRITE AND DUAL EMAILJS CALLS**
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadProgress(10);
    setCvAppwriteUrl(""); // Use the new state variable name
    
    try {
      if (!formData.name || !formData.email || !formData.position || !cvFile) {
        throw new Error('Please fill all required fields and upload your CV');
      }
      
      setUploadProgress(20);
      
      // STEP 1: Upload CV to Appwrite (REPLACED CLOUDINARY)
      let appwriteUrl = "";
      try {
        // Calls the new Appwrite upload function
        appwriteUrl = await uploadToAppwrite(cvFile, setUploadProgress);
        setCvAppwriteUrl(appwriteUrl);
        setUploadProgress(70);
      } catch (uploadError) {
        console.error('Appwrite upload failed:', uploadError);
        throw new Error('Failed to upload CV. Please try again or use manual email.');
      }
      
      // STEP 2: Prepare Email Template Parameters (Used for both emails)
      const templateParams = {
        to_email: ADMIN_EMAIL,    // Used by the Admin template
        user_email: formData.email, // Used by the User Reply template
        from_name: formData.name,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "Not provided",
        position: formData.position,
        cover_letter: formData.coverLetter || "No cover letter provided",
        cv_filename: cvFile.name,
        cv_size: `${(cvFile.size / 1024).toFixed(2)} KB`,
        cv_url: appwriteUrl, // THIS IS THE DOWNLOAD LINK
        cv_download_url: appwriteUrl, 
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      };
      setUploadProgress(80);
      
      // STEP 3: Send ADMIN Notification Email
      const adminResponse = await emailjs.send(
        EMAILJS_SERVICE_ID,
        ADMIN_TEMPLATE_ID, 
        templateParams
      );
      
      if (adminResponse.status !== 200) {
        throw new Error('Failed to send Admin email notification');
      }
      
      // STEP 4: Send USER Auto-Reply Confirmation Email
      const userReplyParams = {
        ...templateParams,
        to_email: formData.email, // This overrides the admin email for the reply recipient
      };
      
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        USER_REPLY_TEMPLATE_ID, 
        userReplyParams
      );
      
      setUploadProgress(90);
      
      // Final success state
      setShowSuccessAlert(true);
      setShowApplicationForm(false);
      setFormData({ name: "", email: "", phone: "", position: "", coverLetter: "" });
      setCvFile(null);
      setUploadProgress(100);
      
      setTimeout(() => {
        setShowSuccessAlert(false);
        setUploadProgress(0);
        setCvAppwriteUrl("");
      }, 5000);
    
    } catch (error) {
      console.error('Error submitting application:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to process application'}\n\nPlease try the manual email option below.`);
    } finally {
      setIsSubmitting(false);
      if (!showSuccessAlert) {
        setUploadProgress(0);
      }
    }
  };

  // Manual email fallback
  const handleEmailFallback = () => {
    const subject = `Career Application: ${formData.position} - ${formData.name}`;
    let body = `
APPLICATION DETAILS:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}
Position: ${formData.position}

COVER LETTER:
${formData.coverLetter || "No cover letter provided"}

CV DETAILS:
File: ${cvFile?.name || "No file"}
Size: ${cvFile ? `${(cvFile.size / 1024).toFixed(2)} KB` : "N/A"}
    `;
    
    // Add Appwrite URL if available
    if (cvAppwriteUrl) {
      body += `\n\n📎 DOWNLOAD CV: ${cvAppwriteUrl}`;
    }
    
    body += `\n\nSubmitted via VeraPixels Careers Page`;
    
    const mailtoLink = `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.trim())}`;
    window.open(mailtoLink, '_blank');
  };

  // Progress text helper
  const getProgressText = () => {
    if (uploadProgress < 30) return "Preparing upload...";
    // Changed Cloudinary references to Appwrite
    if (uploadProgress < 70) return `Uploading CV to Appwrite Storage... ${uploadProgress}%`; 
    if (uploadProgress < 90) return "Sending email notifications (Admin & User Reply)...";
    return "Complete!";
  };

  return (
    <div className="careers-page">
      {/* Animated Background */}
      <div className="careers-bg">
        <div className="bg-grid"></div>
        <div className="bg-gradient gradient-1"></div>
        <div className="bg-gradient gradient-2"></div>
        <div className="bg-gradient gradient-3"></div>
      </div>

      {/* Hero Section */}
      <section className="careers-hero">
        <div className="careers-container">
          <div className="hero-badge">
            <FiHeart /> Join Our Team
          </div>
          <h1 className="hero-title">
            Build the <span className="gradient-text">Future</span> With Us
          </h1>
          <p className="hero-subtitle">
            We're looking for passionate, talented people who want to make a real impact. 
            Join a team that values innovation, creativity, and work-life balance.
          </p>

          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="stat-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="careers-container">
          <div className="section-header">
            <h2 className="section-title">
              Why <span className="gradient-text">Work With Us?</span>
            </h2>
            <p className="section-subtitle">
              We're committed to creating an environment where you can do your best work
            </p>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="benefit-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="benefit-icon" style={{ color: benefit.color }}>
                  {benefit.icon}
                </div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
                <div className="benefit-glow" style={{ background: benefit.color }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="careers-container">
          <div className="section-header">
            <h2 className="section-title">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </div>

          <div className="values-grid">
            {values.map((value, i) => (
              <div
                key={i}
                className="value-card"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* No Openings Section */}
      <section className="no-openings-section">
        <div className="careers-container">
          <div className="no-openings-wrapper">
            <div className="no-openings-icon">
              <FiCoffee />
            </div>
            <h2 className="no-openings-title">No Open Positions Right Now</h2>
            <p className="no-openings-text">
              We're not actively hiring at the moment, but we're always looking for exceptional talent! 
              Submit your CV below and we'll contact you when suitable opportunities arise.
            </p>
          </div>
            </div>
      </section>

      {/* Submit CV Section */}
      <section className="submit-cv-section">
        <div className="careers-container">
          <div className="submit-cv-wrapper">
            <div className="submit-cv-content">
              <div className="submit-cv-badge">
                <FiZap /> Submit Your CV
              </div>
              <h2 className="submit-cv-title">Join Our Talent Pool</h2>
              <p className="submit-cv-text">
                Submit your CV and tell us about yourself. When the right opportunity opens up, 
                you'll be the first to know. We're always interested in connecting with talented people.
              </p>
              <button 
                className="upload-cv-btn"
                onClick={() => setShowApplicationForm(true)}
              >
                <span>Submit Your CV</span>
                <FiArrowRight className="arrow-icon" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="modal-overlay" onClick={() => !isSubmitting && setShowApplicationForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => !isSubmitting && setShowApplicationForm(false)}
              disabled={isSubmitting}
            >
              ×
            </button>
            
            <div className="modal-header">
              <h3 className="modal-title">Submit Your Application</h3>
              <p className="modal-subtitle">We're excited to learn more about you!</p>
            </div>

            <form onSubmit={handleSubmit} className="application-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="position">Position You're Interested In *</label>
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select a position</option>
                  <option value="Full-Stack Developer">Full-Stack Developer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Product Designer">Product Designer</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="Marketing Manager">Marketing Manager</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="cv">
                  Upload Your CV/Resume *                   <span className="file-requirements"> (PDF, DOC, DOCX - Max 10MB)</span>
                </label>
                <div className="file-upload-wrapper">
                  <input
                    type="file"
                    id="cv"
                    name="cv"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                    disabled={isSubmitting}
                  />
                  <label htmlFor="cv" className="file-upload-label">
                    <FiUpload />
                    {cvFile ? (
                      <>
                        <FiFileText style={{ marginRight: '8px' }} />
                        <span className="file-name">{cvFile.name}</span>
                        <span className="file-size">({(cvFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                        <span className="cloud-storage-badge">
                          <FiCloud /> Appwrite Storage
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="upload-text">Choose File (PDF, DOC, DOCX)</span>
                        <span className="cloud-storage-badge">
                          <FiCloud /> Secure Appwrite Storage
                        </span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="coverLetter">Cover Letter (Optional)</label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Tell us why you'd be a great fit for our team..."
                  disabled={isSubmitting}
                />
              </div>

              {isSubmitting && uploadProgress > 0 && (
                <div className="upload-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">
                    {getProgressText()}
                  </div>
                  {uploadProgress > 70 && cvAppwriteUrl && (
                    <div className="cv-upload-success">
                      <FiCloud style={{ color: '#00ff88', marginRight: '8px' }} />
                      <span>CV uploaded to Appwrite ✓ Emails with download link are sending</span>
                    </div>
                  )}
                </div>
              )}

              <div className="form-notice">
                <FiCloud style={{ color: '#00bfff', marginRight: '8px' }} />
<span>Your CV will be processed securely, and you’ll receive a confirmation email once submitted.</span>

              </div>

              <div className="form-buttons">
                <button 
                  type="submit" 
                  className="submit-form-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="form-spinner"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <FiCheck />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
                
                <button 
                  type="button"
                  className="email-fallback-btn"
                  onClick={handleEmailFallback}
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.position}
                >
                  <FiArrowRight />
                  <span>Manual Email (Backup)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="success-alert">
          <div className="success-alert-content">
            <div className="success-icon">
              <FiCheck />
            </div>
            <div className="success-text">
              <h4>Application Submitted Successfully! ✅</h4>
              <p>CV uploaded to Appwrite Storage ✓<br />Admin email sent with download link 📧<br/>User confirmation email sent ✓</p>
              {cvAppwriteUrl && (
                <a 
                  href={cvAppwriteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="download-cv-link"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '8px',
                    color: '#00bfff',
                    textDecoration: 'none',
                    fontSize: '0.9rem'
                  }}
                >
                  <FiDownload /> Download CV Now
                </a>
              )}
            </div>
            <button 
              className="success-close"
              onClick={() => setShowSuccessAlert(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}


      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .careers-page {
          background: #000;
          color: #fff;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* Animated Background */
        .careers-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .bg-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0, 99, 244, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 99, 244, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .bg-gradient {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.15;
          animation: floatGradient 15s ease-in-out infinite;
        }

        .gradient-1 {
          width: 600px;
          height: 600px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          top: -10%;
          left: -10%;
        }

        .gradient-2 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #00ff88, #0063f4);
          top: 50%;
          right: -10%;
          animation-delay: 5s;
        }

        .gradient-3 {
          width: 550px;
          height: 550px;
          background: linear-gradient(135deg, #ffd700, #ff6b9d);
          bottom: -10%;
          left: 40%;
          animation-delay: 10s;
        }

        @keyframes floatGradient {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -50px) scale(1.1); }
          66% { transform: translate(-40px, 40px) scale(0.9); }
        }

        .careers-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        /* Hero Section */
        .careers-hero {       
          min-height: 90vh;
          display: flex;
          align-items: center;
          padding: 140px 0 80px;
          text-align: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: rgba(255, 107, 157, 0.15);
          border: 1px solid rgba(255, 107, 157, 0.4);
          border-radius: 30px;
          color: #ff6b9d;
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 30px;
          animation: fadeInDown 1s ease;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-title {
          font-size: clamp(48px, 8vw, 88px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 30px;
          animation: fadeInUp 1s ease 0.2s both;
        }

        .gradient-text {
          background: linear-gradient(135deg, #0063f4 0%, #00bfff 50%, #00ff88 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.35rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          max-width: 800px;
          margin: 0 auto 60px;
          animation: fadeInUp 1s ease 0.4s both;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Stats Grid */
        .stats-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          justify-content: center;
          margin-top: 60px;
        }

        .stat-card {
          padding: 35px 25px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          text-align: center;
          transition: all 0.4s ease;
          animation: fadeInUp 0.8s ease both;
          width: 240px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .stat-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.05);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.3);
        }

        .stat-icon {
          font-size: 42px;
          color: #00bfff;
          margin-bottom: 20px;
        }

        .stat-value {
          font-size: 2.8rem;
          font-weight: 900;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }

        .stat-label {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
        }

        /* Section Styles */
        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 700px;
          margin: 0 auto;
        }

        /* Benefits Section */
        .benefits-section {
          padding: 120px 0;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .benefit-card {
          position: relative;
          padding: 40px 30px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          transition: all 0.4s ease;
          animation: fadeInUp 0.8s ease both;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .benefit-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.05);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.3);
        }

        .benefit-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .benefit-title {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .benefit-description {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
        }

        .benefit-glow {
          position: absolute;
          bottom: -50%;
          right: -50%;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          opacity: 0;
          filter: blur(80px);
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .benefit-card:hover .benefit-glow {
          opacity: 0.2;
        }

        /* Values Section */
        .values-section {
          padding: 120px 0;
          background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.03), transparent);
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
        }

        .value-card {
          padding: 45px 35px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          transition: all 0.4s ease;
          animation: fadeInUp 0.8s ease both;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .value-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 255, 136, 0.5);
          background: rgba(0, 255, 136, 0.05);
          box-shadow: 0 20px 60px rgba(0, 255, 136, 0.3);
        }

        .value-icon {
          font-size: 48px;
          color: #00ff88;
          margin-bottom: 24px;
        }

        .value-title {
          font-size: 1.6rem;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .value-description {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.75);
        }

        /* No Openings Section */
        .no-openings-section {
          padding: 120px 0 60px;
        }

        .no-openings-wrapper {
          text-align: center;
          padding: 80px 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .no-openings-icon {
          font-size: 80px;
          color: #00bfff;
          margin-bottom: 30px;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .no-openings-title {
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 20px;
        }

        .no-openings-text {
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.75);
          max-width: 700px;
          margin: 0 auto 40px;
        }

        /* Submit CV Section */
        .submit-cv-section {
          padding: 60px 0 120px;
        }

        .submit-cv-wrapper {
          padding: 80px 60px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          text-align: center;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .submit-cv-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 255, 136, 0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        .submit-cv-content {
          position: relative;
          z-index: 1;
        }

        .submit-cv-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          background: rgba(0, 255, 136, 0.15);
          border: 1px solid rgba(0, 255, 136, 0.4);
          border-radius: 25px;
          color: #00ff88;
          font-weight: 700;
          font-size: 0.95rem;
          margin-bottom: 25px;
        }

        .submit-cv-title {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .submit-cv-text {
          font-size: 1.15rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.75);
          max-width: 700px;
          margin: 0 auto 40px;
        }

        .upload-cv-btn {
          padding: 20px 50px;
          background: linear-gradient(135deg, #00ff88, #00bfff);
          border: none;
          border-radius: 40px;
          color: #000;
          font-weight: 700;
          font-size: 1.2rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 15px 40px rgba(0, 255, 136, 0.4);
        }

        .upload-cv-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 60px rgba(0, 255, 136, 0.6);
        }

        .upload-cv-btn .arrow-icon {
          transition: transform 0.3s ease;
        }

        .upload-cv-btn:hover .arrow-icon {
          transform: translateX(5px);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: #0a0a0a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          padding: 50px;
          max-width: 700px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(50px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          color: #fff;
          font-size: 28px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          line-height: 1;
        }

        .modal-close:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .modal-close:not(:disabled):hover {
          background: rgba(255, 0, 0, 0.2);
          border-color: rgba(255, 0, 0, 0.5);
          transform: rotate(90deg);
        }

        .modal-header {
          margin-bottom: 40px;
          text-align: center;
        }

        .modal-title {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .modal-subtitle {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Form Styles */
        .application-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .form-group label {
          font-size: 1rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
        }

        .file-requirements {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: normal;
          margin-left: 8px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #fff;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .form-group input:disabled,
        .form-group select:disabled,
        .form-group textarea:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #00bfff;
          background: rgba(0, 191, 255, 0.05);
          box-shadow: 0 0 0 3px rgba(0, 191, 255, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-group select {
          cursor: pointer;
          background-color: #0a0a0a;
        }

        /* File Upload Styles */
        .file-upload-wrapper {
          position: relative;
        }

        .file-upload-wrapper input[type="file"] {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }

        .file-upload-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 2px dashed rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          min-height: 60px;
          text-align: center;
          flex-wrap: wrap;
        }

        .file-upload-label:hover:not(:has(+ input:disabled)) {
          border-color: #00bfff;
          background: rgba(0, 191, 255, 0.05);
          color: #00bfff;
        }

        .upload-text {
          flex: 1;
        }

        .file-name {
          flex: 1;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .file-size {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
          margin-left: 8px;
        }

        .cloud-storage-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          background: rgba(0, 191, 255, 0.1);
          border: 1px solid rgba(0, 191, 255, 0.3);
          border-radius: 8px;
          font-size: 0.75rem;
          color: #00bfff;
          margin-left: 8px;
        }

        /* Progress Bar */
        .upload-progress {
          margin-top: 10px;
        }

        .progress-bar {
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #00ff88, #00bfff);
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
          margin-top: 8px;
        }

        .cv-upload-success {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 8px;
          padding: 8px 12px;
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid rgba(0, 255, 136, 0.3);
          border-radius: 6px;
          font-size: 0.85rem;
          color: #00ff88;
        }

        .form-notice {
          display: flex;
          align-items: center;
          padding: 15px 20px;
          background: rgba(0, 191, 255, 0.05);
          border: 1px solid rgba(0, 191, 255, 0.2);
          border-radius: 12px;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 10px;
        }

        .form-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: 10px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .form-buttons {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }

        .submit-form-btn {
          flex: 2;
          padding: 18px 40px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border: none;
          border-radius: 30px;
          color: #fff;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.3);
        }

        .submit-form-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none !important;
        }

        .submit-form-btn:not(:disabled):hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 99, 244, 0.5);
          background: linear-gradient(135deg, #0077ff, #00d4ff);
        }

        .email-fallback-btn {
          flex: 1;
          padding: 18px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .email-fallback-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .email-fallback-btn:not(:disabled):hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-3px);
        }

        /* Success Alert */
        .success-alert {
          position: fixed;
          top: 30px;
          right: 30px;
          z-index: 2000;
          animation: slideInRight 0.5s ease;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(400px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .success-alert-content {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 25px 30px;
          background: linear-gradient(135deg, rgba(0, 255, 136, 0.15), rgba(0, 191, 255, 0.15));
          border: 1px solid rgba(0, 255, 136, 0.4);
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 255, 136, 0.4);
          backdrop-filter: blur(10px);
          min-width: 400px;
          position: relative;
        }

        .success-icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #00ff88, #00bfff);
          border-radius: 50%;
          flex-shrink: 0;
          animation: scaleIn 0.5s ease 0.3s both;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .success-icon svg {
          font-size: 28px;
          color: #000;
          font-weight: bold;
        }

        .success-text {
          flex: 1;
          text-align: left;
        }

        .success-text h4 {
          font-size: 1.1rem;
          font-weight: 800;
          color: #00ff88;
          margin-bottom: 5px;
        }

        .success-text p {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        .download-cv-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 8px;
          color: #00bfff !important;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .download-cv-link:hover {
          text-decoration: underline;
        }

        .success-close {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50%;
          color: #fff;
          font-size: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
          line-height: 1;
        }

        .success-close:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(90deg);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .benefits-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }

          .values-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .careers-container {
            padding: 0 20px;
          }

          .hero-title {
            font-size: 42px;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .stats-grid {
            gap: 20px;
          }

          .stat-card {
            width: calc(50% - 10px);
          }

          .section-title {
            font-size: 36px;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .values-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .no-openings-wrapper {
            padding: 60px 30px;
          }

          .no-openings-icon {
            font-size: 60px;
          }

          .no-openings-title {
            font-size: 2.2rem;
          }

          .no-openings-text {
            font-size: 1.05rem;
          }

          .submit-cv-wrapper {
            padding: 60px 40px;
          }

          .submit-cv-title {
            font-size: 2.5rem;
          }

          .submit-cv-text {
            font-size: 1.05rem;
          }

          .upload-cv-btn {
            padding: 18px 40px;
            font-size: 1.1rem;
          }

          .modal-content {
            padding: 40px 30px;
          }

          .modal-title {
            font-size: 2rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .form-buttons {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            flex-direction: column;
          }

          .stat-card {
            width: 100%;
          }

          .hero-badge {
            font-size: 0.9rem;
            padding: 10px 18px;
          }

          .no-openings-title {
            font-size: 1.8rem;
          }

          .submit-cv-title {
            font-size: 2rem;
          }

          .modal-content {
            padding: 30px 20px;
          }

          .modal-title {
            font-size: 1.6rem;
          }

          .modal-close {
            width: 35px;
            height: 35px;
            font-size: 24px;
          }

          .success-alert-content {
            min-width: 320px;
            padding: 20px 25px;
          }

          .success-icon {
            width: 45px;
            height: 45px;
          }

          .success-icon svg {
            font-size: 24px;
          }

          .success-text h4 {
            font-size: 1rem;
          }

          .success-text p {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CareersPage;