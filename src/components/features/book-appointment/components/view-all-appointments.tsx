/* eslint-disable prefer-const */
"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import useDeleteAppointment from "@/hooks/use-delete-appointment";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getAllEvents } from "@/lib/constants/events.constant";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import UpdateAppointmentSkeleton from "@/components/skeletons/update-appointment.skeleton";
const UpdateAppointmentForm = dynamic(() => import("./update-appointment-form"), {
  ssr: false,
  loading: () => <UpdateAppointmentSkeleton />,
});

// Types
type ViewAllAppointmentsProps = {
  appointments: Appointment[];
  statusColor: string;
};

export default function ViewAllAppointments({ appointments }: ViewAllAppointmentsProps) {
  // Translations
  const t = useTranslations();

  // Session
  const session = useSession();

  // Hooks
  const { deleteAppointment, error, isPending } = useDeleteAppointment();

  // Variables
  const events = useMemo(() => getAllEvents(appointments, session, t), [appointments, session, t]);
  const patientUser = session.data?.userType === "patient";
  const adminUser = session.data?.userType === "admin";
  const doctorUser = session.data?.userType === "doctor";

  // Functions
  // (map appointments to event format)
  const handleDeleteAppointment = (id: string) => {
    if (patientUser) return;
    deleteAppointment(id, {
      onSuccess: () => {
        toast.success(t("appointment-deleted-successfully"));
      },
      onError: () => {
        toast.error(error?.message);
      },
    });
  };

  return (
    <div className="mx-auto">
      <FullCalendar
        viewClassNames={"lg:h-[990px]"}
        dragScroll={true}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        editable={false}
        selectable={false}
        selectMirror={true}
        dayMaxEvents={true}
        allDaySlot={false}
        slotDuration="01:00:00"
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        }}
        businessHours={[
          {
            startTime: "08:00",
            endTime: "20:00",
            // Monday to Friday
            daysOfWeek: [1, 2, 3, 4, 5],
          },
        ]}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
        eventContent={(eventInfo) => {
          const { event } = eventInfo;
          const { title, start, end, extendedProps } = event;
          const startTime = start?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          const endTime = end?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          const status = extendedProps.status;

          return (
            <>
              {/* SM screen */}
              <div className="flex flex-col lg:hidden justify-center items-center my-auto h-full">
                {/* Appointments info */}
                <Select>
                  {/* Info trigger */}
                  <SelectTrigger className="w-fit h-auto bg-transparent hover:bg-transparent border-0 shadow-none focus:ring-0 focus:outline-none px-0 py-0">
                    <SelectValue
                      placeholder={
                        <p className="text-white capitalize underline">{t("details")}</p>
                      }
                    />
                  </SelectTrigger>

                  {/* Info content */}
                  <SelectContent>
                    <SelectGroup>
                      <div className="flex text-xs justify-start items-start capitalize h-full p-1">
                        <div className="flex flex-col justify-between h-full flex-grow">
                          {/* Info title */}
                          <div className="font-semibold text-main-black">{title}</div>
                          {/* Info time slot */}
                          <div className="font-semibold text-main-black">{`${startTime} - ${endTime}`}</div>

                          {/* Info status */}
                        </div>
                        <div className="font-semibold text-main-black">{status}</div>
                      </div>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {/* Delete and edit */}
                {(doctorUser || adminUser) && (
                  <div className="flex flex-col">
                    {/* Delete button */}
                    <Button
                      onClick={() => handleDeleteAppointment(event.id)}
                      disabled={isPending}
                      className="w-fit h-auto bg-transparent hover:bg-transparent border-0 shadow-none focus:ring-0 focus:outline-none px-0 py-0"
                    >
                      <span className="text-red-600 capitalize underline">{t("delete")}</span>
                    </Button>

                    {/* Edit button */}
                    <Dialog>
                      {/* Login button */}
                      <DialogTrigger asChild>
                        <Button className="w-fit h-auto bg-transparent hover:bg-transparent border-0 shadow-none focus:ring-0 focus:outline-none px-0 py-0">
                          <span className="text-main-gold-600 capitalize underline">
                            {t("edit")}
                          </span>
                        </Button>
                      </DialogTrigger>

                      {/* Dialog content */}
                      <DialogContent className="sm:max-w-[425px]" aria-description="onnmed">
                        {/* Dialog header */}
                        <DialogHeader>
                          <DialogTitle className="text-3xl font-normal capitalize">
                            {t("update-appointment")}
                          </DialogTitle>
                        </DialogHeader>
                        <UpdateAppointmentForm event={event} appointments={appointments} />
                        <DialogDescription>{t("update-appointment")}</DialogDescription>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>

              {/* LG screen */}
              <div className="hidden lg:flex flex-col text-xs justify-start items-start capitalize h-full p-1">
                {/* Appointments info */}
                <div className="flex flex-col justify-evenly h-full flex-grow">
                  {/* Info title */}
                  <div className="font-semibold">{title}</div>
                  {/* Info time slot */}
                  <div className="text-main-white">{`${startTime} - ${endTime}`}</div>
                  {/* Info status */}
                  <div
                    className={cn(
                      "bg-main-white/80 text-main-black font-semibold w-fit rounded-md py-[2px] px-[3px]"
                    )}
                  >
                    {status}
                  </div>
                </div>
                {/* Delete and edit */}

                {(adminUser || doctorUser) && (
                  <div className="flex gap-3">
                    {/* Delete button */}
                    {adminUser && (
                      <Button
                        onClick={() => handleDeleteAppointment(event.id)}
                        disabled={isPending}
                        className="h-7 w-7 bg-red-400 hover:bg-red-400/80"
                      >
                        <RiDeleteBin5Line className="!size-5" />
                      </Button>
                    )}

                    {/* Edit button */}
                    <Dialog>
                      {/* Login button */}
                      <DialogTrigger asChild>
                        <Button className="h-7 w-7 bg-main-gold-600 hover:bg-main-gold-600/80">
                          <CiEdit className="!size-5" />
                        </Button>
                      </DialogTrigger>

                      {/* Dialog content */}
                      <DialogContent
                        onClick={(e) => e.stopPropagation()}
                        className="sm:max-w-[425px]"
                        aria-description="onnmed"
                      >
                        {/* Dialog header */}
                        <DialogHeader>
                          <DialogTitle className="text-3xl font-normal capitalize">
                            {t("update-appointment")}
                          </DialogTitle>
                        </DialogHeader>

                        {/* Update appointment form */}
                        <UpdateAppointmentForm event={event} appointments={appointments} />
                        <DialogDescription className="sr-only">
                          {t("update-appointment")}
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            </>
          );
        }}
      />
    </div>
  );
}
