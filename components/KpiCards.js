'use client';

import { DollarSign, ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react';

function KpiCard({ title, value, subtitle, icon: Icon, variant = 'default' }) {
  const variants = {
    default: {
      card: 'bg-card border-border hover:border-primary/30',
      icon: 'bg-primary/10 text-primary',
      glow: 'bg-primary/5',
    },
    warning: {
      card: 'bg-card border-warning/30 hover:border-warning/50',
      icon: 'bg-warning/10 text-warning',
      glow: 'bg-warning/5',
    },
    success: {
      card: 'bg-card border-success/30 hover:border-success/50',
      icon: 'bg-success/10 text-success',
      glow: 'bg-success/5',
    },
  };

  const styles = variants[variant];

  return (
    <div
      className={`relative group rounded-xl border p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 ${styles.card}`}
    >
      <div className={`absolute inset-0 ${styles.glow} rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
      <div className="relative flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className={`rounded-lg p-2.5 ${styles.icon}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export default function KpiCards({ metrics }) {
  const { totalRevenue = 0, totalOrders = 0, topProduct = null, lowStockCount = 0 } = metrics || {};

  // Format revenue with proper currency display
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Get top product info safely
  const topProductName = topProduct && topProduct.name ? topProduct.name : 'No data';
  const topProductRevenue = topProduct && topProduct.revenue ? formatCurrency(topProduct.revenue) : '';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard
        title="Total Revenue"
        value={formatCurrency(totalRevenue)}
        subtitle="All time earnings"
        icon={DollarSign}
        variant="success"
      />
      <KpiCard
        title="Total Orders"
        value={totalOrders.toLocaleString()}
        subtitle="Orders processed"
        icon={ShoppingCart}
      />
      <KpiCard
        title="Top Product"
        value={topProductName}
        subtitle={topProductRevenue ? `${topProductRevenue} revenue` : 'Upload data to see'}
        icon={TrendingUp}
        variant={topProduct ? 'success' : 'default'}
      />
      <KpiCard
        title="Low Stock Alert"
        value={lowStockCount}
        subtitle={lowStockCount > 0 ? `${lowStockCount} product${lowStockCount > 1 ? 's' : ''} need restock` : 'Stock levels healthy'}
        icon={AlertTriangle}
        variant={lowStockCount > 0 ? 'warning' : 'default'}
      />
    </div>
  );
}
