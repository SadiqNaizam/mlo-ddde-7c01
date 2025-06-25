import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MountainSnow, User, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

const Header: React.FC = () => {
  console.log('Header loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
    }`;
    
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/packages-search-results', label: 'Packages' },
    // No /offers route exists, linking to home for now.
    { href: '/', label: 'Offers' }, 
    { href: '/trip-cost-estimator', label: 'Trip Cost Estimator' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <MountainSnow className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg tracking-tight">Wanderlust India</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href} className={navLinkClasses}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost">Login</Button>
            <Button>Register</Button>
            <Button variant="outline" size="icon" asChild>
                <Link to="/user-dashboard">
                    <User className="h-4 w-4" />
                    <span className="sr-only">User Profile</span>
                </Link>
            </Button>
        </div>

        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <div className="flex flex-col gap-4 py-6">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                          <MountainSnow className="h-6 w-6 text-primary" />
                          <span className="font-bold text-lg">Wanderlust India</span>
                        </Link>
                        <nav className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <SheetClose asChild key={item.label}>
                                    <NavLink to={item.href} className={navLinkClasses}>
                                        {item.label}
                                    </NavLink>
                                </SheetClose>
                            ))}
                        </nav>
                        <div className="border-t pt-4 mt-4 flex flex-col gap-2">
                            <Button variant="ghost">Login</Button>
                            <Button>Register</Button>
                             <Button variant="outline" asChild>
                                <Link to="/user-dashboard">
                                    <User className="mr-2 h-4 w-4" />
                                    My Dashboard
                                </Link>
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;