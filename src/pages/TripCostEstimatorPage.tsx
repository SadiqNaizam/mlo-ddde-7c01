import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TripCostEstimatorTool from '@/components/TripCostEstimatorTool';

const TripCostEstimatorPage: React.FC = () => {
  console.log('TripCostEstimatorPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-background">
      <Header />
      <main className="flex-grow w-full">
        <section className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
          {/* 
            The TripCostEstimatorTool is the primary component for this page.
            It internally manages the state for user selections (destination, dates, flights, hotels, transport)
            and includes the necessary shadcn/ui components like Switch, Select, Slider, Card, Button,
            as well as the custom AnimatedCostCounter to provide the interactive experience
            described in the user journey.
          */}
          <TripCostEstimatorTool />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TripCostEstimatorPage;