import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { updateQuantity, removeFromCart, clearCart } from '@/store/slices/cartSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, total, itemCount } = useSelector((state: RootState) => state.cart);

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/shop">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-4 md:py-8">
      <div className="w-full px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 md:mb-8">
          <Link to="/shop" className="inline-flex items-center text-muted-foreground hover:text-primary mb-3 md:mb-4 text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-foreground">Shopping Cart</h1>
              <p className="text-xs md:text-sm text-muted-foreground">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleClearCart}
              className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground text-xs md:text-sm"
            >
              Clear
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-3 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                    {/* Product Image & Info */}
                    <div className="flex gap-3 md:gap-6 flex-1">
                      <div className="w-16 h-16 md:w-24 md:h-24 bg-muted/30 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${item.id}`} className="block group">
                          <h3 className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors mb-1 line-clamp-2">
                            {item.name}
                          </h3>
                        </Link>
                        <Badge variant="secondary" className="mb-1 md:mb-2 text-xs">
                          {item.category}
                        </Badge>
                        <p className="text-base md:text-lg font-bold text-foreground">
                          ₹{item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls & Actions */}
                    <div className="flex items-center justify-between md:justify-end gap-3 md:gap-6">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 md:gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 md:w-8 md:h-8"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        
                        <span className="w-6 md:w-8 text-center font-medium text-sm">{item.quantity}</span>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 md:w-8 md:h-8"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Total Price & Remove */}
                      <div className="text-right">
                        <p className="text-base md:text-lg font-bold text-foreground">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-1 md:mt-2 text-xs h-auto p-1"
                        >
                          <Trash2 className="w-3 h-3 md:w-4 md:h-4 md:mr-1" />
                          <span className="hidden md:inline">Remove</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 md:top-8">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-base md:text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6 pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                    <span className="text-foreground">₹{total.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600">
                      {total >= 2000 ? 'Free' : '₹100'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground">₹{Math.round(total * 0.18).toLocaleString()}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-base md:text-lg font-bold">
                  <span>Total</span>
                  <span>₹{(total + (total >= 2000 ? 0 : 100) + Math.round(total * 0.18)).toLocaleString()}</span>
                </div>

                {total < 2000 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 md:p-3">
                    <p className="text-xs md:text-sm text-yellow-800">
                      Add ₹{(2000 - total).toLocaleString()} more for free shipping!
                    </p>
                  </div>
                )}

                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm md:text-base" size="default">
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>

                <div className="text-center">
                  <Link to="/shop" className="text-xs md:text-sm text-muted-foreground hover:text-primary">
                    Continue Shopping
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;