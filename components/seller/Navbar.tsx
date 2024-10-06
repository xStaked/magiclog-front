"use client";

import Link from "next/link";

import DropdownUser from "../common/dropdown-user";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { User } from "@/types/Auth.interface";

export function Navbar() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              Marketplace
            </Link>
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            <DropdownUser user={user as User} />
          </div>
        </div>
      </div>
    </nav>
  );
}
