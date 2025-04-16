import { deleteAppointmentAction } from "@/lib/actions/delete-appointment.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

export default function useDeleteAppointment() {
  // Translations
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteAppointmentAction(id);

      if (!response.ok) {
        throw new Error(response.message || t("delete-appointment-failed"));
      }

      return response;
    },

    retry: false,
  });

  return {
    isPending,
    error,
    deleteAppointment: mutate,
  };
}
