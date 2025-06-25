import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface PackageCardProps {
  /** A unique identifier for the package, used in the URL. */
  slug: string;
  /** URL for the large background image of the package. */
  imageUrl: string;
  /** The name or title of the travel package. */
  title: string;
  /** The starting price for the package. */
  price: number;
  /** An array of strings describing key inclusions or highlights. */
  highlights: string[];
}

const PackageCard: React.FC<PackageCardProps> = ({
  slug,
  imageUrl,
  title,
  price,
  highlights,
}) => {
  console.log('PackageCard loaded for:', title);

  return (
    <Link to={`/booking?package=${slug}`} className="block group outline-none" aria-label={`View details for ${title}`}>
      <Card className="relative w-full h-96 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
        {/* Background Image with Hover Zoom Effect */}
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />

        {/* Static Gradient Overlay for Text Readability */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent"></div>

        {/* Hover Overlay with Highlights */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <h3 className="text-lg font-semibold mb-4 border-b border-white/30 pb-2">Package Highlights</h3>
          <ul className="space-y-2 text-left w-full max-w-xs">
            {highlights.slice(0, 4).map((highlight, index) => ( // Show up to 4 highlights
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 mt-0.5 shrink-0 text-green-400" />
                <span className="text-sm">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Always Visible Content (Title and Price) */}
        <div className="absolute inset-x-0 bottom-0 p-5 text-white pointer-events-none">
          <h2 className="text-2xl font-bold tracking-tight truncate">{title}</h2>
          <p className="text-lg font-medium mt-1">
            From ${price.toLocaleString()}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default PackageCard;