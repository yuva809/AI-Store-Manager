'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { BarChart3 } from 'lucide-react';

const COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

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

export default function RevenueByCategoryChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-lg bg-primary/10 p-2">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-base font-semibold text-foreground">Revenue by Category</h3>
        </div>
        <div className="h-64 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">No category data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300">
      <div className="absolute inset-0 bg-primary/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-5">
          <div className="relative">
            <div className="absolute inset-0 bg-chart-1/20 blur-lg rounded-full" />
            <div className="relative rounded-lg bg-chart-1/10 p-2">
              <BarChart3 className="h-5 w-5 text-chart-1" />
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Revenue by Category</h3>
            <p className="text-xs text-muted-foreground">{data.length} categories</p>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="category"
                tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                tickLine={false}
                axisLine={{ stroke: 'var(--border)' }}
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
              />
              <YAxis
                tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`}
                width={50}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--muted)', opacity: 0.2 }} />
              <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
