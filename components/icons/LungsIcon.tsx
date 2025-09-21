import React from 'react';

const LungsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12 20a4 4 0 0 0-4-4H6a2 2 0 0 0-2 2v2" />
    <path d="M12 20a4 4 0 0 1 4-4h2a2 2 0 0 1 2 2v2" />
    <path d="M12 4v12" />
    <path d="M12 4a4 4 0 0 1-4-4" />
    <path d="M12 4a4 4 0 0 0 4-4" />
    <path d="m8 12 4 4 4-4" />
  </svg>
);

export default LungsIcon;