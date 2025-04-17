import { cn } from "@/lib/utils";
import React, { Dispatch } from "react";

type SlotsButtonsTypes = {
  slots: string[];
  isSlotBooked: (slot: string) => boolean;
  setTime: Dispatch<React.SetStateAction<string | undefined>>;
  time?: string;
};

export default function SlotsButtons({ slots, isSlotBooked, setTime, time }: SlotsButtonsTypes) {
  return (
    <div className="grid grid-cols-3 gap-1 m-4 ">
      {slots.map((t) => {
        const isBooked = isSlotBooked(t);
        const isSelected = t === time;

        return (
          <button
            key={t}
            disabled={isSlotBooked(t)}
            className={cn(
              "border rounded-md p-2 mb-3",
              isBooked ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "text-main-black",
              isSelected && !isBooked && "bg-main-black/80 text-main-white",
              !isBooked && !isSelected && "hover:bg-main-black/80 hover:text-main-white"
            )}
            onClick={() => setTime(t)}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}
