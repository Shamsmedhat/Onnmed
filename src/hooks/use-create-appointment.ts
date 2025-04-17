import { createAppointmentAction } from "@/lib/actions/create-appointment.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

export default function useCreateAppointment() {
  // Translations
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: AppointmentsFields) => {
      const response = await createAppointmentAction(fields);

      if (!response.ok) {
        throw new Error(response.message || t("create-appointment-failed"));
      }

      return response;
    },

    retry: false,
  });

  return {
    isPending,
    error,
    createNewAppointment: mutate,
  };
}
