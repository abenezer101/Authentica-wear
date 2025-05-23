
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const CartPage: React.FC = () => {
  const { items, itemCount, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  
  if (items.length === 0) {
    return (
      <div className="py-16 bg-authentic-white">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
          <p className="text-gray-600 mb-8">Your cart is empty</p>
          <Link to="/category/all">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-12 bg-authentic-white">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <div className="flex-grow">
            <div className="hidden md:grid grid-cols-12 gap-4 py-3 mb-4 font-medium text-gray-500 text-sm">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="py-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Product */}
                  <div className="col-span-6 flex gap-4">
                    <Link to={`/product/${item.id}`} className="w-20 h-20 overflow-hidden rounded">
                      <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                    </Link>
                    <div className="flex flex-col justify-between py-1">
                      <Link to={`/product/${item.id}`} className="font-medium hover:text-authentic-yellow transition-colors">
                        {item.name}
                      </Link>
                      {item.size && <div className="text-sm text-gray-500">Size: {item.size}</div>}
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="text-sm text-red-500 hover:text-red-700 transition-colors text-left"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="md:col-span-2 text-left md:text-center">
                    <span className="md:hidden text-gray-500 mr-2">Price:</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                  
                  {/* Quantity */}
                  <div className="md:col-span-2 md:text-center">
                    <span className="md:hidden text-gray-500 mr-2">Quantity:</span>
                    <div className="inline-flex border border-gray-300 rounded">
                      <button
                        className="px-2 py-1 hover:bg-gray-100"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 min-w-[30px] text-center">{item.quantity}</span>
                      <button
                        className="px-2 py-1 hover:bg-gray-100"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="md:col-span-2 text-left md:text-right font-medium">
                    <span className="md:hidden text-gray-500 mr-2">Total:</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Cart actions */}
            <div className="flex justify-between py-6">
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="text-red-500 border-red-500 hover:bg-red-50"
              >
                Clear Cart
              </Button>
              <Link to="/category/all">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-50 rounded-lg p-6 border">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Items ({itemCount}):</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{total >= 100 ? 'Free' : '$5.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${(total * 0.07).toFixed(2)}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total:</span>
                <span>${(total + (total >= 100 ? 0 : 5) + (total * 0.07)).toFixed(2)}</span>
              </div>
              
              {user ? (
                <Link to="/checkout">
                  <Button className="w-full bg-authentic-yellow text-authentic-black hover:bg-opacity-90">
                    Proceed to Checkout
                  </Button>
                </Link>
              ) : (
                <>
                  <div className="mb-4">
                    <Link to="/login?redirect=checkout">
                      <Button className="w-full bg-authentic-yellow text-authentic-black hover:bg-opacity-90">
                        Sign In to Checkout
                      </Button>
                    </Link>
                  </div>
                  <Link to="/checkout">
                    <Button className="w-full" variant="outline">
                      Guest Checkout
                    </Button>
                  </Link>
                </>
              )}
              
              <div className="mt-6">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-sm text-gray-500">Secure Checkout</span>
                </div>
                <div className="flex justify-center">
                  {/* Payment icons would go here */}
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-gray-300 rounded"></div>
                    <div className="w-8 h-5 bg-gray-300 rounded"></div>
                    <div className="w-8 h-5 bg-gray-300 rounded"></div>
                    <div className="w-8 h-5 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
