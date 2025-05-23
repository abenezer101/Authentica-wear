import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Truck, Package, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const CustomerOrderDetailPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/login?redirect=customer/orders');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Will redirect via the useEffect
  }

  // Mock data for demonstration - in a real app, you would fetch this data based on orderId
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
      trackingNumber: 'TRK123456789US',
      paymentMethod: 'Credit Card (ending in 1234)',
      subtotal: 95.97,
      shipping: 0,
      tax: 7.68,
      orderPlaced: '2025-04-28',
      shipped: '2025-04-30',
      delivered: '2025-05-02'
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
      trackingNumber: null,
      paymentMethod: 'PayPal',
      subtotal: 64.99,
      shipping: 0,
      tax: 5.20,
      orderPlaced: '2025-05-05',
      shipped: null,
      delivered: null
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
      trackingNumber: 'TRK987654321US',
      paymentMethod: 'Credit Card (ending in 5678)',
      subtotal: 129.99,
      shipping: 0,
      tax: 10.40,
      orderPlaced: '2025-05-10',
      shipped: '2025-05-12',
      delivered: null
    }
  ];

  const order = orders.find(order => order.id === orderId);

  if (!order) {
    return (
      <div className="flex-1 space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="mb-4 text-gray-500">Order not found.</p>
              <Button asChild>
                <Link to="/customer/orders">Back to Orders</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" onClick={() => navigate('/customer/orders')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Order {order.id}</CardTitle>
                <p className="text-sm text-gray-500">Placed on {order.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'Delivered' 
                  ? 'bg-green-100 text-green-800' 
                  : order.status === 'Shipped'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {order.status}
              </span>
            </CardHeader>
            <CardContent>
              {/* Order Timeline */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Order Status</h3>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                  
                  <div className="relative flex items-start mb-6">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center z-10">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium">Order Placed</h4>
                      <p className="text-xs text-gray-500">{order.orderPlaced}</p>
                    </div>
                  </div>
                  
                  <div className="relative flex items-start mb-6">
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center z-10 ${
                      order.shipped ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <Package className={`h-5 w-5 ${order.shipped ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium">Order Shipped</h4>
                      <p className="text-xs text-gray-500">{order.shipped || 'Pending'}</p>
                      {order.trackingNumber && (
                        <p className="text-xs mt-1">
                          Tracking: <span className="font-medium">{order.trackingNumber}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="relative flex items-start">
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center z-10 ${
                      order.delivered ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <Truck className={`h-5 w-5 ${order.delivered ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium">Delivered</h4>
                      <p className="text-xs text-gray-500">{order.delivered || 'Pending'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Items */}
              <h3 className="text-lg font-medium mb-4">Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-start">
                    <div className="h-16 w-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <div className="flex justify-between mt-1">
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Shipping Address</h3>
                <p className="text-sm text-gray-600">{order.shippingAddress.name}</p>
                <p className="text-sm text-gray-600">{order.shippingAddress.street}</p>
                <p className="text-sm text-gray-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                </p>
                <p className="text-sm text-gray-600">{order.shippingAddress.country}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Payment Method</h3>
                <p className="text-sm text-gray-600">{order.paymentMethod}</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Order Summary</h3>
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Shipping</span>
                  <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Need Help */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                Return or Exchange
              </Button>
              <Button className="w-full" variant="outline">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderDetailPage; 