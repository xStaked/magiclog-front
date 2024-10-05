import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  closeLoginDialog,
  openRegisterDialog,
  closeRegisterDialog,
} from "@/store/slices/AuthSlice";

export function RegisterDialog() {
  const dispatch = useDispatch();
  const { isRegisterDialogOpen } = useSelector(
    (state: RootState) => state.auth
  );

  const handleOpen = () => {
    if (isRegisterDialogOpen) {
      dispatch(closeLoginDialog());
      dispatch(closeRegisterDialog());
    } else {
      dispatch(openRegisterDialog());
    }
  };

  return (
    <Dialog open={isRegisterDialogOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <p className="text-xs underline cursor-pointer">
          If you don&apos;t have an account yet, register here.
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="w-full max-w-md space-y-8">
          <section className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              Join Marketplace
            </h1>
          </section>

          <Card className="w-full shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Create an Account
              </CardTitle>
              <CardDescription className="text-center">
                Enter your details to register
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm handleOpen={handleOpen} />
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
