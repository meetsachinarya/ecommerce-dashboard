import React from 'react';
import { LucideIcon, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardCardProps {
  id: string;
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  color: 'indigo' | 'emerald' | 'amber' | 'rose' | 'purple' | 'blue';
  linkTo?: string;
  subtitle?: string;
}

const COLOR_STYLES = {
  indigo: {
    bg: 'bg-indigo-50/70',
    border: 'border-indigo-100',
    iconBg: 'bg-indigo-600 text-white shadow-indigo-200',
    text: 'text-indigo-900',
    trendBg: 'bg-indigo-100 text-indigo-800'
  },
  emerald: {
    bg: 'bg-emerald-50/70',
    border: 'border-emerald-100',
    iconBg: 'bg-emerald-600 text-white shadow-emerald-200',
    text: 'text-emerald-900',
    trendBg: 'bg-emerald-100 text-emerald-800'
  },
  amber: {
    bg: 'bg-amber-50/70',
    border: 'border-amber-100',
    iconBg: 'bg-amber-500 text-white shadow-amber-200',
    text: 'text-amber-900',
    trendBg: 'bg-amber-100 text-amber-800'
  },
  rose: {
    bg: 'bg-rose-50/70',
    border: 'border-rose-100',
    iconBg: 'bg-rose-600 text-white shadow-rose-200',
    text: 'text-rose-900',
    trendBg: 'bg-rose-100 text-rose-800'
  },
  purple: {
    bg: 'bg-purple-50/70',
    border: 'border-purple-100',
    iconBg: 'bg-purple-600 text-white shadow-purple-200',
    text: 'text-purple-900',
    trendBg: 'bg-purple-100 text-purple-800'
  },
  blue: {
    bg: 'bg-blue-50/70',
    border: 'border-blue-100',
    iconBg: 'bg-blue-600 text-white shadow-blue-200',
    text: 'text-blue-900',
    trendBg: 'bg-blue-100 text-blue-800'
  }
};

export const DashboardCard: React.FC<DashboardCardProps> = ({
  id,
  title,
  value,
  icon: Icon,
  change,
  trend = 'up',
  color,
  linkTo,
  subtitle
}) => {
  const styles = COLOR_STYLES[color] || COLOR_STYLES.indigo;

  const cardContent = (
    <div
      id={id}
      className={`relative p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 group flex flex-col justify-between`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${styles.iconBg} shadow-sm group-hover:scale-105 transition-transform`}>
          <Icon className="w-5 h-5" />
        </div>
        {linkTo && (
          <span className="text-slate-400 group-hover:text-indigo-600 transition-colors p-1">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">{value}</h3>
          {change && (
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${styles.trendBg}`}>
              {trend === 'up' ? '+' : ''}{change}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="block focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-2xl">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};
