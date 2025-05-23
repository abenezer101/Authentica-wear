
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-authentic-black text-authentic-white pt-12 pb-8">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1">
            <Link to="/" className="text-2xl font-bold flex items-center mb-4">
              <span className="bg-authentic-yellow px-2 mr-1 text-authentic-black">A</span>
              Authentic Wear
            </Link>
            <p className="text-gray-300 text-sm mb-4">
              Premium streetwear and fashion for those who value authenticity and quality.
            </p>
          </div>
          
          {/* Shop Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 border-b border-authentic-yellow pb-2 w-fit">Shop</h3>
            <ul className="space-y-2">
              {['Men', 'Women', 'Accessories', 'New Arrivals', 'Sale'].map(item => (
                <li key={item}>
                  <Link to={`/category/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-300 hover:text-authentic-yellow transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Help Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 border-b border-authentic-yellow pb-2 w-fit">Help</h3>
            <ul className="space-y-2">
              {['Contact Us', 'FAQ', 'Shipping & Returns', 'Size Guide', 'Terms & Conditions'].map(item => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' & ', '-').replace(' ', '-')}`} className="text-gray-300 hover:text-authentic-yellow transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 border-b border-authentic-yellow pb-2 w-fit">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 px-4 py-2 rounded-l text-sm flex-grow"
              />
              <button
                type="submit"
                className="bg-authentic-yellow text-authentic-black px-4 py-2 rounded-r text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Authentic Wear. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-authentic-yellow transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 text-sm hover:text-authentic-yellow transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
