"use client";

import React from 'react';
import { Search } from 'lucide-react';

interface NoResultsProps {
  query: string;
}

export default function NoResults({ query }: NoResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      {/* Icon */}
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Search className="w-10 h-10 text-gray-400" />
      </div>
      
      {/* Main message */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          No results found
        </h3>
        <p className="text-lg text-gray-600 mb-2">
          We couldn&apos;t find any movies matching
        </p>
        <p className="text-lg font-medium text-gray-800">
          &quot;{query}&quot;
        </p>
      </div>
      
      {/* Suggestions */}
      <div className="bg-gray-50 rounded-lg p-6 max-w-md w-full">
        <h4 className="font-semibold text-gray-900 mb-3">Try these suggestions:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Check your spelling</li>
          <li>• Use more general keywords</li>
          <li>• Try different search terms</li>
          <li>• Browse movies by genre instead</li>
        </ul>
      </div>
    </div>
  );
}
