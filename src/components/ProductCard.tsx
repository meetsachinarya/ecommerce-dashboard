import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Star, ShoppingBag, Heart, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, markAsRecentlyViewed, cart } = useShop();

  const inWishlist = isInWishlist(product.id);
  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const currentPrice = product.discountPrice ?? product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;

  const handleCardClick = () => {
    markAsRecentlyViewed(product);
    setQuickViewProduct(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    markAsRecentlyViewed(product);
    addToCart(product, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    markAsRecentlyViewed(product);
    setQuickViewProduct(product);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-indigo-200/80 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 sm:aspect-square w-full bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs tracking-tight">
            {discountPercent}% OFF
          </div>
        )}

        {/* Action Overlay Buttons */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          {/* Wishlist Button */}
          <button
            id={`wishlist-btn-${product.id}`}
            onClick={handleWishlistToggle}
            className={`p-2 rounded-full shadow-md backdrop-blur-xs transition-all duration-200 ${
              inWishlist
                ? 'bg-rose-500 text-white hover:bg-rose-600'
                : 'bg-white/90 text-slate-700 hover:bg-white hover:text-rose-500 hover:scale-110'
            }`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            title={inWishlist ? 'In your wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>

          {/* Quick View Button */}
          <button
            id={`quickview-btn-${product.id}`}
            onClick={handleQuickView}
            className="p-2 rounded-full shadow-md bg-white/90 backdrop-blur-xs text-slate-700 hover:bg-white hover:text-indigo-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hidden sm:flex items-center justify-center"
            aria-label="Quick view"
            title="Quick view details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Out of Stock Ribbon */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-slate-900 text-white font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-md shadow-md">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-indigo-600 tracking-tight bg-indigo-50 px-2 py-0.5 rounded-md">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-slate-700 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-slate-400 text-[11px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 line-clamp-2 leading-snug mb-1.5 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-1 mb-3">
            {product.subcategory} • {product.description}
          </p>
        </div>

        {/* Price & Add to Cart Footer */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                ${currentPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            id={`add-cart-btn-${product.id}`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 shadow-2xs ${
              quantityInCart > 0
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-200'
            } disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed`}
            aria-label="Add to cart"
          >
            {quantityInCart > 0 ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{quantityInCart} in Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
