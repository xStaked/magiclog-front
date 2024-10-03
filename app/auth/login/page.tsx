import React from "react";
import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sign In | Open Market",
};

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-md space-y-8">
        <header className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center sm:text-right sm:max-w-[8rem]">
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
            <LoginForm />
          </CardContent>
        </Card>

        <footer className="text-center text-sm text-gray-600 mt-8">
          <p>&copy; 2024 Marketplace. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
