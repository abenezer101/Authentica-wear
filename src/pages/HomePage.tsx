import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/mockData';
import ProductCard from '@/components/ProductCard';
import InstagramFeeds from '@/components/InstagramFeeds';
import HeroCarousel from '@/components/HeroCarousel';

const HomePage: React.FC = () => {
  // Filter featured products for the homepage
  const featuredProducts = products
    .filter(product => product.featured)
    .slice(0, 4);

  // Filter new arrivals
  const newArrivals = products
    .filter(product => product.isNew)
    .slice(0, 8);

  // Hero carousel slides
  const heroSlides = [
    {
      image: "/products/Authentic_wear zw   @tiel_xx.jpg",
      title: "Authentic Style for Authentic People",
      subtitle: "Discover our new collection of premium streetwear designed for those who dare to express themselves.",
      cta: "Shop Now",
      link: "/category/all"
    },
    {
      image: "/products/Authentic and stylish golfers available (1).jpg",
      title: "Summer Collection 2025",
      subtitle: "Light fabrics, bold colors - embrace the heat with our summer essentials.",
      cta: "View Collection",
      link: "/category/summer"
    },
    {
      image: "/products/Authentic brand new AF1 available.jpg",
      title: "Streetwear Redefined",
      subtitle: "Urban comfort meets high fashion in our signature streetwear collection.",
      cta: "Explore Now",
      link: "/category/streetwear"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-authentic-white">
      {/* Hero Section with Carousel */}
      <section className="h-screen w-full relative ">
        <HeroCarousel slides={heroSlides} />
      </section>

      {/* Content below the hero section, offset for the navbar */}
      <main className="relative z-0">
        {/* Featured Categories */}
        <section className="w-full py-16 md:py-16 bg-authentic-white">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Shop by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <Link to="/category/tshirts" className="group relative h-64 md:h-80 overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" 
                  alt="T-shirts" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">T-Shirts</h3>
                    <span className="inline-block bg-authentic-yellow text-authentic-black px-3 py-1 md:px-4 md:py-2 rounded">
                      Shop Now
                    </span>
                  </div>
                </div>
              </Link>
              
              <Link to="/category/hoodies" className="group relative h-64 md:h-80 overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" 
                  alt="Hoodies" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Hoodies</h3>
                    <span className="inline-block bg-authentic-yellow text-authentic-black px-3 py-1 md:px-4 md:py-2 rounded">
                      Shop Now
                    </span>
                  </div>
                </div>
              </Link>
              
              <Link to="/category/accessories" className="group relative h-64 md:h-80 overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" 
                  alt="Accessories" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Accessories</h3>
                    <span className="inline-block bg-authentic-yellow text-authentic-black px-3 py-1 md:px-4 md:py-2 rounded">
                      Shop Now
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="py-16">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <Link to="/category/featured" className="text-authentic-black hover:text-authentic-yellow flex items-center font-medium">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="product-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Promotional Banner */}
        <section className="py-12 md:py-16 bg-authentic-black text-authentic-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Limited Time Offer</h2>
                <p className="text-lg md:text-xl mb-6">
                  20% off all new arrivals. Use code <span className="text-authentic-yellow font-bold">AUTHENTIC20</span>
                </p>
                <Button asChild className="bg-authentic-yellow text-authentic-black hover:bg-opacity-90">
                  <Link to="/category/new-arrivals">Shop Now</Link>
                </Button>
              </div>
              <div className="md:w-1/2 mt-4 md:mt-0">
                <img 
                  src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" 
                  alt="Promotion" 
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* New Arrivals */}
        <section className="py-16 bg-authentic-white">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">New Arrivals</h2>
              <Link to="/category/new-arrivals" className="text-authentic-black hover:text-authentic-yellow flex items-center font-medium">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="product-grid">
              {newArrivals.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Feed Section */}
        <InstagramFeeds />
        
        {/* Newsletter */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Newsletter</h2>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter and be the first to know about new collections and exclusive offers.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 rounded border focus:outline-none focus:border-authentic-yellow"
                  required
                />
                <Button className="bg-authentic-black text-white hover:bg-authentic-yellow hover:text-black">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
