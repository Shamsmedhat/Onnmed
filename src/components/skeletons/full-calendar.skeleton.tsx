import { Skeleton } from "@/components/ui/skeleton";

export default function CalendarSkeleton() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const times = [
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
  ];

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-48" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-8 gap-1">
        {/* Time slots */}
        <div className="col-span-1">
          {times.map((time, index) => (
            <Skeleton key={index} className="h-12 w-full mb-1" />
          ))}
        </div>

        {days.map((day, dayIndex) => (
          <div key={dayIndex} className="col-span-1">
            <Skeleton className="h-8 w-full mb-2" />
            {times.map((_, timeIndex) => {
              const hasAppointment =
                (dayIndex === 1 && timeIndex >= 2 && timeIndex <= 5) ||
                (dayIndex === 2 && (timeIndex === 0 || (timeIndex >= 2 && timeIndex <= 4))); //
              return (
                <div key={timeIndex} className="h-12 w-full mb-1">
                  {hasAppointment ? (
                    <Skeleton className="h-full w-full bg-blue-200" />
                  ) : (
                    <Skeleton className="h-full w-full bg-gray-200" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
