import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { closeLoginDialog, openLoginDialog } from "@/store/slices/AuthSlice";

export function LoginDialog() {
  const dispatch = useDispatch();
  const { isLoginDialogOpen } = useSelector((state: RootState) => state.auth);

  const handleClose = () => {
    dispatch(closeLoginDialog());
  };

  const handleOpen = () => {
    if (isLoginDialogOpen) {
      dispatch(closeLoginDialog());
    } else {
      dispatch(openLoginDialog());
    }
  };

  return (
    <Dialog open={isLoginDialogOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-[0.8rem] text-black">
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="w-full max-w-md space-y-8">
          <header className="flex flex-col items-center justify-center gap-4 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              Sign In Marketplace
            </h1>
          </header>

          <Card className="w-full shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Sign in
              </CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to sign in
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm setOpen={handleClose} />
            </CardContent>
          </Card>

          <footer className="text-center text-sm text-gray-600 mt-8">
            <p>&copy; 2024 Marketplace. All rights reserved.</p>
          </footer>
        </div>
      </DialogContent>
    </Dialog>
  );
}
