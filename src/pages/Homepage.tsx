import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom Page Components
import PackageCard from '@/components/PackageCard';
import OfferBanner from '@/components/OfferBanner';

// shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Icons
import { Search } from 'lucide-react';

// Sample data for featured packages
const featuredPackages = [
  {
    slug: 'kerala-backwaters-bliss',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop',
    title: 'Kerala Backwaters Bliss',
    price: 45000,
    highlights: ['Houseboat Stay', 'Kathakali Performance', 'Spice Plantation Tour', 'Local Cuisine Tasting'],
  },
  {
    slug: 'golden-triangle-heritage',
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop',
    title: 'The Golden Triangle',
    price: 30000,
    highlights: ['Taj Mahal at Sunrise', 'Amber Fort, Jaipur', 'Old Delhi Rickshaw Ride', '4-Star Accommodations'],
  },
  {
    slug: 'leh-ladakh-adventure',
    imageUrl: 'https://images.unsplash.com/photo-1610260632310-95b7069c279a?q=80&w=1935&auto=format&fit=crop',
    title: 'Leh-Ladakh Adventure',
    price: 60000,
    highlights: ['Pangong Lake Visit', 'Khardung La Pass', 'Nubra Valley Camels', 'Monastery Tours'],
  },
];

const Homepage = () => {
  console.log('Homepage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd use the searchTerm in the query:
    // navigate(`/packages-search-results?q=${searchTerm}`);
    navigate('/packages-search-results');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1596623755458-f58de4f3e58c?q=80&w=1974&auto=format&fit=crop" 
            alt="Beautiful landscape of India" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-20 container px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
              Discover Your Next Adventure
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/90 drop-shadow-md">
              Explore the wonders of India with curated travel packages that promise unforgettable memories.
            </p>
            <form 
              onSubmit={handleSearch} 
              className="mt-8 max-w-xl mx-auto flex items-center gap-2 bg-white/90 p-2 rounded-lg shadow-2xl backdrop-blur-sm"
            >
              <Search className="h-5 w-5 ml-2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for destinations (e.g., 'Goa', 'Himalayas')"
                className="flex-grow bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" size="lg" className="px-8">
                Search
              </Button>
            </form>
          </div>
        </section>

        {/* Featured Packages Section */}
        <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="container px-4">
            <h2 className="text-3xl font-bold tracking-tight text-center">Featured Travel Packages</h2>
            <p className="mt-2 text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Handpicked journeys to India's most iconic and breathtaking destinations.
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPackages.map((pkg) => (
                <PackageCard
                  key={pkg.slug}
                  slug={pkg.slug}
                  imageUrl={pkg.imageUrl}
                  title={pkg.title}
                  price={pkg.price}
                  highlights={pkg.highlights}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Offer Banner Section */}
        <section className="py-16 sm:py-24">
          <div className="container px-4">
            <OfferBanner
              title="Monsoon Getaway Sale!"
              description="Book now and get up to 20% off on select packages to breathtaking destinations. Don't miss out on the magic of India in the rains."
              ctaText="Explore All Deals"
              linkTo="/packages-search-results"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;