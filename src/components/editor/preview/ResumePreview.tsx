import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import JamieTemplate from './JamieTemplate';
import LaurenTemplate from './LaurenTemplate';
import JuanTemplate from './JuanTemplate';
import RichardTemplate from './RichardTemplate';

const ResumePreview = () => {
  const { resumeData } = useResume();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const renderTemplate = () => {
    switch (resumeData.activeTemplate) {
      case 'jamie':
        return <JamieTemplate />;
      case 'lauren':
        return <LaurenTemplate />;
      case 'juan':
        return <JuanTemplate />;
      case 'richard':
        return <RichardTemplate />;
      default:
        return <JamieTemplate />;
    }
  };

  return (
    <div className="h-full w-full overflow-auto bg-gray-100">
      <div className="min-h-screen p-2 sm:p-4">
        <div 
          className={cn(
            "transform transition-transform duration-300",
            isMobile ? "scale-100" : "scale-100"
          )}
          style={{
            transformOrigin: 'top center',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingBottom: isMobile ? '1rem' : '2rem'
          }}
        >
          <div className={cn(
            "w-full resume-preview-container",
            isMobile ? "shadow-lg rounded-lg overflow-hidden" : "max-w-[210mm]"
          )}>
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;