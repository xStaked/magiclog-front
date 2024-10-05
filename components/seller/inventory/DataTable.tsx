"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import DataTableSkeleton from "./data-table-skeleton";

interface Product {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
}

export default function ProductTable({
  products,
  isLoading,
}: ProductListProps) {
  const { searchFilter } = useSelector(
    (state: RootState) => state.product
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearchFilter =
      product.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchFilter.toLowerCase());

    return matchesSearchFilter;
  });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading ? (
            filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                </TableRow>
              ))
            ) : (
              <p>No products found</p>
            )
          ) : (
            <DataTableSkeleton />
          )}
        </TableBody>
      </Table>
    </>
  );
}
