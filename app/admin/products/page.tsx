"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getAdminProducts } from "@/store/slices/ProductSlice";

import ProductList from "@/components/admin/data/ProductList";
import { AdminProduct } from "@/types/Product.interface";
import { getSellers } from "@/store/slices/usersSlice";
import { AdminFilters } from "@/components/admin/admin-filters";
import { SearchFilter } from "@/components/admin/search-filter";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";

export default function AdminProductManagement() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, products } = useSelector(
    (state: RootState) => state.product
  );
  const { sellers } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(getAdminProducts({ limit: 0, offset: 10 }));
    dispatch(getSellers());
  }, [dispatch]);

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="hidden md:block w-64 p-4 overflow-y-auto border-r">
        <AdminFilters sellers={sellers} />
      </aside>
      <section className="flex-1 overflow-y-auto p-6">
        <div className="flex items-end justify-between gap-2 p-4 border-b">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Toggle filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[400px]">
              <div className="py-4">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                <AdminFilters sellers={sellers} />
              </div>
            </SheetContent>
          </Sheet>
          <SearchFilter />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <ProductList
            products={products as AdminProduct[]}
            isLoading={isLoading}
          />
        </div>
      </section>
    </div>
  );
}
