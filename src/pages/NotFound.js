import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

/**
 * NotFound Component - 404 error page
 * Features: Error message and navigation back to home
 */
const NotFound = () => {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-16 pt-24 text-center" role="main">
      <div className="flex flex-col items-center gap-8">
        {/* Error Icon */}
        <div className="text-[var(--primary-color)] text-8xl">
          <svg 
            fill="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-32 h-32"
            aria-hidden="true"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V8h2v4z"/>
          </svg>
        </div>
        
        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-primary">Page Not Found</h2>
          <p className="text-lg text-secondary max-w-lg">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        
        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/">
            <Button variant="primary" size="lg">
              Go Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
