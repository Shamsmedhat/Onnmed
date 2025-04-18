import { deleteAppointmentAction } from "@/lib/actions/delete-appointment.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useDeleteAppointment() {
  // Translations
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (id: string) => {
      return toast.promise(
        deleteAppointmentAction(id).then((response) => {
          if (!response.ok) {
            throw new Error(response.message || t("delete-appointment-failed-0"));
          }
          return response;
        }),
        {
          loading: `${t("deleting")} 🕧`,
          success: () => `${t("appointment-deleted-successfully")} ✅`,
          error: (err) => err.message || t("delete-appointment-failed-0"),
        }
      );
    },

    retry: false,
  });

  return {
    isPending,
    error,
    deleteAppointment: mutate,
  };
}
