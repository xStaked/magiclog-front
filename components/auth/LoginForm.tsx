"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { loginSchema } from "@/lib/schemas/login.schema";
import { useRouter } from "next/navigation";
import { RegisterDialog } from "./RegisterDialog";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/slices/AuthSlice";
import { AppDispatch, RootState } from "@/store/store";

interface Iprops {
  setOpen: () => void;
}

export default function Component({ setOpen }: Iprops) {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await dispatch(login({ email: values.email, password: values.password }));

      if (isAuthenticated) setOpen();

      if (user?.role === "ADMIN") {
        router.push("/admin/products");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
      <div className="!mt-5 block mx-auto w-fit">
        <RegisterDialog />
      </div>
    </Form>
  );
}
