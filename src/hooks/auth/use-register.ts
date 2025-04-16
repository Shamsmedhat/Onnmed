import { registerAction } from "@/lib/actions/auth/register.action";
import { RegisterFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function useRegister() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: RegisterFields) => {
      const payload = await registerAction(fields);

      if ("error" in payload) throw new Error(payload.error || t("register-failed"));

      return payload;
    },
    onSuccess: () => {
      toast.success(t("success toast"));
    },
    onError: (error) => {
      toast.error(error.message);
    },
    retry: false,
  });

  return { isPending, error, register: mutate };
}
