export function processData(data) {
  if (!data || data.length === 0) {
    return {
      totalRevenue: 0,
      totalOrders: 0,
      topProduct: null,
      lowStockCount: 0,
      revenueByCategory: [],
      revenueOverTime: [],
    };
  }

  // Calculate total revenue
  const totalRevenue = data.reduce((sum, row) => {
    const revenue = parseFloat(row.revenue) || 0;
    return sum + revenue;
  }, 0);

  // Calculate total orders
  const totalOrders = data.reduce((sum, row) => {
    const orders = parseInt(row.orders, 10) || 0;
    return sum + orders;
  }, 0);

  // Find top product by revenue
  const productRevenue = {};
  data.forEach((row) => {
    if (row.product_name) {
      const revenue = parseFloat(row.revenue) || 0;
      productRevenue[row.product_name] =
        (productRevenue[row.product_name] || 0) + revenue;
    }
  });

  const topProduct = Object.entries(productRevenue).sort(
    (a, b) => b[1] - a[1]
  )[0];

  // Count low stock products (stock < 10)
  const lowStockProducts = new Set();
  data.forEach((row) => {
    const stock = parseInt(row.stock, 10);
    if (!isNaN(stock) && stock < 10 && row.product_name) {
      lowStockProducts.add(row.product_name);
    }
  });
  const lowStockCount = lowStockProducts.size;

  // Revenue by category
  const categoryRevenue = {};
  data.forEach((row) => {
    if (row.category) {
      const revenue = parseFloat(row.revenue) || 0;
      categoryRevenue[row.category] =
        (categoryRevenue[row.category] || 0) + revenue;
    }
  });

  const revenueByCategory = Object.entries(categoryRevenue)
    .map(([category, revenue]) => ({
      category,
      revenue: Math.round(revenue * 100) / 100,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  // Revenue over time
  const dateRevenue = {};
  data.forEach((row) => {
    if (row.date) {
      const revenue = parseFloat(row.revenue) || 0;
      dateRevenue[row.date] = (dateRevenue[row.date] || 0) + revenue;
    }
  });

  const revenueOverTime = Object.entries(dateRevenue)
    .map(([date, revenue]) => ({
      date,
      revenue: Math.round(revenue * 100) / 100,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Additional metrics for AI insights
  const totalReturns = data.reduce((sum, row) => {
    const returns = parseInt(row.returns, 10) || 0;
    return sum + returns;
  }, 0);

  const avgProfitMargin =
    data.reduce((sum, row) => {
      const margin = parseFloat(row.profit_margin) || 0;
      return sum + margin;
    }, 0) / data.length || 0;

  return {
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    totalOrders,
    topProduct: topProduct ? { name: topProduct[0], revenue: topProduct[1] } : null,
    lowStockCount,
    revenueByCategory,
    revenueOverTime,
    totalReturns,
    avgProfitMargin: Math.round(avgProfitMargin * 100) / 100,
    productCount: Object.keys(productRevenue).length,
    categoryCount: Object.keys(categoryRevenue).length,
  };
}
