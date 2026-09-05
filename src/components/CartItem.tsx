import React from 'react';
import { CartItem as CartItemType } from '../types';
import { useShop } from '../context/ShopContext';
import { Trash2, Heart, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateCartQuantity, removeFromCart, toggleWishlist, isInWishlist } = useShop();
  const { product, quantity } = item;

  const inWishlist = isInWishlist(product.id);
  const currentPrice = product.discountPrice ?? product.price;
  const lineTotal = currentPrice * quantity;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <div
      id={`cart-item-${product.id}`}
      className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
    >
      {/* Product Image & Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <Link to="/products" className="shrink-0 group">
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-slate-100 border border-slate-200 group-hover:scale-105 transition-transform"
          />
        </Link>

        <div className="flex-1 min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
            {product.category}
          </span>
          <h4 className="font-bold text-slate-800 text-sm sm:text-base leading-snug line-clamp-1 mt-1">
            {product.name}
          </h4>
          <p className="text-xs text-slate-400 mb-1.5">{product.subcategory}</p>

          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-slate-900">${currentPrice.toFixed(2)}</span>
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quantity Stepper & Line Total & Actions */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {/* Quantity Controls */}
        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden shadow-2xs">
          <button
            id={`cart-decrease-${product.id}`}
            type="button"
            onClick={() => updateCartQuantity(product.id, quantity - 1)}
            className="p-2 hover:bg-slate-200 text-slate-600 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center font-bold text-xs text-slate-900">
            {quantity}
          </span>
          <button
            id={`cart-increase-${product.id}`}
            type="button"
            onClick={() => updateCartQuantity(product.id, quantity + 1)}
            disabled={quantity >= product.stockCount}
            className="p-2 hover:bg-slate-200 text-slate-600 disabled:opacity-40 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Line Total */}
        <div className="text-right min-w-[5rem]">
          <span className="text-xs text-slate-400 block sm:hidden">Total</span>
          <span className="text-base font-black text-slate-900">
            ${lineTotal.toFixed(2)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            id={`cart-wishlist-${product.id}`}
            type="button"
            onClick={() => toggleWishlist(product)}
            className={`p-2 rounded-xl border transition-colors ${
              inWishlist
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200'
            }`}
            title={inWishlist ? 'In your wishlist' : 'Save for later'}
            aria-label="Save for later"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-500' : ''}`} />
          </button>

          <button
            id={`cart-remove-${product.id}`}
            type="button"
            onClick={() => removeFromCart(product.id)}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-colors"
            title="Remove item"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
