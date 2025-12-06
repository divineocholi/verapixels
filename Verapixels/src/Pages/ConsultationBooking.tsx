import React, { useState, useEffect } from 'react';
import {
  FiPhone,
  FiVideo,
  FiMail,
  FiCalendar,
  FiClock,
  FiUser,
  FiMessageCircle,
  FiCheckCircle,
  FiArrowRight,
  FiSend,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { SiGooglemeet, SiZoom, SiWhatsapp } from 'react-icons/si';

// Type definitions
interface DayType {
  day: string | number;
  date?: string;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  disabled?: boolean;
}

// Custom Time Selector Component
const CustomTimeSelector = ({ selectedTime, onTimeSelect, timeSlots }: { selectedTime: string; onTimeSelect: (time: string) => void; timeSlots: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as HTMLElement).closest('.custom-time-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleTimeClick = (time: string) => {
    onTimeSelect(time);
    setIsOpen(false);
  };

  return (
    <div className="custom-time-container">
      <div className="time-input" onClick={(e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}>
        <FiClock className="time-icon" />
        <span className="selected-time">
          {selectedTime || 'Select a time'}
        </span>
        <FiChevronRight className={`dropdown-arrow ${isOpen ? 'open' : ''}`} />
      </div>

      {isOpen && (
        <div className="time-dropdown" onClick={(e) => e.stopPropagation()}>
          <div className="time-slots-grid">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                className={`time-slot ${selectedTime === slot ? 'selected' : ''}`}
                onClick={() => handleTimeClick(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Custom Calendar Component
const CustomCalendar = ({ selectedDate, onDateSelect, minDate }: { selectedDate: string; onDateSelect: (date: string) => void; minDate: string }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as HTMLElement).closest('.custom-calendar-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    return { daysInMonth, startingDay, year, month };
  };

  // Previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Get month name
  const getMonthName = () => {
    return currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  // Get week days
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate calendar days
  const generateCalendarDays = (): DayType[] => {
    const { daysInMonth, startingDay, year, month } = getDaysInMonth(currentMonth);
    const days: DayType[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minDateObj = minDate ? new Date(minDate) : null;
    if (minDateObj) minDateObj.setHours(0, 0, 0, 0);

    // Empty cells for days before the first day of month
    for (let i = 0; i < startingDay; i++) {
      days.push({ day: '', disabled: true, isToday: false, isSelected: false, isDisabled: false });
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);
      const isToday = date.getTime() === today.getTime();
      const selectedDateObj = selectedDate ? new Date(selectedDate) : null;
      if (selectedDateObj) selectedDateObj.setHours(0, 0, 0, 0);
      const isSelected = selectedDateObj ? date.getTime() === selectedDateObj.getTime() : false;
      const isPast = minDateObj ? date < minDateObj : date < today;
      const isDisabled = isPast;

      days.push({
        day,
        date: date.toISOString().split('T')[0],
        isToday,
        isSelected,
        isDisabled
      });
    }

    return days;
  };

  const handleDayClick = (day: DayType) => {
    if (!day.isDisabled && day.date) {
      onDateSelect(day.date);
      setIsOpen(false);
    }
  };

  const formatSelectedDate = (dateString: string) => {
    if (!dateString) return 'Select Date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="custom-calendar-container">
      <div className="calendar-input" onClick={(e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}>
        <FiCalendar className="calendar-icon" />
        <span className="selected-date">
          {formatSelectedDate(selectedDate)}
        </span>
        <FiChevronRight className={`dropdown-arrow ${isOpen ? 'open' : ''}`} />
      </div>

      {isOpen && (
        <div className="calendar-dropdown" onClick={(e) => e.stopPropagation()}>
          <div className="calendar-header">
            <button className="nav-button" onClick={prevMonth} type="button">
              <FiChevronLeft />
            </button>
            <h3 className="current-month">{getMonthName()}</h3>
            <button className="nav-button" onClick={nextMonth} type="button">
              <FiChevronRight />
            </button>
          </div>

          <div className="week-days">
            {weekDays.map((day) => (
              <div key={day} className="week-day">{day}</div>
            ))}
          </div>

          <div className="calendar-days">
            {generateCalendarDays().map((day, index) => (
              <button
                key={index}
                type="button"
                className={`calendar-day ${day.isToday ? 'today' : ''} ${day.isSelected ? 'selected' : ''} ${day.isDisabled ? 'disabled' : ''}`}
                onClick={() => handleDayClick(day)}
                disabled={day.isDisabled || day.disabled}
              >
                {day.day || ''}
              </button>
            ))}
          </div>

          <div className="calendar-actions">
            <button 
              type="button"
              className="clear-btn"
              onClick={() => {
                onDateSelect('');
                setIsOpen(false);
              }}
            >
              Clear
            </button>
            <button 
              type="button"
              className="today-btn"
              onClick={() => {
                const today = new Date().toISOString().split('T')[0];
                onDateSelect(today);
                setIsOpen(false);
              }}
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ConsultationBooking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contactMethod: 'video',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const contactMethods = [
    { id: 'video', label: 'Video Call', icon: <FiVideo />, color: '#0063f4' },
    { id: 'audio', label: 'Audio Call', icon: <FiPhone />, color: '#00bfff' },
    { id: 'googlemeet', label: 'Google Meet', icon: <SiGooglemeet />, color: '#00ff88' },
    { id: 'whatsapp', label: 'WhatsApp', icon: <SiWhatsapp />, color: '#25D366' },
    { id: 'zoom', label: 'Zoom Call', icon: <SiZoom />, color: '#2D8CFF' },
    { id: 'phone', label: 'Phone Call', icon: <FiPhone />, color: '#ff6b9d' }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMethodChange = (method: string) => {
    setFormData((prev) => ({ ...prev, contactMethod: method }));
  };

  const handleDateSelect = (date: string) => {
    setFormData((prev) => ({ ...prev, preferredDate: date }));
  };

  const handleTimeSelect = (time: string) => {
    setFormData((prev) => ({ ...prev, preferredTime: time }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS configuration
      const serviceId = 'service_w8wwd8e';
      const publicKey = 'NUKm-dvMLR7ftwvbF';
      
      // Template IDs
      const adminTemplateId = 'template_503vbvj';
      const userTemplateId = 'template_rgjfu18';

      // Common template parameters
      const baseParams = {
        from_name: formData.name,
        from_email: formData.email,
        user_name: formData.name,
        user_email: formData.email,
        email: formData.email,
        to_email: formData.email,
        phone: formData.phone,
        contact_method: contactMethods.find(m => m.id === formData.contactMethod)?.label,
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTime,
        message: formData.message || 'No additional message provided'
      };

      // Send notification to admin
      const adminResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: adminTemplateId,
          user_id: publicKey,
          template_params: {
            ...baseParams,
            reply_to: formData.email
          }
        })
      });

      // Send auto-reply to user
      const userResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: userTemplateId,
          user_id: publicKey,
          template_params: baseParams
        })
      });

      if (adminResponse.ok && userResponse.ok) {
        setSubmitStatus('success');
        // Reset form data
        setFormData({
          name: '',
          email: '',
          phone: '',
          contactMethod: 'video',
          preferredDate: '',
          preferredTime: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="consultation-page">
      {/* Animated Background */}
      <div className="consultation-bg">
        <div
          className="bg-orb orb-1"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div
          className="bg-orb orb-2"
          style={{
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`
          }}
        />
        <div
          className="bg-orb orb-3"
          style={{
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * -0.025}px)`
          }}
        />
        <div className="gradient-mesh"></div>
      </div>

      {/* Main Content */}
      <div className="consultation-container">
        {/* Hero Section */}
        <section className="consultation-hero animate-on-scroll fade-in">
          <div className="hero-badge">
            <FiCalendar /> Free Consultation
          </div>
          <h1 className="hero-title">
            Book Your <span className="gradient-text">Free Consultation</span>
          </h1>
          <p className="hero-subtitle">
            Let's discuss your project and explore how we can help bring your vision to life.
            Choose your preferred way to connect with us.
          </p>
        </section>

        {/* Booking Form */}
        <section className="booking-section">
          <div className="booking-card animate-on-scroll zoom-in">
            <form onSubmit={handleSubmit} className="booking-form">
              {/* Personal Information */}
              <div className="form-section animate-on-scroll slide-left">
                <h2 className="section-title">
                  <FiUser /> Personal Information
                </h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>

              {/* Contact Method */}
              <div className="form-section animate-on-scroll slide-right">
                <h2 className="section-title">
                  <FiMessageCircle /> Preferred Contact Method *
                </h2>
                
                <div className="contact-methods">
                  {contactMethods.map((method, index) => (
                    <div
                      key={method.id}
                      className={`method-card ${formData.contactMethod === method.id ? 'active' : ''}`}
                      onClick={() => handleMethodChange(method.id)}
                      style={{
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <input
                        type="radio"
                        id={method.id}
                        name="contactMethod"
                        value={method.id}
                        checked={formData.contactMethod === method.id}
                        onChange={() => handleMethodChange(method.id)}
                        className="method-radio"
                      />
                      <div className="method-icon" style={{ color: method.color }}>
                        {method.icon}
                      </div>
                      <span className="method-label">{method.label}</span>
                      <div className="method-check">
                        <FiCheckCircle />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="form-section animate-on-scroll slide-left" style={{ zIndex: 100 }}>
                <h2 className="section-title">
                  <FiCalendar /> Schedule Your Consultation *
                </h2>
                
                <div className="form-row">
                  <div className="form-group" style={{ zIndex: 100 }}>
                    <label>Preferred Date</label>
                    <CustomCalendar
                      selectedDate={formData.preferredDate}
                      onDateSelect={handleDateSelect}
                      minDate={today}
                    />
                  </div>

                  <div className="form-group">
                    <label>Preferred Time</label>
                    <CustomTimeSelector
                      selectedTime={formData.preferredTime}
                      onTimeSelect={handleTimeSelect}
                      timeSlots={timeSlots}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Message */}
              <div className="form-section animate-on-scroll slide-right" style={{ zIndex: 1 }}>
                <h2 className="section-title">
                  <FiMail /> Tell Us About Your Project (Optional)
                </h2>
                
                <div className="form-group">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Share any details about your project, goals, or questions..."
                    rows={5}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-actions animate-on-scroll zoom-in">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  <span className="btn-content">
                    {isSubmitting ? (
                      <>
                        <div className="spinner"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Book Free Session <FiSend />
                      </>
                    )}
                  </span>
                </button>
              </div>

              {/* Status Message */}
              {submitStatus === 'success' && (
                <div className="status-message success animate-on-scroll fade-in">
                  <FiCheckCircle />
                  <span>Session booked successfully! We'll contact you soon.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="status-message error animate-on-scroll fade-in">
                  <span>⚠️ Something went wrong. Please try again or contact us directly.</span>
                </div>
              )}
            </form>
          </div>

          {/* Info Cards */}
          <div className="info-cards">
            <div className="info-card animate-on-scroll slide-left">
              <div className="info-icon">
                <FiClock />
              </div>
              <h3>30 Minutes</h3>
              <p>Free consultation to discuss your project needs</p>
            </div>

            <div className="info-card animate-on-scroll zoom-in">
              <div className="info-icon">
                <FiCheckCircle />
              </div>
              <h3>No Obligation</h3>
              <p>Get expert advice with zero commitment</p>
            </div>

            <div className="info-card animate-on-scroll slide-right">
              <div className="info-icon">
                <FiArrowRight />
              </div>
              <h3>Quick Response</h3>
              <p>We'll confirm your booking within 24 hours</p>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .consultation-page {
          background: #000;
          color: #fff;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          padding: 60px 0;
        }

        .consultation-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.2;
          animation: floatOrb 15s ease-in-out infinite;
        }

        .orb-1 {
          width: 700px;
          height: 700px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          top: -15%;
          left: -10%;
        }

        .orb-2 {
          width: 600px;
          height: 600px;
          background: linear-gradient(135deg, #00ff88, #ffd700);
          bottom: -10%;
          right: -10%;
          animation-delay: 7s;
        }

        .orb-3 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #ff6b9d, #9d4edd);
          top: 50%;
          left: 50%;
          animation-delay: 3.5s;
        }

        @keyframes floatOrb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -60px) scale(1.15); }
          66% { transform: translate(-50px, 50px) scale(0.85); }
        }

        .gradient-mesh {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 20% 30%, rgba(0, 99, 244, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(0, 255, 136, 0.08) 0%, transparent 50%);
          animation: meshMove 20s ease-in-out infinite;
        }

        @keyframes meshMove {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        .consultation-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        .consultation-hero {
          text-align: center;
          margin-bottom: 80px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: rgba(0, 99, 244, 0.2);
          border: 1px solid rgba(0, 99, 244, 0.5);
          border-radius: 30px;
          color: #00bfff;
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 30px;
          backdrop-filter: blur(10px);
        }

        .hero-title {
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 24px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #0063f4 0%, #00bfff 30%, #00ff88 60%, #ffd700 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% auto;
          animation: gradientShift 5s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }

        .hero-subtitle {
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.85);
          max-width: 700px;
          margin: 0 auto;
        }

        .booking-section {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .booking-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 60px;
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 1;
        }

        .booking-form {
          display: flex;
          flex-direction: column;
          gap: 50px;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: relative;
          z-index: auto;
        }

        .section-title {
          font-size: 1.8rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #fff;
          margin-bottom: 10px;
        }

        .section-title svg {
          color: #00bfff;
          font-size: 28px;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: relative;
          z-index: auto;
        }

        .form-group label {
          font-weight: 600;
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          color: #fff;
          font-size: 1rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #0063f4;
          background: rgba(0, 99, 244, 0.08);
          box-shadow: 0 0 0 4px rgba(0, 99, 244, 0.2);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .form-group textarea {
          resize: vertical;
          font-family: inherit;
        }

        .form-group select {
          cursor: pointer;
        }

        .form-group select option {
          background: #1a1a1a;
          color: #fff;
        }

        /* Custom Time Selector Styles */
        .custom-time-container {
          position: relative;
          width: 100%;
          z-index: 90;
        }

        .time-input {
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .time-input:hover {
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.08);
        }

        .time-icon {
          font-size: 20px;
          color: #00bfff;
        }

        .selected-time {
          flex: 1;
          color: rgba(255, 255, 255, 0.9);
        }

        .time-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: rgba(20, 20, 25, 0.98);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 16px;
          z-index: 10000;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(20px);
          animation: fadeIn 0.3s ease;
          max-height: 300px;
          overflow-y: auto;
        }

        .time-dropdown::-webkit-scrollbar {
          width: 8px;
        }

        .time-dropdown::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }

        .time-dropdown::-webkit-scrollbar-thumb {
          background: rgba(0, 99, 244, 0.5);
          border-radius: 4px;
        }

        .time-dropdown::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 99, 244, 0.7);
        }

        .time-slots-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .time-slot {
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .time-slot:hover {
          background: rgba(0, 99, 244, 0.15);
          border-color: rgba(0, 99, 244, 0.5);
          transform: translateY(-2px);
        }

        .time-slot.selected {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-color: #0063f4;
          color: #fff;
          font-weight: 600;
        }

        /* Custom Calendar Styles */
        .custom-calendar-container {
          position: relative;
          width: 100%;
          z-index: 100;
        }

        .calendar-input {
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .calendar-input:hover {
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.08);
        }

        .calendar-icon {
          font-size: 20px;
          color: #00bfff;
        }

        .selected-date {
          flex: 1;
        }

        .dropdown-arrow {
          font-size: 20px;
          transition: transform 0.3s ease;
        }

        .dropdown-arrow.open {
          transform: rotate(90deg);
        }

        .calendar-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: rgba(20, 20, 25, 0.98);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          z-index: 10000;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(20px);
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .calendar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .nav-button {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-button:hover {
          background: rgba(0, 99, 244, 0.2);
          border-color: #0063f4;
        }

        .nav-button svg {
          font-size: 20px;
        }

        .current-month {
          font-size: 1.2rem;
          font-weight: 600;
          color: #fff;
          text-align: center;
          flex: 1;
          margin: 0;
        }

        .week-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
          margin-bottom: 12px;
        }

        .week-day {
          text-align: center;
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          padding: 8px 0;
        }

        .calendar-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          margin-bottom: 20px;
        }

        .calendar-day {
          aspect-ratio: 1;
          background: transparent;
          border: none;
          border-radius: 8px;
          color: #fff;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .calendar-day:hover:not(.disabled):not(.selected) {
          background: rgba(0, 99, 244, 0.1);
        }

        .calendar-day.selected {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          color: #fff;
          font-weight: 600;
        }

        .calendar-day.today {
          border: 2px solid #00ff88;
        }

        .calendar-day.disabled {
          color: rgba(255, 255, 255, 0.3);
          cursor: not-allowed;
        }

        .calendar-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .clear-btn, .today-btn {
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .clear-btn {
          background: rgba(255, 107, 157, 0.1);
          border: 1px solid rgba(255, 107, 157, 0.3);
          color: #ff6b9d;
        }

        .clear-btn:hover {
          background: rgba(255, 107, 157, 0.2);
          border-color: #ff6b9d;
        }

        .today-btn {
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid rgba(0, 255, 136, 0.3);
          color: #00ff88;
        }

        .today-btn:hover {
          background: rgba(0, 255, 136, 0.2);
          border-color: #00ff88;
        }

        .contact-methods {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 20px;
        }

        .method-card {
          position: relative;
          padding: 24px 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          text-align: center;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          animation: slideUp 0.6s ease backwards;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .method-card:hover {
          transform: translateY(-8px);
          border-color: rgba(0, 99, 244, 0.4);
          background: rgba(0, 99, 244, 0.06);
          box-shadow: 0 15px 40px rgba(0, 99, 244, 0.3);
        }

        .method-card.active {
          border-color: #0063f4;
          background: rgba(0, 99, 244, 0.12);
          box-shadow: 0 15px 40px rgba(0, 99, 244, 0.4);
          transform: scale(1.05);
        }

        .method-radio {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }

        .method-icon {
          font-size: 36px;
          margin-bottom: 12px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .method-card:hover .method-icon {
          transform: scale(1.15) rotate(5deg);
        }

        .method-label {
          font-weight: 600;
          font-size: 1rem;
          display: block;
          color: rgba(255, 255, 255, 0.9);
        }

        .method-check {
          position: absolute;
          top: 12px;
          right: 12px;
          font-size: 20px;
          color: #00ff88;
          opacity: 0;
          transform: scale(0);
          transition: all 0.3s ease;
        }

        .method-card.active .method-check {
          opacity: 1;
          transform: scale(1);
        }

        .form-actions {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .submit-btn {
          padding: 20px 50px;
          font-size: 1.2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border: none;
          border-radius: 50px;
          color: #fff;
          cursor: pointer;
          transition: all 0.4s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          box-shadow: 0 15px 50px rgba(0, 99, 244, 0.5);
          position: relative;
          overflow: hidden;
          min-width: 250px;
        }

        .btn-content {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 2;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #00bfff, #00ff88);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 1;
        }

        .submit-btn:hover::before {
          opacity: 1;
        }

        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.7);
        }

        .submit-btn:hover .btn-content {
          color: #fff;
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .submit-btn:disabled:hover {
          transform: none;
          box-shadow: 0 15px 50px rgba(0, 99, 244, 0.5);
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .status-message {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 20px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.05rem;
          margin-top: 20px;
        }

        .status-message.success {
          background: rgba(0, 255, 136, 0.15);
          border: 1px solid rgba(0, 255, 136, 0.4);
          color: #00ff88;
        }

        .status-message.error {
          background: rgba(255, 107, 157, 0.15);
          border: 1px solid rgba(255, 107, 157, 0.4);
          color: #ff6b9d;
        }

        .status-message svg {
          font-size: 24px;
        }

        .info-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .info-card {
          padding: 35px 30px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          text-align: center;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .info-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.08);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.3);
        }

        .info-icon {
          width: 70px;
          height: 70px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 99, 244, 0.15);
          border-radius: 50%;
          font-size: 32px;
          color: #00bfff;
          transition: all 0.4s ease;
        }

        .info-card:hover .info-icon {
          transform: scale(1.1) rotate(5deg);
          background: rgba(0, 99, 244, 0.25);
        }

        .info-card h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 12px;
          color: #fff;
        }

        .info-card p {
          font-size: 1.05rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.75);
        }

        .animate-on-scroll {
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
        }

        .animate-on-scroll.slide-left {
          transform: translateX(-80px);
        }

        .animate-on-scroll.slide-left.animate-in {
          transform: translateX(0);
        }

        .animate-on-scroll.slide-right {
          transform: translateX(80px);
        }

        .animate-on-scroll.slide-right.animate-in {
          transform: translateX(0);
        }

        .animate-on-scroll.zoom-in {
          transform: scale(0.8);
        }

        .animate-on-scroll.zoom-in.animate-in {
          transform: scale(1);
        }

        .animate-on-scroll.fade-in {
          opacity: 0;
        }

        .animate-on-scroll.fade-in.animate-in {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .consultation-page {
            padding: 40px 0;
          }

          .booking-card {
            padding: 40px 24px;
          }

          .hero-title {
            font-size: 32px;
          }

          .hero-subtitle {
            font-size: 1.05rem;
          }

          .section-title {
            font-size: 1.5rem;
          }

          .contact-methods {
            grid-template-columns: repeat(2, 1fr);
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .time-slots-grid {
            grid-template-columns: 1fr;
          }

          .calendar-dropdown {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 400px;
            z-index: 10000;
          }

          .submit-btn {
            width: 100%;
            justify-content: center;
            padding: 18px 30px;
            min-width: unset;
          }

          .info-cards {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .consultation-container {
            padding: 0 16px;
          }

          .booking-card {
            padding: 30px 20px;
          }

          .hero-badge {
            font-size: 0.9rem;
            padding: 10px 20px;
          }

          .hero-title {
            font-size: 28px;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .section-title {
            font-size: 1.3rem;
            flex-wrap: wrap;
          }

          .section-title svg {
            font-size: 24px;
          }

          .form-section {
            gap: 20px;
          }

          .booking-form {
            gap: 40px;
          }

          .contact-methods {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .method-card {
            padding: 20px 16px;
          }

          .method-icon {
            font-size: 32px;
          }

          .method-label {
            font-size: 0.95rem;
          }

          .submit-btn {
            padding: 16px 24px;
            font-size: 1.1rem;
          }

          .info-card {
            padding: 30px 24px;
          }

          .info-icon {
            width: 60px;
            height: 60px;
            font-size: 28px;
          }

          .info-card h3 {
            font-size: 1.3rem;
          }

          .info-card p {
            font-size: 1rem;
          }

          .calendar-header {
            padding: 0 4px;
          }

          .calendar-days {
            gap: 2px;
          }

          .calendar-day {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ConsultationBooking;