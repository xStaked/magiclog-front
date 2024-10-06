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

const ProductList = React.lazy(
  () => import("@/components/home/data/ProductList")
);

const defaultPage = 1;
const defaultLimit = 12;

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, products, totalPages } = useSelector(
    (state: RootState) => state.product
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");

  useEffect(() => {
    const paramsInUrl = searchParams.has("page") && searchParams.has("limit");

    if (!paramsInUrl) {
      console.log("no params");
      router.replace(`?page=${defaultPage}&limit=${defaultLimit}`);
    } else {
      const fetchUserProducts = (limit: number, page: number) => {
        const offset = (page - 1) * limit;
        console.log("offset", offset);
        dispatch(getAllProducts({ offset: defaultLimit, limit: offset }));
      };

      fetchUserProducts(limit, currentPage);
    }
  }, [dispatch, currentPage, limit, router, searchParams]);

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}&limit=${limit}`);
  };

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
