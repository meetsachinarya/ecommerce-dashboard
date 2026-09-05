import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { useShop } from '../context/ShopContext';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  ExternalLink,
  MapPin,
  CreditCard
} from 'lucide-react';

interface OrderCardProps {
  order: Order;
}

const STATUS_CONFIG: Record<
  OrderStatus,
  { bg: string; text: string; border: string; icon: React.ReactNode; label: string }
> = {
  Delivered: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
    label: 'Delivered'
  },
  Shipped: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    icon: <Truck className="w-4 h-4 text-blue-600" />,
    label: 'Shipped (In Transit)'
  },
  Pending: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    icon: <Clock className="w-4 h-4 text-amber-600" />,
    label: 'Processing'
  },
  Cancelled: {
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
    icon: <XCircle className="w-4 h-4 text-rose-600" />,
    label: 'Cancelled'
  }
};

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const { addToCart, cancelOrder, showToast } = useShop();
  const [isExpanded, setIsExpanded] = useState(false);
  const statusInfo = STATUS_CONFIG[order.status] || STATUS_CONFIG.Pending;

  const handleReorder = () => {
    order.items.forEach((item) => {
      addToCart(item.product, item.quantity);
    });
    showToast(`Added ${order.items.length} item(s) from order ${order.id} to cart!`, 'success');
  };

  const handleCancelOrder = () => {
    if (window.confirm(`Are you sure you want to cancel order ${order.id}?`)) {
      cancelOrder(order.id);
    }
  };

  return (
    <div
      id={`order-card-${order.id}`}
      className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      {/* Order Top Bar */}
      <div className="p-5 bg-slate-50/70 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs">
          <div>
            <span className="text-slate-400 font-medium block">Order ID</span>
            <span className="font-bold text-slate-800 text-sm">{order.id}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Date Placed</span>
            <span className="font-semibold text-slate-700">{order.date}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Total Amount</span>
            <span className="font-black text-slate-900 text-sm">${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}
          >
            {statusInfo.icon}
            {statusInfo.label}
          </span>
        </div>
      </div>

      {/* Items List Preview */}
      <div className="p-5 flex flex-col gap-4">
        <div className="divide-y divide-slate-100">
          {order.items.map((item, idx) => (
            <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-14 h-14 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-800 truncate">{item.product.name}</h4>
                  <p className="text-xs text-slate-500">
                    Qty: <span className="font-semibold text-slate-700">{item.quantity}</span> ×{' '}
                    <span className="font-semibold text-slate-700">${item.price.toFixed(2)}</span>
                  </p>
                  <span className="text-[11px] text-indigo-600 font-medium">{item.product.category}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-sm font-bold text-slate-900">
                  ${(item.quantity * item.price).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Tracking Stepper (Collapsible / Expandable) */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in duration-200">
            {/* Tracking Progress */}
            <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Shipment Tracking
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {order.carrier}: <span className="font-mono text-slate-800">{order.trackingNumber}</span>
                </span>
              </div>

              {/* Steps */}
              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {order.trackingSteps.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                        step.completed
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {step.completed && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <p className={`text-xs font-bold ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                          {step.title}
                        </p>
                        <span className="text-[11px] text-slate-400">{step.date}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping & Payment summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50/50 p-3.5 rounded-xl border border-slate-200">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-700 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Delivery Address</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {order.shippingAddress.fullName}<br />
                  {order.shippingAddress.street}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-700 mb-1">
                  <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                  <span>Payment Information</span>
                </div>
                <p className="text-slate-600">
                  Payment Method: <span className="font-semibold">{order.paymentMethod.type}</span>
                  {order.paymentMethod.last4 && ` (ending in ${order.paymentMethod.last4})`}
                </p>
                <p className="text-slate-600 mt-1">
                  Estimated Delivery: <span className="font-semibold text-indigo-600">{order.estimatedDelivery}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <button
            id={`toggle-details-${order.id}`}
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide Tracking & Details
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                View Tracking & Order Details
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            {order.status === 'Pending' && (
              <button
                id={`cancel-order-${order.id}`}
                type="button"
                onClick={handleCancelOrder}
                className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl border border-rose-200 transition-colors"
              >
                Cancel Order
              </button>
            )}

            <button
              id={`reorder-btn-${order.id}`}
              type="button"
              onClick={handleReorder}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Buy Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
