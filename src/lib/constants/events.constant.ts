import { EventSourceInput } from "@fullcalendar/core/index.js";
import { parse } from "date-fns";
import { SessionContextValue } from "next-auth/react";

export function getAllEvents(
  appointments: Appointment[],
  session: SessionContextValue,
  t: (key: string) => string
): EventSourceInput {
  console.log("appoin", appointments);
  const appointmentTitle = t("appointment-link");

  const userRole = session.data?.userType;
  const userId = session.data?.id;

  let filteredAppointments = appointments;

  if (userRole === "patient") {
    filteredAppointments = appointments.filter((a) => a.patient._id === userId);
  } else if (userRole === "doctor") {
    filteredAppointments = appointments.filter((a) => a.doctor._id === userId);
  }

  return filteredAppointments.map((appointment) => {
    const startDate = new Date(appointment.appointmentDate);

    const timeSlotDate = parse(appointment.timeSlot, "h:mm a", new Date());
    const hours = timeSlotDate.getHours();
    const minutes = timeSlotDate.getMinutes();

    startDate.setHours(hours, minutes);

    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1);

    return {
      id: appointment._id,
      title: appointmentTitle,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      extendedProps: {
        status: appointment.status,
        patient: appointment.patient,
        doctor: appointment.doctor,
      },
    };
  });
}
