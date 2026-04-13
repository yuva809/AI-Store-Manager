export function processData(data) {
  if (!data || data.length === 0) {
    return {
      totalRevenue: 0,
      totalOrders: 0,
      topProduct: null,
      lowStockCount: 0,
      lowStockProducts: [],
      revenueByCategory: [],
      revenueOverTime: [],
    };
  }

  // Helper to get numeric value from either string or number
  const getNumber = (value) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseFloat(value) || 0;
    return 0;
  };

  const getInt = (value) => {
    if (typeof value === 'number') return Math.floor(value);
    if (typeof value === 'string') return parseInt(value, 10) || 0;
    return 0;
  };

  // Calculate total revenue
  const totalRevenue = data.reduce((sum, row) => {
    return sum + getNumber(row.revenue);
  }, 0);

  // Calculate total orders
  const totalOrders = data.reduce((sum, row) => {
    return sum + getInt(row.orders);
  }, 0);

  // Find top product by revenue
  const productRevenue = {};
  data.forEach((row) => {
    const productName = row.product_name || row.productName || row.name || row.product;
    if (productName) {
      const revenue = getNumber(row.revenue);
      productRevenue[productName] = (productRevenue[productName] || 0) + revenue;
    }
  });

  const sortedProducts = Object.entries(productRevenue).sort((a, b) => b[1] - a[1]);
  const topProduct = sortedProducts.length > 0 ? sortedProducts[0] : null;

  // Count low stock products (stock < 10)
  const lowStockProductsSet = new Set();
  const lowStockProductsList = [];
  data.forEach((row) => {
    const productName = row.product_name || row.productName || row.name || row.product;
    const stock = getInt(row.stock);
    if (stock < 10 && stock >= 0 && productName && !lowStockProductsSet.has(productName)) {
      lowStockProductsSet.add(productName);
      lowStockProductsList.push({ name: productName, stock });
    }
  });
  const lowStockCount = lowStockProductsSet.size;

  // Revenue by category
  const categoryRevenue = {};
  data.forEach((row) => {
    if (row.category) {
      const revenue = getNumber(row.revenue);
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
      const revenue = getNumber(row.revenue);
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
    return sum + getInt(row.returns);
  }, 0);

  const avgProfitMargin =
    data.reduce((sum, row) => {
      const margin = getNumber(row.profit_margin);
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
