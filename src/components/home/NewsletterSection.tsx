import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Gift, Bell, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    // Simulate subscription
    setIsSubscribed(true);
    setEmail('');
    toast({
      title: "Successfully subscribed!",
      description: "Welcome to the PedalWare community. Check your inbox for a welcome gift!",
    });

    // Reset after 3 seconds for demo
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const benefits = [
    {
      icon: Gift,
      title: "Exclusive Discounts",
      description: "Get 15% off your first order and early access to sales"
    },
    {
      icon: Bell,
      title: "New Product Alerts",
      description: "Be the first to know about new gear and limited releases"
    },
    {
      icon: Star,
      title: "Expert Tips",
      description: "Weekly cycling tips and maintenance guides from pros"
    }
  ];

  return (
    <section className="py-8 md:py-12 lg:py-14 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-12">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-4">
            <Mail className="w-4 h-4 md:w-6 md:h-6 text-primary" />
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs md:text-sm">
              Newsletter
            </Badge>
          </div>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-4">
            Join the PedalWare Community
          </h2>
          <p className="text-sm md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay connected with the latest gear, expert tips, and exclusive offers from the cycling world
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Newsletter Form */}
          <div className="space-y-4 md:space-y-8">
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardContent className="p-4 md:p-6 lg:p-8">
                <div className="text-center mb-4 md:mb-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <Mail className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-1 md:mb-2">
                    Subscribe & Save 15%
                  </h3>
                  <p className="text-xs md:text-sm lg:text-base text-muted-foreground">
                    Join 25,000+ cyclists who stay ahead of the curve
                  </p>
                </div>

                {!isSubscribed ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 border-border focus:border-primary"
                      />
                      <Button 
                        type="submit"
                        className="bg-primary hover:bg-primary/90 px-8"
                      >
                        Subscribe
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-8 animate-fade-in">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Welcome to the Community!
                    </h3>
                    <p className="text-muted-foreground">
                      Check your inbox for your welcome gift 🎁
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Benefits */}
          <div className="space-y-3 md:space-y-6">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-3 md:mb-6">
              What You'll Get
            </h3>
            
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 rounded-lg bg-card/30 border border-border/50 hover:border-primary/50 transition-all duration-200 group"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200 flex-shrink-0">
                  <benefit.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm md:text-base lg:text-lg font-semibold text-foreground mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-xs md:text-sm lg:text-base text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Social Proof */}
            <div className="bg-muted/30 rounded-lg p-4 md:p-6 border border-border/50">
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-6 h-6 md:w-8 md:h-8 bg-primary/20 rounded-full border-2 border-background flex items-center justify-center text-[10px] md:text-xs font-bold text-primary"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-muted rounded-full border-2 border-background flex items-center justify-center text-[10px] md:text-xs text-muted-foreground">
                    +
                  </div>
                </div>
                <div>
                  <p className="text-xs md:text-sm lg:text-base font-semibold text-foreground">25,000+ Subscribers</p>
                  <p className="text-[10px] md:text-xs lg:text-sm text-muted-foreground">Join the community</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                ))}
                <span className="ml-2 text-[10px] md:text-xs lg:text-sm text-muted-foreground">
                  4.9/5 Newsletter Rating
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;