"use client";

import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getAllProducts } from "@/store/slices/ProductSlice";
import Navbar from "@/components/layouts/Navbar";
import FilterSection from "@/components/home/data/FilterSection";
import { TablePagination } from "@/components/common/TablePagination";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import usePaginationAndFetch from "@/hooks/usePagination";

const ProductList = React.lazy(
  () => import("@/components/home/data/ProductList")
);

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, products, totalPages } = useSelector(
    (state: RootState) => state.product
  );

  const fetchUserProducts = (offset: number, limit: number) => {
    dispatch(getAllProducts({ offset, limit }));
  };

  const { currentPage, handlePageChange } = usePaginationAndFetch(
    fetchUserProducts,
    undefined,
    "/seller/inventory"
  );

  return (
    <div>
      <Navbar />
      <section className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="container mx-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold mb-8">Marketplace Products</h1>
              <Link href="/cart">
                <span className="underline">Go to cart</span>
              </Link>
            </div>
          </div>

          <FilterSection />

          <Suspense>
            <ProductList products={products} isLoading={isLoading} />
            <TablePagination
              currentPage={currentPage}
              setCurrentPage={handlePageChange}
              totalPages={totalPages}
            />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
