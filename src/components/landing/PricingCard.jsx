// ===========================================
// PricingCard Component
// ===========================================
// Individual pricing plan card.

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { ROUTES } from '../../utils/constants';

export function PricingCard({ plan, isPopular = false }) {
  const {
    name,
    price,
    period,
    description,
    features,
    limitations,
    cta,
  } = plan;

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-sm border-2 transition-all hover:shadow-lg ${
        isPopular ? 'border-primary-500 scale-105' : 'border-gray-100'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-500 text-sm mb-4">{description}</p>

        <div className="mb-6">
          <span className="text-4xl font-extrabold text-gray-900">
            ${price}
          </span>
          {period !== 'forever' && (
            <span className="text-gray-500">/{period}</span>
          )}
        </div>

        <Link to={ROUTES.SIGNUP}>
          <Button
            variant={isPopular ? 'primary' : 'outline'}
            fullWidth
            size="lg"
          >
            {cta}
          </Button>
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold text-gray-900 mb-4">
            What's included:
          </p>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-600 text-sm">{feature}</span>
              </li>
            ))}
            {limitations.map((limitation, index) => (
              <li key={`limit-${index}`} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-400 text-sm">{limitation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PricingCard;
