
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
  };

  return (
    <div className="group overflow-hidden rounded-md border border-gray-200 bg-white">
      {/* Image container with hover effect */}
      <Link to={`/product/${product.id}`} className="block overflow-hidden relative aspect-square">
        <img
          src={product.images[0]}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-authentic-yellow text-xs font-bold px-2 py-1 uppercase">
            New
          </div>
        )}
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1">
            {`-${product.discount}%`}
          </div>
        )}
      </Link>
      
      {/* Product info */}
      <div className="p-4 flex flex-col space-y-2">
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="font-medium text-authentic-black">
              <Link to={`/product/${product.id}`} className="hover:text-authentic-yellow transition-colors">
                {product.name}
              </Link>
            </h3>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
          <div className="flex items-baseline">
            {product.discount > 0 && (
              <span className="text-sm text-gray-400 line-through mr-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="font-bold text-authentic-black">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
        
        {/* Add to cart button */}
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-authentic-black text-authentic-white hover:bg-authentic-yellow hover:text-authentic-black transition-colors"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
