import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides }) => {
  const isMobile = useIsMobile();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const intervalRef = useRef<number | null>(null);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current !== null) return;
    intervalRef.current = window.setInterval(() => {
      api?.scrollNext();
    }, 5000); // Change slide every 5 seconds
  }, [api]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  // Set up and clean up autoplay
  useEffect(() => {
    if (!api) return;
    
    startAutoplay();
    
    // Handle mouse events to pause autoplay
    const carouselElement = api.rootNode();
    if (carouselElement) {
      carouselElement.addEventListener('mouseenter', stopAutoplay);
      carouselElement.addEventListener('mouseleave', startAutoplay);
    }
    
    return () => {
      stopAutoplay();
      if (carouselElement) {
        carouselElement.removeEventListener('mouseenter', stopAutoplay);
        carouselElement.removeEventListener('mouseleave', startAutoplay);
      }
    };
  }, [api, startAutoplay, stopAutoplay]);
  
  useEffect(() => {
    // Preload images to prevent layout shifts
    const preloadImages = async () => {
      try {
        const imagePromises = slides.map((slide) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = slide.image;
            img.onload = resolve;
            img.onerror = reject;
          });
        });
        
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Failed to preload images:', error);
        setImagesLoaded(true); // Continue anyway
      }
    };
    
    preloadImages();
  }, [slides]);
  
  return (
    <div className="relative w-full h-full overflow-hidden z-10">
      {!imagesLoaded && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Carousel 
        className="w-full h-full" 
        opts={{ loop: true }} 
        setApi={setApi}
      >
        <CarouselContent className="h-full ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full pl-0">
              <div className="relative h-[100vh] w-full flex items-center">
                <div className="absolute inset-0 bg-black">
                  <img 
                    src={slide.image} 
                    alt={`Hero image ${index + 1}`} 
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/10"></div>
                </div>
                <div className="container-custom relative z-10 text-white px-4 md:px-8 pt-4 md:pt-8 pb-0 mt-28">
                  <div className="max-w-2xl mx-auto md:mx-0">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">{slide.title}</h1>
                    <p className="text-lg sm:text-xl mb-8 drop-shadow-md max-w-lg">{slide.subtitle}</p>
                    <Button asChild size="lg" className="btn-primary text-base md:text-lg px-6 md:px-8 py-4 md:py-6 hover:scale-105 transition-transform duration-200">
                      <Link to={slide.link}>{slide.cta}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-4 md:left-6 bg-white/40 text-black border-white shadow-lg hover:bg-white hover:text-black w-10 h-10 md:w-12 md:h-12 z-20 transition-all duration-200" />
        <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6 bg-white/40 text-black border-white shadow-lg hover:bg-white hover:text-black w-10 h-10 md:w-12 md:h-12 z-20 transition-all duration-200" />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
