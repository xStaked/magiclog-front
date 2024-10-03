import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
export const metadata: Metadata = {
  title: "Register",
};
export default async function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-md space-y-8">
        <section className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center sm:text-right sm:max-w-[8rem]">
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
      </div>
    </div>
  );
}
