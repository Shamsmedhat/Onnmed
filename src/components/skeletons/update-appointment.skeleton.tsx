"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function UpdateAppointmentSkeleton() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md w-full">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>

      <div className="space-y-4">
        {/* Doctor Name Field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        {/* Patient Name Field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        {/* Date Field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        {/* Time Field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        {/* Status Field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        {/* Update Button */}
        <Skeleton className="h-10 w-full rounded-md" /> {/* Button */}
      </div>
    </div>
  );
}
