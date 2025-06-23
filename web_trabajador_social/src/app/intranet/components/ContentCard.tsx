import React from 'react';

interface ContentCardProps {
  children: React.ReactNode;
  className?: string; // Optional: Allow passing additional classes
}

const ContentCard: React.FC<ContentCardProps> = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md ${className || ''}`}>
      <div className="p-3">
        {children}
      </div>
    </div>
  );
};

export default ContentCard; 