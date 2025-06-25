import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addDays, format, differenceInCalendarDays } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import AnimatedCostCounter from '@/components/AnimatedCostCounter'; // Assuming this component exists

import { Plane, Hotel, Car, Users, Calendar as CalendarIcon, MapPin, IndianRupee } from 'lucide-react';

// Mock pricing data
const MOCK_PRICES = {
  flights: {
    'goa': 8000,
    'kerala': 12000,
    'andamans': 20000,
  },
  hotelPerNight: [2000, 3500, 6000, 10000, 18000], // 1 to 5 stars
  transportPerDay: {
    none: 0,
    scooter: 800,
    'private-cab': 3000,
  },
};

const TripCostEstimatorTool: React.FC = () => {
  console.log('TripCostEstimatorTool loaded');
  
  const [destination, setDestination] = useState<string>('andamans');
  const [dates, setDates] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });
  const [travelers, setTravelers] = useState<number[]>([2]);
  const [includeFlights, setIncludeFlights] = useState<boolean>(true);
  const [hotelStars, setHotelStars] = useState<number[]>([3]);
  const [transport, setTransport] = useState<string>('private-cab');

  const [totalCost, setTotalCost] = useState<number>(0);
  const [costBreakdown, setCostBreakdown] = useState<Record<string, number>>({});

  useEffect(() => {
    const calculateCost = () => {
      const numTravelers = travelers[0];
      const numNights = dates?.from && dates?.to ? differenceInCalendarDays(dates.to, dates.from) : 0;
      const numDays = numNights + 1;

      if (numNights <= 0) {
        setTotalCost(0);
        setCostBreakdown({});
        return;
      }
      
      const breakdown: Record<string, number> = {};

      // Flight Cost
      if (includeFlights) {
        breakdown['Flights'] = (MOCK_PRICES.flights[destination as keyof typeof MOCK_PRICES.flights] || 0) * numTravelers;
      }

      // Hotel Cost
      const hotelCostPerNight = MOCK_PRICES.hotelPerNight[hotelStars[0] - 1] || 0;
      breakdown['Accommodation'] = hotelCostPerNight * numNights * Math.ceil(numTravelers / 2); // Assuming 2 per room

      // Transport Cost
      const transportCostPerDay = MOCK_PRICES.transportPerDay[transport as keyof typeof MOCK_PRICES.transportPerDay] || 0;
      breakdown['Local Transport'] = transportCostPerDay * numDays;
      
      const finalTotal = Object.values(breakdown).reduce((acc, val) => acc + val, 0);

      setCostBreakdown(breakdown);
      setTotalCost(finalTotal);
    };

    calculateCost();
  }, [destination, dates, travelers, includeFlights, hotelStars, transport]);
  
  const numNights = dates?.from && dates?.to ? differenceInCalendarDays(dates.to, dates.from) : 0;

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Trip Cost Estimator</CardTitle>
        <CardDescription>Customize your dream trip and see the costs in real-time.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Side: Controls */}
          <div className="md:col-span-2 space-y-6 p-4 rounded-lg bg-gray-50/50">
            {/* Destination & Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="destination" className="flex items-center"><MapPin className="mr-2 h-4 w-4" /> Destination</Label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger id="destination"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="andamans">Andamans</SelectItem>
                    <SelectItem value="kerala">Kerala</SelectItem>
                    <SelectItem value="goa">Goa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dates" className="flex items-center"><CalendarIcon className="mr-2 h-4 w-4" /> Travel Dates</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button id="dates" variant="outline" className="w-full justify-start text-left font-normal">
                      {dates?.from ? (
                        dates.to ? (
                          <>
                            {format(dates.from, "LLL dd, y")} - {format(dates.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dates.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      defaultMonth={dates?.from}
                      selected={dates}
                      onSelect={setDates}
                      numberOfMonths={2}
                      disabled={{ before: new Date() }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Travelers */}
            <div className="space-y-2">
              <Label htmlFor="travelers" className="flex items-center"><Users className="mr-2 h-4 w-4" /> Travelers: {travelers[0]}</Label>
              <Slider id="travelers" min={1} max={10} step={1} value={travelers} onValueChange={setTravelers} />
            </div>

            <Separator />
            
            {/* Service Toggles */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="flights" className="flex items-center text-lg"><Plane className="mr-2 h-5 w-5" /> Include Flights?</Label>
                <Switch id="flights" checked={includeFlights} onCheckedChange={setIncludeFlights} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hotel-stars" className="flex items-center text-lg"><Hotel className="mr-2 h-5 w-5" /> Hotel Quality: {hotelStars[0]} Stars</Label>
                <Slider id="hotel-stars" min={1} max={5} step={1} value={hotelStars} onValueChange={setHotelStars} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transport" className="flex items-center text-lg"><Car className="mr-2 h-5 w-5" /> Local Transport</Label>
                <Select value={transport} onValueChange={setTransport}>
                  <SelectTrigger id="transport"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="scooter">Scooter/Bike Rental</SelectItem>
                    <SelectItem value="private-cab">Private Cab</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Right Side: Summary */}
          <div className="md:col-span-1">
            <Card className="sticky top-24 shadow-md">
              <CardHeader>
                <CardTitle>Your Estimate</CardTitle>
                <CardDescription>Based on {numNights > 0 ? `${numNights} nights` : "your selections"}.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">Total Estimated Cost</p>
                  <div className="flex items-center justify-center font-bold text-4xl">
                    <IndianRupee className="h-7 w-7 mr-1" />
                    <AnimatedCostCounter total={totalCost} />
                  </div>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <h4 className="font-semibold">Cost Breakdown:</h4>
                  {Object.keys(costBreakdown).length > 0 ? (
                    <ul className="list-inside text-muted-foreground">
                      {Object.entries(costBreakdown).map(([key, value]) => (
                        <li key={key} className="flex justify-between">
                          <span>{key}</span>
                          <span className="font-medium">₹{value.toLocaleString('en-IN')}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-muted-foreground italic">Select your options to see a breakdown.</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full" asChild disabled={totalCost <= 0}>
                  <Link to="/booking">Proceed to Book</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripCostEstimatorTool;