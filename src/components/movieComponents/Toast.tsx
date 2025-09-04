"use client";

import React, { useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: 'error' | 'warning' | 'info';
  position?: 'top' | 'below-nav';
}

export default function Toast({ message, isVisible, onClose, type = 'error', position = 'top' }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // 5 секундын дараа автоматаар хаагдана

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200';
      case 'warning':
        return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200';
      default:
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'error':
        return 'text-red-500 dark:text-red-400';
      case 'warning':
        return 'text-gray-500 dark:text-gray-400';
      case 'info':
        return 'text-blue-500 dark:text-blue-400';
      default:
        return 'text-red-500 dark:text-red-400';
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'below-nav':
        return 'absolute top-[60px] left-0 right-0 z-40 px-4 md:px-[80px] pt-4';
      case 'top':
      default:
        return 'absolute top-0 left-0 right-0 z-40 px-4 md:px-[80px] pt-4';
    }
  };

  return (
    <div className={getPositionStyles()}>
      <div className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg max-w-2xl mx-auto ${getToastStyles()}`}>
        <AlertCircle className={`w-5 h-5 flex-shrink-0 ${getIconColor()}`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-white/20 dark:hover:bg-gray-700/20 rounded-md transition-colors"
        >
          <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
}
