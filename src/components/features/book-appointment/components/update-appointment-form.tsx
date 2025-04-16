"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { EventImpl } from "@fullcalendar/core/internal";
import { allStatusOptions } from "@/lib/constants/appointment-status.constant";
import useUpdateAppointment from "@/hooks/use-update-appointment";
import React from "react";
import { toast } from "sonner";
import { DialogClose } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";

// Types
type UpdateAppointmentInput = {
  fields: {
    status: string;
  };
  id: string;
};

export default function UpdateAppointmentForm({
  event,
  appointments,
}: {
  event: EventImpl;
  appointments: Appointment[];
}) {
  // Translation
  const t = useTranslations();

  // Variables
  const appointment = appointments.find((a) => a._id === event.id);
  const allowedStatuses = [t("pending"), t("confirmed"), t("cancelled"), t("completed")];

  // Session
  const session = useSession();

  // Mutation
  const { error, isPending, updateAppointment } = useUpdateAppointment();
  const patientUser = session.data?.userType === "patient";

  // Form & Schema
  const Schema = z.object({
    patient: z.string(),
    doctor: z.string(),
    createdBy: z.string().optional(),
    appointmentDate: z.string(),
    timeSlot: z.string(),
    status: z.string().refine((val) => allowedStatuses.includes(val), {
      message: "Invalid status selected",
    }),
  });
  type UpdateAppointmentSchema = z.infer<typeof Schema>;

  const form = useForm<UpdateAppointmentSchema>({
    defaultValues: {
      patient: appointment?.patient?.name || "",
      doctor: appointment?.doctor?.name || "",
      createdBy: appointment?.createdBy?.name || "",
      appointmentDate: appointment?.appointmentDate.split("T")[0] || "",
      timeSlot: appointment?.timeSlot || "",
      status: appointment?.status || "",
    },
    resolver: zodResolver(Schema),
  });

  // Variables
  const statusOptions = allStatusOptions();

  // Functions
  async function onSubmit(values: UpdateAppointmentSchema) {
    if (patientUser) return;
    const updatedValues: UpdateAppointmentInput = {
      fields: { status: values.status },
      id: appointment?._id ?? "",
    };

    if (appointment?.status === values.status) return;

    updateAppointment(updatedValues, {
      onSuccess() {
        // Close the dialog after update
        toast.success(`${t("appointment-updated-successfully")} ✅`);
      },

      onError: (error) => {
        toast.error(error.message);
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Form */}
        <div className="rounded-md">
          <div className="flex flex-col gap-[10px]">
            {/* Patient */}
            <FormField
              control={form.control}
              name="patient"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel className="capitalize text-main-black/60 ">{t("patient-0")}</FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("patient-0")}
                      type="text"
                      className="shadow-md rounded-md p-2 h-[48px]"
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Doctor */}
            <FormField
              control={form.control}
              name="doctor"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel className="capitalize text-main-black/60 ">{t("doctor")}</FormLabel>
                  <FormControl>
                    {/* Input */}
                    <Input
                      {...field}
                      type="text"
                      placeholder={t("doctor")}
                      className="shadow-md rounded-md mt-0 px-1 py-2 h-[48px]"
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Created by */}
            <FormField
              control={form.control}
              name="createdBy"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel className="capitalize text-main-black/60 ">
                    {t("created-by")}
                  </FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={t("created-by")}
                      className="shadow-md rounded-md p-2 h-[48px]"
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Appointment date */}
            <FormField
              control={form.control}
              name="appointmentDate"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel className="capitalize text-main-black/60 ">
                    {t("appointment-date")}
                  </FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={t("appointment-date")}
                      className="shadow-md rounded-md p-2 h-[48px]"
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time slot */}
            <FormField
              control={form.control}
              name="timeSlot"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel className="capitalize text-main-black/60 ">
                    {t("appointment-time")}
                  </FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={t("appointment-time")}
                      className="shadow-md rounded-md p-2 h-[48px]"
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel className="capitalize text-main-black/60 ">
                    {t("appointment-status")}
                  </FormLabel>

                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    {/* Trigger status */}
                    <SelectTrigger className="shadow-md rounded-md p-2 h-[48px]">
                      <SelectValue placeholder={t("appointment-status")} />
                    </SelectTrigger>

                    {/* Content selection */}
                    <SelectContent>
                      {statusOptions.map((s) => (
                        <SelectItem key={s.label} value={s.label}>
                          <div className="flex gap-3">
                            <span> {s.label}</span>
                            <span>{s.icon}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Submit button */}
          <DialogClose asChild>
            <Button
              type="submit"
              className="w-full mt-4 bg-main-gold-500  hover:bg-main-gold-500/80 rounded-md"
              disabled={
                isPending ||
                (!form.formState.isValid && form.formState.isSubmitted) ||
                appointment?.status === form.getValues("status")
              }
            >
              {isPending ? <p>{t("loading")}</p> : t("update-the-appointment")}
              {error && <p className="text-red-500 mt-2">{error.message}</p>}
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
}
