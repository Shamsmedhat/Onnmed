"use server";
import { API_HEADERS } from "@/lib/constants/headers.constant";
import { decode } from "next-auth/jwt";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function deleteAppointmentAction(id: string) {
  const tokenCookie = cookies().get("next-auth.session-token")?.value;
  const token = await decode({ secret: process.env.NEXTAUTH_SECRET!, token: tokenCookie });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/appointments/${id}`, {
    method: "DELETE",
    headers: {
      ...API_HEADERS,
      Authorization: `Bearer ${token?.token}`,
    },
    body: JSON.stringify({ userType: token?.userType }),
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
