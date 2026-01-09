// ===========================================
// Navbar Component
// ===========================================
// Main navigation bar with responsive mobile menu.

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/Button";
import { ROUTES } from "../../utils/constants";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await logout();
    navigate(ROUTES.HOME);
  };

  const scrollToPricing = (e) => {
    e.preventDefault();
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    } else if (location.pathname !== "/") {
      navigate("/#pricing");
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Home", href: ROUTES.HOME },
    { label: "Pricing", href: "#pricing", onClick: scrollToPricing },
  ];

  return (
    <nav className='bg-white shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link to={ROUTES.HOME} className='flex items-center'>
              <div className='w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mr-2'>
                <span className='text-white font-bold text-lg'>D</span>
              </div>
              <span className='font-bold text-xl text-gray-900'>
                DojoCountdown
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex md:items-center md:space-x-8'>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.onClick}
                className='text-gray-600 hover:text-gray-900 font-medium transition-colors'
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className='hidden md:flex md:items-center md:space-x-4'>
            {isAuthenticated ? (
              <>
                <span className='text-gray-600'>
                  Hello, {user?.name || "User"}
                </span>
                <Button variant='outline' size='sm' onClick={handleLogoutClick}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <Button variant='ghost' size='sm'>
                    Login
                  </Button>
                </Link>
                <Link to={ROUTES.SIGNUP}>
                  <Button variant='primary' size='sm'>
                    Sign Up Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className='flex items-center md:hidden'>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='text-gray-600 hover:text-gray-900 p-2'
              aria-label='Toggle menu'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden py-4 border-t'>
            <div className='flex flex-col space-y-4'>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={link.onClick}
                  className='text-gray-600 hover:text-gray-900 font-medium'
                >
                  {link.label}
                </a>
              ))}
              <hr className='my-2' />
              {isAuthenticated ? (
                <>
                  <span className='text-gray-600'>Hello, {user?.name}</span>
                  <Button
                    variant='outline'
                    fullWidth
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to={ROUTES.LOGIN}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant='outline' fullWidth>
                      Login
                    </Button>
                  </Link>
                  <Link
                    to={ROUTES.SIGNUP}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant='primary' fullWidth>
                      Sign Up Free
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
