import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Link } from 'react-router-dom';

// Mock data for user bookings
const bookings = [
  {
    id: 'BK1294H',
    destination: 'Andamans',
    date: '2024-08-15',
    status: 'Confirmed' as 'Confirmed' | 'Pending' | 'Cancelled',
    price: 45000,
  },
  {
    id: 'BK8837G',
    destination: 'Kerala Backwaters',
    date: '2024-05-20',
    status: 'Completed' as 'Completed' | 'Confirmed' | 'Pending' | 'Cancelled',
    price: 28000,
  },
  {
    id: 'BK5491X',
    destination: 'Goa',
    date: '2023-12-22',
    status: 'Completed' as 'Completed' | 'Confirmed' | 'Pending' | 'Cancelled',
    price: 18500,
  },
    {
    id: 'BK7721A',
    destination: 'Rajasthan Royalty',
    date: '2024-09-01',
    status: 'Pending' as 'Completed' | 'Confirmed' | 'Pending' | 'Cancelled',
    price: 62000,
  },
];

// Zod schema for profile form validation
const profileFormSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().optional(),
});

const UserDashboardPage = () => {
  console.log('UserDashboardPage loaded');

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+91 98765 43210',
    },
  });

  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log('Profile updated:', values);
    // Here you would typically call an API to update the user's profile
  }
  
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'default'; // blue-ish
      case 'Completed':
        return 'secondary'; // green-ish
      case 'Pending':
        return 'outline'; // yellow-ish
      case 'Cancelled':
        return 'destructive'; // red
      default:
        return 'secondary';
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-3xl font-bold tracking-tight mb-6">My Dashboard</h1>
          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Booking History</CardTitle>
                  <CardDescription>
                    Here are all the trips you've booked with Wanderlust India.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Booking ID</TableHead>
                        <TableHead>Destination</TableHead>
                        <TableHead>Travel Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.id}</TableCell>
                          <TableCell>{booking.destination}</TableCell>
                          <TableCell>{booking.date}</TableCell>
                          <TableCell>
                            <Badge variant={getBadgeVariant(booking.status)}>
                              {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            ₹{booking.price.toLocaleString('en-IN')}
                          </TableCell>
                           <TableCell className="text-center">
                            <Button variant="outline" size="sm" asChild>
                               <Link to="/booking">View Details</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Manage your personal details here. Click save when you're done.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                      <FormField
                        control={profileForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Save Changes</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="grid gap-6 md:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Update your account's password.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" type="password" />
                        </div>
                         <Button>Update Password</Button>
                    </CardContent>
                 </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Notification Settings</CardTitle>
                        <CardDescription>Manage how you receive notifications.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <Label>Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive updates about your bookings and offers.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                         <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <Label>SMS Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive critical alerts via text message.</p>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                 </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboardPage;