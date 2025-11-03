import React from 'react';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <ApperIcon name="AlertCircle" size={64} className="text-primary mx-auto" />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-secondary">404</h1>
          <h2 className="text-xl text-gray-600">Page Not Found</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>
        <div className="space-x-4">
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent transition-colors"
          >
            <ApperIcon name="Home" size={20} className="mr-2" />
            Go Home
          </Link>
          <Link 
            to="/products" 
            className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            <ApperIcon name="ShoppingBag" size={20} className="mr-2" />
            Shop Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;