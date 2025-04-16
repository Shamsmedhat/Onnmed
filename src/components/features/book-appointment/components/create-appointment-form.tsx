"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import appointmentImage from "@../../../public/assets/images/appointment.jpg";
import * as z from "zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useCreateAppointment from "@/hooks/use-create-appointment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// Types
type AppointmentSummaryFormProps = {
  status: string;
  statusColor: string;
  appointmentDate?: string;
  timeSlot?: string;
  users: Users[];
  setTime: Dispatch<SetStateAction<string | undefined>>;
  setGuestAppointment: Dispatch<SetStateAction<GuestAppointment["appointment"] | undefined>>;
};

export default function AppointmentSummaryForm({
  status,
  statusColor,
  appointmentDate,
  timeSlot,
  users,
  setTime,
  setGuestAppointment,
}: AppointmentSummaryFormProps) {
  // Translation
  const t = useTranslations();

  // Hooks
  const { isPending, error, createNewAppointment } = useCreateAppointment();

  // Session
  const session = useSession();

  // Variables
  const allowedStatuses = ["pending", "confirmed", "cancelled", "completed"];
  const patientUser = session.data?.userType === "patient";
  const guest = session.status === "unauthenticated";

  // Schema
  const AppointmentSchema = z.object({
    patient: z.string().optional(),
    email: z
      .string()
      .email()
      .refine((val) => (guest ? !!val : true), { message: t("email-required") })
      .optional(),
    doctor: z.string().min(2, { message: t("doctor-name-required") }),
    createdBy: z.string(),
    appointmentDate: z
      .string()
      .min(3, { message: t("date-required") })
      .refine((val) => !isNaN(Date.parse(val)), { message: t("invalid-date") }),
    timeSlot: z
      .string()
      .min(1, { message: t("timeslot-required") })
      .regex(/^(1[0-2]|[1-9]):[0-5][0-9] (AM|PM)$/, { message: t("invalid-timeslot") }),
    status: z
      .string()
      .refine((val) => allowedStatuses.includes(val), { message: t("invalid-status-selected") }),
  });

  // Form
  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      patient: undefined,
      email: undefined,
      doctor: undefined,
      createdBy: session.data?.id || undefined,
      appointmentDate,
      timeSlot,
      status,
    },
  });
  type AppointmentFormData = z.infer<typeof AppointmentSchema>;

  // Functions
  const onSubmit = async (values: z.infer<typeof AppointmentSchema>) => {
    if (patientUser) return;
    if (guest) {
      const newValues = {
        email: values.email,
        doctor: values.doctor,
        createdBy: values.email,
        appointmentDate: values.appointmentDate,
        timeSlot: values.timeSlot,
        status: values.status,
      };

      createNewAppointment(
        {
          ...newValues,
          status: newValues.status as "pending" | "confirmed" | "cancelled" | "completed",
        },
        {
          onSuccess: (data) => {
            setGuestAppointment(data.appointment);
            toast.success(t("appointment-created-successfully"));
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    }
    setTime("");

    if (session.data?.userType === "admin" || session.data?.userType === "patient") {
      const newValues = {
        patient: values.patient,
        email: values.email,
        doctor: values.doctor,
        createdBy: values.createdBy,
        appointmentDate: values.appointmentDate,
        timeSlot: values.timeSlot,
        status: values.status,
      };

      createNewAppointment({
        ...newValues,
        status: newValues.status as "pending" | "confirmed" | "cancelled" | "completed",
      });
      setTime("");
    }
  };
  // Variables
  // Watch the fields you care about
  const appointmentDateValue = form.watch("appointmentDate");
  const timeSlotValue = form.watch("timeSlot");
  const doctorValue = form.watch("doctor");
  const allDoctors = users.filter((u) => u.userType === "doctor");
  const selectedDoctor = allDoctors.find((doctor) => doctor._id === form.watch("doctor"));
  const doctorName = selectedDoctor ? selectedDoctor.name : t("select-doctor");
  const allPatient = users.filter((u) => u.userType === "patient");

  // Button state logic
  const isDisabled =
    isPending ||
    form.formState.isSubmitting ||
    !appointmentDateValue ||
    !timeSlotValue ||
    !doctorValue;

  // Effects
  useEffect(() => {
    form.setValue("timeSlot", timeSlot || "");
    form.setValue("doctor", doctorValue || "");
    form.setValue("createdBy", session.data?.id || "");
    form.setValue("status", status || "pending");
    form.setValue("appointmentDate", appointmentDate || "");
  }, [timeSlot, doctorValue, status, appointmentDate, form]);

  return (
    <Form {...form}>
      <form className="flex items-center gap-2 w-full" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Image section */}
        <div className="relative w-1/2 h-full">
          <Image
            src={appointmentImage}
            alt="Onnmed – Experts in clinical research and medical publishing in the UAE, offering end-to-end support from study design to high-impact journal publication, bridging research, innovation, and patient-centric care."
            className="absolute object-cover"
            sizes="350"
            fill
          />
        </div>

        {/* Form section */}
        <div className="p-0 lg:p-4 flex flex-col justify-center gap-4 w-1/2 h-full capitalize">
          {/* Appointment status */}
          <FormItem className="flex flex-col sm:flex-row gap-3 items-center align-middle">
            <FormLabel className="text-main-gold-800 font-semibold text-lg">
              {t("appointment-status")}
            </FormLabel>
            <FormControl>
              <div className="!mt-0">
                <Badge className={cn(statusColor, "hover:bg-inherit")}>{status}</Badge>
                <Input type="hidden" {...form.register("status")} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>

          {/* Patient Name */}
          {guest ? (
            <FormItem className="flex flex-col sm:flex-row gap-3 items-center align-middle">
              <FormLabel className="text-main-gold-800 font-semibold text-lg">
                {t("email")}
              </FormLabel>
              <FormControl>
                <div className="!mt-0">
                  <Input {...form.register("email")} placeholder={t("add-your-email")} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          ) : (
            <FormItem>
              <FormLabel className="text-main-gold-800 font-semibold text-lg">
                {t("patient-0")}
              </FormLabel>

              {/* Call register once just to register the field */}
              <input type="hidden" {...form.register("patient")} />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="capitalize w-full justify-between">
                    {allPatient.find((d) => d._id === form.watch("patient"))?.name ||
                      "Select patient"}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-full">
                  <DropdownMenuGroup>
                    {allPatient.map((p) => (
                      <DropdownMenuItem
                        key={p.email}
                        className="w-full"
                        onClick={() => form.setValue("patient", p._id, { shouldValidate: true })}
                      >
                        {p.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <FormMessage />
            </FormItem>
          )}

          {/* doctorValue */}
          <FormItem>
            <FormLabel className="text-main-gold-800 font-semibold text-lg">
              {t("doctor")}
            </FormLabel>

            {/* Call register once just to register the field */}
            <input type="hidden" {...form.register("doctor")} />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="capitalize w-full justify-between">
                  {allDoctors.find((d) => d._id === form.watch("doctor"))?.name || "Select Doctor"}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-full">
                <DropdownMenuGroup>
                  {allDoctors.map((d) => (
                    <DropdownMenuItem
                      key={d.email}
                      className="w-full"
                      onClick={() => form.setValue("doctor", d._id, { shouldValidate: true })}
                    >
                      {d.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <FormMessage />
          </FormItem>

          {/* Location */}
          <div>
            <span className="text-main-gold-800 font-semibold text-lg">{t("location")}</span>
            <span>: {t("egypt")}</span>
          </div>

          {/* summary */}
          <div>
            <span className="text-main-gold-800 font-semibold text-lg">{t("summary")}:</span>
            <p>
              {t.rich("appointment-message", {
                strong: (chunks) => <span className="font-extrabold">{chunks}</span>,
                br: () => <br />,
                doctorName,
                appointmentDate: appointmentDate || t("no-date-selected"),
                timeSlot: timeSlot || t("no-timeslot-selected"),
              })}
            </p>
          </div>

          {/* Date and timeSlot */}
          <div className="flex gap-4">
            {/* Appointment date */}
            <FormItem className="flex-1 sr-only">
              <FormLabel className="text-main-gold-800 font-semibold text-lg">
                {t("date")}
              </FormLabel>
              <FormControl>
                <Input readOnly {...form.register("appointmentDate")} />
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* Appointment timeSlot slot */}
            <FormItem className="flex-1 sr-only">
              <FormLabel className="text-main-gold-800 font-semibold text-lg">
                {t("time-slot")}
              </FormLabel>
              <FormControl>
                <Input readOnly {...form.register("timeSlot")} />
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* Submit */}
            {!patientUser && (
              <div className="flex flex-col gap-2 align-middle">
                <FormMessage className="text-red-600">{error?.message}</FormMessage>
                <Button
                  type="submit"
                  className="capitalize text-xs sm:text-base"
                  disabled={isDisabled}
                >
                  {isPending ? t("loading-0") : t("create-new-appointment")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
