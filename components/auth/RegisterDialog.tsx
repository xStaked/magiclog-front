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

export function RegisterDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              <RegisterForm />
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
