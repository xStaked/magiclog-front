import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { User } from "@/types/Users.interface";
import { useDispatch } from "react-redux";
import { setSelectedSeller } from "@/store/slices/ProductSlice";

interface AdminFiltersProps {
  sellers: User[];
}

export function AdminFilters({ sellers }: AdminFiltersProps) {
  const dispatch = useDispatch();
  const [selectedSellers, setSelectedSellers] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const initialSelectedSellers = sellers?.reduce((acc, seller) => {
      acc[seller.id] = false;
      return acc;
    }, {} as { [key: string]: boolean });
    setSelectedSellers(initialSelectedSellers);
  }, [sellers]);

  const handleSellerChange = (sellerId: number, checked: boolean) => {
    setSelectedSellers((prev) => ({ ...prev, [sellerId]: checked }));
    dispatch(setSelectedSeller(checked ? sellerId : null));
  };

  return (
    <>
      <div>
        <span className="font-medium">Sellers</span>
        <div className="space-y-2">
          {sellers?.map((seller) => (
            <div key={seller.id} className="flex items-center">
              <Checkbox
                id={`seller-${seller.id}`}
                checked={selectedSellers[seller.id] || false}
                onCheckedChange={(checked) =>
                  handleSellerChange(seller.id, checked as boolean)
                }
              />
              <Label
                htmlFor={`seller-${seller.id}`}
                className="ml-2 text-sm font-medium"
              >
                {seller.username}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
