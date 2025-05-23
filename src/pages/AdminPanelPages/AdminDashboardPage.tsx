
import React from 'react';
import { orders, products, customers } from '@/data/mockData';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { ShoppingCart, Users, Package, ArrowUp } from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  // Sales Data - Mock data for this example
  const monthlySales = [
    { name: "Jan", sales: 1200 },
    { name: "Feb", sales: 1900 },
    { name: "Mar", sales: 1500 },
    { name: "Apr", sales: 2200 },
    { name: "May", sales: 2700 },
    { name: "Jun", sales: 2300 },
  ];

  // Category distribution
  const categoryData = Object.entries(
    products.reduce((acc: Record<string, number>, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const COLORS = ["#ffff01", "#010101", "#6366f1", "#8b5cf6", "#ec4899"];

  // Basic stats
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const totalProducts = products.length;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSales.toFixed(2)}</div>
            <div className="text-xs text-green-500 flex items-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              12% from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <div className="text-xs text-green-500 flex items-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              5% from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <div className="text-xs text-green-500 flex items-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              9% from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <div className="text-xs text-gray-500 mt-1">
              {products.filter(p => p.inStock).length} in stock
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
            <CardDescription>
              Sales performance for the past 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#ffff01" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
            <CardDescription>
              Distribution of products by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            Latest orders received
          </CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-sm">Order ID</th>
                <th className="pb-2 text-sm">Customer</th>
                <th className="pb-2 text-sm">Date</th>
                <th className="pb-2 text-sm text-right">Total</th>
                <th className="pb-2 text-sm text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-3 text-sm">#{order.id}</td>
                  <td className="py-3 text-sm">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </td>
                  <td className="py-3 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 text-sm text-right">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="py-3 text-sm text-right">
                    <span className={`inline-block px-2 py-1 text-xs rounded ${
                      order.status === 'delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'processing'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
