import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { OrderCard } from '../components/OrderCard';
import { OrderStatus } from '../types';
import {
  PackageCheck,
  Search,
  SlidersHorizontal,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  ShoppingBag
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const OrdersPage: React.FC = () => {
  const { orders } = useShop();
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'All'>('All');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Status filter
      if (selectedStatus !== 'All' && order.status !== selectedStatus) {
        return false;
      }
      // Search filter
      if (orderSearchQuery.trim()) {
        const q = orderSearchQuery.toLowerCase();
        const matchesId = order.id.toLowerCase().includes(q);
        const matchesProduct = order.items.some((item) =>
          item.product.name.toLowerCase().includes(q)
        );
        const matchesCarrier = order.carrier.toLowerCase().includes(q);
        const matchesTracking = order.trackingNumber.toLowerCase().includes(q);
        if (!matchesId && !matchesProduct && !matchesCarrier && !matchesTracking) {
          return false;
        }
      }
      return true;
    });
  }, [orders, selectedStatus, orderSearchQuery]);

  const countsByStatus = useMemo(() => {
    return {
      All: orders.length,
      Delivered: orders.filter((o) => o.status === 'Delivered').length,
      Shipped: orders.filter((o) => o.status === 'Shipped').length,
      Pending: orders.filter((o) => o.status === 'Pending').length,
      Cancelled: orders.filter((o) => o.status === 'Cancelled').length
    };
  }, [orders]);

  return (
    <div id="orders-page" className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">My Orders</h2>
              <p className="text-xs text-slate-500">
                Track your active shipments, view receipts, and review purchase history
              </p>
            </div>
          </div>
        </div>

        {/* Search orders input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            id="order-search-input"
            type="text"
            value={orderSearchQuery}
            onChange={(e) => setOrderSearchQuery(e.target.value)}
            placeholder="Search by order ID, item..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { key: 'All', label: 'All Orders', icon: null },
          { key: 'Pending', label: 'Processing', icon: Clock },
          { key: 'Shipped', label: 'In Transit', icon: Truck },
          { key: 'Delivered', label: 'Delivered', icon: CheckCircle2 },
          { key: 'Cancelled', label: 'Cancelled', icon: XCircle }
        ].map((tab) => {
          const isSelected = selectedStatus === tab.key;
          const count = countsByStatus[tab.key as keyof typeof countsByStatus] || 0;
          const Icon = tab.icon;

          return (
            <button
              key={tab.key}
              id={`orders-tab-${tab.key.toLowerCase()}`}
              type="button"
              onClick={() => setSelectedStatus(tab.key as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div
          id="empty-orders-view"
          className="p-12 bg-white rounded-3xl border border-slate-200 text-center max-w-md mx-auto my-8 shadow-xs"
        >
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">No orders found</h3>
          <p className="text-xs text-slate-500 mb-6">
            {orderSearchQuery
              ? `No matching orders for "${orderSearchQuery}"`
              : `You don't have any orders with status "${selectedStatus}".`}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
          >
            Explore Catalog
          </Link>
        </div>
      )}
    </div>
  );
};
