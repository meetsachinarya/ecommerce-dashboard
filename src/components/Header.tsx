import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { SearchBar } from './SearchBar';
import {
  Menu,
  Bell,
  ShoppingCart,
  Heart,
  Check,
  Trash2,
  Package,
  Sparkles,
  Tag,
  AlertCircle
} from 'lucide-react';

interface HeaderProps {
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu }) => {
  const {
    userProfile,
    cartCount,
    wishlistCount,
    notifications,
    unreadNotificationCount,
    markAllNotificationsRead,
    dismissNotification
  } = useShop();

  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close notifications on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header
      id="top-header"
      className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 transition-all"
    >
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Left Side: Mobile Menu Button & Search */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Integrated Search Bar */}
          <div className="flex-1">
            <SearchBar placeholder="Search products, brands, categories..." />
          </div>
        </div>

        {/* Right Side: Quick Action Icons & User Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Wishlist Shortcut */}
          <Link
            to="/wishlist"
            id="header-wishlist-link"
            className="relative p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors hidden sm:inline-flex items-center justify-center"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs animate-in zoom-in">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Shortcut */}
          <Link
            to="/cart"
            id="header-cart-link"
            className="relative p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors inline-flex items-center justify-center"
            title="Shopping Cart"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Notification Menu */}
          <div ref={notifRef} className="relative">
            <button
              id="header-notifications-btn"
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center justify-center"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div
                id="notifications-dropdown"
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Notifications
                    </h4>
                    {unreadNotificationCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-100 text-indigo-700">
                        {unreadNotificationCount} new
                      </span>
                    )}
                  </div>

                  {unreadNotificationCount > 0 && (
                    <button
                      id="mark-all-read-btn"
                      type="button"
                      onClick={markAllNotificationsRead}
                      className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3.5 hover:bg-slate-50 transition-colors flex items-start justify-between gap-3 ${
                          !notif.read ? 'bg-indigo-50/40' : ''
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600 shrink-0 mt-0.5">
                            {notif.type === 'order' && <Package className="w-3.5 h-3.5" />}
                            {notif.type === 'discount' && <Tag className="w-3.5 h-3.5" />}
                            {notif.type === 'stock' && <Sparkles className="w-3.5 h-3.5" />}
                            {notif.type === 'system' && <AlertCircle className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800 leading-tight">
                              {notif.title}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                              {notif.message}
                            </p>
                            <span className="text-[10px] text-slate-400 font-medium block mt-1">
                              {notif.time}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => dismissNotification(notif.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                          title="Dismiss"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-xs text-slate-400">
                      No notifications to display
                    </div>
                  )}
                </div>

                <div className="px-4 py-2 border-t border-slate-100 bg-slate-50 text-center">
                  <Link
                    to="/orders"
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                  >
                    View Orders Timeline
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* User Profile Avatar & Name */}
          <Link
            to="/profile"
            id="header-profile-link"
            className="flex items-center gap-2.5 p-1 sm:p-1.5 rounded-xl hover:bg-slate-100 transition-colors group"
          >
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-indigo-600/30 group-hover:ring-indigo-600 transition-all"
            />
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 leading-none transition-colors">
                {userProfile.name}
              </p>
              <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Member
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
