"use client";

import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getAllProducts } from "@/store/slices/ProductSlice";
import Navbar from "@/components/layouts/Navbar";
import FilterSection from "@/components/home/data/FilterSection";
import { TablePagination } from "@/components/common/TablePagination";
import { useSearchParams, useRouter } from "next/navigation";

const ProductList = React.lazy(
  () => import("@/components/home/data/ProductList")
);

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, products, totalPages } = useSelector(
    (state: RootState) => state.product
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultPage = 0;
  const defaultLimit = 12;

  // Obtener los parámetros limit y page de la URL (o establecer valores predeterminados)
  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");

  useEffect(() => {
    const paramsInUrl = searchParams.has("page") && searchParams.has("limit");

    if (!paramsInUrl) {
      console.log("no params");
      // Redirigir a la URL con los parámetros por defecto
      router.replace(`/?page=${defaultPage}&limit=${defaultLimit}`);
    } else {
      console.log("limit", limit);
      // Hacer fetch cuando los parámetros están en la URL
      const fetchUserProducts = (limit: number, page: number) => {
        const offset = (page - 1) * limit;
        console.log("offset", offset);
        dispatch(getAllProducts({ offset: defaultLimit, limit: offset }));
      };

      fetchUserProducts(limit, currentPage);
    }
  }, [dispatch, currentPage, limit, router, searchParams]);

  const handlePageChange = (newPage: number) => {
    router.push(`/?page=${newPage}&limit=${limit}`);
  };

  return (
    <section className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Open Market Products</h1>
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
      </main>
    </section>
  );
}
