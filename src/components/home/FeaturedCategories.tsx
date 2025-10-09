import { Link } from 'react-router-dom';
import { categories } from '@/data/products';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

const FeaturedCategories = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const displayCategories = categories.filter(cat => cat.id !== 'all');

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-6 md:py-10 lg:py-12 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-2xl font-bold text-foreground">
            Shop by Category
          </h2>
          <Link to="/categories">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Scrollable Categories */}
        <div className="relative group/container">
          {/* Left Arrow - visible on hover for tablet/desktop */}
          <Button
            variant="outline"
            size="icon"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/container:opacity-100 transition-opacity bg-background shadow-lg"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Right Arrow - visible on hover for tablet/desktop */}
          <Button
            variant="outline"
            size="icon"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/container:opacity-100 transition-opacity bg-background shadow-lg"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          <div 
            ref={scrollContainerRef}
            className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          >
            {displayCategories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="flex-shrink-0 snap-start"
              >
                <div className="flex flex-col items-center gap-2 w-16 md:w-20 lg:w-24 group">
                  <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-muted border border-border flex items-center justify-center text-2xl md:text-3xl lg:text-4xl transition-all duration-200 group-hover:border-primary group-hover:bg-primary/5 group-hover:scale-105">
                    {category.icon}
                  </div>
                  <span className="text-xs md:text-sm text-center text-foreground font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile scroll hint */}
          <div className="md:hidden text-center mt-2">
            <p className="text-xs text-muted-foreground">Swipe to see more →</p>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default FeaturedCategories;
