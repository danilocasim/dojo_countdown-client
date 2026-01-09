// ===========================================
// Pricing Component
// ===========================================
// Pricing section with all plan cards.

import React from 'react';
import Container from '../layout/Container';
import PricingCard from './PricingCard';
import { PLANS } from '../../utils/constants';

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include core features.
            Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isPopular={plan.popular}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            All prices in USD. Need a custom plan?{' '}
            <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
              Contact us
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}

export default Pricing;
