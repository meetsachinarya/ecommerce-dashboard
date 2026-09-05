import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { DashboardCard } from '../components/DashboardCard';
import { ProductGrid } from '../components/ProductGrid';
import { CATEGORIES_DATA } from '../data/products';
import {
  PackageCheck,
  ShoppingCart,
  Heart,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Truck,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    userProfile,
    totalOrdersCount,
    cartCount,
    wishlistCount,
    pendingOrdersCount,
    recommendedProducts,
    recentlyViewed,
    orders,
    updateFilter
  } = useShop();

  const activeOrder = orders.find((o) => o.status === 'Pending' || o.status === 'Shipped');

  return (
    <div id="dashboard-page" className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Welcome Banner */}
      <div
        id="welcome-banner"
        className="relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-indigo-900/50"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Premium Member Privileges Active</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-2">
              Welcome back, {userProfile.name}! 👋
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Explore your personalized dashboard, manage your orders, check your saved wishlist items, and discover today&apos;s trending curated selections.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/products"
              id="dashboard-explore-btn"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
            >
              <Zap className="w-4 h-4" />
              <span>Browse Catalog</span>
            </Link>
            <Link
              to="/orders"
              id="dashboard-view-orders-btn"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl border border-white/20 backdrop-blur-xs transition-colors"
            >
              <span>Track Orders</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Decorative background blurs */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. Summary Metric Cards */}
      <div id="summary-cards-section" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardCard
          id="metric-total-orders"
          title="Total Orders"
          value={totalOrdersCount}
          icon={PackageCheck}
          change="3 this month"
          trend="up"
          color="indigo"
          linkTo="/orders"
          subtitle="Lifetime purchase history"
        />

        <DashboardCard
          id="metric-cart-items"
          title="Cart Items"
          value={cartCount}
          icon={ShoppingCart}
          change={cartCount > 0 ? 'Ready to checkout' : 'Cart empty'}
          trend="neutral"
          color="emerald"
          linkTo="/cart"
          subtitle="Items waiting in your bag"
        />

        <DashboardCard
          id="metric-wishlist-items"
          title="Wishlist Items"
          value={wishlistCount}
          icon={Heart}
          change="Saved favorites"
          trend="up"
          color="rose"
          linkTo="/wishlist"
          subtitle="Saved for future purchase"
        />

        <DashboardCard
          id="metric-pending-orders"
          title="Pending Orders"
          value={pendingOrdersCount}
          icon={Clock}
          change={pendingOrdersCount > 0 ? 'In fulfillment' : 'All clear'}
          trend="up"
          color="amber"
          linkTo="/orders"
          subtitle="Active & in-transit shipments"
        />
      </div>

      {/* 3. Active Shipment Tracker Banner (if any pending/shipped order exists) */}
      {activeOrder && (
        <div
          id="active-shipment-alert"
          className="p-5 bg-linear-to-r from-blue-50 to-indigo-50/70 border border-blue-200/80 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                  Live Shipment Alert
                </span>
                <span className="text-xs text-slate-500 font-medium">Order #{activeOrder.id}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-1">
                Your order is currently <span className="text-blue-700 font-extrabold">{activeOrder.status}</span> with {activeOrder.carrier}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Estimated arrival: <span className="font-semibold text-slate-800">{activeOrder.estimatedDelivery}</span> • Tracking #{activeOrder.trackingNumber}
              </p>
            </div>
          </div>

          <Link
            to="/orders"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
          >
            <span>Track Delivery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* 4. Quick Category Explorer */}
      <div id="dashboard-categories-section">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Explore by Category</h3>
            <p className="text-xs text-slate-500">Quickly filter catalog by top categories</p>
          </div>
          <Link
            to="/categories"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES_DATA.map((cat) => (
            <Link
              key={cat.id}
              to="/products"
              id={`cat-card-${cat.id}`}
              onClick={() => {
                updateFilter('category', cat.name);
                updateFilter('subcategory', 'All');
              }}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 aspect-16/10 flex flex-col justify-end p-4 bg-slate-900"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-65 group-hover:scale-110 group-hover:opacity-50 transition-all duration-500"
              />
              <div className="relative z-10">
                <h4 className="text-white font-bold text-sm leading-tight group-hover:text-indigo-300 transition-colors">
                  {cat.name}
                </h4>
                <p className="text-[11px] text-slate-300 font-medium">{cat.itemCount} items</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 5. Recommended Products Section */}
      <div id="recommended-products-section">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Recommended for You</h3>
              <p className="text-xs text-slate-500">Curated based on your interests and recent activity</p>
            </div>
          </div>

          <Link
            to="/products"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ProductGrid products={recommendedProducts} columns="4" />
      </div>

      {/* 6. Recently Viewed Products Section */}
      {recentlyViewed.length > 0 && (
        <div id="recently-viewed-section" className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Recently Viewed</h3>
                <p className="text-xs text-slate-500">Pick up where you left off</p>
              </div>
            </div>

            <Link
              to="/products"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>Explore More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <ProductGrid products={recentlyViewed.slice(0, 4)} columns="4" />
        </div>
      )}
    </div>
  );
};
