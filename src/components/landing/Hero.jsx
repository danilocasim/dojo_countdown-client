// ===========================================
// Hero Component
// ===========================================
// Landing page hero section with CTA.

import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Container from "../layout/Container";
import { ROUTES } from "../../utils/constants";

export function Hero() {
  return (
    <section className='bg-gradient-to-br from-dark-800 to-dark-900 text-white py-20 lg:py-32'>
      <Container>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Content */}
          <div>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6'>
              Dynamic Countdown Timers for{" "}
              <span className='text-primary-500'>Email Marketing</span>
            </h1>
            <p className='text-lg md:text-xl text-gray-300 mb-8 leading-relaxed'>
              Create urgency and boost conversions with real-time countdown GIFs
              that work in any email client. No JavaScript required.
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Link to={ROUTES.SIGNUP}>
                <Button size='lg' variant='primary'>
                  Get Started Free
                </Button>
              </Link>
              <a href='#pricing'>
                <Button
                  size='lg'
                  variant='outline'
                  className='border-white text-white hover:bg-white hover:text-dark-800'
                >
                  View Pricing
                </Button>
              </a>
            </div>
            <div className='mt-8 flex items-center gap-8 text-sm text-gray-400'>
              <div className='flex items-center gap-2'>
                <svg
                  className='w-5 h-5 text-green-500'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className='flex items-center gap-2'>
                <svg
                  className='w-5 h-5 text-green-500'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
                <span>Setup in minutes</span>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className='relative'>
            <div className='bg-dark-700 rounded-2xl p-2 shadow-2xl'>
              <div className='bg-dark-800 rounded-xl p-1'>
                <div className='text-center mb-4'>
                  <span className='text-sm text-gray-400'>SALE ENDS IN</span>
                </div>
                <div className='flex justify-center gap-4'>
                  {[
                    { value: "02", label: "DAYS" },
                    { value: "14", label: "HOURS" },
                    { value: "36", label: "MINS" },
                    { value: "52", label: "SECS" },
                  ].map((item, index) => (
                    <div key={index} className='text-center'>
                      <div className='bg-primary-500 rounded-lg w-16 h-16 flex items-center justify-center mb-2'>
                        <span className='text-2xl font-bold'>{item.value}</span>
                      </div>
                      <span className='text-xs text-gray-400'>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className='text-center mt-4'>
                  <span className='text-xs text-gray-500'>
                    Powered by DojoCountdown
                  </span>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className='absolute -top-4 -right-4 w-24 h-24 bg-primary-500 rounded-full opacity-20 blur-2xl'></div>
            <div className='absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-2xl'></div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
