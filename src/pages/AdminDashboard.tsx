
import React, { useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  BarChart2, 
  Package, 
  ShoppingCart, 
  Users, 
  Bell, 
  LogOut,
  Menu
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Redirect if not admin
  if (!user?.isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-authentic-white">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-6 text-gray-600">You don't have permission to access this area.</p>
          <Button onClick={() => navigate('/')}>Return to Homepage</Button>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navItems = [
    { icon: <BarChart2 className="h-5 w-5" />, label: 'Dashboard', path: '/admin' },
    { icon: <ShoppingCart className="h-5 w-5" />, label: 'Orders', path: '/admin/orders' },
    { icon: <Users className="h-5 w-5" />, label: 'Customers', path: '/admin/customers' },
    { icon: <Package className="h-5 w-5" />, label: 'Products', path: '/admin/products' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-0 left-0 p-4 z-30 lg:hidden">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="bg-authentic-black text-authentic-white"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-20 w-64 bg-authentic-black text-authentic-white`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6">
            <Link to="/" className="flex items-center">
              <div className="bg-authentic-yellow text-authentic-black px-2 py-1 font-bold mr-2">A</div>
              <span className="text-lg font-semibold">Admin Panel</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center px-4 py-3 rounded-md hover:bg-gray-800 transition-colors group"
              >
                <span className="mr-3 text-gray-400 group-hover:text-authentic-yellow">{item.icon}</span>
                <span className="group-hover:text-authentic-yellow">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="p-6 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">{user.email}</div>
                <div className="text-xs text-gray-400">Administrator</div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
                className="text-gray-400 hover:text-authentic-yellow"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-authentic-white shadow">
          <div className="flex items-center justify-between p-4 md:p-6">
            <h1 className="text-2xl font-bold text-authentic-black">Admin Dashboard</h1>
            
            {/* Notifications */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
          {/* Content will be rendered by the Outlet (nested route components) */}
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;
