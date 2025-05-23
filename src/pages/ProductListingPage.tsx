
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { 
  getProductsByCategory, 
  getNewArrivals, 
  getProductsOnSale, 
  products 
} from '@/data/mockData';
import { Product } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ProductListingPage: React.FC = () => {
  const { category = 'all' } = useParams<{ category: string }>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  // Get unique sizes and colors from products
  const allSizes = [...new Set(products.flatMap(p => p.sizes))];
  const allColors = [...new Set(products.flatMap(p => p.colors))];

  // Filter products based on category
  useEffect(() => {
    let productList: Product[] = [];

    switch (category.toLowerCase()) {
      case 'men':
      case 'women':
      case 'accessories':
        productList = getProductsByCategory(category.toLowerCase());
        break;
      case 'new':
        productList = getNewArrivals();
        break;
      case 'sale':
        productList = getProductsOnSale();
        break;
      default:
        productList = products;
        break;
    }

    // Apply other filters
    productList = productList.filter(product => 
      // Price filter
      product.price >= priceRange[0] && product.price <= priceRange[1] &&
      // Size filter (if any selected)
      (selectedSizes.length === 0 || product.sizes.some(size => selectedSizes.includes(size))) &&
      // Color filter (if any selected)
      (selectedColors.length === 0 || product.colors.some(color => selectedColors.includes(color)))
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        productList.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        productList.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        productList.sort((a, b) => a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1);
        break;
      case 'featured':
      default:
        productList.sort((a, b) => a.featured === b.featured ? 0 : a.featured ? -1 : 1);
        break;
    }

    setFilteredProducts(productList);
  }, [category, sortBy, priceRange, selectedSizes, selectedColors]);

  const getCategoryDisplay = () => {
    switch (category.toLowerCase()) {
      case 'men': return "Men's Collection";
      case 'women': return "Women's Collection";
      case 'accessories': return "Accessories";
      case 'new': return "New Arrivals";
      case 'sale': return "Sale Items";
      default: return "All Products";
    }
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prevSizes =>
      prevSizes.includes(size) 
        ? prevSizes.filter(s => s !== size) 
        : [...prevSizes, size]
    );
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors(prevColors =>
      prevColors.includes(color) 
        ? prevColors.filter(c => c !== color) 
        : [...prevColors, color]
    );
  };

  return (
    <div className="bg-authentic-white min-h-screen py-8">
      <div className="container-custom">
        <h1 className="text-4xl font-bold mb-8">{getCategoryDisplay()}</h1>

        {/* Mobile filter toggle */}
        <div className="md:hidden mb-4">
          <button
            className="w-full py-2 bg-authentic-black text-authentic-white rounded flex items-center justify-center"
            onClick={() => setIsFiltersVisible(!isFiltersVisible)}
          >
            {isFiltersVisible ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar */}
          <div 
            className={`${
              isFiltersVisible ? 'block' : 'hidden'
            } md:block w-full md:w-64 space-y-6`}
          >
            {/* Sort (mobile only) */}
            <div className="md:hidden">
              <h3 className="font-medium mb-2">Sort By</h3>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium mb-4">Price Range</h3>
              <Slider 
                defaultValue={[priceRange[0], priceRange[1]]} 
                min={0}
                max={200}
                step={10}
                onValueChange={(value) => setPriceRange([value[0], value[1]])}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}+</span>
              </div>
            </div>

            {/* Size Filter */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Size</h3>
              <div className="space-y-2">
                {allSizes.map(size => (
                  <div key={size} className="flex items-center">
                    <Checkbox 
                      id={`size-${size}`} 
                      checked={selectedSizes.includes(size)}
                      onCheckedChange={() => handleSizeToggle(size)}
                    />
                    <Label 
                      htmlFor={`size-${size}`}
                      className="ml-2 cursor-pointer"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Color</h3>
              <div className="space-y-2">
                {allColors.map(color => (
                  <div key={color} className="flex items-center">
                    <Checkbox 
                      id={`color-${color}`} 
                      checked={selectedColors.includes(color)}
                      onCheckedChange={() => handleColorToggle(color)}
                    />
                    <Label 
                      htmlFor={`color-${color}`}
                      className="ml-2 cursor-pointer"
                    >
                      {color}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className="flex-1">
            {/* Sort options (desktop) */}
            <div className="hidden md:flex justify-between mb-6">
              <p className="text-gray-600">{filteredProducts.length} products</p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
