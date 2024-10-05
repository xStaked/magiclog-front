import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductSkeleton from "./ProductSkeleton";

interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
}

export default function ProductList({ products, isLoading }: ProductListProps) {
  const { searchFilter, priceRange } = useSelector(
    (state: RootState) => state.product
  );

  console.log("Products:", products);
  console.log("Search Filter:", searchFilter);
  console.log("Price Range:", priceRange);

  // Filtro por nombre o SKU
  const filteredByNameOrSKU = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const filteredProducts = filteredByNameOrSKU.filter(
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  console.log("filteredProducts", filteredProducts);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {!isLoading ? (
        filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>SKU: {product.sku}</p>
                <p className="text-2xl font-bold mt-2">
                  ${product.price.toFixed(2)}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>No products found</p>
        )
      ) : (
        <ProductSkeleton />
      )}
    </div>
  );
}
