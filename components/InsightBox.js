'use client';

import { Sparkles, Lightbulb } from 'lucide-react';

export default function InsightBox({ summary, insights }) {
  return (
    <div className="relative group bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300">
      <div className="absolute inset-0 bg-primary/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-5">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
            <div className="relative rounded-lg bg-primary/10 p-2">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">AI Summary</h3>
            <p className="text-xs text-muted-foreground">Powered by analytics engine</p>
          </div>
        </div>

        <p className="text-foreground leading-relaxed mb-6 text-sm">{summary}</p>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <Lightbulb className="h-3.5 w-3.5" />
            Key Insights
          </div>
          <ul className="space-y-3">
            {insights.map((insight, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm text-foreground"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-primary text-xs font-bold flex items-center justify-center border border-primary/20">
                  {index + 1}
                </span>
                <span className="leading-relaxed text-muted-foreground">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
