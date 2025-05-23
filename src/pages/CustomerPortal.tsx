
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, ShoppingBag, Heart, MapPin, LogOut } from 'lucide-react';

const CustomerPortal: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/login?redirect=customer');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) {
    return null; // Will redirect via the useEffect
  }

  // Mock data for demonstration
  const recentOrders = [
    { id: 'ORD-12345', date: '2025-04-28', total: 95.97, status: 'Delivered' },
    { id: 'ORD-12346', date: '2025-05-05', total: 64.99, status: 'Processing' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-start gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col items-center text-center mb-6 pb-6 border-b">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-gray-500" />
              </div>
              <h2 className="font-semibold">Welcome back</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
            
            <nav className="space-y-2">
              <Link to="/customer" className="flex items-center space-x-3 px-4 py-3 rounded-md bg-gray-100 text-authentic-black font-medium">
                <User className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link to="/customer/orders" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-gray-100 text-gray-700">
                <ShoppingBag className="w-5 h-5" />
                <span>My Orders</span>
              </Link>
              <Link to="/customer/wishlist" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-gray-100 text-gray-700">
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </Link>
              <Link to="/customer/addresses" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-gray-100 text-gray-700">
                <MapPin className="w-5 h-5" />
                <span>Addresses</span>
              </Link>
              <button 
                onClick={handleLogout} 
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-gray-100 text-gray-700"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
          
          {/* Main content */}
          <div className="flex-1 space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{recentOrders.length}</p>
                  <p className="text-sm text-gray-500 mt-1">In the last 30 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Wishlist</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">5</p>
                  <p className="text-sm text-gray-500 mt-1">Products saved</p>
                </CardContent>
              </Card>
              <Card className="md:col-span-2 lg:col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Spent</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">$160.96</p>
                  <p className="text-sm text-gray-500 mt-1">Lifetime purchases</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {recentOrders.length > 0 ? (
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
                        {recentOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                order.status === 'Delivered' 
                                  ? 'bg-green-100 text-green-800' 
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
                ) : (
                  <div className="text-center py-8">
                    <p className="mb-4 text-gray-500">You haven't made any orders yet.</p>
                    <Button asChild>
                      <Link to="/category/all">Start Shopping</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Recommended Products */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended For You</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((item) => (
                    <Link key={item} to={`/product/product-${item}`} className="block group">
                      <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
                        <img 
                          src={`https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=250&h=250&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dCUyMHNoaXJ0fGVufDB8fDB8fHww`} 
                          alt="Product recommendation" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="mt-2 text-sm font-medium">Essential T-Shirt {item}</h3>
                      <p className="text-sm text-gray-500">$29.99</p>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;
