import React from "react";
import { BookingNewAppointment } from "./components/booking-new-appointment";

export default async function BookAppointment() {
  // Fetch
  const [appointmentsRes, allDoctorsRes] = await Promise.all([
    fetch(process.env.API + "/appointments", {
      cache: "no-store",
      next: { tags: ["appointments"] },
    }),
    fetch(process.env.API + "/users", {
      cache: "no-store",
      next: { tags: ["doctors"] },
    }),
  ]);

  // Data
  const appointmentsPayload = await appointmentsRes.json();
  const usersPayload = await allDoctorsRes.json();

  return (
    <BookingNewAppointment
      appointments={appointmentsPayload.appointments}
      users={usersPayload.users}
    />
  );
}
