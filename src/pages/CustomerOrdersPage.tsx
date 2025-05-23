import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const CustomerOrdersPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/login?redirect=customer/orders');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Will redirect via the useEffect
  }

  // Mock data for demonstration
  const orders = [
    { 
      id: 'ORD-12345', 
      date: '2025-04-28', 
      total: 95.97, 
      status: 'Delivered',
      items: [
        { id: 1, name: 'Premium Cotton T-Shirt', quantity: 2, price: 29.99, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=250&auto=format&fit=crop&q=60' },
        { id: 2, name: 'Authentic Hoodie', quantity: 1, price: 35.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=250&auto=format&fit=crop&q=60' }
      ],
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        country: 'USA'
      },
      trackingNumber: 'TRK123456789US'
    },
    { 
      id: 'ORD-12346', 
      date: '2025-05-05', 
      total: 64.99, 
      status: 'Processing',
      items: [
        { id: 3, name: 'Urban Cap', quantity: 1, price: 24.99, image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=250&auto=format&fit=crop&q=60' },
        { id: 4, name: 'Streetwear Pants', quantity: 1, price: 40.00, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=250&auto=format&fit=crop&q=60' }
      ],
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        country: 'USA'
      },
      trackingNumber: null
    },
    { 
      id: 'ORD-12347', 
      date: '2025-05-10', 
      total: 129.99, 
      status: 'Shipped',
      items: [
        { id: 5, name: 'Designer Jacket', quantity: 1, price: 129.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=250&auto=format&fit=crop&q=60' }
      ],
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        country: 'USA'
      },
      trackingNumber: 'TRK987654321US'
    }
  ];

  // Filter orders based on search term
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>My Orders</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search orders..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {renderOrderTable(filteredOrders)}
            </TabsContent>
            
            <TabsContent value="processing">
              {renderOrderTable(filteredOrders.filter(order => order.status === 'Processing'))}
            </TabsContent>
            
            <TabsContent value="shipped">
              {renderOrderTable(filteredOrders.filter(order => order.status === 'Shipped'))}
            </TabsContent>
            
            <TabsContent value="delivered">
              {renderOrderTable(filteredOrders.filter(order => order.status === 'Delivered'))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

function renderOrderTable(orders: any[]) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="mb-4 text-gray-500">No orders found.</p>
        <Button asChild>
          <Link to="/category/all">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  order.status === 'Delivered' 
                    ? 'bg-green-100 text-green-800' 
                    : order.status === 'Shipped'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link to={`/customer/orders/${order.id}`} className="text-authentic-yellow hover:text-authentic-black">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerOrdersPage; 