import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { setSearchFilter } from "@/store/slices/ProductSlice";

export function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    dispatch(setSearchFilter(term)); 
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="search">Search Products</Label>
        <Input
          id="search"
          type="text"
          placeholder="Search by name or SKU"
          value={searchTerm}
          onChange={handleSearch}
          className="mt-1"
        />
      </div>
    </div>
  );
}
