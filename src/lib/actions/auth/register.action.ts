"use server";
import { API_HEADERS } from "@/lib/constants/headers.constant";
import { RegisterFields, SignUpResponse } from "@/lib/types/auth";

export async function registerAction(fields: RegisterFields) {
  const response = await fetch(`${process.env.API}/auth/signup`, {
    method: "POST",
    headers: {
      ...API_HEADERS,
    },
    body: JSON.stringify(fields),
  });

  const payload: APIResponse<SignUpResponse> = await response.json();
  return payload;
}
