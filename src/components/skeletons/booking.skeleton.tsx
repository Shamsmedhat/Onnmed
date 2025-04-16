import { Skeleton } from "@/components/ui/skeleton";

export default function BookingSkeleton() {
  return (
    <div>
      {/* Booking Skeleton */}
      <div className="grid grid-cols-1 grid-rows-2 lg:grid-rows-1 xl:grid-cols-2 bg-main-white border-2 border-sidebar-border rounded-xl min-h-[400px]">
        {/* Calendar & Time Slots Skeleton */}
        <div className="p-4 col-span-1 row-span-1 border-r border-sidebar-border flex-grow-0 capitalize">
          <div className="flex flex-col items-center mb-4 justify-around h-full sm:flex-row">
            {/* Calendar Skeleton */}
            <Skeleton className="w-[250px] h-[300px] rounded-md" />

            {/* Time Slots Skeleton */}
            <div className="flex flex-col items-center justify-center text-center gap-3 flex-grow h-full w-full px-4">
              {/* Header Skeleton */}
              <div className="flex justify-between items-center w-full mb-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-6 w-20 rounded" />
              </div>
              {/* Time Buttons Skeleton */}
              <div className="grid grid-cols-3 gap-2 w-full">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Form Skeleton */}
        <div className="flex col-span-1 row-span-2 lg:row-span-1 p-4">
          <div className="flex flex-col w-full gap-4">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-10 w-full rounded" />
            <Skeleton className="h-10 w-full rounded" />
            <Skeleton className="h-10 w-full rounded" />
            <Skeleton className="h-10 w-1/2 rounded" />
          </div>
        </div>
      </div>

      {/* View All Appointments Skeleton */}
      <div className="my-6 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded" />
        ))}
      </div>
    </div>
  );
}
