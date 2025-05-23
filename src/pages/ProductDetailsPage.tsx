
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProductById, products } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/ProductCard';

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = productId ? getProductById(productId) : null;
  
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0] || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  
  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
        <Button onClick={() => navigate('/category/all')}>Continue Shopping</Button>
      </div>
    );
  }
  
  // Calculate related products (same category)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      },
      quantity,
      selectedSize
    );
  };
  
  return (
    <div className="bg-authentic-white">
      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Images */}
          <div className="w-full lg:w-1/2 space-y-6">
            {/* Main image */}
            <div className="aspect-square overflow-hidden rounded-lg border border-gray-200">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-square w-24 overflow-hidden rounded-md border-2 ${
                      index === currentImageIndex ? 'border-authentic-yellow' : 'border-gray-200'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col space-y-6">
              {/* Title and price */}
              <div>
                <h1 className="text-3xl font-bold text-authentic-black">{product.name}</h1>
                <div className="mt-2 flex items-center">
                  {product.discount > 0 ? (
                    <>
                      <span className="text-gray-400 line-through text-lg mr-3">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-authentic-black text-2xl font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="ml-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {`-${product.discount}%`}
                      </span>
                    </>
                  ) : (
                    <span className="text-authentic-black text-2xl font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Description */}
              <p className="text-gray-600">{product.description}</p>
              
              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-3">Color</h3>
                  <RadioGroup
                    value={selectedColor}
                    onValueChange={setSelectedColor}
                    className="flex flex-wrap gap-3"
                  >
                    {product.colors.map(color => (
                      <div key={color} className="flex items-center">
                        <RadioGroupItem
                          value={color}
                          id={`color-${color}`}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={`color-${color}`}
                          className={`cursor-pointer px-3 py-1 border rounded ${
                            selectedColor === color
                              ? 'border-authentic-yellow bg-authentic-yellow bg-opacity-20'
                              : 'border-gray-300'
                          }`}
                        >
                          {color}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              
              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-3">Size</h3>
                  <RadioGroup
                    value={selectedSize}
                    onValueChange={setSelectedSize}
                    className="flex flex-wrap gap-3"
                  >
                    {product.sizes.map(size => (
                      <div key={size} className="flex items-center">
                        <RadioGroupItem
                          value={size}
                          id={`size-${size}`}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={`size-${size}`}
                          className={`cursor-pointer min-w-[40px] text-center px-3 py-1 border rounded ${
                            selectedSize === size
                              ? 'border-authentic-yellow bg-authentic-yellow bg-opacity-20'
                              : 'border-gray-300'
                          }`}
                        >
                          {size}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              
              {/* Quantity */}
              <div>
                <h3 className="text-sm font-medium mb-3">Quantity</h3>
                <div className="flex border border-gray-300 rounded w-fit">
                  <button
                    className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    className="px-3 py-1 hover:bg-gray-100"
                    onClick={() => setQuantity(prev => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Add to Cart */}
              <div className="pt-4">
                <Button
                  className="w-full py-6 bg-authentic-black text-authentic-white hover:bg-authentic-yellow hover:text-authentic-black transition-colors"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
              
              {/* Product details tabs */}
              <Tabs defaultValue="details" className="mt-8">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  <TabsTrigger value="returns">Returns</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="py-4">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      <strong>Material:</strong> Premium cotton blend
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Care:</strong> Machine wash cold, tumble dry low
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Fit:</strong> Standard fit
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Origin:</strong> Made in USA
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="shipping" className="py-4">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Free standard shipping on all orders over $100.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Standard Shipping:</strong> 3-5 business days
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Express Shipping:</strong> 1-2 business days
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="returns" className="py-4">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      We offer a 30-day return policy for all unworn items.
                    </p>
                    <p className="text-sm text-gray-600">
                      Returns must be initiated within 30 days of receipt.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Note:</strong> Sale items are final sale.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="product-grid">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
