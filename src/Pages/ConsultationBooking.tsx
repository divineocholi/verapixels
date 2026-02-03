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
  FiSend,
  FiChevronLeft,
  FiChevronRight,
  FiAlertCircle,
  FiGlobe,
  FiRefreshCw
} from 'react-icons/fi';
import { SiGooglemeet, SiZoom, SiWhatsapp } from 'react-icons/si';
import { supabase } from '../Components/supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const BUSINESS_TIMEZONE = 'Africa/Lagos';
const BUSINESS_HOURS = {
  start: 9,
  end: 16,
  endMinutes: 30
};

interface DayType {
  day: string | number;
  date?: string;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  disabled?: boolean;
}

const convertTimeToTimezone = (time: string, date: string, fromTz: string, toTz: string) => {
  const [hours, minutes, period] = time.match(/(\d+):(\d+)\s*(AM|PM)/i)?.slice(1) || [];
  let hour = parseInt(hours);
  if (period?.toUpperCase() === 'PM' && hour !== 12) hour += 12;
  if (period?.toUpperCase() === 'AM' && hour === 12) hour = 0;

  const dateTimeString = `${date}T${hour.toString().padStart(2, '0')}:${minutes}:00`;
  const sourceDate = new Date(dateTimeString + ' GMT');
  
  const sourceFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: fromTz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  
  const targetFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: toTz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const sourceParts = sourceFormatter.formatToParts(new Date(dateTimeString));
  const sourceHour = parseInt(sourceParts.find(p => p.type === 'hour')?.value || '0');
  
  const targetParts = targetFormatter.formatToParts(new Date(dateTimeString));
  const targetHour = parseInt(targetParts.find(p => p.type === 'hour')?.value || '0');
  
  const offsetDiff = targetHour - sourceHour;
  const convertedHour = hour + offsetDiff;
  
  const finalHour = convertedHour % 24;
  const displayHour = finalHour === 0 ? 12 : finalHour > 12 ? finalHour - 12 : finalHour;
  const displayPeriod = finalHour >= 12 ? 'PM' : 'AM';
  
  return `${displayHour.toString().padStart(2, '0')}:${minutes} ${displayPeriod}`;
};

