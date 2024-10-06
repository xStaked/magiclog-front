"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  //   DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LogOut } from "@/lib/logout";
import { User } from "@/types/Auth.interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { logout } from "@/store/slices/AuthSlice";

interface IProps {
  user: User;
}

const DropdownUser = ({ user }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = async () => {
    LogOut();
    dispatch(logout());
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex gap-2 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Avatar className="size-7 ">
            <AvatarImage src="https://github.com/shadcn.png" />

            <AvatarFallback className="text-white bg-black">SR</AvatarFallback>
          </Avatar>
          <section className="flex flex-col max-sm:hidden">
            <p className="text-sm font-mono max-w-28 truncate">
              {user?.username}
            </p>
          </section>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel> Marketplace</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user?.role === "ADMIN" ? (
          <Link href={"/admin/products?skip=0&limit=12"}>
            <DropdownMenuItem>Products</DropdownMenuItem>
          </Link>
        ) : (
          <Link href={"/seller/inventory?skip=0&limit=12"}>
            <DropdownMenuItem>Inventory</DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownUser;
