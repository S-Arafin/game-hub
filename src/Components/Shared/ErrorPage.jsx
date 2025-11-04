import React from 'react';
import { Link, useRouteError } from 'react-router';

const ErrorPage = () => {
  const error = useRouteError();
  

  let status = error.status || 500;
  let statusText = error.statusText || "An unexpected error occurred.";
  let message = error.message || "Sorry, something went wrong.";

  if (status === 404) {
    statusText = "Page Not Found";
    message = "Oops! The page you are looking for does not exist.";
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          
          <h1 className="text-9xl font-bold text-primary opacity-80">
            {status}
          </h1>
          
          <p className="mt-4 text-4xl font-bold text-base-content">
            {statusText}
          </p>
          
          <p className="py-6 text-lg text-base-content/80">
            {message}
          </p>
          
          <Link to="/" className="btn btn-primary btn-wide">
            Go Back Home
          </Link>

        </div>
      </div>
    </div>
  );
};

export default ErrorPage;