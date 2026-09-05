import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Search, X, ArrowRight, Tag } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search mobiles, laptops, shoes, beauty...',
  className = '',
  autoFocus = false
}) => {
  const navigate = useNavigate();
  const { filterState, updateFilter, products, setQuickViewProduct, markAsRecentlyViewed } = useShop();
  const [inputValue, setInputValue] = useState(filterState.searchQuery || '');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync state if external filters change
  useEffect(() => {
    setInputValue(filterState.searchQuery);
  }, [filterState.searchQuery]);

  // Click outside to close suggestion dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    updateFilter('searchQuery', val);
    setIsOpen(val.trim().length > 0);
  };

  const handleClear = () => {
    setInputValue('');
    updateFilter('searchQuery', '');
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    updateFilter('searchQuery', inputValue);
    navigate('/products');
  };

  // Preview matched products
  const previewResults = inputValue.trim()
    ? products
        .filter((p) => {
          const q = inputValue.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.subcategory.toLowerCase().includes(q) ||
            p.tags.some((t) => t.toLowerCase().includes(q))
          );
        })
        .slice(0, 5)
    : [];

  const handleSelectProduct = (product: typeof products[0]) => {
    markAsRecentlyViewed(product);
    setQuickViewProduct(product);
    setIsOpen(false);
  };

  const handleSelectCategory = (categoryName: string) => {
    updateFilter('category', categoryName);
    updateFilter('subcategory', 'All');
    updateFilter('searchQuery', '');
    setIsOpen(false);
    navigate('/products');
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative flex items-center w-full">
        <div className="absolute left-3.5 text-slate-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </div>

        <input
          id="global-search-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(inputValue.trim().length > 0)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-10 pr-10 py-2 bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder:text-slate-400 text-sm rounded-xl border border-slate-200/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
        />

        {inputValue && (
          <button
            id="clear-search-btn"
            type="button"
            onClick={handleClear}
            className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </form>

      {/* Auto-suggest dropdown */}
      {isOpen && (
        <div
          id="search-suggestions-dropdown"
          className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 divide-y divide-slate-100"
        >
          {previewResults.length > 0 ? (
            <div className="p-2">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Products ({previewResults.length})
              </div>
              {previewResults.map((prod) => (
                <div
                  key={prod.id}
                  id={`suggest-${prod.id}`}
                  onClick={() => handleSelectProduct(prod)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{prod.name}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-medium text-indigo-600">{prod.category}</span>
                      <span>•</span>
                      <span>${(prod.discountPrice ?? prod.price).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-slate-500">
              No direct matches found for &quot;{inputValue}&quot;
            </div>
          )}

          {/* Categories Quick Links */}
          <div className="p-2 bg-slate-50/50">
            <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Browse Categories
            </div>
            <div className="flex flex-wrap gap-1.5 px-2">
              {['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleSelectCategory(cat)}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                >
                  <Tag className="w-3 h-3 text-slate-400" />
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="p-2.5 bg-slate-50 text-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full text-xs font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center justify-center gap-1 py-1"
            >
              View all results for &quot;{inputValue}&quot;
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
