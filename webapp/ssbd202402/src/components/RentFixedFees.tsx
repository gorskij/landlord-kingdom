import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { FC, useState } from "react";
import DateSelector from "../pages/Owner/RentDetails/DateSelector";
import PaymentsPageChanger from "../pages/Owner/RentDetails/PaymentsPageChanger";
import RefreshQueryButton from "@/components/RefreshQueryButton";
import { useTranslation } from "react-i18next";
import { useRentFixedFees } from "@/data/rent/useRentFixedFees";
import { LoadingData } from "@/components/LoadingData";
import { toLocaleFixed } from "@/utils/currencyFormat";

type RentFixedFeesProps = {
  id: string;
  startDate: string;
  endDate: string;
  isTenant: boolean;
};

export const RentFixedFees: FC<RentFixedFeesProps> = ({
  id,
  startDate,
  endDate, isTenant = false,
}) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectStartDate, setSelectStartDate] = useState<Date | undefined>(
    new Date(startDate)
  );
  const [selectEndDate, setSelectEndDate] = useState<Date | undefined>(
    new Date(endDate)
  );
  const { data, isLoading } = useRentFixedFees({
    id: id!,
    pageNumber: pageNumber,
    pageSize: pageSize,
    startDate: format(selectStartDate!.toString(), "yyyy-MM-dd"),
    endDate: format(selectEndDate!.toString(), "yyyy-MM-dd"),
  });
  const { t } = useTranslation();

  if (isLoading) {
    return <LoadingData />;
  }

  return (
    <Card className="relative">
      <RefreshQueryButton
        className="absolute right-0 top-0"
        queryKeys={["rentFixedFees"]}
      />
      <CardHeader className="text-center">
        <CardTitle>{t("ownerRentDetails.fixedFees")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-center gap-10 py-5">
          <div className="flex flex-col gap-2">
            <p>{t("ownerRentDetails.selectStart")}</p>
            <DateSelector
              date={selectStartDate!}
              setDate={setSelectStartDate}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>{t("ownerRentDetails.selectEnd")}</p>
            <DateSelector date={selectEndDate!} setDate={setSelectEndDate} />
          </div>
        </div>
        {data ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-28">
                    {t("ownerRentDetails.number")}
                  </TableHead>
                  <TableHead>{t("ownerRentDetails.date")}</TableHead>
                    {isTenant && (
                        <TableHead className="w-48 text-right">
                            {t("ownerRentDetails.amount")}
                        </TableHead>
                    )
                    }
                  {!isTenant && (
                      <>
                        <TableHead className="text-right">
                          {t("ownerRentDetails.margin")}
                        </TableHead>
                        <TableHead className="w-48 text-right">
                          {t("ownerRentDetails.rental")}
                        </TableHead>
                        <TableHead className="w-48 text-right">
                          {t("ownerRentDetails.summary")}
                        </TableHead>
                      </>
                  )
                  }
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.rentFixedFees.map((fee, index) => (
                  <TableRow key={fee.date}>
                    <TableCell>{index + 1 + pageSize * pageNumber}</TableCell>
                    <TableCell>{fee.date}</TableCell>
                    {isTenant && (
                        <TableCell className="text-right">
                          {toLocaleFixed(fee.rentalFee + fee.marginFee)}
                        </TableCell>
                    )
                    }
                    {!isTenant && (
                        <>
                          <TableCell className="text-right">
                            {toLocaleFixed(fee.marginFee)}
                          </TableCell>
                          <TableCell className="text-right">
                            {toLocaleFixed(fee.rentalFee)}
                          </TableCell>
                          <TableCell className="text-right">
                            {toLocaleFixed(fee.rentalFee + fee.marginFee)}
                          </TableCell>
                        </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-end pt-2">
              <PaymentsPageChanger
                pageNumber={pageNumber}
                totalPages={data.totalPages}
                pageSize={pageSize}
                setPageNumber={setPageNumber}
                setPageSize={setPageSize}
              />
            </div>
          </>
        ) : (
          <div className="flex justify-center">
            <p>{t("ownerRentDetails.noPayments")}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
