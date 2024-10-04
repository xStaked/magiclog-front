"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layouts/Navbar";

const products = [
  { id: 1, name: "Laptop", sku: "LAP001", price: 999.99 },
  { id: 2, name: "Smartphone", sku: "PHN002", price: 599.99 },
  { id: 3, name: "Headphones", sku: "AUD003", price: 149.99 },
  { id: 4, name: "Tablet", sku: "TAB004", price: 399.99 },
  { id: 5, name: "Smartwatch", sku: "WCH005", price: 249.99 },
];
export default function Home() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchFilter, setSearchFilter] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (product.sku.toLowerCase().includes(searchFilter.toLowerCase()) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1])
  );

  return (
    <section className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Open Market Products</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <Label htmlFor="name-filter">Filter by Name</Label>
              <Input
                id="name-filter"
                placeholder="Enter product name or sku"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
            </div>
            <div>
              <Label>
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </Label>
              <Slider
                min={0}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
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
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              No products found matching your criteria.
            </p>
          )}
        </div>
      </main>
    </section>
  );
}
