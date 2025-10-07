import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setCategory, setPriceRange, toggleBrand, setSortBy, setSearch } from '@/store/slices/filtersSlice';
import { products, categories, brands } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Grid, List } from 'lucide-react';

const Shop = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Category filter
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }
      
      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      
      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }
      
      // Search filter
      if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.isNew ? 1 : -1;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background py-4 md:py-6">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2">Shop Cycling Gear</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Discover premium cycling equipment from the world's leading brands
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="mb-4 md:mb-6 space-y-3">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
                className="pl-10 bg-muted/50"
              />
            </div>

            {/* Sort */}
            <Select value={filters.sortBy} onValueChange={(value: any) => dispatch(setSortBy(value))}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex border border-border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <div className="flex items-center gap-2">
              {filters.category !== 'all' && (
                <Badge variant="secondary" className="gap-2">
                  {categories.find(c => c.id === filters.category)?.name}
                  <button
                    onClick={() => dispatch(setCategory('all'))}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filters.brands.map(brand => (
                <Badge key={brand} variant="secondary" className="gap-2">
                  {brand}
                  <button
                    onClick={() => dispatch(toggleBrand(brand))}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 md:gap-6">
          {/* Sidebar Filters */}
          <aside className={`w-56 space-y-3 md:space-y-4 ${showFilters ? 'block' : 'hidden'} md:block`}>
            {/* Categories */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => dispatch(setCategory(category.id))}
                    className={`block w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors ${
                      filters.category === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Price Range */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Price Range</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => dispatch(setPriceRange(value as [number, number]))}
                  max={250000}
                  min={0}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹{filters.priceRange[0].toLocaleString()}</span>
                  <span>₹{filters.priceRange[1].toLocaleString()}</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-xs font-medium mb-1">Min Price</label>
                    <input
                      type="number"
                      value={filters.priceRange[0]}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        if (value <= filters.priceRange[1]) {
                          dispatch(setPriceRange([value, filters.priceRange[1]]));
                        }
                      }}
                      className="w-full px-2 py-1 text-xs border border-border rounded bg-background"
                      min="0"
                      max={filters.priceRange[1]}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium mb-1">Max Price</label>
                    <input
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 250000;
                        if (value >= filters.priceRange[0]) {
                          dispatch(setPriceRange([filters.priceRange[0], value]));
                        }
                      }}
                      className="w-full px-2 py-1 text-xs border border-border rounded bg-background"
                      min={filters.priceRange[0]}
                      max="250000"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Brands */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Brands</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5">
                {brands.map(brand => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={brand}
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={() => dispatch(toggleBrand(brand))}
                    />
                    <label
                      htmlFor={brand}
                      className="text-sm text-foreground cursor-pointer"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-8">
                <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
              </div>
            ) : (
              <div className={`grid gap-3 md:gap-4 ${
                viewMode === 'grid' 
                  ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;