import { updateAppointmentAction } from "@/lib/actions/update-appointment.action";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

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
      return toast.promise(
        updateAppointmentAction(fields, id).then((response) => {
          if (!response.ok) {
            throw new Error(response.message || t("update-appointment-failed"));
          }
          return response;
        }),
        {
          loading: `${t("loading")} 🕧`,
          success: (data) =>
            `${t("appointment-updated-successfully")} ${t("to")} ${data.appointment.status} ✅`,
          error: (err) => err.message || t("update-appointment-failed"),
        }
      );
    },

    retry: false,
  });

  return {
    isPending,
    error,
    updateAppointment: mutate,
  };
}
