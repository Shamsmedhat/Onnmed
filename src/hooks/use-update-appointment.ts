import { updateAppointmentAction } from "@/lib/actions/update-appointment.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

// Types
type UpdateAppointmentInput = {
  fields: {
    status: string;
  };
  id: string;
};

export default function useUpdateAppointment() {
  // Translations
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ fields, id }: UpdateAppointmentInput) => {
      const response = await updateAppointmentAction(fields, id);

      if (!response.ok) {
        throw new Error(response.message || t("update-appointment-failed"));
      }

      return response;
    },

    retry: false,
  });

  return {
    isPending,
    error,
    updateAppointment: mutate,
  };
}
