import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Star, ShoppingBag, Heart, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);
  const currentPrice = quickViewProduct.discountPrice ?? quickViewProduct.price;
  const hasDiscount = quickViewProduct.discountPrice && quickViewProduct.discountPrice < quickViewProduct.price;
  const discountPercent = hasDiscount
    ? Math.round(((quickViewProduct.price - quickViewProduct.discountPrice!) / quickViewProduct.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
  };

  return (
    <div id="quick-view-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="quick-view-modal"
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col md:flex-row relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-quick-view-btn"
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Section */}
        <div className="w-full md:w-1/2 p-6 bg-slate-50 flex flex-col justify-between rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white border border-slate-200 shadow-xs mb-4">
            <img
              src={selectedImage || quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover object-center"
            />
            {hasDiscount && (
              <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-xs">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-center text-xs text-slate-600">
            <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white border border-slate-200/80">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Fast Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white border border-slate-200/80">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>100% Genuine</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white border border-slate-200/80">
              <RefreshCw className="w-4 h-4 text-amber-600" />
              <span>30-Day Return</span>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                {quickViewProduct.category}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-medium text-slate-500">{quickViewProduct.subcategory}</span>
            </div>

            <h2 id="modal-product-title" className="text-xl font-bold text-slate-900 leading-tight mb-2">
              {quickViewProduct.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(quickViewProduct.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-800">{quickViewProduct.rating}</span>
              <span className="text-xs text-slate-500">({quickViewProduct.reviewsCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-black text-slate-900">
                ${currentPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-base text-slate-400 line-through">
                  ${quickViewProduct.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {quickViewProduct.description}
            </p>

            {/* Specs Table if exists */}
            {quickViewProduct.specs && (
              <div className="mb-4 bg-slate-50 rounded-xl p-3 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Key Specifications</h4>
                <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 text-xs">
                  {Object.entries(quickViewProduct.specs).map(([key, val]) => (
                    <div key={key}>
                      <span className="text-slate-400 font-medium">{key}: </span>
                      <span className="text-slate-700 font-semibold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Availability */}
            <div className="flex items-center gap-2 mb-6">
              {quickViewProduct.inStock ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <Check className="w-3.5 h-3.5" /> In Stock ({quickViewProduct.stockCount} available)
                </span>
              ) : (
                <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Action Controls */}
          <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 font-bold transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 text-sm font-bold text-slate-800 min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(quickViewProduct.stockCount, q + 1))}
                  className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 font-bold transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                id="modal-add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!quickViewProduct.inStock}
                className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold py-2.5 px-4 rounded-xl shadow-xs transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>

              {/* Wishlist Button */}
              <button
                id="modal-wishlist-toggle-btn"
                onClick={() => toggleWishlist(quickViewProduct)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  inWishlist
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
