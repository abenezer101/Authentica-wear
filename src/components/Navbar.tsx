import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Search, ShoppingCart, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const categories = ["Men", "Women", "Accessories", "Sale"];

  const navbarClasses = isHomePage
    ? `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen ? 'bg-authentic-white shadow-md' : 'bg-black/30 backdrop-blur-sm'
      }`
    : 'bg-authentic-white shadow-sm sticky top-0 z-50';

  const textColorClass = isHomePage && !isScrolled && !mobileMenuOpen
    ? 'text-white'
    : 'text-authentic-black';

  return (
    <header className={navbarClasses}>
      <div className="container-custom mx-auto py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1">
            <img 
              src="/aw-logo-cropped.png" 
              alt="Authentic Wear Logo"
              className="h-6 w-auto"
            />
            <span className={`text-[28px] font-bold ${textColorClass}`}>Authentic Wear</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {categories.map(category => (
              <Link 
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className={`${textColorClass} hover:text-authentic-yellow transition-colors font-medium`}
              >
                {category}
              </Link>
            ))}
          </nav>

          {/* Cart and Account */}
          <div className="flex items-center space-x-4">
            <Link to="/search" className={`${textColorClass} hover:text-authentic-yellow transition-colors`}>
              <Search className="h-5 w-5" />
            </Link>
            
            <Link to="/cart" className={`${textColorClass} hover:text-authentic-yellow transition-colors relative`}>
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-authentic-yellow text-authentic-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className={`rounded-full ${textColorClass}`}>
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link to="/customer" className="w-full">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/customer/orders" className="w-full">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/customer/wishlist" className="w-full">Wishlist</Link>
                  </DropdownMenuItem>
                  {user.isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Admin</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="w-full">Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className={`${textColorClass} hover:text-authentic-yellow transition-colors`}>
                <LogIn className="h-5 w-5" />
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className={`md:hidden ${textColorClass}`} onClick={toggleMobileMenu}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 border-t mt-4 animate-fade-in">
            <ul className="space-y-4">
              {categories.map(category => (
                <li key={category}>
                  <Link 
                    to={`/category/${category.toLowerCase()}`}
                    className="text-authentic-black hover:text-authentic-yellow transition-colors font-medium block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
