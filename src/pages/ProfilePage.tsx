import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Check,
  X,
  ShieldCheck,
  CreditCard,
  Package,
  Heart,
  DollarSign,
  Camera
} from 'lucide-react';

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop'
];

export const ProfilePage: React.FC = () => {
  const { userProfile, updateProfile, orders, wishlist } = useShop();
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    avatar: userProfile.avatar,
    bio: userProfile.bio || '',
    street: userProfile.address.street,
    city: userProfile.address.city,
    state: userProfile.address.state,
    zipCode: userProfile.address.zipCode,
    country: userProfile.address.country
  });

  const totalSpent = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((acc, o) => acc + o.totalAmount, 0);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      avatar: formData.avatar,
      bio: formData.bio,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      }
    });
    setIsEditing(false);
  };

  return (
    <div id="profile-page" className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header & Quick stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Account Profile</h2>
          <p className="text-xs text-slate-500">
            Manage your personal credentials, contact info, and delivery addresses
          </p>
        </div>

        <button
          id="edit-profile-toggle-btn"
          type="button"
          onClick={() => {
            setFormData({
              name: userProfile.name,
              email: userProfile.email,
              phone: userProfile.phone,
              avatar: userProfile.avatar,
              bio: userProfile.bio || '',
              street: userProfile.address.street,
              city: userProfile.address.city,
              state: userProfile.address.state,
              zipCode: userProfile.address.zipCode,
              country: userProfile.address.country
            });
            setIsEditing(!isEditing);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Main Profile Summary Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative group">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-indigo-50 border border-slate-200 shadow-md"
            />
            {isEditing && (
              <div className="absolute inset-0 bg-slate-950/40 rounded-3xl flex items-center justify-center text-white text-xs font-bold">
                <Camera className="w-5 h-5" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">{userProfile.name}</h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Buyer
              </span>
            </div>

            <p className="text-xs text-slate-500 max-w-xl mb-3 leading-relaxed">
              {userProfile.bio || 'E-commerce collector, design enthusiast, and frequent shopper.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <Mail className="w-4 h-4 text-slate-400" />
                {userProfile.email}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Phone className="w-4 h-4 text-slate-400" />
                {userProfile.phone}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-slate-400" />
                Member since {userProfile.memberSince}
              </span>
            </div>
          </div>
        </div>

        {/* 3 Overview Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-600">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Orders</p>
              <p className="text-lg font-black text-slate-900">{orders.length}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Spent</p>
              <p className="text-lg font-black text-slate-900">${totalSpent.toFixed(2)}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-100 text-rose-600">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Saved Wishlist</p>
              <p className="text-lg font-black text-slate-900">{wishlist.length} items</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form OR View Details */}
      {isEditing ? (
        <form
          id="profile-edit-form"
          onSubmit={handleSave}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-base">Edit Account Details</h3>
            <span className="text-xs text-slate-400">All changes persist locally</span>
          </div>

          {/* Avatar selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Choose Profile Photo
            </label>
            <div className="flex flex-wrap gap-3">
              {AVATAR_OPTIONS.map((imgUrl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setFormData({ ...formData, avatar: imgUrl })}
                  className={`relative rounded-2xl overflow-hidden p-0.5 border-2 transition-all ${
                    formData.avatar === imgUrl ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-transparent'
                  }`}
                >
                  <img src={imgUrl} alt="Avatar option" className="w-14 h-14 rounded-xl object-cover" />
                  {formData.avatar === imgUrl && (
                    <div className="absolute inset-0 bg-indigo-600/30 flex items-center justify-center text-white">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Personal Info fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
              <input
                id="edit-name-input"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
              <input
                id="edit-email-input"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
              <input
                id="edit-phone-input"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Bio / Status</label>
              <input
                id="edit-bio-input"
                type="text"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
              />
            </div>
          </div>

          {/* Address Fields */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Shipping & Delivery Address
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">Street Address</label>
                <input
                  id="edit-street-input"
                  type="text"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">City</label>
                <input
                  id="edit-city-input"
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">State / Province</label>
                <input
                  id="edit-state-input"
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Postal / ZIP Code</label>
                <input
                  id="edit-zip-input"
                  type="text"
                  required
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Country</label>
                <input
                  id="edit-country-input"
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Form action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              id="save-profile-btn"
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Address Display */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                <h4 className="font-extrabold text-slate-900 text-sm">Primary Delivery Address</h4>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                Default
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-800 text-sm">{userProfile.name}</p>
              <p>{userProfile.address.street}</p>
              <p>
                {userProfile.address.city}, {userProfile.address.state} {userProfile.address.zipCode}
              </p>
              <p className="font-semibold text-slate-700">{userProfile.address.country}</p>
              <p className="text-slate-400 pt-2">{userProfile.phone}</p>
            </div>
          </div>

          {/* Payment Methods Display */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-indigo-600" />
                <h4 className="font-extrabold text-slate-900 text-sm">Saved Payment Methods</h4>
              </div>
              <span className="text-[11px] font-bold text-indigo-600">2 Saved</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-6 rounded bg-slate-800 text-white font-bold text-[9px] flex items-center justify-center">
                    VISA
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Visa ending in 4242</p>
                    <p className="text-slate-400 text-[11px]">Expires 09/28 • Default</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600">Active</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-6 rounded bg-slate-900 text-white font-bold text-[9px] flex items-center justify-center">
                     Pay
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Apple Pay Express</p>
                    <p className="text-slate-400 text-[11px]">Linked to iPhone</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Connected</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
