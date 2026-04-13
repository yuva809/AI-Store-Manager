'use client';

import { DollarSign, ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react';

function KpiCard({ title, value, subtitle, icon: Icon, variant = 'default' }) {
  const variantStyles = {
    default: 'bg-card border-border',
    warning: 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800',
  };

  const iconStyles = {
    default: 'bg-primary/10 text-primary',
    warning: 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400',
  };

  return (
    <div
      className={`rounded-xl border p-6 transition-all duration-200 hover:shadow-md ${variantStyles[variant]}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className={`rounded-lg p-3 ${iconStyles[variant]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export default function KpiCards({ metrics }) {
  const { totalRevenue, totalOrders, topProduct, lowStockCount } = metrics;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard
        title="Total Revenue"
        value={`$${totalRevenue.toLocaleString()}`}
        subtitle="All time"
        icon={DollarSign}
      />
      <KpiCard
        title="Total Orders"
        value={totalOrders.toLocaleString()}
        subtitle="Processed"
        icon={ShoppingCart}
      />
      <KpiCard
        title="Top Product"
        value={topProduct ? topProduct.name : 'N/A'}
        subtitle={topProduct ? `$${topProduct.revenue.toLocaleString()}` : 'No data'}
        icon={TrendingUp}
      />
      <KpiCard
        title="Low Stock Alert"
        value={lowStockCount}
        subtitle={lowStockCount > 0 ? 'Products need restock' : 'Stock healthy'}
        icon={AlertTriangle}
        variant={lowStockCount > 0 ? 'warning' : 'default'}
      />
    </div>
  );
}
