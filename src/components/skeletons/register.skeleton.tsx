"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function RegisterSkeleton() {
  return (
    <div className="p-6 max-w-md w-full">
      <div className="space-y-4">
        {/*  Name Field */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        {/* Phone Field */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        {/* Email Field */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        {/* Password Field */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        {/* rePassword Field */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        {/* Gender Field */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        {/* Update Button */}
        <Skeleton className="h-10 w-full rounded-md" /> {/* Button */}
      </div>
    </div>
  );
}
