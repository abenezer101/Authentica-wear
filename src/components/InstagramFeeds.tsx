
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';

const instagramPosts = [
  {
    id: 1,
    imageUrl: '/products/Adidas Campus 00s.jpg',
    caption: 'New summer collection just dropped! #AuthenticWear #SummerVibes'
  },
  {
    id: 2,
    imageUrl: '/products/Authentic and stylish golfers available (1).jpg',
    caption: 'Style that speaks for itself. #StreetStyle #AuthenticWear'
  },
  {
    id: 3,
    imageUrl: '/products/Less perfection, more authenticity.jpg',
    caption: 'Comfort meets style. Our new hoodies are here! #Streetwear'
  },
  {
    id: 4,
    imageUrl: '/products/New era caps available  @authentic_wear_zw.jpg',
    caption: 'Weekend vibes. Tag us in your #AuthenticWear looks!'
  }
];

const InstagramFeeds: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Follow Our Journey</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Join our community and share your style with #AuthenticWear
          </p>
          <a 
            href="https://www.instagram.com/authentic_wear_ww/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-authentic-black hover:text-authentic-yellow transition-colors"
          >
            <Instagram className="h-5 w-5 mr-2" />
            @authentic_wear_ww
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {instagramPosts.map((post) => (
            <div key={post.id} className="group relative overflow-hidden rounded-md">
              <img 
                src={post.imageUrl} 
                alt="Instagram post" 
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                <p className="text-white text-sm p-4 text-center">
                  {post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            to="/category/all" 
            className="btn-primary inline-flex"
          >
            Shop Our Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeeds;
