"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoginDialog } from "../auth/LoginDialog";
import DropdownUser from "../common/dropdown-user";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { User } from "@/types/Auth.interface";

export default function Navbar() {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <nav className="bg-background border-b w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-primary">Marketplace</span>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <DropdownUser user={user as User} />
            ) : (
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>SR</AvatarFallback>
                </Avatar>
                <LoginDialog />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
