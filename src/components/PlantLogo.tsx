import React from 'react';

interface PlantLogoProps {
  className?: string;
}

export const PlantLogo: React.FC<PlantLogoProps> = ({className = 'w-8 h-8'}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect width="512" height="512" rx="128" fill="#E3F2FD" />
      <circle cx="256" cy="256" r="184" fill="#FFFFFF" />
      <path d="M256 382V214" stroke="#15803D" strokeWidth="26" strokeLinecap="round" />
      <path
        d="M256 266C256 266 176 262 152 192C146 174 156 154 176 152C228 148 256 204 256 266Z"
        fill="#22C55E"
      />
      <path
        d="M256 266C256 266 204 222 174 180"
        stroke="#14532D"
        strokeWidth="12"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M256 292C256 292 346 286 372 208C378 188 366 168 344 166C288 162 256 226 256 292Z"
        fill="#16A34A"
      />
      <path
        d="M256 292C256 292 316 244 348 198"
        stroke="#14532D"
        strokeWidth="12"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M256 216C256 216 218 148 256 108C294 148 256 216 256 216Z"
        fill="#15803D"
      />
      <path d="M206 382H306" stroke="#0F766E" strokeWidth="22" strokeLinecap="round" />
    </svg>
  );
};
