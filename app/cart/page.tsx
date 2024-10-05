"use client";

import CartProductList from "@/components/cart/CartProductList";

import Navbar from "@/components/layouts/Navbar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

export default function Cart() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };
  return (
    <>
      <div>
        <Navbar />
        <section className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <div className="container mx-auto">
            <div className="container mx-auto px-4 py-8">
              <Button
                variant="ghost"
                onClick={handleGoBack}
                className="mb-4 flex items-center"
              >
                <MoveLeft className="mr-2" /> Go back
              </Button>

              <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-8">
                  Marketplace Products
                </h1>
              </div>
            </div>
            <CartProductList />
          </div>
        </section>
      </div>
    </>
  );
}
