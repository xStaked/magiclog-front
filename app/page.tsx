"use client";

import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getAllProducts } from "@/store/slices/ProductSlice";
import Navbar from "@/components/layouts/Navbar";
import FilterSection from "@/components/home/data/FilterSection";
const ProductList = React.lazy(
  () => import("@/components/home/data/ProductList")
);

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, products } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    const fetchUserProducts = (limit: number, offset: number) => {
      dispatch(getAllProducts({ limit, offset }));
    };
    fetchUserProducts(0, 10);
  }, [dispatch]);

  return (
    <section className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Open Market Products</h1>
          <FilterSection />
          <Suspense>
            <ProductList products={products} isLoading={isLoading} />
          </Suspense>
        </div>
      </main>
    </section>
  );
}
