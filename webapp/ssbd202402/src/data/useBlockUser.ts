import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import { useToast } from "@/components/ui/use-toast.ts";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";

export const useBlockUser = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { mutateAsync } = useMutation({
    mutationFn: async (userId: string) => {
      await api.post(`/users/${userId}/block`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["filteredUsers"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: t("block.toast.title.success"),
        description: t("block.toast.description.blockSuccess"),
      });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 404) {
        toast({
          variant: "destructive",
          title: t("block.toast.title.fail"),
          description: t("block.toast.description.notFound"),
        });
      } else if (error.response?.status === 409) {
        toast({
          variant: "destructive",
          title: t("block.toast.title.fail"),
          description: t("block.toast.description.alreadyUnblocked"),
        });
      } else {
        toast({
          variant: "destructive",
          title: t("block.toast.title.fail"),
          description: t("block.toast.description.fail"),
        });
      }
    },
  });

  return { blockUser: mutateAsync };
};