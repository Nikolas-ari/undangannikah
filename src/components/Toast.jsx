import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const Toast = ({ message, show }) => {
  return (
    <div className={`toast-popup ${show ? 'show' : ''}`}>
      <CheckCircle2 size={16} color="#d4af37" />
      <span>{message}</span>
    </div>
  );
};
