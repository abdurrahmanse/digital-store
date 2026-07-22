import React from "react";

interface CartItemListProps {
  isCartCheckout: boolean;
  product: { id: string; name: string; price: number; imageUrl: string | null } | null;
  cartItems: any[];
}

export function CartItemList({ isCartCheckout, product, cartItems }: CartItemListProps) {
  return (
    <div className="max-h-[300px] overflow-y-auto mb-6 space-y-4 pr-2">
      {!isCartCheckout && product && (
        <div className="flex items-start gap-4">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-lg shrink-0 object-cover border border-slate-200/60 dark:border-slate-700/60" />
          ) : (
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-lg shrink-0 border border-slate-200/60 dark:border-slate-700/60"></div>
          )}
          <div>
            <h3 className="font-medium text-slate-900 dark:text-white line-clamp-2 leading-snug">{product.name}</h3>
            <p className="text-sm font-semibold text-primary mt-1">৳{(product.price / 100).toFixed(2)}</p>
          </div>
        </div>
      )}

      {isCartCheckout && cartItems.map((item) => (
        <div key={item.id} className="flex items-start gap-4">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg shrink-0 object-cover border border-slate-200/60 dark:border-slate-700/60" />
          ) : (
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-lg shrink-0 border border-slate-200/60 dark:border-slate-700/60"></div>
          )}
          <div className="flex-1">
            <h3 className="font-medium text-sm text-slate-900 dark:text-white line-clamp-2 leading-snug">{item.name}</h3>
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-slate-500 dark:text-slate-400">Qty: {item.quantity}</p>
              <p className="text-sm font-semibold text-primary">৳{((item.price * item.quantity) / 100).toFixed(2)}</p>
            </div>
          </div>
        </div>
      ))}

      {isCartCheckout && cartItems.length === 0 && (
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 py-4">Your cart is empty.</p>
      )}
    </div>
  );
}
