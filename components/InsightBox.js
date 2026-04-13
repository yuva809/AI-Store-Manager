'use client';

import { Sparkles, Lightbulb } from 'lucide-react';

export default function InsightBox({ summary, insights }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="rounded-lg bg-primary/10 p-2">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">AI Summary</h3>
      </div>

      <p className="text-foreground leading-relaxed mb-6">{summary}</p>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
          <Lightbulb className="h-4 w-4" />
          Key Insights
        </h4>
        <ul className="space-y-2">
          {insights.map((insight, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm text-foreground"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">
                {index + 1}
              </span>
              <span className="leading-relaxed">{insight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
