// SearchFilter.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setSearchFilter } from "@/store/slices/ProductSlice";

interface SearchFilterProps {
  searchFilter: string; // Estado actual del filtro
}

const SearchFilter = ({ searchFilter }: SearchFilterProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchFilter(e.target.value));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 justify-end">
      <div className="flex flex-col items-start gap-1">
        {" "}
        <Label htmlFor="name-filter">Filter by Name or SKU</Label>
        <Input
          id="name-filter"
          placeholder="Enter product name or SKU"
          value={searchFilter}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
