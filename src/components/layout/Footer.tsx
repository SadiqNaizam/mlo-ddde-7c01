import React from 'react';
import { Link } from 'react-router-dom';
import { MountainSnow } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-start gap-2">
                <Link to="/" className="flex items-center gap-2 mb-2">
                    <MountainSnow className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg text-foreground">Wanderlust India</span>
                </Link>
                <p className="text-sm">Your journey to the heart of India begins here.</p>
                <p className="text-xs pt-4">
                    &copy; {currentYear} Wanderlust India. All rights reserved.
                </p>
            </div>
            
            <div className="md:col-start-3 grid grid-cols-2 gap-8">
                 <div>
                    <h4 className="font-semibold text-foreground mb-3">Company</h4>
                    <nav className="flex flex-col gap-2 text-sm">
                        <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
                        <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
                        <Link to="/careers" className="hover:text-primary transition-colors">Careers</Link>
                    </nav>
                </div>
                 <div>
                    <h4 className="font-semibold text-foreground mb-3">Legal</h4>
                    <nav className="flex flex-col gap-2 text-sm">
                        <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
                        <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                    </nav>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <h4 className="font-semibold text-foreground mb-3">Follow Us</h4>
                <div className="flex gap-4">
                    {/* Placeholder for social links */}
                    <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                    <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;