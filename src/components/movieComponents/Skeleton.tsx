"use client";

import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = "" }: SkeletonProps) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );
};

// Movie Card Skeleton
export const MovieCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-full h-48 md:h-64 rounded-md" />
      <Skeleton className="w-3/4 h-4" />
      <Skeleton className="w-1/2 h-3" />
    </div>
  );
};

// Hero Section Skeleton
export const HeroSkeleton = () => {
  return (
    <div className="relative w-full h-[300px] sm:h-[500px] md:h-[600px]">
      <Skeleton className="w-full h-full rounded-lg" />
      
      {/* Overlay Content Skeleton */}
      <div className="absolute inset-0 bg-gray-200 bg-opacity-40 flex flex-col justify-between p-4 sm:p-6 md:p-12">
        {/* Top Section */}
        <div className="flex flex-col">
          <Skeleton className="w-3/4 h-8 sm:h-12 md:h-16 mb-2" />
          <Skeleton className="w-1/2 h-4 sm:h-5" />
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-5 rounded-full" />
            <Skeleton className="w-16 h-6" />
          </div>
          <Skeleton className="w-32 h-10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

// Movie Grid Skeleton
export const MovieGridSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-5">
      {Array.from({ length: count }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
};

// Category Title Skeleton
export const CategoryTitleSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
      <Skeleton className="w-48 h-6 sm:h-8" />
      <Skeleton className="w-20 h-4 sm:h-5" />
    </div>
  );
};

// Navigation Skeleton
export const NavigationSkeleton = () => {
  return (
    <div className="w-full bg-white">
      {/* Mobile Layout */}
      <div className="flex flex-row md:hidden items-center justify-between px-4 py-3 h-[60px]">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-5 h-5" />
          <Skeleton className="w-20 h-5" />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="w-8 h-8 rounded-lg" />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-row justify-between items-center h-[60px] px-4 py-0 gap-0">
        <div className="flex items-center gap-1">
          <Skeleton className="w-5 h-5" />
          <Skeleton className="w-20 h-4" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-24 h-8 rounded-lg" />
          <Skeleton className="w-8 h-8 rounded-lg" />
        </div>
        <Skeleton className="w-8 h-8 rounded-lg" />
      </div>
    </div>
  );
};
