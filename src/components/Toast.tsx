import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div id="toast-container" className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            id={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl border shadow-lg transition-all transform translate-y-0 duration-300 ${
              isSuccess
                ? 'bg-emerald-900/90 border-emerald-700 text-white'
                : isError
                ? 'bg-rose-900/90 border-rose-700 text-white'
                : isWarning
                ? 'bg-amber-900/90 border-amber-700 text-white'
                : 'bg-slate-900/90 border-slate-700 text-white'
            }`}
          >
            <div className="flex items-center gap-3 pr-2">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-300 shrink-0" />}
              {isWarning && <AlertCircle className="w-5 h-5 text-amber-300 shrink-0" />}
              {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5 text-blue-300 shrink-0" />}
              <p className="text-sm font-medium leading-snug">{toast.message}</p>
            </div>
            <button
              id={`close-${toast.id}`}
              onClick={() => removeToast(toast.id)}
              className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
