import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Settings,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  Calendar,
  Edit,
  Trash2,
  Plus,
  ExternalLink,
  Bell,
  Shield,
  Download,
  AlertTriangle
} from 'lucide-react';

const Account = () => {
  const [user] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    joinDate: '2023-06-15'
  });

  const [orders] = useState([
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 45000,
      items: 2,
      trackingId: 'TRK123456789'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 18000,
      items: 1,
      trackingId: 'TRK987654321'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-08',
      status: 'processing',
      total: 92000,
      items: 3,
      trackingId: null
    }
  ]);

  const [addresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'Rajesh Kumar',
      address: '123 MG Road, Bangalore, Karnataka 560001',
      phone: '+91 98765 43210',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      name: 'Rajesh Kumar',
      address: '456 Brigade Road, Bangalore, Karnataka 560025',
      phone: '+91 98765 43210',
      isDefault: false
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-blue-500" />;
      case 'processing':
        return <Package className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      delivered: "default",
      shipped: "secondary",
      processing: "outline"
    };
    return <Badge variant={variants[status] || "outline"}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header with gradient */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-3xl opacity-10 -z-10" />
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <User className="w-8 h-8 text-primary" />
            My Account
          </h1>
          <p className="text-muted-foreground text-lg">Manage your account, orders, and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - User Info */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <CardContent className="p-6 relative">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20 shadow-lg">
                      <AvatarFallback className="text-2xl bg-primary text-primary-foreground font-bold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-4 border-card">
                      <Edit className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{user.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <Mail className="w-3 h-3" />
                    {user.email}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                    <Phone className="w-3 h-3" />
                    {user.phone}
                  </p>
                  <Badge variant="secondary" className="mt-3 shadow-sm">
                    <Calendar className="w-3 h-3 mr-1" />
                    Member since {new Date(user.joinDate).getFullYear()}
                  </Badge>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">Total Orders</span>
                    </div>
                    <span className="text-lg font-bold text-primary">{orders.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">Wishlist</span>
                    </div>
                    <span className="text-lg font-bold text-primary">5</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">Addresses</span>
                    </div>
                    <span className="text-lg font-bold text-primary">{addresses.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="orders" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-card/50 p-1 h-auto">
                <TabsTrigger value="orders" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
                  <ShoppingBag className="w-4 h-4" />
                  <span className="hidden sm:inline">Orders</span>
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="addresses" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
                  <MapPin className="w-4 h-4" />
                  <span className="hidden sm:inline">Addresses</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-4">
                <Card className="bg-gradient-card border-border/50 shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                      </div>
                      Order History
                    </CardTitle>
                    <CardDescription>Track and manage your orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div 
                          key={order.id} 
                          className="group p-5 border border-border rounded-xl bg-background/50 hover:bg-background/80 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                {getStatusIcon(order.status)}
                              </div>
                              <div>
                                <h4 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">{order.id}</h4>
                                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(order.date).toLocaleDateString('en-IN', { 
                                    day: 'numeric', 
                                    month: 'long', 
                                    year: 'numeric' 
                                  })}
                                </p>
                                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                  <Package className="w-3 h-3" />
                                  {order.items} item{order.items > 1 ? 's' : ''}
                                </p>
                              </div>
                            </div>
                            <div className="text-left sm:text-right">
                              <p className="text-2xl font-bold text-primary mb-2">₹{order.total.toLocaleString('en-IN')}</p>
                              {getStatusBadge(order.status)}
                            </div>
                          </div>
                          
                          {order.trackingId && (
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-border">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg">
                                <Truck className="w-4 h-4" />
                                <span className="font-mono">{order.trackingId}</span>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full sm:w-auto group-hover:border-primary group-hover:text-primary"
                                onClick={() => window.open(`https://parcelsapp.com/en/tracking/${order.trackingId}`, '_blank')}
                              >
                                Track Order
                                <ExternalLink className="w-4 h-4 ml-2" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-4">
                <Card className="bg-gradient-card border-border/50 shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      Personal Information
                    </CardTitle>
                    <CardDescription>Update your personal details and preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-semibold flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            Full Name
                          </Label>
                          <Input 
                            id="name"
                            defaultValue={user.name} 
                            className="bg-background border-border h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-semibold flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary" />
                            Phone Number
                          </Label>
                          <Input 
                            id="phone"
                            defaultValue={user.phone} 
                            className="bg-background border-border h-11"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
                          <Mail className="w-4 h-4 text-primary" />
                          Email Address
                        </Label>
                        <Input 
                          id="email"
                          defaultValue={user.email} 
                          className="bg-background border-border h-11"
                        />
                      </div>

                      <Separator className="my-6" />

                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                          <Shield className="w-5 h-5 text-primary" />
                          Change Password
                        </h3>
                        <div className="space-y-4 bg-muted/30 p-4 rounded-lg border border-border">
                          <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input 
                              id="current-password"
                              type="password" 
                              placeholder="Enter current password" 
                              className="bg-background border-border h-11"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input 
                              id="new-password"
                              type="password" 
                              placeholder="Enter new password" 
                              className="bg-background border-border h-11"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input 
                              id="confirm-password"
                              type="password" 
                              placeholder="Confirm new password" 
                              className="bg-background border-border h-11"
                            />
                          </div>
                        </div>
                      </div>

                      <Button className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                        Save Changes
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses" className="space-y-4">
                <Card className="bg-gradient-card border-border/50 shadow-card">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          Saved Addresses
                        </CardTitle>
                        <CardDescription>Manage your delivery addresses</CardDescription>
                      </div>
                      <Button className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Address
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {addresses.map((address) => (
                        <div 
                          key={address.id} 
                          className="group p-5 border border-border rounded-xl bg-background/50 hover:bg-background/80 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <MapPin className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="font-bold text-foreground text-lg">{address.type}</h4>
                                  {address.isDefault && (
                                    <Badge variant="default" className="shadow-sm">Default</Badge>
                                  )}
                                </div>
                              </div>
                              <div className="pl-13 space-y-1">
                                <p className="text-foreground font-medium">{address.name}</p>
                                <p className="text-muted-foreground text-sm flex items-start gap-2">
                                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                  {address.address}
                                </p>
                                <p className="text-muted-foreground text-sm flex items-center gap-2">
                                  <Phone className="w-4 h-4" />
                                  {address.phone}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2 w-full lg:w-auto">
                              <Button variant="outline" size="sm" className="flex-1 lg:flex-none group-hover:border-primary group-hover:text-primary">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1 lg:flex-none text-destructive hover:bg-destructive hover:text-destructive-foreground">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-4">
                <Card className="bg-gradient-card border-border/50 shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Settings className="w-5 h-5 text-primary" />
                      </div>
                      Account Settings
                    </CardTitle>
                    <CardDescription>Manage your preferences and account security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                        <Bell className="w-5 h-5 text-primary" />
                        Notifications
                      </h3>
                      <div className="space-y-4 bg-muted/30 p-4 rounded-lg border border-border">
                        <div className="flex items-center justify-between py-2">
                          <div className="space-y-0.5">
                            <Label className="text-base font-medium">Email notifications for orders</Label>
                            <p className="text-sm text-muted-foreground">Receive updates about your orders via email</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between py-2">
                          <div className="space-y-0.5">
                            <Label className="text-base font-medium">SMS notifications for deliveries</Label>
                            <p className="text-sm text-muted-foreground">Get real-time delivery updates via SMS</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between py-2">
                          <div className="space-y-0.5">
                            <Label className="text-base font-medium">Newsletter and promotions</Label>
                            <p className="text-sm text-muted-foreground">Stay updated with latest deals and offers</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        Privacy
                      </h3>
                      <div className="space-y-4 bg-muted/30 p-4 rounded-lg border border-border">
                        <div className="flex items-center justify-between py-2">
                          <div className="space-y-0.5">
                            <Label className="text-base font-medium">Make profile public</Label>
                            <p className="text-sm text-muted-foreground">Allow others to view your profile</p>
                          </div>
                          <Switch />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between py-2">
                          <div className="space-y-0.5">
                            <Label className="text-base font-medium">Share data for analytics</Label>
                            <p className="text-sm text-muted-foreground">Help us improve your experience</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-foreground flex items-center gap-2 text-destructive">
                        <AlertTriangle className="w-5 h-5" />
                        Danger Zone
                      </h3>
                      <div className="space-y-3 bg-destructive/5 p-4 rounded-lg border border-destructive/20">
                        <Button variant="outline" className="w-full h-12 justify-start hover:bg-background">
                          <Download className="w-4 h-4 mr-2" />
                          Export Account Data
                          <span className="ml-auto text-xs text-muted-foreground">Download all your data</span>
                        </Button>
                        <Button variant="destructive" className="w-full h-12 justify-start shadow-lg hover:shadow-xl transition-all">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                          <span className="ml-auto text-xs">This action is permanent</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;