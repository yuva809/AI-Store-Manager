'use client';

import { useState, useCallback } from 'react';
import { Store, BarChart3, RefreshCw, Sparkles, Play } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import KpiCards from '@/components/KpiCards';
import RevenueByCategoryChart from '@/components/RevenueByCategoryChart';
import RevenueOverTimeChart from '@/components/RevenueOverTimeChart';
import InsightBox from '@/components/InsightBox';
import RecommendationList from '@/components/RecommendationList';
import { sampleData } from '@/lib/sampleData';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState(null);

  const analyzeData = useCallback(async (data) => {
    setIsLoading(true);
    setError(null);

    console.log('[v0] analyzeData called with', data?.length, 'rows');
    console.log('[v0] First row:', JSON.stringify(data?.[0]));

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });

      console.log('[v0] API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.log('[v0] API error response:', errorData);
        throw new Error(errorData.error || 'Failed to analyze data');
      }

      const result = await response.json();
      console.log('[v0] API success result:', JSON.stringify(result).slice(0, 500));
      setMetrics(result.metrics);
      setInsights(result.insights);
    } catch (err) {
      console.error('[v0] analyzeData error:', err);
      setError(err.message);
      setMetrics(null);
      setInsights(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDataParsed = useCallback(async (data) => {
    if (!data) {
      setMetrics(null);
      setInsights(null);
      setError(null);
      return;
    }
    await analyzeData(data);
  }, [analyzeData]);

  const handleLoadDemo = useCallback(() => {
    analyzeData(sampleData);
  }, [analyzeData]);

  const handleReset = useCallback(() => {
    setMetrics(null);
    setInsights(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <div className="relative rounded-xl bg-gradient-to-br from-primary to-accent p-2.5">
                  <Store className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground tracking-tight">AI Store Manager</h1>
                <p className="text-xs text-muted-foreground">Ecommerce Analytics Agent</p>
              </div>
            </div>
            {metrics && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-all"
              >
                <RefreshCw className="h-4 w-4" />
                New Analysis
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Empty State - Upload Section */}
        {!metrics && !isLoading && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full scale-150" />
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-card to-secondary border border-border flex items-center justify-center">
                  <BarChart3 className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-3 tracking-tight text-balance">
                Transform Your Sales Data Into Insights
              </h2>
              <p className="text-muted-foreground text-lg max-w-md mx-auto text-balance">
                Upload your CSV file and let AI analyze your ecommerce performance in seconds
              </p>
            </div>

            <FileUpload onDataParsed={handleDataParsed} isLoading={isLoading} />

            {/* Demo Button */}
            <div className="mt-6 flex items-center justify-center">
              <button
                onClick={handleLoadDemo}
                className="group flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-primary hover:text-primary-foreground bg-primary/10 hover:bg-primary rounded-lg transition-all border border-primary/20 hover:border-primary"
              >
                <Play className="h-4 w-4" />
                Try with sample data
              </button>
            </div>

            {/* Expected Format */}
            <div className="mt-10 p-5 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Expected CSV Format</h3>
              </div>
              <div className="bg-background rounded-lg p-4 border border-border overflow-x-auto">
                <code className="text-xs text-muted-foreground font-mono block whitespace-pre">
{`product_name,category,date,revenue,orders,stock,returns,profit_margin
Wireless Earbuds,Electronics,2024-01-15,1299.99,42,8,3,0.32
Running Shoes,Footwear,2024-01-15,899.50,28,45,1,0.28`}
                </code>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                <div className="relative h-16 w-16 rounded-2xl bg-card border border-border flex items-center justify-center">
                  <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
              <p className="text-foreground font-medium mb-2">Analyzing your data</p>
              <p className="text-sm text-muted-foreground">Generating insights and recommendations...</p>
            </div>

            {/* Skeleton Loading */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="h-4 w-24 animate-shimmer rounded" />
                      <div className="h-8 w-32 animate-shimmer rounded" />
                      <div className="h-3 w-20 animate-shimmer rounded" />
                    </div>
                    <div className="h-12 w-12 animate-shimmer rounded-lg" />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-6">
                  <div className="h-5 w-40 animate-shimmer rounded mb-4" />
                  <div className="h-64 animate-shimmer rounded" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="max-w-2xl mx-auto">
            <div className="p-5 rounded-xl bg-destructive/10 border border-destructive/20 text-center">
              <p className="text-destructive font-medium">{error}</p>
              <button
                onClick={handleReset}
                className="mt-3 text-sm text-destructive/80 hover:text-destructive underline"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        {metrics && insights && !isLoading && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-sm text-muted-foreground text-center">
            AI Store Manager &middot; Built for Shopware Merchants
          </p>
        </div>
      </footer>
    </div>
  );
}
