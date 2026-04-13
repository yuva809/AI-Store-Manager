'use client';

import { useState, useCallback } from 'react';
import { Store, BarChart3, RefreshCw } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import KpiCards from '@/components/KpiCards';
import RevenueByCategoryChart from '@/components/RevenueByCategoryChart';
import RevenueOverTimeChart from '@/components/RevenueOverTimeChart';
import InsightBox from '@/components/InsightBox';
import RecommendationList from '@/components/RecommendationList';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState(null);

  const handleDataParsed = useCallback(async (data) => {
    if (!data) {
      setMetrics(null);
      setInsights(null);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze data');
      }

      const result = await response.json();
      setMetrics(result.metrics);
      setInsights(result.insights);
    } catch (err) {
      setError(err.message);
      setMetrics(null);
      setInsights(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary p-2">
                <Store className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AI Store Manager</h1>
                <p className="text-sm text-muted-foreground">Ecommerce Analytics Agent</p>
              </div>
            </div>
            {metrics && (
              <button
                onClick={() => {
                  setMetrics(null);
                  setInsights(null);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                New Analysis
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* File Upload Section */}
        {!metrics && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Upload Your Sales Data
              </h2>
              <p className="text-muted-foreground">
                Drop a CSV file with your ecommerce data to get instant AI-powered insights
              </p>
            </div>
            <FileUpload onDataParsed={handleDataParsed} isLoading={isLoading} />

            {/* Sample data hint */}
            <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-2">Expected CSV Format</h3>
              <code className="text-xs text-muted-foreground block overflow-x-auto">
                product_name,category,date,revenue,orders,stock,returns,profit_margin
                <br />
                Wireless Earbuds,Electronics,2024-01-15,1299.99,42,8,3,0.32
                <br />
                Running Shoes,Footwear,2024-01-15,899.50,28,45,1,0.28
              </code>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-muted-foreground">Analyzing your data...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto">
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
              {error}
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        {metrics && insights && !isLoading && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* KPI Cards */}
            <KpiCards metrics={metrics} />

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RevenueByCategoryChart data={metrics.revenueByCategory} />
              <RevenueOverTimeChart data={metrics.revenueOverTime} />
            </div>

            {/* AI Insights Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InsightBox summary={insights.summary} insights={insights.insights} />
              <RecommendationList recommendations={insights.recommendations} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-muted-foreground text-center">
            AI Store Manager Agent &middot; Built for Shopware Merchants
          </p>
        </div>
      </footer>
    </div>
  );
}
