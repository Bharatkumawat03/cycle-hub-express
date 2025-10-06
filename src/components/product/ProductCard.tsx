import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { Product } from '@/data/products';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className = '' }: ProductCardProps) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  
  const isInWishlist = useSelector((state: RootState) =>
    state.wishlist.items.some(item => item.id === product.id)
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    }));
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    }));
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card 
      className={`group bg-card border-border hover:border-primary/20 transition-all duration-300 hover:shadow-hover overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden bg-muted/30">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-1.5 md:top-3 left-1.5 md:left-3 flex flex-col gap-1 md:gap-2">
          {product.isNew && (
            <Badge className="bg-primary text-primary-foreground text-[10px] md:text-xs px-1.5 md:px-2 py-0 md:py-0.5">NEW</Badge>
          )}
          {discountPercentage > 0 && (
            <Badge variant="destructive" className="text-[10px] md:text-xs px-1.5 md:px-2 py-0 md:py-0.5">-{discountPercentage}%</Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="text-[10px] md:text-xs px-1.5 md:px-2 py-0 md:py-0.5">Out of Stock</Badge>
          )}
        </div>

        {/* Action Buttons - Hidden on mobile, shown on hover on desktop */}
        <div className={`absolute top-1.5 md:top-3 right-1.5 md:right-3 flex flex-col gap-1 md:gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'md:opacity-0'}`}>
          <Button
            size="icon"
            variant="ghost"
            className="w-6 h-6 md:w-8 md:h-8 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={handleToggleWishlist}
          >
            <Heart 
              className={`w-3 h-3 md:w-4 md:h-4 ${isInWishlist ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
            />
          </Button>
          <Link to={`/product/${product.id}`} className="hidden md:block">
            <Button
              size="icon"
              variant="ghost"
              className="w-6 h-6 md:w-8 md:h-8 bg-background/80 backdrop-blur-sm hover:bg-background"
            >
              <Eye className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
            </Button>
          </Link>
        </div>

        {/* Quick Add to Cart - Hidden on mobile */}
        <div className={`absolute bottom-2 md:bottom-3 left-2 md:left-3 right-2 md:right-3 transition-all duration-300 hidden md:block ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs md:text-sm"
            size="sm"
          >
            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      <CardContent className="p-2 md:p-4">
        <Link to={`/product/${product.id}`} className="block group">
          {/* Brand */}
          <p className="text-[10px] md:text-sm text-muted-foreground mb-0.5 md:mb-1 line-clamp-1">{product.brand}</p>
          
          {/* Product Name */}
          <h3 className="text-xs md:text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-1 md:mb-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-0.5 md:gap-1 mb-1.5 md:mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-2.5 h-2.5 md:w-3 md:h-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] md:text-sm text-muted-foreground">
              {product.rating}
            </span>
          </div>

          {/* Price */}
          <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-2">
            <span className="text-sm md:text-lg font-bold text-foreground">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] md:text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;