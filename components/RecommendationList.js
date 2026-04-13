'use client';

import { Target, ArrowRight } from 'lucide-react';

const priorityConfig = {
  high: {
    badge: 'bg-destructive/10 text-destructive border-destructive/20',
    indicator: 'bg-destructive',
  },
  medium: {
    badge: 'bg-warning/10 text-warning border-warning/20',
    indicator: 'bg-warning',
  },
  low: {
    badge: 'bg-success/10 text-success border-success/20',
    indicator: 'bg-success',
  },
};

export default function RecommendationList({ recommendations = [] }) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="relative group bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300">
        <div className="flex items-center gap-3 mb-5">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 blur-lg rounded-full" />
            <div className="relative rounded-lg bg-accent/10 p-2">
              <Target className="h-5 w-5 text-accent" />
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Recommended Actions</h3>
            <p className="text-xs text-muted-foreground">Prioritized next steps</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">No recommendations available yet.</p>
      </div>
    );
  }

  return (
    <div className="relative group bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300">
      <div className="absolute inset-0 bg-primary/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-5">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 blur-lg rounded-full" />
            <div className="relative rounded-lg bg-accent/10 p-2">
              <Target className="h-5 w-5 text-accent" />
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Recommended Actions</h3>
            <p className="text-xs text-muted-foreground">Prioritized next steps</p>
          </div>
        </div>

        <div className="space-y-3">
          {recommendations.map((rec, index) => {
            const config = priorityConfig[rec.priority];
            return (
              <div
                key={index}
                className="group/item p-4 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 hover:border-primary/20 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 ${config.indicator}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="font-medium text-foreground text-sm">{rec.title}</h4>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize border ${config.badge}`}
                        >
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {rec.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover/item:text-primary group-hover/item:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
