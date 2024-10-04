"use client";
import { ProductTable } from "@/components/seller/inventory/data-table";
import { ProductTableSkeleton } from "@/components/seller/inventory/data-table.skeleton";
import { AddProductModal } from "@/components/seller/inventory/addProduct";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Products</h1>
        <AddProductModal
          onAddProduct={(product) => {
            // Here you would typically call an API to add the product
            console.log("Adding product:", product);
          }}
        />
      </div>

      <Suspense fallback={<ProductTableSkeleton />}>
        <ProductTable />
      </Suspense>
    </div>
  );
}
