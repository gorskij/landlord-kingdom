import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMeQuery } from "@/data/meQueries";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/userStore";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { VscAccount } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";

type MyAccountButtonProps = {
  hover: string;
};

const MyAccountButton: FC<MyAccountButtonProps> = ({ hover }) => {
  const { t } = useTranslation();
  const userStore = useUserStore();
  const navigate = useNavigate();
  const { data: user } = useMeQuery();
  const { pathname } = useLocation();

  const handleLoginButtonClick = () => {
    userStore.clearToken();
    userStore.clearRefreshToken();
    navigate("/login");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={cn("px-2 py-1", hover)}>
          <VscAccount className="mr-2 h-4 w-4" />
          {user?.data.firstName} {user?.data.lastName}
          <IoMdArrowDropdown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel asChild>
          <DropdownMenuItem
            onClick={() => navigate(`/account?origin=${pathname}`)}
          >
            {t("navLinks.account")}
          </DropdownMenuItem>
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={handleLoginButtonClick}>
          {t("navLinks.signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MyAccountButton;
