export function generateInsights(metrics) {
  const {
    totalRevenue = 0,
    totalOrders = 0,
    topProduct = null,
    lowStockCount = 0,
    revenueByCategory = [],
    totalReturns = 0,
    avgProfitMargin = 0,
    productCount = 0,
    categoryCount = 0,
  } = metrics || {};

  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const returnRate = totalOrders > 0 ? (totalReturns / totalOrders) * 100 : 0;

  // Generate executive summary
  let summary = `Your store generated $${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} in revenue from ${totalOrders.toLocaleString()} orders`;
  
  if (topProduct && topProduct.name) {
    summary += `, with "${topProduct.name}" being your top performer at $${topProduct.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.`;
  } else {
    summary += '.';
  }

  if (lowStockCount > 0) {
    summary += ` ${lowStockCount} product${lowStockCount > 1 ? 's need' : ' needs'} restocking attention.`;
  }

  // Generate insights based on data
  const insights = [];

  if (topProduct && revenueByCategory.length > 0) {
    const topCategory = revenueByCategory[0];
    insights.push(
      `${topCategory.category} is your strongest category, contributing $${topCategory.revenue.toLocaleString()} to total revenue.`
    );
  }

  if (avgOrderValue > 0) {
    insights.push(
      `Average order value is $${avgOrderValue.toFixed(2)}, ${avgOrderValue > 50 ? 'indicating healthy customer spending' : 'suggesting opportunity for upselling'}.`
    );
  }

  if (avgProfitMargin > 0) {
    // avgProfitMargin might be decimal (0.35 = 35%) or already percentage (35)
    const marginPercent = avgProfitMargin < 1 ? avgProfitMargin * 100 : avgProfitMargin;
    insights.push(
      `Overall profit margin averages ${marginPercent.toFixed(1)}%, ${marginPercent > 20 ? 'showing strong profitability' : 'consider optimizing pricing strategy'}.`
    );
  }

  if (returnRate > 0) {
    insights.push(
      `Return rate is ${returnRate.toFixed(1)}%, ${returnRate < 5 ? 'well within industry standards' : 'which may warrant quality review'}.`
    );
  }

  if (productCount > 0) {
    insights.push(
      `Your catalog spans ${productCount} products across ${categoryCount} categories.`
    );
  }

  // Ensure we have at least 3 insights
  while (insights.length < 3) {
    const fallbackInsights = [
      'Consider implementing seasonal promotions to boost off-peak sales.',
      'Customer segmentation could help target marketing more effectively.',
      'Diversifying product range may capture new market segments.',
    ];
    insights.push(fallbackInsights[insights.length]);
  }

  // Generate recommendations
  const recommendations = [];

  if (lowStockCount > 0) {
    recommendations.push({
      title: 'Restock Low Inventory',
      description: `${lowStockCount} product${lowStockCount > 1 ? 's are' : ' is'} running low. Prioritize restocking to avoid lost sales.`,
      priority: 'high',
    });
  }

  if (topProduct) {
    recommendations.push({
      title: 'Capitalize on Top Seller',
      description: `"${topProduct.name}" is performing well. Consider bundling it with related products or featuring it prominently.`,
      priority: 'medium',
    });
  }

  if (revenueByCategory.length > 1) {
    const bottomCategory = revenueByCategory[revenueByCategory.length - 1];
    recommendations.push({
      title: 'Boost Underperforming Category',
      description: `${bottomCategory.category} shows lower revenue. Consider promotional campaigns or product improvements.`,
      priority: 'medium',
    });
  }

  if (avgOrderValue < 50) {
    recommendations.push({
      title: 'Increase Average Order Value',
      description: 'Implement cross-selling, bundles, or minimum-order promotions to boost cart values.',
      priority: 'medium',
    });
  }

  // Ensure we have at least 3 recommendations
  const fallbackRecommendations = [
    {
      title: 'Optimize Pricing Strategy',
      description: 'A/B test pricing on key products to find optimal price points.',
      priority: 'low',
    },
    {
      title: 'Enhance Customer Experience',
      description: 'Gather feedback and improve the shopping journey to increase conversions.',
      priority: 'low',
    },
    {
      title: 'Expand Marketing Channels',
      description: 'Explore new advertising platforms to reach untapped audiences.',
      priority: 'low',
    },
  ];

  while (recommendations.length < 3) {
    recommendations.push(fallbackRecommendations[recommendations.length]);
  }

  return {
    summary,
    insights: insights.slice(0, 3),
    recommendations: recommendations.slice(0, 3),
  };
}
