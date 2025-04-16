"use client";

import { Calendar } from "@/components/ui/calendar";
import { useTranslations } from "next-intl";
import { memo, useCallback, useEffect, useState } from "react";
import AppointmentStatus from "./appointment-status";
import CreateAppointmentForm from "./create-appointment-form";
import SlotsButtons from "./slots-buttons";
import { availableTimeSlots } from "@/lib/constants/available-time-slots.constant";
import dynamic from "next/dynamic";
import CalendarSkeleton from "@/components/skeletons/full-calendar.skeleton";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import docImage from "@/../public/assets/images/doctor.png";
import { FcApproval } from "react-icons/fc";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const ViewAllAppointments = dynamic(() => import("./view-all-appointments"), {
  loading: () => (
    <div className="text-center py-4">
      <CalendarSkeleton />
    </div>
  ),
  ssr: false,
});
const MemoizedViewAllAppointments = memo(ViewAllAppointments);
// Types
type BookingNewAppointmentProps = {
  appointments: Appointment[];
  users: Users[];
};

export function BookingNewAppointment({ appointments, users }: BookingNewAppointmentProps) {
  // Translation
  const t = useTranslations();

  // Session
  const session = useSession();

  // Variables
  const patientUser = session.data?.userType === "patient";
  const guestUser = session.status === "unauthenticated";
  const admintUser = session.data?.userType === "admin";
  const doctorUser = session.data?.userType === "doctor";

  // State
  const [guestAppointment, setGuestAppointment] = useState<GuestAppointment["appointment"]>();

  const [date, setDate] = useState<Date | undefined>(() => {
    const tomorrow = new Date();
    // Sets the date to tomorrow
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });

  const formattedDate = date?.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Hooks
  const [time, setTime] = useState<string | undefined>(undefined);
  const [slots] = useState<string[]>(() => availableTimeSlots || []);
  const [status, setStatus] = useState("pending");
  const [statusColor, setStatusColor] = useState("bg-yellow-500");

  // Functions
  const isSlotBooked = useCallback(
    (slot: string) => {
      return appointments?.some(
        (appointment) =>
          appointment.timeSlot === slot &&
          new Date(appointment.appointmentDate).toDateString() === date?.toDateString()
      );
    },
    [appointments, date]
  );

  useEffect(() => {
    if (guestAppointment) {
      localStorage.setItem("guestAppointment", JSON.stringify(guestAppointment));
    }
  }, [guestAppointment]);

  useEffect(() => {
    const storedAppointment = localStorage.getItem("guestAppointment");
    if (storedAppointment) {
      setGuestAppointment(JSON.parse(storedAppointment));
    }
  }, []);

  // For show GUEST appointment
  if (guestAppointment) {
    const { appointmentDate, createdAt, doctor, email, timeSlot } = guestAppointment;
    const allDoctors = users.filter((u) => u.userType === "doctor");
    const selectedDoctor = allDoctors.find((d) => d._id === doctor);

    return (
      <Card className="rounded-2xl shadow-sm p-4 space-y-2 w-full ">
        <CardContent className="space-y-6">
          <div className="flex text-4xl items-center">
            <FcApproval />
            <span className="text-green-600 first-letter:capitalize">
              {t("scheduled-successfully")}
            </span>
          </div>
          <div className="flex justify-start items-center align-middle">
            <Avatar>
              <AvatarImage
                src={
                  "https://png.pngtree.com/png-clipart/20220911/original/pngtree-male-doctor-avatar-icon-illustration-png-image_8537702.png"
                }
              />
              <AvatarFallback>DR.</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-semibold capitalize">
              {t("with-dr")}
              {selectedDoctor?.name}
            </h2>
          </div>
          <div className="text-gray-600 text-lg">
            <p>
              <span className="font-medium">{t("appointment-created-date")}</span>{" "}
              {new Date(createdAt).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">{t("appointment-date-0")}</span>{" "}
              {new Date(appointmentDate).toLocaleDateString()}
            </p>
            <p className="space-x-2">
              <span className="font-medium">{t("your-appointment-is-at")}</span>
              <span className="text-main-gold-800 font-bold">{timeSlot}</span>
            </p>
            <p>
              <span className="font-medium">
                {t("the-appointment-was-set-via")} {email}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // For GUEST add appointment
  if (guestUser) {
    return (
      <div>
        {/* Booking */}
        <div className="grid grid-cols-1 grid-rows-2 lg:grid-rows-1 xl:grid-cols-2 bg-main-white border-2 border-sidebar-border rounded-xl min-h-[400px]">
          {/* Calendar & Selected date and time */}
          <div className="p-4 col-span-1 row-span-1 border-r border-sidebar-border flex-grow-0 capitalize">
            <div className="flex flex-col items-center mb-4 justify-around h-full sm:flex-row">
              {/* Calendar */}
              <div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border shadow"
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date <= today;
                  }}
                />
              </div>

              {/* Selected time slots */}
              <div className="flex flex-col items-center justify-center text-center gap-3 flex-grow h-full">
                {/* Slots section */}
                <div className="w-full">
                  {/* Appointment header */}
                  <div className="flex items-center justify-between m-4">
                    <span className="text-sm font-medium">{t("available-time-slots")}</span>
                  </div>
                  {/* Slots buttons */}
                  <SlotsButtons
                    slots={slots}
                    isSlotBooked={isSlotBooked}
                    setTime={setTime}
                    time={time}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Appointment form */}
          <div className="flex col-span-1 row-span-2 lg:row-span-1">
            <CreateAppointmentForm
              status={status}
              statusColor={statusColor}
              appointmentDate={formattedDate}
              timeSlot={time}
              users={users}
              setTime={setTime}
              setGuestAppointment={setGuestAppointment}
            />
          </div>
        </div>
      </div>
    );
  }

  // For PATIEN
  if (patientUser) {
    return (
      <div className=" my-6">
        <MemoizedViewAllAppointments appointments={appointments} statusColor={statusColor} />
      </div>
    );
  }

  // For DOCTOR
  if (doctorUser) {
    return (
      <div>
        {/* View */}
        <div className="my-6">
          <MemoizedViewAllAppointments appointments={appointments} statusColor={statusColor} />
        </div>
      </div>
    );
  }

  // For ADMIN
  if (admintUser) {
    return (
      <div>
        {/* Booking */}
        <div className="grid grid-cols-1 grid-rows-2 lg:grid-rows-1 xl:grid-cols-2 bg-main-white border-2 border-sidebar-border rounded-xl min-h-[400px]">
          {/* Calendar & Selected date and time */}
          <div className="p-4 col-span-1 row-span-1 border-r border-sidebar-border flex-grow-0 capitalize">
            <div className="flex flex-col items-center mb-4 justify-around h-full sm:flex-row">
              {/* Calendar */}
              <div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border shadow"
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date <= today;
                  }}
                />
              </div>

              {/* Selected time slots */}
              <div className="flex flex-col items-center justify-center text-center gap-3 flex-grow h-full">
                {/* Slots section */}
                <div className="w-full">
                  {/* Appointment header */}
                  <div className="flex items-center justify-between m-4">
                    <span className="text-sm font-medium">{t("available-time-slots")}</span>
                    <AppointmentStatus
                      setStatus={setStatus}
                      setStatusColor={setStatusColor}
                      status={status}
                      statusColor={statusColor}
                    />
                  </div>
                  {/* Slots buttons */}
                  <SlotsButtons
                    slots={slots}
                    isSlotBooked={isSlotBooked}
                    setTime={setTime}
                    time={time}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Appointment form */}
          <div className="flex col-span-1 row-span-2 lg:row-span-1">
            <CreateAppointmentForm
              status={status}
              statusColor={statusColor}
              appointmentDate={formattedDate}
              timeSlot={time}
              users={users}
              setTime={setTime}
              setGuestAppointment={setGuestAppointment}
            />
          </div>
        </div>
        {/* View */}
        <div className="my-6">
          <MemoizedViewAllAppointments appointments={appointments} statusColor={statusColor} />
        </div>
      </div>
    );
  }
}
