'use client';

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg shadow-xl p-3 backdrop-blur-sm">
        <p className="font-medium text-foreground text-sm">{label}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Revenue: <span className="font-semibold text-primary">${payload[0].value.toLocaleString()}</span>
        </p>
      </div>
    );
  }
  return null;
}

export default function RevenueOverTimeChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-lg bg-primary/10 p-2">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-base font-semibold text-foreground">Revenue Over Time</h3>
        </div>
        <div className="h-64 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">No time series data available</p>
        </div>
      </div>
    );
  }

  const formattedData = data.map((item) => ({
    ...item,
    displayDate: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
  }));

  return (
    <div className="relative group bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300">
      <div className="absolute inset-0 bg-primary/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-5">
          <div className="relative">
            <div className="absolute inset-0 bg-chart-2/20 blur-lg rounded-full" />
            <div className="relative rounded-lg bg-chart-2/10 p-2">
              <TrendingUp className="h-5 w-5 text-chart-2" />
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Revenue Over Time</h3>
            <p className="text-xs text-muted-foreground">{data.length} data points</p>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={formattedData}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="displayDate"
                tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: 'var(--border)' }}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`}
                width={50}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--chart-2)"
                strokeWidth={2}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
