// src/Components/SimpleChart.tsx
import React from 'react';

// Define types for our chart data
export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface ChartColors {
  primary?: string;
  secondary?: string;
  accent?: string;
  background?: string;
  text?: string;
}

// Default color scheme matching your dashboard
const defaultColors: ChartColors = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  accent: '#10b981',
  background: '#ffffff',
  text: '#374151'
};

// Simple Bar Chart Component
interface SimpleBarChartProps {
  data: ChartDataPoint[];
  width?: number;
  height?: number;
  color?: string;
  title?: string; // ADD THIS LINE
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ 
  data, 
  width = 400, 
  height = 250,
  color = defaultColors.primary,
  title // ADD THIS LINE
}) => {
  if (!data || data.length === 0) {
    return (
      <div style={{
        width: `${width}px`,
        height: `${height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        color: '#6b7280'
      }}>
        <div>No data available</div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const barWidth = (width - 100) / data.length;
  const chartHeight = height - 80; // Account for labels and padding

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: `${width}px`,
      height: `${height}px`,
      padding: '20px',
      backgroundColor: defaultColors.background,
      borderRadius: '12px',
      border: '1px solid #e5e7eb'
    }}>
      {title && ( // ADD THIS SECTION
        <h3 style={{ 
          margin: '0 0 20px 0', 
          fontSize: '16px', 
          fontWeight: 600,
          color: defaultColors.text 
        }}>
          {title}
        </h3>
      )}
      
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* Y-axis */}
        <div style={{
          position: 'absolute',
          left: '40px',
          top: '0',
          bottom: '40px',
          width: '1px',
          backgroundColor: '#e5e7eb'
        }} />
        
        {/* X-axis */}
        <div style={{
          position: 'absolute',
          left: '40px',
          right: '20px',
          bottom: '40px',
          height: '1px',
          backgroundColor: '#e5e7eb'
        }} />
        
        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const value = Math.round(maxValue * ratio);
          const yPos = 40 + (1 - ratio) * (chartHeight - 40);
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: '0',
                top: `${yPos}px`,
                width: '35px',
                textAlign: 'right',
                fontSize: '11px',
                color: '#6b7280',
                transform: 'translateY(-50%)'
              }}
            >
              {value.toLocaleString()}
            </div>
          );
        })}
        
        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * chartHeight;
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: `${60 + index * barWidth}px`,
                bottom: '40px',
                width: `${barWidth - 10}px`,
                height: `${barHeight}px`,
                backgroundColor: color,
                borderRadius: '4px 4px 0 0',
                transition: 'height 0.3s ease',
                cursor: 'pointer'
              }}
              title={`${item.name}: ${item.value}`}
            >
              <div style={{
                position: 'absolute',
                top: '-25px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '12px',
                fontWeight: 600,
                color: defaultColors.text,
                whiteSpace: 'nowrap'
              }}>
                {item.value.toLocaleString()}
              </div>
            </div>
          );
        })}
        
        {/* X-axis labels */}
        <div style={{
          position: 'absolute',
          left: '40px',
          right: '20px',
          bottom: '0',
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '8px'
        }}>
          {data.map((item, index) => (
            <div
              key={index}
              style={{
                width: `${barWidth}px`,
                textAlign: 'center',
                fontSize: '11px',
                color: '#6b7280',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                transform: `translateX(${barWidth / 2}px)`
              }}
              title={item.name}
            >
              {item.name.length > 8 ? item.name.substring(0, 8) + '...' : item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple Line Chart Component
interface SimpleLineChartProps {
  data: ChartDataPoint[];
  width?: number;
  height?: number;
  color?: string;
  title?: string; // ADD THIS LINE
}

export const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ 
  data, 
  width = 400, 
  height = 250,
  color = defaultColors.primary,
  title // ADD THIS LINE
}) => {
  if (!data || data.length === 0) {
    return (
      <div style={{
        width: `${width}px`,
        height: `${height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        color: '#6b7280'
      }}>
        <div>No data available</div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const pointWidth = (width - 100) / Math.max(1, data.length - 1);
  const chartHeight = height - 100;

  const points = data.map((item, index) => ({
    x: 60 + index * pointWidth,
    y: 40 + (chartHeight - (item.value / maxValue) * chartHeight)
  }));

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: `${width}px`,
      height: `${height}px`,
      padding: '20px',
      backgroundColor: defaultColors.background,
      borderRadius: '12px',
      border: '1px solid #e5e7eb'
    }}>
      {title && ( // ADD THIS SECTION
        <h3 style={{ 
          margin: '0 0 20px 0', 
          fontSize: '16px', 
          fontWeight: 600,
          color: defaultColors.text 
        }}>
          {title}
        </h3>
      )}
      
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const yPos = 40 + (1 - ratio) * chartHeight;
          return (
            <div
              key={`grid-${index}`}
              style={{
                position: 'absolute',
                left: '40px',
                right: '20px',
                top: `${yPos}px`,
                height: '1px',
                backgroundColor: index === 0 ? '#e5e7eb' : '#f3f4f6',
                opacity: index === 0 ? 1 : 0.5
              }}
            />
          );
        })}
        
        {/* Y-axis */}
        <div style={{
          position: 'absolute',
          left: '40px',
          top: '0',
          bottom: '60px',
          width: '1px',
          backgroundColor: '#e5e7eb'
        }} />
        
        {/* X-axis */}
        <div style={{
          position: 'absolute',
          left: '40px',
          right: '20px',
          bottom: '60px',
          height: '1px',
          backgroundColor: '#e5e7eb'
        }} />
        
        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const value = Math.round(maxValue * ratio);
          const yPos = 40 + (1 - ratio) * chartHeight;
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: '0',
                top: `${yPos}px`,
                width: '35px',
                textAlign: 'right',
                fontSize: '11px',
                color: '#6b7280',
                transform: 'translateY(-50%)'
              }}
            >
              {value.toLocaleString()}
            </div>
          );
        })}
        
        {/* SVG Line Chart */}
        <svg
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            overflow: 'visible'
          }}
        >
          {/* Line connecting points */}
          <polyline
            points={points.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Points */}
          {points.map((point, index) => (
            <g key={`point-${index}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r="6"
                fill="white"
                stroke={color}
                strokeWidth="2"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill={color}
              />
              {/* Tooltip on hover */}
              <title>
                {data[index].name}: {data[index].value.toLocaleString()}
              </title>
            </g>
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div style={{
          position: 'absolute',
          left: '40px',
          right: '20px',
          bottom: '20px',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          {data.map((item, index) => (
            <div
              key={index}
              style={{
                fontSize: '11px',
                color: '#6b7280',
                textAlign: 'center',
                transform: `translateX(${pointWidth / 2}px) rotate(-45deg)`,
                transformOrigin: 'left top',
                whiteSpace: 'nowrap'
              }}
              title={item.name}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple Pie Chart Component
interface SimplePieChartProps {
  data: ChartDataPoint[];
  width?: number;
  height?: number;
  colors?: string[];
  title?: string; // ADD THIS LINE
}

export const SimplePieChart: React.FC<SimplePieChartProps> = ({ 
  data, 
  width = 300, 
  height = 300,
  colors = [defaultColors.primary, defaultColors.secondary, defaultColors.accent, '#f59e0b', '#ef4444', '#3b82f6'],
  title // ADD THIS LINE
}) => {
  if (!data || data.length === 0) {
    return (
      <div style={{
        width: `${width}px`,
        height: `${height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        color: '#6b7280'
      }}>
        <div>No data available</div>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = Math.min(width, height) / 2 - 40;
  const centerX = width / 2;
  const centerY = height / 2;
  
  let currentAngle = 0;
  const segments = [];
  
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const percentage = item.value / total;
    const angle = percentage * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;
    
    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (endAngle - 90) * Math.PI / 180;
    
    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    const path = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');
    
    segments.push({
      path,
      color: colors[i % colors.length],
      percentage,
      name: item.name,
      value: item.value,
      midAngle: startAngle + angle / 2,
      midRad: (startAngle + angle / 2 - 90) * Math.PI / 180
    });
  }

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: `${width}px`,
      height: `${height}px`,
      padding: '20px',
      backgroundColor: defaultColors.background,
      borderRadius: '12px',
      border: '1px solid #e5e7eb'
    }}>
      {title && ( // ADD THIS SECTION
        <h3 style={{ 
          margin: '0 0 20px 0', 
          fontSize: '16px', 
          fontWeight: 600,
          color: defaultColors.text,
          textAlign: 'center'
        }}>
          {title}
        </h3>
      )}
      
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <svg width={width} height={height}>
          {segments.map((segment, index) => (
            <g key={index}>
              <path
                d={segment.path}
                fill={segment.color}
                stroke="white"
                strokeWidth="2"
                opacity="0.9"
              />
              
              {/* Segment labels */}
              <text
                x={centerX + radius * 0.6 * Math.cos(segment.midRad)}
                y={centerY + radius * 0.6 * Math.sin(segment.midRad)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="11"
                fontWeight="600"
                fill="white"
              >
                {`${(segment.percentage * 100).toFixed(0)}%`}
              </text>
            </g>
          ))}
          
          {/* Center circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius * 0.3}
            fill="white"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
          
          <text
            x={centerX}
            y={centerY - 8}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fontWeight="600"
            fill="#374151"
          >
            Total
          </text>
          
          <text
            x={centerX}
            y={centerY + 10}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fontWeight="700"
            fill={defaultColors.primary}
          >
            {total.toLocaleString()}
          </text>
        </svg>
        
        {/* Legend */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '0',
          right: '0',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px'
        }}>
          {segments.map((segment, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '10px',
                color: '#6b7280'
              }}
            >
              <div style={{
                width: '10px',
                height: '10px',
                backgroundColor: segment.color,
                borderRadius: '2px',
                marginRight: '4px'
              }} />
              <span title={`${segment.name}: ${segment.value} (${(segment.percentage * 100).toFixed(1)}%)`}>
                {segment.name.length > 8 ? segment.name.substring(0, 8) + '...' : segment.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple Donut Chart Component (alternative to Pie)
interface SimpleDonutChartProps {
  data: ChartDataPoint[];
  width?: number;
  height?: number;
  colors?: string[];
  title?: string; // ADD THIS LINE
}

export const SimpleDonutChart: React.FC<SimpleDonutChartProps> = (props) => {
  return <SimplePieChart {...props} />;
};

// Utility function to generate chart data from analytics
export const generateChartData = {
  fromTrafficTrends: (trends: any[]): ChartDataPoint[] => {
    if (!trends) return [];
    return trends.slice(-7).map(trend => ({
      name: new Date(trend.date).toLocaleDateString('en-US', { weekday: 'short' }),
      value: trend.visits || 0
    }));
  },
  
  fromTrafficSources: (sources: any[]): ChartDataPoint[] => {
    if (!sources) return [];
    return sources.map(source => ({
      name: source.source,
      value: source.visits || 0
    }));
  },
  
  fromDeviceBreakdown: (devices: any[]): ChartDataPoint[] => {
    if (!devices) return [];
    return devices.map(device => ({
      name: device.device_type,
      value: device.visits || 0
    }));
  },
  
  fromBookingStatus: (statuses: any[]): ChartDataPoint[] => {
    if (!statuses) return [];
    return statuses.map(status => ({
      name: status.status,
      value: status.count || 0
    }));
  },
  
  fromConversationStatus: (statuses: any[]): ChartDataPoint[] => {
    if (!statuses) return [];
    return statuses.map(status => ({
      name: status.status,
      value: status.count || 0
    }));
  },
  
  fromPopularPages: (pages: any[]): ChartDataPoint[] => {
    if (!pages) return [];
    return pages.slice(0, 8).map(page => ({
      name: page.page.length > 15 ? page.page.substring(0, 15) + '...' : page.page,
      value: page.visits || 0
    }));
  }
};