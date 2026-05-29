import React from 'react';

export const HTMLContent: React.FC<{ content: string }> = ({ content }) => {
  return (
    <>
      <style>{`
        .dark .email-html-wrapper div[style*="background-color"] {
          background-color: #0b1329 !important;
          border-color: #1e293b !important;
          color: #f1f5f9 !important;
        }
        .dark .email-html-wrapper strong {
          color: #38bdf8 !important;
        }
        .dark .email-html-wrapper p {
          color: #cbd5e1 !important;
        }
        .dark .email-html-wrapper hr {
          border-color: #1e293b !important;
        }
      `}</style>
      <div 
        className="email-html-wrapper prose prose-sm max-w-none text-left"
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </>
  );
};
