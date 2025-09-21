import React from 'react';

const ComputerDesktopIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <line x1="7" y1="20" x2="17" y2="20" />
    <line x1="12" y1="16" x2="12" y2="20" />
  </svg>
);

export default ComputerDesktopIcon;