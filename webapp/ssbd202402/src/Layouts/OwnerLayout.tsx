import { FC } from "react";
import BaseLayout, { NavigationLink } from "./BaseLayout";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/store/userStore";

const links: NavigationLink[] = [{ path: "locals", label: "Locals" }];

const OwnerLayout: FC = () => {
  const { roles, activeRole } = useUserStore();
  if (!roles?.includes("OWNER")) {
    return <Navigate to={"/error"} />;
  }

  if (activeRole !== "OWNER") {
    return <Navigate to={"/error"} />;
  }

  return (
    <BaseLayout type="owner" links={links}>
      <Outlet />
    </BaseLayout>
  );
};

export default OwnerLayout;
