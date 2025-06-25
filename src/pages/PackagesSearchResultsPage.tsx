import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PackageCard from '@/components/PackageCard';
import OfferBanner from '@/components/OfferBanner';

// Shadcn/ui Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Lucide Icons
import { ChevronsUpDown, Filter } from 'lucide-react';

const mockPackages = [
  {
    slug: 'kerala-backwaters-bliss',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1932&auto=format&fit=crop',
    title: 'Kerala Backwaters Bliss',
    price: 45000,
    highlights: ['7-night houseboat stay', 'Kathakali performance', 'Spice plantation tour', 'Daily breakfast and dinner'],
  },
  {
    slug: 'majestic-rajasthan-forts',
    imageUrl: 'https://images.unsplash.com/photo-1599661046227-14728150de58?q=80&w=1770&auto=format&fit=crop',
    title: 'Majestic Rajasthan Forts',
    price: 60000,
    highlights: ['Guided tours of 5 iconic forts', 'Jaipur, Jodhpur & Udaipur', 'Camel safari in Thar Desert', '4-star heritage hotels'],
  },
  {
    slug: 'serene-andaman-getaway',
    imageUrl: 'https://images.unsplash.com/photo-1617500135352-234839849514?q=80&w=1770&auto=format&fit=crop',
    title: 'Serene Andaman Getaway',
    price: 85000,
    highlights: ['5 nights in Port Blair & Havelock', 'Scuba diving session', 'Cellular Jail light & sound show', 'Flights & ferry included'],
  },
  {
    slug: 'goa-beach-paradise',
    imageUrl: 'https://images.unsplash.com/photo-1590374504364-0243b745582f?q=80&w=1770&auto=format&fit=crop',
    title: 'Goa Beach Paradise',
    price: 30000,
    highlights: ['Stay at a beachside resort', 'Watersports activities', 'North & South Goa tour', 'Vibrant nightlife access'],
  },
  {
    slug: 'himalayan-adventure-rishikesh',
    imageUrl: 'https://images.unsplash.com/photo-1596701969234-7d4a13b63a23?q=80&w=1770&auto=format&fit=crop',
    title: 'Himalayan Adventure: Rishikesh',
    price: 38000,
    highlights: ['River rafting on the Ganges', 'Bungee jumping experience', 'Yoga & meditation sessions', 'Stay in a luxury camp'],
  },
  {
    slug: 'cultural-odyssey-varanasi',
    imageUrl: 'https://images.unsplash.com/photo-1561360346-735950854228?q=80&w=1931&auto=format&fit=crop',
    title: 'Cultural Odyssey: Varanasi',
    price: 32000,
    highlights: ['Sunrise boat ride on Ganges', 'Evening Ganga Aarti ceremony', 'Visit to Sarnath', 'Guided temple tours'],
  },
];

const PackagesSearchResultsPage = () => {
  console.log('PackagesSearchResultsPage loaded');

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Packages</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 p-4 border rounded-lg bg-white shadow-sm">
              <h3 className="text-lg font-semibold flex items-center mb-4">
                <Filter className="w-5 h-5 mr-2" />
                Filter Results
              </h3>
              <Separator />
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex justify-between items-center w-full py-3 font-medium">
                  Price Range
                  <ChevronsUpDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2 pb-4 px-1">
                  <Label className="text-sm text-muted-foreground mb-2 block">Max Price: ₹85,000</Label>
                  <Slider defaultValue={[85000]} max={100000} step={1000} />
                </CollapsibleContent>
              </Collapsible>
              <Separator />
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex justify-between items-center w-full py-3 font-medium">
                  Inclusions
                  <ChevronsUpDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 pt-2 pb-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="flights" />
                    <Label htmlFor="flights" className="font-normal">Flights Included</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="meals" />
                    <Label htmlFor="meals" className="font-normal">Meals Included</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sightseeing" />
                    <Label htmlFor="sightseeing" className="font-normal">Sightseeing</Label>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <Separator />
              <Button variant="outline" className="w-full mt-4">Reset Filters</Button>
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-3 space-y-8">
            <OfferBanner
              title="First-Time Booker Discount!"
              description="Get an exclusive 15% discount on your first package booking with us. Plan your dream trip today!"
              ctaText="Estimate Your Trip Cost"
              linkTo="/trip-cost-estimator"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockPackages.map((pkg) => (
                <PackageCard key={pkg.slug} {...pkg} />
              ))}
            </div>

            <Pagination className="pt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PackagesSearchResultsPage;