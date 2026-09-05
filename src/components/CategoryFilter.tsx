import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_DATA } from '../data/products';
import { SortOption } from '../types';
import {
  SlidersHorizontal,
  RotateCcw,
  Star,
  Smartphone,
  Shirt,
  Armchair,
  Sparkles,
  LayoutGrid
} from 'lucide-react';

interface CategoryFilterProps {
  showSortingOnly?: boolean;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Electronics': <Smartphone className="w-4 h-4" />,
  'Fashion': <Shirt className="w-4 h-4" />,
  'Home & Kitchen': <Armchair className="w-4 h-4" />,
  'Beauty': <Sparkles className="w-4 h-4" />
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ showSortingOnly = false }) => {
  const { filterState, updateFilter, resetFilters, filteredProducts, products } = useShop();

  const selectedCategoryData = CATEGORIES_DATA.find((c) => c.name === filterState.category);
  const subcategoriesList = selectedCategoryData ? selectedCategoryData.subcategories : [];

  // Active filter count calculation
  let activeFilterCount = 0;
  if (filterState.category !== 'All') activeFilterCount++;
  if (filterState.subcategory !== 'All') activeFilterCount++;
  if (filterState.minPrice > 0 || filterState.maxPrice < 4000) activeFilterCount++;
  if (filterState.minRating > 0) activeFilterCount++;
  if (filterState.inStockOnly) activeFilterCount++;
  if (filterState.searchQuery.trim()) activeFilterCount++;

  if (showSortingOnly) {
    return (
      <div className="flex items-center gap-2">
        <label htmlFor="sort-select-simple" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
          Sort by:
        </label>
        <select
          id="sort-select-simple"
          value={filterState.sortBy}
          onChange={(e) => updateFilter('sortBy', e.target.value as SortOption)}
          className="text-xs font-semibold bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
        >
          <option value="popular">Most Popular</option>
          <option value="newest">Newest Arrivals</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    );
  }

  return (
    <div id="category-filter-sidebar" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
          <h3 className="font-bold text-slate-900 text-sm">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            id="clear-filters-btn"
            onClick={resetFilters}
            className="text-xs font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Categories</h4>
        <div className="flex flex-col gap-1">
          <button
            id="filter-cat-all"
            type="button"
            onClick={() => {
              updateFilter('category', 'All');
              updateFilter('subcategory', 'All');
            }}
            className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-semibold transition-colors text-left ${
              filterState.category === 'All'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutGrid className="w-4 h-4" />
              <span>All Categories</span>
            </div>
            <span className={`text-[11px] ${filterState.category === 'All' ? 'text-indigo-200' : 'text-slate-400'}`}>
              {products.length}
            </span>
          </button>

          {CATEGORIES_DATA.map((cat) => {
            const isSelected = filterState.category === cat.name;
            const categoryCount = products.filter((p) => p.category === cat.name).length;

            return (
              <button
                key={cat.id}
                id={`filter-cat-${cat.id}`}
                type="button"
                onClick={() => {
                  updateFilter('category', cat.name);
                  updateFilter('subcategory', 'All');
                }}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-semibold transition-colors text-left ${
                  isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {CATEGORY_ICONS[cat.name] || <LayoutGrid className="w-4 h-4" />}
                  <span>{cat.name}</span>
                </div>
                <span className={`text-[11px] ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                  {categoryCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subcategories (if a category is selected) */}
      {subcategoriesList.length > 0 && (
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
            Subcategories in {filterState.category}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              id="filter-subcat-all"
              onClick={() => updateFilter('subcategory', 'All')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                filterState.subcategory === 'All'
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-semibold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              All {filterState.category}
            </button>
            {subcategoriesList.map((sub) => {
              const isSubSelected = filterState.subcategory === sub;
              return (
                <button
                  key={sub}
                  type="button"
                  id={`filter-subcat-${sub.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => updateFilter('subcategory', sub)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    isSubSelected
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-semibold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Price Range Filter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Price Range</h4>
          <span className="text-xs font-bold text-slate-800">
            ${filterState.minPrice} - ${filterState.maxPrice}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="4000"
          step="50"
          value={filterState.maxPrice}
          onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mb-3"
        />

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] text-slate-400 font-medium">Min ($)</label>
            <input
              type="number"
              min="0"
              max={filterState.maxPrice}
              value={filterState.minPrice}
              onChange={(e) => updateFilter('minPrice', Number(e.target.value))}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400 font-medium">Max ($)</label>
            <input
              type="number"
              min={filterState.minPrice}
              max="5000"
              value={filterState.maxPrice}
              onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Customer Rating Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Rating</h4>
        <div className="flex flex-col gap-1.5">
          {[
            { val: 0, label: 'All Ratings' },
            { val: 4.8, label: '4.8 & Above' },
            { val: 4.5, label: '4.5 & Above' },
            { val: 4.0, label: '4.0 & Above' }
          ].map((item) => (
            <button
              key={item.val}
              type="button"
              onClick={() => updateFilter('minRating', item.val)}
              className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                filterState.minRating === item.val
                  ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {item.val > 0 && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
                <span>{item.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* In Stock Only Checkbox */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <label htmlFor="in-stock-checkbox" className="text-xs font-semibold text-slate-700 cursor-pointer">
          In Stock Only
        </label>
        <input
          id="in-stock-checkbox"
          type="checkbox"
          checked={filterState.inStockOnly}
          onChange={(e) => updateFilter('inStockOnly', e.target.checked)}
          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
        />
      </div>

      {/* Results Counter */}
      <div className="bg-slate-50 rounded-xl p-3 text-center text-xs text-slate-500 font-medium">
        Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> of{' '}
        <span className="font-bold text-slate-900">{products.length}</span> products
      </div>
    </div>
  );
};