const isTimeSlotAvailable = (time: string, date: string, userTz: string) => {
  const businessTime = convertTimeToTimezone(time, date, userTz, BUSINESS_TIMEZONE);
  const [hours, minutes] = businessTime.match(/(\d+):(\d+)\s*(AM|PM)/i)?.slice(1, 3) || [];
  let hour = parseInt(hours);
  const minute = parseInt(minutes);
  const period = businessTime.split(' ')[1];
  
  if (period === 'PM' && hour !== 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;
  
  if (hour < BUSINESS_HOURS.start) return false;
  if (hour > BUSINESS_HOURS.end) return false;
  if (hour === BUSINESS_HOURS.end && minute > 0) return false;
  
  const now = new Date();
  const lagosNow = new Date(now.toLocaleString('en-US', { timeZone: BUSINESS_TIMEZONE }));
  const selectedDate = new Date(date + 'T00:00:00');
  
  const isToday = selectedDate.toDateString() === lagosNow.toDateString();
  
  if (isToday) {
    const currentHour = lagosNow.getHours();
    const currentMinute = lagosNow.getMinutes();
    
    if (hour < currentHour) return false;
    if (hour === currentHour && minute <= currentMinute) return false;
  }
  
  return true;
};

const CustomTimeSelector = ({ 
  selectedTime, 
  onTimeSelect, 
  timeSlots, 
  bookedSlots,
  selectedDate,
  userTimezone,
  businessTimezone
}: { 
  selectedTime: string; 
  onTimeSelect: (time: string) => void; 
  timeSlots: string[];
  bookedSlots: string[];
  selectedDate: string;
  userTimezone: string;
  businessTimezone: string;
}) => {
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

  const getBusinessTime = (time: string) => {
    if (!selectedDate) return '';
    return convertTimeToTimezone(time, selectedDate, userTimezone, businessTimezone);
  };

  const handleTimeClick = (time: string) => {
    if (!bookedSlots.includes(time) && isTimeSlotAvailable(time, selectedDate, userTimezone)) {
      onTimeSelect(time);
      setIsOpen(false);
    }
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
          <div className="timezone-header">
            <div className="tz-info">
              <FiGlobe />
              <span>Times shown in your timezone</span>
            </div>
          </div>
          <div className="time-slots-grid">
            {timeSlots.map((slot) => {
              const isBooked = bookedSlots.includes(slot);
              const isAvailable = selectedDate && isTimeSlotAvailable(slot, selectedDate, userTimezone);
              const businessTime = selectedDate ? getBusinessTime(slot) : '';
              
              return (
                <button
                  key={slot}
                  type="button"
                  className={`time-slot ${selectedTime === slot ? 'selected' : ''} ${isBooked ? 'booked' : ''} ${!isAvailable ? 'unavailable' : ''}`}
                  onClick={() => handleTimeClick(slot)}
                  disabled={isBooked || !isAvailable}
                  title={isBooked ? 'Already booked' : !isAvailable ? 'Outside business hours' : ''}
                >
                  <span className="slot-time">{slot}</span>
                  {businessTime && userTimezone !== businessTimezone && (
                    <span className="business-time">({businessTime} Lagos)</span>
                  )}
                  {isBooked && <span className="slot-badge booked-badge">Booked</span>}
                  {!isAvailable && !isBooked && <span className="slot-badge unavailable-badge">Closed</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const CustomCalendar = ({ 
  selectedDate, 
  onDateSelect, 
  minDate 
}: { 
  selectedDate: string; 
  onDateSelect: (date: string) => void; 
  minDate: string 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    return { daysInMonth, startingDay, year, month };
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getMonthName = () => {
    return currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const generateCalendarDays = (): DayType[] => {
    const { daysInMonth, startingDay, year, month } = getDaysInMonth(currentMonth);
    const days: DayType[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minDateObj = minDate ? new Date(minDate) : null;
    if (minDateObj) minDateObj.setHours(0, 0, 0, 0);

    for (let i = 0; i < startingDay; i++) {
      days.push({ day: '', disabled: true, isToday: false, isSelected: false, isDisabled: false });
    }

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
      const selectedDate = new Date(day.date);
      selectedDate.setDate(selectedDate.getDate() + 1);
      onDateSelect(selectedDate.toISOString().split('T')[0]);
      setIsOpen(false);
    }
  };

  const formatSelectedDate = (dateString: string) => {
    if (!dateString) return 'Select Date';
    const date = new Date(dateString + 'T00:00:00');
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

const TimezoneSelector = ({ 
  currentTimezone, 
  onTimezoneChange 
}: { 
  currentTimezone: string; 
  onTimezoneChange: (tz: string) => void 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const allTimezones = [
    { value: 'Africa/Abidjan', label: 'Abidjan (GMT)', region: 'Africa' },
    { value: 'Africa/Accra', label: 'Accra (GMT)', region: 'Africa' },
    { value: 'Africa/Addis_Ababa', label: 'Addis Ababa (EAT)', region: 'Africa' },
    { value: 'Africa/Algiers', label: 'Algiers (CET)', region: 'Africa' },
    { value: 'Africa/Cairo', label: 'Cairo (EET)', region: 'Africa' },
    { value: 'Africa/Casablanca', label: 'Casablanca (WET)', region: 'Africa' },
    { value: 'Africa/Johannesburg', label: 'Johannesburg (SAST)', region: 'Africa' },
    { value: 'Africa/Lagos', label: 'Lagos (WAT)', region: 'Africa' },
    { value: 'Africa/Nairobi', label: 'Nairobi (EAT)', region: 'Africa' },
    { value: 'Africa/Tunis', label: 'Tunis (CET)', region: 'Africa' },
    
    { value: 'America/Anchorage', label: 'Anchorage (AKST)', region: 'America' },
    { value: 'America/Chicago', label: 'Chicago (CST)', region: 'America' },
    { value: 'America/Denver', label: 'Denver (MST)', region: 'America' },
    { value: 'America/Los_Angeles', label: 'Los Angeles (PST)', region: 'America' },
    { value: 'America/Mexico_City', label: 'Mexico City (CST)', region: 'America' },
    { value: 'America/New_York', label: 'New York (EST)', region: 'America' },
    { value: 'America/Phoenix', label: 'Phoenix (MST)', region: 'America' },
    { value: 'America/Toronto', label: 'Toronto (EST)', region: 'America' },
    { value: 'America/Vancouver', label: 'Vancouver (PST)', region: 'America' },
    
    { value: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires (ART)', region: 'America' },
    { value: 'America/Bogota', label: 'Bogota (COT)', region: 'America' },
    { value: 'America/Caracas', label: 'Caracas (VET)', region: 'America' },
    { value: 'America/Lima', label: 'Lima (PET)', region: 'America' },
    { value: 'America/Santiago', label: 'Santiago (CLT)', region: 'America' },
    { value: 'America/Sao_Paulo', label: 'São Paulo (BRT)', region: 'America' },
    
    { value: 'America/Havana', label: 'Havana (CST)', region: 'America' },
    { value: 'America/Jamaica', label: 'Jamaica (EST)', region: 'America' },
    { value: 'America/Puerto_Rico', label: 'Puerto Rico (AST)', region: 'America' },
    
    { value: 'Asia/Baghdad', label: 'Baghdad (AST)', region: 'Asia' },
    { value: 'Asia/Baku', label: 'Baku (AZT)', region: 'Asia' },
    { value: 'Asia/Bangkok', label: 'Bangkok (ICT)', region: 'Asia' },
    { value: 'Asia/Beirut', label: 'Beirut (EET)', region: 'Asia' },
    { value: 'Asia/Colombo', label: 'Colombo (IST)', region: 'Asia' },
    { value: 'Asia/Damascus', label: 'Damascus (EET)', region: 'Asia' },
    { value: 'Asia/Dhaka', label: 'Dhaka (BST)', region: 'Asia' },
    { value: 'Asia/Dubai', label: 'Dubai (GST)', region: 'Asia' },
    { value: 'Asia/Hong_Kong', label: 'Hong Kong (HKT)', region: 'Asia' },
    { value: 'Asia/Jakarta', label: 'Jakarta (WIB)', region: 'Asia' },
    { value: 'Asia/Jerusalem', label: 'Jerusalem (IST)', region: 'Asia' },
    { value: 'Asia/Karachi', label: 'Karachi (PKT)', region: 'Asia' },
    { value: 'Asia/Kathmandu', label: 'Kathmandu (NPT)', region: 'Asia' },
    { value: 'Asia/Kolkata', label: 'Kolkata (IST)', region: 'Asia' },
    { value: 'Asia/Kuala_Lumpur', label: 'Kuala Lumpur (MYT)', region: 'Asia' },
    { value: 'Asia/Kuwait', label: 'Kuwait (AST)', region: 'Asia' },
    { value: 'Asia/Manila', label: 'Manila (PHT)', region: 'Asia' },
    { value: 'Asia/Riyadh', label: 'Riyadh (AST)', region: 'Asia' },
    { value: 'Asia/Seoul', label: 'Seoul (KST)', region: 'Asia' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)', region: 'Asia' },
    { value: 'Asia/Singapore', label: 'Singapore (SGT)', region: 'Asia' },
    { value: 'Asia/Taipei', label: 'Taipei (CST)', region: 'Asia' },
    { value: 'Asia/Tashkent', label: 'Tashkent (UZT)', region: 'Asia' },
    { value: 'Asia/Tehran', label: 'Tehran (IRST)', region: 'Asia' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)', region: 'Asia' },
    { value: 'Asia/Yangon', label: 'Yangon (MMT)', region: 'Asia' },
    
    { value: 'Atlantic/Azores', label: 'Azores (AZOT)', region: 'Atlantic' },
    { value: 'Atlantic/Bermuda', label: 'Bermuda (AST)', region: 'Atlantic' },
    { value: 'Atlantic/Reykjavik', label: 'Reykjavik (GMT)', region: 'Atlantic' },
    
    { value: 'Australia/Adelaide', label: 'Adelaide (ACST)', region: 'Australia' },
    { value: 'Australia/Brisbane', label: 'Brisbane (AEST)', region: 'Australia' },
    { value: 'Australia/Darwin', label: 'Darwin (ACST)', region: 'Australia' },
    { value: 'Australia/Melbourne', label: 'Melbourne (AEST)', region: 'Australia' },
    { value: 'Australia/Perth', label: 'Perth (AWST)', region: 'Australia' },
    { value: 'Australia/Sydney', label: 'Sydney (AEST)', region: 'Australia' },
    
    { value: 'Europe/Amsterdam', label: 'Amsterdam (CET)', region: 'Europe' },
    { value: 'Europe/Athens', label: 'Athens (EET)', region: 'Europe' },
    { value: 'Europe/Berlin', label: 'Berlin (CET)', region: 'Europe' },
    { value: 'Europe/Brussels', label: 'Brussels (CET)', region: 'Europe' },
    { value: 'Europe/Bucharest', label: 'Bucharest (EET)', region: 'Europe' },
    { value: 'Europe/Budapest', label: 'Budapest (CET)', region: 'Europe' },
    { value: 'Europe/Copenhagen', label: 'Copenhagen (CET)', region: 'Europe' },
    { value: 'Europe/Dublin', label: 'Dublin (GMT)', region: 'Europe' },
    { value: 'Europe/Helsinki', label: 'Helsinki (EET)', region: 'Europe' },
    { value: 'Europe/Istanbul', label: 'Istanbul (TRT)', region: 'Europe' },
    { value: 'Europe/Lisbon', label: 'Lisbon (WET)', region: 'Europe' },
    { value: 'Europe/London', label: 'London (GMT)', region: 'Europe' },
    { value: 'Europe/Madrid', label: 'Madrid (CET)', region: 'Europe' },
    { value: 'Europe/Moscow', label: 'Moscow (MSK)', region: 'Europe' },
    { value: 'Europe/Oslo', label: 'Oslo (CET)', region: 'Europe' },
    { value: 'Europe/Paris', label: 'Paris (CET)', region: 'Europe' },
    { value: 'Europe/Prague', label: 'Prague (CET)', region: 'Europe' },
    { value: 'Europe/Rome', label: 'Rome (CET)', region: 'Europe' },
    { value: 'Europe/Stockholm', label: 'Stockholm (CET)', region: 'Europe' },
    { value: 'Europe/Vienna', label: 'Vienna (CET)', region: 'Europe' },
    { value: 'Europe/Warsaw', label: 'Warsaw (CET)', region: 'Europe' },
    { value: 'Europe/Zurich', label: 'Zurich (CET)', region: 'Europe' },
    
    { value: 'Pacific/Auckland', label: 'Auckland (NZST)', region: 'Pacific' },
    { value: 'Pacific/Fiji', label: 'Fiji (FJT)', region: 'Pacific' },
    { value: 'Pacific/Guam', label: 'Guam (ChST)', region: 'Pacific' },
    { value: 'Pacific/Honolulu', label: 'Honolulu (HST)', region: 'Pacific' },
    { value: 'Pacific/Pago_Pago', label: 'Pago Pago (SST)', region: 'Pacific' },
    { value: 'Pacific/Tahiti', label: 'Tahiti (TAHT)', region: 'Pacific' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as HTMLElement).closest('.timezone-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const getCurrentLabel = () => {
    const tz = allTimezones.find(t => t.value === currentTimezone);
    return tz ? tz.label : currentTimezone;
  };

  const filteredTimezones = allTimezones.filter(tz => 
    tz.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tz.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tz.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedTimezones = filteredTimezones.reduce((acc, tz) => {
    if (!acc[tz.region]) {
      acc[tz.region] = [];
    }
    acc[tz.region].push(tz);
    return acc;
  }, {} as Record<string, typeof allTimezones>);

  return (
    <div className="timezone-selector">
      <button 
        className="timezone-toggle"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <FiGlobe />
        <span>{getCurrentLabel()}</span>
        <FiChevronRight className={`dropdown-arrow ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="timezone-dropdown">
          <div className="timezone-search-header">
            <input
              type="text"
              placeholder="Search timezone or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="timezone-search-input"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <div className="timezone-list">
            {Object.keys(groupedTimezones).length === 0 ? (
              <div className="no-results">No timezones found</div>
            ) : (
              Object.keys(groupedTimezones).sort().map((region) => (
                <div key={region} className="timezone-region-group">
                  <div className="timezone-region-header">{region}</div>
                  {groupedTimezones[region].map((tz) => (
                    <button
                      key={tz.value}
                      className={`timezone-option ${currentTimezone === tz.value ? 'active' : ''}`}
                      onClick={() => {
                        onTimezoneChange(tz.value);
                        setIsOpen(false);
                        setSearchQuery('');
                      }}
                    >
                      {tz.label}
                      {currentTimezone === tz.value && <FiCheckCircle />}
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const contactMethods = [
  { id: 'video', label: 'Video Call', icon: <FiVideo />, color: '#0063f4' },
  { id: 'audio', label: 'Audio Call', icon: <FiPhone />, color: '#00bfff' },
  { id: 'googlemeet', label: 'Google Meet', icon: <SiGooglemeet />, color: '#00ff88' },
  { id: 'whatsapp', label: 'WhatsApp', icon: <SiWhatsapp />, color: '#25D366' },
  { id: 'zoom', label: 'Zoom Call', icon: <SiZoom />, color: '#2D8CFF' },
  { id: 'phone', label: 'Phone Call', icon: <FiPhone />, color: '#ff6b9d' }
];

const generateTimeSlots = () => {
  const slots: string[] = [];
  const startHour = BUSINESS_HOURS.start;
  const endHour = BUSINESS_HOURS.end;
  
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === endHour && minute > 0) break;
      
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const period = hour >= 12 ? 'PM' : 'AM';
      const minuteStr = minute.toString().padStart(2, '0');
      slots.push(`${displayHour.toString().padStart(2, '0')}:${minuteStr} ${period}`);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

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
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [userTimezone, setUserTimezone] = useState('');
  const [detectedTimezone, setDetectedTimezone] = useState('');

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(timezone);
    setDetectedTimezone(timezone);
  }, []);

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

  useEffect(() => {
    if (formData.preferredDate) {
      checkAvailability(formData.preferredDate);
    } else {
      setBookedSlots([]);
    }
  }, [formData.preferredDate]);

  const checkAvailability = async (date: string) => {
    setIsCheckingAvailability(true);
    try {
      const { data, error } = await supabase
        .from('consultations')
        .select('booking_time, status')
        .eq('booking_date', date)
        .in('status', ['confirmed', 'pending']);

      if (error) throw error;

      const booked = data
        .filter(booking => booking.status === 'confirmed' || booking.status === 'pending')
        .map(booking => booking.booking_time);
      
      setBookedSlots(booked);
    } catch (error) {
      console.error('Error checking availability:', error);
      setBookedSlots([]);
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMethodChange = (method: string) => {
    setFormData((prev) => ({ ...prev, contactMethod: method }));
  };

  const handleDateSelect = (date: string) => {
    setFormData((prev) => ({ ...prev, preferredDate: date, preferredTime: '' }));
  };

  const handleTimeSelect = (time: string) => {
    setFormData((prev) => ({ ...prev, preferredTime: time }));
  };

  const handleTimezoneChange = (tz: string) => {
    setUserTimezone(tz);
    setFormData((prev) => ({ ...prev, preferredTime: '' }));
  };

  const getBusinessTime = (userTime: string) => {
    if (!formData.preferredDate || !userTime) return '';
    return convertTimeToTimezone(userTime, formData.preferredDate, userTimezone, BUSINESS_TIMEZONE);
  };
  
 // In your frontend ConsultationBooking component, update the handleSubmit function:

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus(null);

  try {
    // Check for existing bookings (optional)
    const { data: existingBookings, error: checkError } = await supabase
      .from('consultations')
      .select('*')
      .eq('booking_date', formData.preferredDate)
      .eq('booking_time', formData.preferredTime)
      .in('status', ['confirmed', 'pending']);

    if (checkError) throw checkError;

    if (existingBookings && existingBookings.length > 0) {
      alert('Sorry, this time slot was just booked. Please select another time.');
      await checkAvailability(formData.preferredDate);
      setIsSubmitting(false);
      return;
    }

    const businessTime = getBusinessTime(formData.preferredTime);
    
    // Call your backend API instead of EmailJS
      const response = await fetch(`${API_URL}/api/consultations/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        contact_method: contactMethods.find(m => m.id === formData.contactMethod)?.label || formData.contactMethod,
        booking_date: formData.preferredDate,
        booking_time: formData.preferredTime,
        business_time: businessTime,
        user_timezone: userTimezone,
        message: formData.message || 'No additional message provided'
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to book consultation');
    }

    setSubmitStatus('success');
    setFormData({
      name: '',
      email: '',
      phone: '',
      contactMethod: 'video',
      preferredDate: '',
      preferredTime: '',
      message: ''
    });
    setBookedSlots([]);

  } catch (error) {
    console.error('Booking Error:', error);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="consultation-page">
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

      <div className="consultation-container">
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
          
          <div className="timezone-info-box">
            <div className="tz-row">
              <FiGlobe className="tz-icon" />
              <div className="tz-details">
                <span className="tz-label">Your Timezone:</span>
                <span className="tz-value">{userTimezone}</span>
              </div>
            </div>
            <div className="tz-row business-hours">
              <FiClock className="tz-icon" />
              <div className="tz-details">
                <span className="tz-label">Business Hours (Lagos):</span>
                <span className="tz-value">9:00 AM - 4:30 PM WAT</span>
              </div>
            </div>
            {userTimezone !== detectedTimezone && (
              <button 
                className="reset-tz-btn"
                onClick={() => setUserTimezone(detectedTimezone)}
              >
                <FiRefreshCw /> Reset to Detected Timezone
              </button>
            )}
          </div>

          <TimezoneSelector 
            currentTimezone={userTimezone}
            onTimezoneChange={handleTimezoneChange}
          />
        </section>

        <section className="booking-section">
          <div className="booking-card animate-on-scroll zoom-in">
            <form onSubmit={handleSubmit} className="booking-form">
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
                      style={{ animationDelay: `${index * 0.1}s` }}
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
                    <label>
                      Preferred Time (Your Timezone)
                      {isCheckingAvailability && <span className="checking-badge">Checking...</span>}
                    </label>
                    <CustomTimeSelector
                      selectedTime={formData.preferredTime}
                      onTimeSelect={handleTimeSelect}
                      timeSlots={timeSlots}
                      bookedSlots={bookedSlots}
                      selectedDate={formData.preferredDate}
                      userTimezone={userTimezone}
                      businessTimezone={BUSINESS_TIMEZONE}
                    />
                    {formData.preferredTime && userTimezone !== BUSINESS_TIMEZONE && (
                      <div className="time-conversion-note">
                        <FiGlobe />
                        <span>
                          Your time: <strong>{formData.preferredTime}</strong> → 
                          Lagos time: <strong>{getBusinessTime(formData.preferredTime)}</strong>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

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

              <div className="form-actions animate-on-scroll zoom-in">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting || !formData.preferredDate || !formData.preferredTime}
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

              {submitStatus === 'success' && (
                <div className="success-modal">
                  <div className="success-content">
                    <div className="success-icon">
                      <FiCheckCircle />
                    </div>
                    <h3>Booking Confirmed!</h3>
                    <p>Your consultation has been successfully booked.</p>
                    <div className="success-time-details">
                      <div className="time-detail">
                        <FiClock />
                        <span>Your Time: <strong>{formData.preferredTime}</strong></span>
                      </div>
                      {userTimezone !== BUSINESS_TIMEZONE && (
                        <div className="time-detail">
                          <FiGlobe />
                          <span>Lagos Time: <strong>{getBusinessTime(formData.preferredTime)}</strong></span>
                        </div>
                      )}
                    </div>
                    <p className="success-details">Check your email for confirmation with timezone details.</p>
                    <button 
                      className="success-btn"
                      onClick={() => setSubmitStatus(null)}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="status-message error animate-on-scroll fade-in">
                  <FiAlertCircle />
                  <span>Something went wrong. Please try again or contact us directly.</span>
                </div>
              )}
            </form>
          </div>

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
                <FiGlobe />
              </div>
              <h3>Timezone Smart</h3>
              <p>Automatic timezone conversion with clear time confirmations</p>
            </div>

            <div className="info-card animate-on-scroll slide-right">
              <div className="info-icon">
                <FiCheckCircle />
              </div>
              <h3>Instant Confirmation</h3>
              <p>Receive email with times in both your timezone and ours</p>
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
          margin-top: 50px;
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
          margin: 0 auto 30px;
        }

        .timezone-info-box {
          display: inline-flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px 30px;
          background: rgba(0, 255, 136, 0.08);
          border: 1px solid rgba(0, 255, 136, 0.25);
          border-radius: 16px;
          margin: 20px 0;
          backdrop-filter: blur(10px);
        }

        .tz-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .tz-icon {
          font-size: 20px;
          color: #00ff88;
        }

        .tz-details {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
        }

        .tz-label {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
        }

        .tz-value {
          font-size: 1.05rem;
          color: #00ff88;
          font-weight: 700;
        }

        .business-hours .tz-icon {
          color: #ffd700;
        }

        .business-hours .tz-value {
          color: #ffd700;
        }

        .reset-tz-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(0, 191, 255, 0.15);
          border: 1px solid rgba(0, 191, 255, 0.3);
          border-radius: 8px;
          color: #00bfff;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 8px;
        }

        .reset-tz-btn:hover {
          background: rgba(0, 191, 255, 0.25);
          border-color: #00bfff;
          transform: translateY(-2px);
        }

        .timezone-selector {
          position: relative;
          display: inline-block;
          margin-top: 20px;
        }

        .timezone-toggle {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: rgba(0, 99, 244, 0.15);
          border: 1px solid rgba(0, 99, 244, 0.3);
          border-radius: 50px;
          color: #fff;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .timezone-toggle:hover {
          background: rgba(0, 99, 244, 0.25);
          border-color: #0063f4;
          transform: translateY(-2px);
        }

        .timezone-toggle svg:first-child {
          font-size: 20px;
          color: #00bfff;
        }

        .timezone-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          min-width: 320px;
          max-width: 400px;
          background: rgba(20, 20, 25, 0.98);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 12px;
          z-index: 10000;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(20px);
          animation: fadeIn 0.3s ease;
          max-height: 500px;
          display: flex;
          flex-direction: column;
        }

        .timezone-search-header {
          padding: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 8px;
        }

        .timezone-search-input {
          width: 100%;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          color: #fff;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .timezone-search-input:focus {
          outline: none;
          border-color: #0063f4;
          background: rgba(0, 99, 244, 0.08);
          box-shadow: 0 0 0 3px rgba(0, 99, 244, 0.2);
        }

        .timezone-search-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .timezone-list {
          overflow-y: auto;
          max-height: 400px;
          padding: 4px;
        }

        .timezone-list::-webkit-scrollbar {
          width: 8px;
        }

        .timezone-list::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }

        .timezone-list::-webkit-scrollbar-thumb {
          background: rgba(0, 99, 244, 0.5);
          border-radius: 4px;
        }

        .timezone-list::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 99, 244, 0.7);
        }

        .timezone-region-group {
          margin-bottom: 16px;
        }

        .timezone-region-header {
          padding: 8px 12px;
          font-size: 0.85rem;
          font-weight: 700;
          color: #00bfff;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid rgba(0, 191, 255, 0.2);
          margin-bottom: 4px;
        }

        .no-results {
          padding: 24px;
          text-align: center;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.95rem;
        }

        .timezone-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: transparent;
          border: none;
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          text-align: left;
        }

        .timezone-option:hover {
          background: rgba(0, 99, 244, 0.15);
        }

        .timezone-option.active {
          background: rgba(0, 99, 244, 0.25);
          color: #00bfff;
          font-weight: 600;
        }

        .timezone-option svg {
          color: #00ff88;
          font-size: 18px;
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

        /* ====== FIX: GRID LAYOUT FOR FORM SECTIONS ====== */
        .booking-form {
          display: flex;
          flex-direction: column;
          gap: 50px;
        }

        .booking-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }

        .form-left-column,
        .form-right-column {
          display: flex;
          flex-direction: column;
          gap: 50px;
        }

        /* Form sections styling */
        .form-section {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 32px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .form-section:hover {
          border-color: rgba(0, 99, 244, 0.15);
          background: rgba(0, 99, 244, 0.03);
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #fff;
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 2px solid rgba(0, 99, 244, 0.2);
        }

        .section-title svg {
          color: #00bfff;
          font-size: 24px;
        }

        /* ====== FIX: IMPROVED FORM ROW LAYOUT ====== */
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          width: 100%;
        }

        /* ====== FIX: FORM GROUP IMPROVEMENTS ====== */
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }

        .form-group label {
          font-weight: 600;
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .checking-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 12px;
          background: rgba(0, 191, 255, 0.15);
          border: 1px solid rgba(0, 191, 255, 0.3);
          border-radius: 12px;
          color: #00bfff;
          font-size: 0.85rem;
          font-weight: 600;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
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
          background: rgba(0, 99, 244, 0.05);
          box-shadow: 0 0 0 3px rgba(0, 99, 244, 0.15);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .form-group textarea {
          resize: vertical;
          font-family: inherit;
        }

        .time-conversion-note {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid rgba(0, 255, 136, 0.25);
          border-radius: 10px;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.85);
          margin-top: 8px;
        }

        .time-conversion-note svg {
          color: #00ff88;
          font-size: 18px;
          flex-shrink: 0;
        }

        .time-conversion-note strong {
          color: #00ff88;
          font-weight: 700;
        }

        .success-modal {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10001;
          animation: fadeIn 0.3s ease;
        }

        .success-content {
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.1), rgba(0, 255, 136, 0.1));
          border: 2px solid rgba(0, 255, 136, 0.3);
          border-radius: 24px;
          padding: 50px 40px;
          text-align: center;
          max-width: 550px;
          width: 90%;
          position: relative;
          animation: slideUp 0.5s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .success-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          background: rgba(0, 255, 136, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: scaleIn 0.6s ease 0.2s backwards;
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
          font-size: 48px;
          color: #00ff88;
        }

        .success-content h3 {
          font-size: 2rem;
          font-weight: 900;
          color: #fff;
          margin-bottom: 16px;
        }

        .success-content p {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 12px;
        }

        .success-time-details {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
          margin: 20px 0;
        }

        .time-detail {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .time-detail svg {
          color: #00ff88;
          font-size: 18px;
        }

        .time-detail strong {
          color: #00ff88;
          font-weight: 700;
        }

        .success-details {
          font-size: 1rem;
          color: #00ff88;
          font-weight: 600;
        }

        .success-btn {
          margin-top: 30px;
          padding: 14px 40px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border: none;
          border-radius: 50px;
          color: #fff;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .success-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.5);
        }

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
          max-height: 400px;
          overflow-y: auto;
        }

        .timezone-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid rgba(0, 255, 136, 0.2);
          border-radius: 10px;
          margin-bottom: 16px;
        }

        .tz-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #00ff88;
        }

        .tz-info svg {
          font-size: 18px;
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

        /* ====== FIX: TIME SLOTS GRID ====== */
        .time-slots-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          max-height: 300px;
          overflow-y: auto;
          padding-right: 5px;
        }

        .time-slot {
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .slot-time {
          font-weight: 600;
        }

        .business-time {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .slot-badge {
          display: block;
          font-size: 0.75rem;
          margin-top: 4px;
          font-weight: 600;
        }

        .time-slot:hover:not(.booked):not(.unavailable) {
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

        .time-slot.booked,
        .time-slot.unavailable {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .time-slot.booked {
          background: rgba(255, 107, 157, 0.1);
          border-color: rgba(255, 107, 157, 0.3);
          color: rgba(255, 107, 157, 0.7);
        }

        .time-slot.unavailable {
          background: rgba(128, 128, 128, 0.1);
          border-color: rgba(128, 128, 128, 0.3);
          color: rgba(128, 128, 128, 0.7);
        }

        .booked-badge {
          color: #ff6b9d;
        }

        .unavailable-badge {
          color: #888;
        }

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

        /* ====== FIX: CALENDAR DAYS GRID ====== */
        .calendar-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 6px;
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

        /* ====== FIX: CONTACT METHODS GRID ====== */
        .contact-methods {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .method-card {
          position: relative;
          padding: 20px 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
          transform: translateY(-4px);
          border-color: rgba(0, 99, 244, 0.4);
          background: rgba(0, 99, 244, 0.06);
          box-shadow: 0 10px 25px rgba(0, 99, 244, 0.2);
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
          font-size: 32px;
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
          font-size: 0.95rem;
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
          margin-top: 40px;
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

        /* ====== FIX: INFO CARDS GRID ====== */
        .info-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 60px;
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
          lineHeight: 1.6;
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

        /* ====== RESPONSIVE DESIGN ====== */
        @media (max-width: 1200px) {
          .consultation-container {
            max-width: 1000px;
            padding: 0 30px;
          }
        }

        @media (max-width: 992px) {
          .booking-form-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .form-left-column,
          .form-right-column {
            gap: 30px;
          }
          
          .info-cards {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .contact-methods {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .consultation-page {
            padding: 40px 0;
          }

          .booking-card {
            padding: 40px 24px;
          }
          
          .form-section {
            padding: 24px;
          }

          .hero-title {
            font-size: 32px;
          }

          .hero-subtitle {
            font-size: 1.05rem;
          }

          .timezone-info-box {
            padding: 16px 20px;
          }

          .tz-details {
            align-items: flex-start;
          }

          .section-title {
            font-size: 1.3rem;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 16px;
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
            margin-top: 40px;
          }

          .timezone-dropdown {
            left: 0;
            right: 0;
            transform: none;
          }
        }

        @media (max-width: 576px) {
          .contact-methods {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          
          .method-card {
            padding: 18px 16px;
          }
          
          .method-icon {
            font-size: 28px;
          }
          
          .time-slots-grid {
            grid-template-columns: 1fr;
          }
          
          .calendar-days {
            gap: 4px;
          }
          
          .calendar-day {
            font-size: 0.85rem;
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

          .timezone-info-box {
            padding: 14px 16px;
            gap: 10px;
          }

          .tz-label {
            font-size: 0.8rem;
          }

          .tz-value {
            font-size: 0.95rem;
          }

          .timezone-toggle {
            padding: 10px 20px;
            font-size: 0.9rem;
          }

          .section-title {
            font-size: 1.2rem;
            flex-wrap: wrap;
          }

          .section-title svg {
            font-size: 20px;
          }

          .form-section {
            gap: 20px;
          }

          .booking-form {
            gap: 40px;
          }

          .booking-form-grid {
            gap: 20px;
          }
          
          .form-left-column,
          .form-right-column {
            gap: 20px;
          }

          .method-card {
            padding: 16px 12px;
          }

          .method-icon {
            font-size: 26px;
          }

          .method-label {
            font-size: 0.9rem;
          }

          .time-conversion-note {
            flex-direction: column;
            text-align: center;
            font-size: 0.85rem;
            padding: 10px 12px;
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
            font-size: 0.8rem;
          }

          .success-content {
            padding: 40px 30px;
          }

          .success-time-details {
            padding: 16px;
          }

          .time-detail {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ConsultationBooking;