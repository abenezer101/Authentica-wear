import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart, Trash2, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';

const CustomerWishlistPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/login?redirect=customer/wishlist');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Will redirect via the useEffect
  }

  // Mock data for demonstration
  const wishlistItems = [
    {
      id: 1,
      name: 'Premium Cotton T-Shirt',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=250&auto=format&fit=crop&q=60',
      inStock: true,
      category: 'T-Shirts'
    },
    {
      id: 2,
      name: 'Authentic Hoodie',
      price: 35.99,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=250&auto=format&fit=crop&q=60',
      inStock: true,
      category: 'Hoodies'
    },
    {
      id: 3,
      name: 'Urban Cap',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=250&auto=format&fit=crop&q=60',
      inStock: true,
      category: 'Accessories'
    },
    {
      id: 4,
      name: 'Streetwear Pants',
      price: 40.00,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=250&auto=format&fit=crop&q=60',
      inStock: false,
      category: 'Pants'
    },
    {
      id: 5,
      name: 'Designer Jacket',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=250&auto=format&fit=crop&q=60',
      inStock: true,
      category: 'Jackets'
    }
  ];

  // Filter wishlist items based on search term
  const filteredItems = wishlistItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
  };

  const handleRemoveFromWishlist = (itemId: number) => {
    // In a real app, you would remove the item from the wishlist
    console.log(`Remove item ${itemId} from wishlist`);
  };

  return (
    <div className="flex-1 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>My Wishlist</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search wishlist..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="border rounded-lg overflow-hidden bg-white">
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                    <button 
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">${item.price.toFixed(2)}</span>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          asChild
                        >
                          <Link to={`/product/${item.id}`}>View</Link>
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.inStock}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          {item.inStock ? 'Add' : 'Out of Stock'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="mb-4 text-gray-500">Your wishlist is empty.</p>
              <Button asChild>
                <Link to="/category/all">Start Shopping</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerWishlistPage; 