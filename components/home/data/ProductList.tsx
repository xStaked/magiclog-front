import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductSkeleton from "./ProductSkeleton";
import { addToCart, selectCartItems } from "@/store/slices/CartSlice";
import { Product } from "@/types/Product.interface";

import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/constants";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
}

export default function ProductList({ products, isLoading }: ProductListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { searchFilter, priceRange } = useSelector(
    (state: RootState) => state.product
  );

  const cartItems = useSelector(selectCartItems);

  const filteredByNameOrSKU = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const filteredProducts = filteredByNameOrSKU.filter(
    (product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {!isLoading ? (
        filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Card >
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
                  <Button
                    className="w-full"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        ) : (
          <p>No products found</p>
        )
      ) : (
        <ProductSkeleton />
      )}
    </motion.div>
  );
}
