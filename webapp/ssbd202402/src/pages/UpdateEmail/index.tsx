import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { api } from "@/data/api";
const updateEmailFormSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .email(t("updateEmailPage.emailNotValid"))
      .min(
        5,
        t("validation.minLength") +
          " " +
          5 +
          " " +
          t("validation.characters") +
          "."
      )
      .max(
        50,
        t("validation.maxLength") +
          " " +
          50 +
          " " +
          t("validation.characters") +
          "."
      ),
  });

type updateEmailFormValues = z.infer<ReturnType<typeof updateEmailFormSchema>>;

const UpdateEmailPage: FC = () => {
  const { token } = useParams<{ token: string }>();
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<updateEmailFormValues>({
    resolver: zodResolver(updateEmailFormSchema(t)),
    values: {
      email: "",
    },
  });

  const handleUserSubmit: SubmitHandler<updateEmailFormValues> = async (
    data: updateEmailFormValues
  ) => {
    try {
      await api.post("/me/update-email", {
        token: token,
        email: data.email,
      });
      toast({
        variant: "default",
        title: t("updateEmailPage.updateEmailSuccess"),
      });
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        toast({
          variant: "destructive",
          title: t("updateEmailPage.updateEmailError"),
          description: axiosError.message,
        });
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
        <Form {...form}>
          <form
            className="border-1 bg-white rounded-md border-black p-7 w-1/4 flex flex-col shadow-2xl relative"
            onSubmit={form.handleSubmit(handleUserSubmit)}
          >
            <h1 className="text-3xl mb-10 text-center">
              {t("updateEmailPage.updateEmailTitle")}
            </h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel>{t("updateEmailPage.email")} </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {t("updateEmailPage.updateEmailButton")}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default UpdateEmailPage;
