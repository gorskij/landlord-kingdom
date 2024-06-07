import useAxiosPrivate from "../useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";
import { ErrorCode } from "@/@types/errorCode";


type TenantOwnRents = {
    id: string;
    local: {
        name: string;
        description: string;
        size: number;
        address: {
            country: string;
            city: string;
            street: string;
            number: string;
            zipCode: string;
        }
        marginFee: number;
        rentalFee: number;
    }
    owner: {
        firstName: string;
        lastName: string;
        login: string;
        email: string;
    }
    startDate: string;
    endDate: string;
    balance: number;

}

export const useGetTenantOwnRents = () => {
    const { api } = useAxiosPrivate();
    const { t } = useTranslation();

    return useQuery({
        queryKey: ["tenantOwnRents"],
        queryFn: async () => {
            try {
                const response = await api.get<TenantOwnRents[]>("/me/current-rents");    
                return response.data;
            } catch (error) {
                const axiosError = error as AxiosError;
                toast({
                  variant: "destructive",
                  title: t("userDataPage.error"),
                  description: t(
                      `errors.${(axiosError.response!.data as ErrorCode).exceptionCode}`
                  ),
                });
                return Promise.reject(error);
            }
            
           
        },
    });

}