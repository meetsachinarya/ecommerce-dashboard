import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_DATA } from '../data/products';
import {
  Smartphone,
  Shirt,
  Armchair,
  Sparkles,
  ArrowRight,
  Package,
  Layers
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Electronics': <Smartphone className="w-5 h-5 text-blue-600" />,
  'Fashion': <Shirt className="w-5 h-5 text-amber-600" />,
  'Home & Kitchen': <Armchair className="w-5 h-5 text-emerald-600" />,
  'Beauty': <Sparkles className="w-5 h-5 text-rose-600" />
};

export const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateFilter, products } = useShop();

  const handleSelectCategory = (categoryName: string, subcategory: string = 'All') => {
    updateFilter('category', categoryName);
    updateFilter('subcategory', subcategory);
    updateFilter('searchQuery', '');
    navigate('/products');
  };

  return (
    <div id="categories-page" className="space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Explore Categories</h2>
            <p className="text-xs text-slate-500">
              Discover products across our 4 core departments and detailed subcategories
            </p>
          </div>
        </div>
      </div>

      {/* Main Categories Visual Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATEGORIES_DATA.map((cat) => {
          const categoryProducts = products.filter((p) => p.category === cat.name);

          return (
            <div
              key={cat.id}
              id={`category-section-${cat.id}`}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Category Top Banner */}
              <div className="relative h-48 sm:h-56 bg-slate-900 overflow-hidden group">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center opacity-75 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/40 to-transparent" />

                <div className="absolute top-4 left-4 p-2.5 rounded-2xl bg-white/90 backdrop-blur-md shadow-md">
                  {CATEGORY_ICONS[cat.name]}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">{cat.name}</h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md">
                      {categoryProducts.length} Products
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 mt-1 line-clamp-1">{cat.description}</p>
                </div>
              </div>

              {/* Subcategories Breakdown & Quick Links */}
              <div className="p-6 flex flex-col justify-between flex-1 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Subcategories
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {cat.subcategories.map((sub) => {
                      const subCount = products.filter(
                        (p) => p.category === cat.name && p.subcategory === sub
                      ).length;

                      return (
                        <button
                          key={sub}
                          id={`cat-btn-${sub.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                          type="button"
                          onClick={() => handleSelectCategory(cat.name, sub)}
                          className="flex flex-col p-3 rounded-2xl bg-slate-50 hover:bg-indigo-50/70 border border-slate-200/80 hover:border-indigo-200 text-left transition-all group"
                        >
                          <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                            {sub}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium mt-0.5">
                            {subCount} available
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5" />
                    Verified genuine inventory
                  </span>

                  <button
                    type="button"
                    onClick={() => handleSelectCategory(cat.name, 'All')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl border border-indigo-100 transition-colors"
                  >
                    <span>View All {cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
