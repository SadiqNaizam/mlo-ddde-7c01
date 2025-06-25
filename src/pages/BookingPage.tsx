import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, User, Mail, Phone, CreditCard } from 'lucide-react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Zod schema for form validation
const bookingFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  travelDate: z.date({
    required_error: "A travel date is required.",
  }),
  cardNumber: z.string().refine((val) => /^\d{16}$/.test(val), {
    message: "Card number must be 16 digits.",
  }),
  expiryDate: z.string().refine((val) => /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(val), {
    message: "Expiry date must be in MM/YY format.",
  }),
  cvc: z.string().refine((val) => /^\d{3,4}$/.test(val), {
    message: "CVC must be 3 or 4 digits.",
  }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const BookingPage = () => {
  console.log('BookingPage loaded');
  const [searchParams] = useSearchParams();
  const [packageName, setPackageName] = useState('Selected Package');
  const [packagePrice, setPackagePrice] = useState(75000); // Default placeholder price

  useEffect(() => {
    const pkg = searchParams.get('package');
    if (pkg) {
      // In a real app, you would fetch package details here based on the slug
      const formattedName = pkg.charAt(0).toUpperCase() + pkg.slice(1);
      setPackageName(`Trip to ${formattedName}`);
      // Mock price based on package
      if (pkg === 'andamans') setPackagePrice(120000);
      if (pkg === 'kerala') setPackagePrice(85000);
    }
  }, [searchParams]);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
  });

  function onSubmit(data: BookingFormValues) {
    console.log("Booking Submitted:", data);
    // Here you would typically call an API to process the booking
    alert("Booking successful! (Check console for details)");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1 container py-8 md:py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-center">Complete Your Booking</h1>
          <p className="text-muted-foreground mb-8 text-center">
            You're just a few steps away from your next adventure.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Traveler Information</CardTitle>
                      <CardDescription>Please enter the details of the lead traveler.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@example.com" {...field} />
                            </FormControl>
                             <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+91 98765 43210" {...field} />
                            </FormControl>
                             <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                          control={form.control}
                          name="travelDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Start of Travel</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Details</CardTitle>
                      <CardDescription>Enter your payment information below. All transactions are secure.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="0000 0000 0000 0000" {...field} className="pl-10" />
                                </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                         <FormField
                            control={form.control}
                            name="expiryDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                           <FormField
                            control={form.control}
                            name="cvc"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVC</FormLabel>
                                <FormControl>
                                  <Input placeholder="123" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                      </div>
                    </CardContent>
                  </Card>
                   <Button type="submit" size="lg" className="w-full">
                    Confirm & Pay ₹{packagePrice.toLocaleString('en-IN')}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop" alt="Package" className="h-20 w-20 rounded-lg object-cover" />
                    <div>
                      <h3 className="font-semibold">{packageName}</h3>
                      <p className="text-sm text-muted-foreground">7 Days / 6 Nights</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Package Price</span>
                      <span>₹{packagePrice.toLocaleString('en-IN')}</span>
                    </div>
                     <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxes & Fees</span>
                      <span>₹{(packagePrice * 0.1).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                   <Separator />
                   <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{(packagePrice * 1.1).toLocaleString('en-IN')}</span>
                   </div>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    By clicking "Confirm & Pay", you agree to our <Link to="/terms-of-service" className="underline hover:text-primary">Terms of Service</Link>.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;