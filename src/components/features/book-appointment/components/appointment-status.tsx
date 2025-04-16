"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { allStatusOptions } from "@/lib/constants/appointment-status.constant";

type AppointmentStatusProps = {
  status: string;
  setStatus: (status: string) => void;
  statusColor: string;
  setStatusColor: (color: string) => void;
};

export default function AppointmentStatus({
  status,
  setStatus,
  statusColor,
  setStatusColor,
}: AppointmentStatusProps) {
  // Translation

  // Functions
  const statusOptions = allStatusOptions();
  function handleStatusChange(newStatus: string) {
    setStatus(newStatus);
    switch (newStatus) {
      case "pending":
        setStatusColor("bg-yellow-500");
        break;
      case "confirmed":
        setStatusColor("bg-green-500");
        break;
      case "cancelled":
        setStatusColor("bg-red-500");
        break;
      case "completed":
        setStatusColor("bg-sky-500");
        break;
      default:
        setStatusColor("bg-yellow-500");
    }
  }

  return (
    <DropdownMenu>
      {/* Status trigger */}
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="capitalize gap-3">
          <span>{status}</span>
          <span className="relative flex size-3">
            <span
              className={cn(
                statusColor,
                "absolute inline-flex h-full w-full animate-ping rounded-full  opacity-75"
              )}
            ></span>
            <span className={cn(statusColor, "relative inline-flex size-3 rounded-full")}></span>
          </span>
        </Button>
      </DropdownMenuTrigger>

      {/* Status list */}
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup className="capitalize">
          {statusOptions.map(({ label, icon }) => (
            <DropdownMenuItem key={label} onClick={() => handleStatusChange(label)}>
              {label}
              <DropdownMenuShortcut>{icon}</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
