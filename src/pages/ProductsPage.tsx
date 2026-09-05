import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductGrid } from '../components/ProductGrid';
import { CategoryFilter } from '../components/CategoryFilter';
import {
  SlidersHorizontal,
  X,
  Sparkles,
  Search,
  RotateCcw
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { filteredProducts, filterState, updateFilter, resetFilters } = useShop();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Active filter count
  let activeFilterCount = 0;
  if (filterState.category !== 'All') activeFilterCount++;
  if (filterState.subcategory !== 'All') activeFilterCount++;
  if (filterState.minPrice > 0 || filterState.maxPrice < 4000) activeFilterCount++;
  if (filterState.minRating > 0) activeFilterCount++;
  if (filterState.inStockOnly) activeFilterCount++;
  if (filterState.searchQuery.trim()) activeFilterCount++;

  return (
    <div id="products-page" className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Products Catalog</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
              {filteredProducts.length} items
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Browse our premium selection with real-time filters and custom sorting
          </p>
        </div>

        {/* Mobile Filter Toggle & Sorting */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-filter-open-btn"
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-2xs hover:bg-slate-50 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Simple Sort Bar */}
          <CategoryFilter showSortingOnly={true} />
        </div>
      </div>

      {/* Active Filter Tags Bar (if any applied) */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl">
          <span className="text-xs font-bold text-indigo-900 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Active Filters:
          </span>

          {filterState.searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-indigo-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs">
              <Search className="w-3 h-3 text-slate-400" />
              &quot;{filterState.searchQuery}&quot;
              <button
                onClick={() => updateFilter('searchQuery', '')}
                className="text-slate-400 hover:text-rose-500 ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filterState.category !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-indigo-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs">
              Category: {filterState.category}
              <button
                onClick={() => {
                  updateFilter('category', 'All');
                  updateFilter('subcategory', 'All');
                }}
                className="text-slate-400 hover:text-rose-500 ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filterState.subcategory !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-indigo-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs">
              Subcategory: {filterState.subcategory}
              <button
                onClick={() => updateFilter('subcategory', 'All')}
                className="text-slate-400 hover:text-rose-500 ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {(filterState.minPrice > 0 || filterState.maxPrice < 4000) && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-indigo-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs">
              Price: ${filterState.minPrice} - ${filterState.maxPrice}
              <button
                onClick={() => {
                  updateFilter('minPrice', 0);
                  updateFilter('maxPrice', 4000);
                }}
                className="text-slate-400 hover:text-rose-500 ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filterState.minRating > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-indigo-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs">
              {filterState.minRating}+ Stars
              <button
                onClick={() => updateFilter('minRating', 0)}
                className="text-slate-400 hover:text-rose-500 ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filterState.inStockOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-indigo-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs">
              In Stock Only
              <button
                onClick={() => updateFilter('inStockOnly', false)}
                className="text-slate-400 hover:text-rose-500 ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={resetFilters}
            className="text-xs font-bold text-indigo-700 hover:text-indigo-900 underline ml-auto flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Clear All
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar Filters + Product Grid */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block w-72 shrink-0 sticky top-20">
          <CategoryFilter />
        </div>

        {/* Product Grid Area */}
        <div className="flex-1 w-full min-w-0">
          <ProductGrid
            products={filteredProducts}
            onResetFilters={resetFilters}
            columns="auto"
          />
        </div>
      </div>

      {/* Mobile Filters Slide-over Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/60 backdrop-blur-xs lg:hidden animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Product Filters</h3>
              </div>
              <button
                id="close-mobile-filter-btn"
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <CategoryFilter />
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="w-1/2 py-2.5 px-4 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors"
              >
                Reset All
              </button>
              <button
                id="apply-mobile-filters-btn"
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-1/2 py-2.5 px-4 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-xs"
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
