"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  selectCartItems,
  removeFromCart,
  clearCart,
} from "@/store/slices/CartSlice";

const CartProductList: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-4 border-b"
              >
                <div>
                  <h2 className="text-xl">{item.name}</h2>
                  <p className="text-gray-600">SKU: {item.sku}</p>
                  <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                </div>
                <div>
                  <Button
                    variant="destructive"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Button variant="destructive" onClick={handleClearCart}>
              Clear Cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartProductList;
