"use server";

import { API_HEADERS } from "@/lib/constants/headers.constant";
import { revalidateTag } from "next/cache";

export async function updateAppointmentAction(fields: { status: string }, id: string) {
  const res = await fetch(`${process.env.API}/appointments/${id}`, {
    method: "PUT",
    headers: {
      ...API_HEADERS,
    },
    body: JSON.stringify(fields),
  });

  //todo types
  const payload = await res.json();

  // Revalidate appointments to keep the ui async
  revalidateTag("appointments");

  return {
    status: res.status,
    ok: res.ok,
    ...payload,
  };
}
