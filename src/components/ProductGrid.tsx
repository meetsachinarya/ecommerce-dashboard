import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ShoppingBag, RotateCcw } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  onResetFilters?: () => void;
  columns?: '3' | '4' | 'auto';
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  emptyMessage = 'No products found matching your search or filters.',
  onResetFilters,
  columns = 'auto'
}) => {
  if (products.length === 0) {
    return (
      <div
        id="product-grid-empty"
        className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200 text-center max-w-lg mx-auto my-8 shadow-xs"
      >
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">No products found</h3>
        <p className="text-sm text-slate-500 mb-6">{emptyMessage}</p>
        {onResetFilters && (
          <button
            id="reset-filters-btn"
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All Filters
          </button>
        )}
      </div>
    );
  }

  const gridClass =
    columns === '3'
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
      : columns === '4'
      ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'
      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5';

  return (
    <div id="product-grid-container" className={gridClass}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
