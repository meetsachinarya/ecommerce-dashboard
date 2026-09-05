import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Settings,
  Bell,
  Globe,
  Shield,
  Palette,
  Check,
  Save,
  Lock,
  Smartphone
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { showToast } = useShop();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [orderSms, setOrderSms] = useState(true);
  const [priceDropNotifs, setPriceDropNotifs] = useState(true);
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('en');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Your preferences and settings have been saved.', 'success');
  };

  return (
    <div id="settings-page" className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Dashboard Settings</h2>
            <p className="text-xs text-slate-500">
              Manage your preferences, security safeguards, and account configuration
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* 1. Notifications Preferences */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
            <Bell className="w-4 h-4 text-indigo-600" />
            <h3 className="font-extrabold text-slate-900 text-sm">Notification Channels</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">Email Promotions & Flash Sales</p>
                <p className="text-[11px] text-slate-500">Receive weekly curated discounts and new release alerts</p>
              </div>
              <input
                id="toggle-email-alerts"
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded-md focus:ring-indigo-500 cursor-pointer accent-indigo-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">SMS Tracking & Delivery Updates</p>
                <p className="text-[11px] text-slate-500">Real-time text alerts when packages are out for delivery</p>
              </div>
              <input
                id="toggle-sms-alerts"
                type="checkbox"
                checked={orderSms}
                onChange={(e) => setOrderSms(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded-md focus:ring-indigo-500 cursor-pointer accent-indigo-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">Wishlist Price Drop Alerts</p>
                <p className="text-[11px] text-slate-500">Get notified immediately when bookmarked items go on discount</p>
              </div>
              <input
                id="toggle-price-drop-alerts"
                type="checkbox"
                checked={priceDropNotifs}
                onChange={(e) => setPriceDropNotifs(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded-md focus:ring-indigo-500 cursor-pointer accent-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* 2. Regional & Currency Settings */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
            <Globe className="w-4 h-4 text-indigo-600" />
            <h3 className="font-extrabold text-slate-900 text-sm">Regional & Currency</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="currency-select" className="text-xs font-bold text-slate-700 block mb-1">
                Display Currency
              </label>
              <select
                id="currency-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="USD">USD ($) - US Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
                <option value="CAD">CAD ($) - Canadian Dollar</option>
              </select>
            </div>

            <div>
              <label htmlFor="language-select" className="text-xs font-bold text-slate-700 block mb-1">
                Interface Language
              </label>
              <select
                id="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="en">English (US)</option>
                <option value="es">Español (Spanish)</option>
                <option value="fr">Français (French)</option>
                <option value="de">Deutsch (German)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Account Security */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
            <Shield className="w-4 h-4 text-indigo-600" />
            <h3 className="font-extrabold text-slate-900 text-sm">Security & Privacy</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Two-Factor Authentication (2FA)</p>
                  <p className="text-[11px] text-slate-500">Protect logins with authentication code verification</p>
                </div>
              </div>
              <input
                id="toggle-2fa"
                type="checkbox"
                checked={twoFactorEnabled}
                onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded-md focus:ring-indigo-500 cursor-pointer accent-indigo-600"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-100 text-slate-600">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Account Password</p>
                  <p className="text-[11px] text-slate-500">Last changed 45 days ago</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => showToast('Password reset link sent to your registered email.', 'info')}
                className="px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            id="save-settings-submit-btn"
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-2xl shadow-md shadow-indigo-500/20 transition-all hover:scale-105"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
