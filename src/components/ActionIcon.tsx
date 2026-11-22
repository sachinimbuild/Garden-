import React from 'react';
import {Mail, MapPin, Phone} from 'lucide-react';
import type {GardenActionItem} from '../data/gardenLinks';

interface ActionIconProps {
  id: GardenActionItem['id'];
  className?: string;
}

export const ActionIcon: React.FC<ActionIconProps> = ({id, className = 'h-5 w-5'}) => {
  switch (id) {
    case 'location':
      return <MapPin className={className} aria-hidden="true" />;
    case 'call':
      return <Phone className={className} aria-hidden="true" />;
    case 'email':
      return <Mail className={className} aria-hidden="true" />;
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M13.5 22v-8.25h2.77l.41-3.22H13.5V8.48c0-.93.26-1.57 1.6-1.57h1.71V4.03c-.3-.04-1.31-.13-2.49-.13-2.46 0-4.15 1.5-4.15 4.26v2.37H7.38v3.22h2.79V22h3.33Z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.95C17.93 4.78 12 4.78 12 4.78s-5.93 0-7.64.46A2.75 2.75 0 0 0 2.42 7.2 28.8 28.8 0 0 0 1.96 12a28.8 28.8 0 0 0 .46 4.81 2.75 2.75 0 0 0 1.94 1.95c1.71.46 7.64.46 7.64.46s5.93 0 7.64-.46a2.75 2.75 0 0 0 1.94-1.95A28.8 28.8 0 0 0 22.04 12a28.8 28.8 0 0 0-.46-4.81ZM10 15.11V8.89L15.4 12 10 15.11Z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .595.042.88.126V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.44 6.29 6.29 0 0 0 1.82-4.44V8.7a8.18 8.18 0 0 0 4.8 1.54V6.8a4.9 4.9 0 0 1-.89-.11Z" />
        </svg>
      );
  }
};
