import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { CartItem } from '../components/CartItem';
import {
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  CreditCard,
  Truck,
  Trash2,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartSubtotal, clearCart, placeOrder, userProfile, showToast } = useShop();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'Card' | 'ApplePay' | 'PayPal' | 'COD'>('Card');
  const [orderCompletedId, setOrderCompletedId] = useState<string | null>(null);

  // Calculations
  const shippingFee = cartSubtotal > 150 || cartSubtotal === 0 ? 0 : 15.00;
  const autoDiscount = cartSubtotal > 500 ? 50 : cartSubtotal > 200 ? 20 : 0;
  const totalDiscount = autoDiscount + promoDiscount;
  const taxableAmount = Math.max(0, cartSubtotal - totalDiscount);
  const estimatedTax = Number((taxableAmount * 0.0825).toFixed(2));
  const grandTotal = Number((taxableAmount + shippingFee + estimatedTax).toFixed(2));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SAVE10') {
      const disc = Math.round(cartSubtotal * 0.1);
      setPromoDiscount(disc);
      setPromoApplied(true);
      showToast(`Promo code SAVE10 applied! Saved $${disc.toFixed(2)}`, 'success');
    } else if (promoCode.trim().toUpperCase() === 'WELCOME25') {
      setPromoDiscount(25);
      setPromoApplied(true);
      showToast('Promo code WELCOME25 applied! Saved $25.00', 'success');
    } else {
      showToast('Invalid promo code. Try "SAVE10" or "WELCOME25"', 'error');
    }
  };

  const handleCompleteOrder = () => {
    const order = placeOrder(undefined, selectedPayment);
    if (order) {
      setOrderCompletedId(order.id);
      setIsCheckingOut(false);
    }
  };

  if (orderCompletedId) {
    return (
      <div id="order-success-view" className="max-w-2xl mx-auto py-12 px-4 text-center animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Order Successfully Placed
        </span>
        <h2 className="text-3xl font-black text-slate-900 mt-3 mb-2">Thank you for your order!</h2>
        <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
          We&apos;ve sent a confirmation email to <span className="font-semibold text-slate-800">{userProfile.email}</span>. Your order ID is{' '}
          <span className="font-mono font-bold text-indigo-600">{orderCompletedId}</span>.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            id="view-placed-order-btn"
            onClick={() => navigate('/orders')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-md transition-colors flex items-center gap-2"
          >
            <Truck className="w-4 h-4" />
            <span>Track in Orders</span>
          </button>
          <Link
            to="/products"
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div id="empty-cart-view" className="py-16 text-center max-w-md mx-auto animate-in fade-in duration-200">
        <div className="w-20 h-20 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-5">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-2">Your cart is empty</h3>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          Looks like you haven&apos;t added any items yet. Discover our trending catalog and curated selections.
        </p>
        <Link
          to="/products"
          id="cart-empty-browse-btn"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-500/20 transition-all hover:scale-105"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div id="cart-page" className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">My Shopping Cart</h2>
          <p className="text-xs text-slate-500">
            {cart.length} unique product line(s) • Total{' '}
            {cart.reduce((a, b) => a + b.quantity, 0)} item(s)
          </p>
        </div>

        <button
          id="clear-entire-cart-btn"
          type="button"
          onClick={() => {
            if (window.confirm('Are you sure you want to clear your entire cart?')) {
              clearCart();
            }
          }}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 p-2 rounded-lg hover:bg-rose-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Cart</span>
        </button>
      </div>

      {/* Main Grid: Cart Items List + Order Summary Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Items List (2 columns on lg) */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}

          {/* Quick Notice */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-800">
            <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold">Free standard shipping applied!</span> Orders over $150 qualify for complimentary courier delivery.
            </div>
          </div>
        </div>

        {/* Order Summary Card (1 column on lg) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs sticky top-20 flex flex-col gap-6">
          <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
            Order Summary
          </h3>

          {/* Price Breakdown */}
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-bold text-slate-800">${cartSubtotal.toFixed(2)}</span>
            </div>

            {totalDiscount > 0 && (
              <div className="flex items-center justify-between text-emerald-600 font-semibold">
                <span className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  Discount Savings
                </span>
                <span>-${totalDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-slate-600">
              <span>Estimated Shipping</span>
              <span className="font-bold text-slate-800">
                {shippingFee === 0 ? (
                  <span className="text-emerald-600 font-bold uppercase text-[11px]">Free</span>
                ) : (
                  `$${shippingFee.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>Estimated Sales Tax (8.25%)</span>
              <span className="font-bold text-slate-800">${estimatedTax.toFixed(2)}</span>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between text-slate-900">
              <div>
                <span className="text-sm font-bold block">Total Amount</span>
                <span className="text-[11px] text-slate-400">Includes all taxes and duties</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-indigo-600">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Promo Code Form */}
          <form onSubmit={handleApplyPromo} className="pt-2 border-t border-slate-100">
            <label htmlFor="promo-input" className="text-xs font-bold text-slate-700 block mb-1.5">
              Have a Coupon or Promo Code?
            </label>
            <div className="flex items-center gap-2">
              <input
                id="promo-input"
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Try: SAVE10 or WELCOME25"
                disabled={promoApplied}
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl uppercase font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                id="apply-promo-btn"
                type="submit"
                disabled={promoApplied || !promoCode.trim()}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
              >
                {promoApplied ? 'Applied' : 'Apply'}
              </button>
            </div>
            {promoApplied && (
              <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                ✓ Coupon active
              </span>
            )}
          </form>

          {/* Checkout Button */}
          <button
            id="proceed-checkout-btn"
            type="button"
            onClick={() => setIsCheckingOut(true)}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            <span>Proceed to Checkout</span>
          </button>

          {/* Trust Guarantees */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100 text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>256-bit Bank Grade Encrypted Checkout</span>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckingOut && (
        <div
          id="checkout-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Complete Your Order</h3>
                <p className="text-xs text-slate-500">Confirm delivery & choose payment method</p>
              </div>
              <span className="text-lg font-black text-indigo-600">${grandTotal.toFixed(2)}</span>
            </div>

            {/* Shipping Destination */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Shipping Address
              </h4>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <p className="font-bold text-slate-800">{userProfile.name}</p>
                <p className="text-slate-600">{userProfile.address.street}</p>
                <p className="text-slate-600">
                  {userProfile.address.city}, {userProfile.address.state} {userProfile.address.zipCode}
                </p>
                <p className="text-slate-500 mt-1">{userProfile.phone}</p>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Select Payment Method
              </h4>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'Card', label: 'Credit / Debit Card', sub: '•••• 4242' },
                  { id: 'ApplePay', label: 'Apple Pay', sub: 'One-touch' },
                  { id: 'PayPal', label: 'PayPal', sub: 'Instant Checkout' },
                  { id: 'COD', label: 'Cash on Delivery', sub: 'Pay on arrival' }
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedPayment(method.id as any)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedPayment === method.id
                        ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-500/20'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-900 block">{method.label}</span>
                    <span className="text-[11px] text-slate-400">{method.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsCheckingOut(false)}
                className="w-1/3 py-3 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Back
              </button>
              <button
                id="confirm-place-order-btn"
                type="button"
                onClick={handleCompleteOrder}
                className="w-2/3 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Pay & Place Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
