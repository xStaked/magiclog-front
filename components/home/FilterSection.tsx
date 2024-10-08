"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setSearchFilter, setPriceRange } from "@/store/slices/ProductSlice";
import { useDebounce } from "use-debounce";

export default function FilterSection() {
  const dispatch = useDispatch<AppDispatch>();
  const { searchFilter, priceRange } = useSelector(
    (state: RootState) => state.product
  );

  const [inputValue, setInputValue] = useState(searchFilter);
  const [debouncedSearchFilter] = useDebounce(inputValue, 300);
  useEffect(() => {
    dispatch(setSearchFilter(debouncedSearchFilter));
  }, [debouncedSearchFilter, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handlePriceRangeChange = (value: number[]) => {
    dispatch(setPriceRange(value));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <Label htmlFor="name-filter">Filter by Name or SKU</Label>
        <Input
          id="name-filter"
          placeholder="Enter product name or SKU"
          value={inputValue}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <Label>
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </Label>
        <Slider
          min={0}
          max={10000}
          step={10}
          value={priceRange}
          onValueChange={handlePriceRangeChange}
        />
      </div>
    </div>
  );
}
