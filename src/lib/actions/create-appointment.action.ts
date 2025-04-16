"use server";
import { API_HEADERS } from "@/lib/constants/headers.constant";
import { revalidateTag } from "next/cache";

export async function createAppointmentAction(fields: AppointmentsFields) {
  const res = await fetch(`${process.env.API}/appointments`, {
    method: "POST",
    headers: {
      ...API_HEADERS,
    },
    body: JSON.stringify(fields),
  });

  //todo types
  const payload = await res.json();

  revalidateTag("appointments");
  return {
    status: res.status,
    ok: res.ok,
    ...payload,
  };
}
