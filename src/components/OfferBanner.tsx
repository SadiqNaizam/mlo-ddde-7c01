import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Megaphone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OfferBannerProps {
  title: string;
  description: string;
  ctaText: string;
  linkTo: string;
  bannerText?: string;
  className?: string;
}

const OfferBanner: React.FC<OfferBannerProps> = ({
  title,
  description,
  ctaText,
  linkTo,
  bannerText = "SPECIAL OFFER",
  className,
}) => {
  console.log('OfferBanner loaded');

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 p-6 md:p-8 shadow-2xl shadow-blue-500/20 text-white',
        className
      )}
    >
      {/* Corner Banner */}
      {bannerText && (
         <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
            <div className="absolute transform rotate-45 bg-amber-400 text-center text-blue-900 font-semibold py-1 right-[-34px] top-[32px] w-[170px] shadow-md">
                {bannerText}
            </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center gap-6 z-10 relative">
        {/* Icon */}
        <div className="flex-shrink-0">
          <Megaphone className="h-12 w-12 md:h-16 md:w-16 text-white/80" />
        </div>
        
        {/* Content */}
        <div className="flex-grow text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
          <p className="mt-2 text-white/90 max-w-2xl">{description}</p>
        </div>
        
        {/* CTA Button */}
        <div className="flex-shrink-0 mt-4 md:mt-0">
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold shadow-lg transition-transform hover:scale-105"
          >
            <Link to={linkTo}>
              {ctaText}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;