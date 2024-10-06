"use client";
import { AddProductModal } from "@/components/seller/inventory/addProduct";
import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getUserProducts } from "@/store/slices/ProductSlice";
import { TablePagination } from "@/components/common/TablePagination";
import SearchFilter from "@/components/seller/SearchFIlter";
import usePaginationAndFetch from "@/hooks/usePagination";

const ProductTable = React.lazy(
  () => import("@/components/seller/inventory/DataTable")
);

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, products, totalPages, searchFilter } = useSelector(
    (state: RootState) => state.product
  );

  const fetchUserProducts = (offset: number, limit: number) => {
    dispatch(getUserProducts({ offset, limit }));
  };

  const { currentPage, handlePageChange } = usePaginationAndFetch(
    fetchUserProducts,
    undefined,
    "/seller/inventory"
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Products</h1>
        <AddProductModal isLoading={isLoading} />
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
