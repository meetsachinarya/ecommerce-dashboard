import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import {
  LayoutDashboard,
  ShoppingBag,
  Grid,
  ShoppingCart,
  Heart,
  PackageCheck,
  User,
  Settings,
  LogOut,
  X,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cartCount, wishlistCount, pendingOrdersCount, userProfile, showToast } = useShop();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard, badge: null },
    { label: 'Products', path: '/products', icon: ShoppingBag, badge: null },
    { label: 'Categories', path: '/categories', icon: Grid, badge: null },
    { label: 'My Cart', path: '/cart', icon: ShoppingCart, badge: cartCount > 0 ? cartCount : null },
    { label: 'Wishlist', path: '/wishlist', icon: Heart, badge: wishlistCount > 0 ? wishlistCount : null },
    { label: 'My Orders', path: '/orders', icon: PackageCheck, badge: pendingOrdersCount > 0 ? pendingOrdersCount : null },
    { label: 'Profile', path: '/profile', icon: User, badge: null },
    { label: 'Settings', path: '/settings', icon: Settings, badge: null }
  ];

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    showToast('You have been logged out successfully.', 'info');
    navigate('/');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300 select-none">
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-slate-800">
        <NavLink to="/" onClick={onClose} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-white text-base tracking-tight leading-none">
              ShopSphere
            </h1>
            <span className="text-[11px] font-medium text-indigo-400">User Dashboard</span>
          </div>
        </NavLink>

        {/* Close button on mobile */}
        <button
          id="close-mobile-sidebar-btn"
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3.5 py-4 overflow-y-auto space-y-1.5">
        <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Main Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </div>

              {item.badge !== null && (
                <span
                  className="px-2 py-0.5 text-xs font-bold rounded-full bg-slate-800 text-indigo-300 border border-slate-700"
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Quick Info & Logout */}
      <div className="p-3.5 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/50 mb-2">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-9 h-9 rounded-full object-cover border border-indigo-500/40 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate">{userProfile.name}</p>
            <p className="text-[11px] text-slate-400 truncate">{userProfile.email}</p>
          </div>
        </div>

        <button
          id="sidebar-logout-btn"
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-2.5 w-full px-3.5 py-2 rounded-xl font-semibold text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white text-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-4 mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-center text-slate-900 mb-1">Confirm Logout</h3>
            <p className="text-xs text-slate-500 text-center mb-6">
              Are you sure you want to end your current session? You can log back in at any time.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                id="confirm-logout-btn"
                type="button"
                onClick={handleLogoutConfirm}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-xs"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        id="desktop-sidebar"
        className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 border-r border-slate-800 z-30 shadow-xl"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          id="mobile-sidebar-backdrop"
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Mobile Drawer */}
      <div
        id="mobile-sidebar-drawer"
        className={`fixed top-0 bottom-0 left-0 w-72 max-w-[80vw] z-50 lg:hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
};
