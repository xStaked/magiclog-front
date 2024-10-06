import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Card, CardContent } from "@/components/ui/card";
import ProductSkeleton from "@/components/home/data/ProductSkeleton";
import { AdminProduct } from "@/types/Product.interface";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/constants";

interface ProductListProps {
  products: AdminProduct[];
  isLoading: boolean;
}

export default function ProductList({ products, isLoading }: ProductListProps) {
  const { searchFilter, selectedSeller } = useSelector(
    (state: RootState) => state.product
  );

  const filteredProducts = products?.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      product.sku.includes(searchFilter);
    const matchesSeller = selectedSeller
      ? product.container.user.id === selectedSeller
      : true;

    return matchesSearch && matchesSeller;
  });
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {!isLoading ? (
        filteredProducts.map((product) => (
          <motion.div key={product.id} variants={itemVariants}>
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-gray-700 mb-2">SKU: {product.sku}</p>
                <p className="text-sm text-gray-600 mb-2">
                  Seller: {product.container.user.username}
                </p>
                <p className="font-bold">${product.price.toFixed(2)}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))
      ) : (
        <ProductSkeleton />
      )}
    </motion.div>
  );
}
