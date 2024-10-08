"use client";

import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getAllProducts } from "@/store/slices/ProductSlice";
import Navbar from "@/components/layouts/Navbar";
import FilterSection from "@/components/home/FilterSection";
import { TablePagination } from "@/components/common/TablePagination";
import Link from "next/link";
import usePaginationAndFetch from "@/hooks/usePagination";

const HomeProductList = React.lazy(
  () => import("@/components/home/HomeProductList")
);

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, products, totalPages, searchFilter } = useSelector(
    (state: RootState) => state.product
  );

  const fetchUserProducts = (offset: number, limit: number) => {
    dispatch(getAllProducts({ offset, limit }));
  };

  const { currentPage, handlePageChange } = usePaginationAndFetch(
    fetchUserProducts,
    undefined,
    "/"
  );

  React.useEffect(() => {
    if (!searchFilter) {
      fetchUserProducts((currentPage - 1) * 12, 12);
    }
  }, [searchFilter]);

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
            <HomeProductList products={products} isLoading={isLoading} />
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
