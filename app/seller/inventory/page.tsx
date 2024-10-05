"use client";
import { AddProductModal } from "@/components/seller/inventory/addProduct";
import React, { Suspense } from "react";
import { useProduct } from "@/hooks/useProduct";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getUserProducts } from "@/store/slices/ProductSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { TablePagination } from "@/components/common/TablePagination";
import SearchFilter from "@/components/seller/SearchFIlter";

const ProductTable = React.lazy(
  () => import("@/components/seller/inventory/DataTable")
);

const defaultPage = 1;
const defaultLimit = 10;

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, products, totalPages, searchFilter } = useSelector(
    (state: RootState) => state.product
  );

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");

  React.useEffect(() => {
    const paramsInUrl = searchParams.has("page") && searchParams.has("limit");

    if (!paramsInUrl) {
      console.log("no params");
      router.replace(
        `/seller/inventory?page=${defaultPage}&limit=${defaultLimit}`
      );
    } else {
      const fetchUserProducts = (limit: number, page: number) => {
        const offset = (page - 1) * limit;
        console.log("offset", offset);
        dispatch(getUserProducts({ offset: defaultLimit, limit: offset }));
      };

      fetchUserProducts(limit, currentPage);
    }
  }, [dispatch, currentPage, limit, router, searchParams]);

  const handlePageChange = (newPage: number) => {
    router.push(`/seller/inventory?page=${newPage}&limit=${limit}`);
  };

  const { hanldeCreateProduct } = useProduct();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Products</h1>
        <AddProductModal
          onAddProduct={(product) => {
            console.log("Adding product:", product);
            hanldeCreateProduct(product);
          }}
          isLoading={isLoading}
        />
      </div>

      <Suspense>
        <SearchFilter searchFilter={searchFilter} />
        <ProductTable products={products} isLoading={isLoading} />
        <TablePagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
        />
      </Suspense>
    </div>
  );
}
