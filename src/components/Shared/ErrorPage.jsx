import React from "react";
import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
      <p className="text-2xl font-semibold mb-2">Something went wrong.</p>
      <p className="text-gray-500 mb-6">
        {error?.statusText || error?.message || "An unexpected error occurred."}
      </p>
      <Link
        to="/"
        className="bg-lime-600 text-white hover:bg-lime-700 font-semibold transition px-8 py-3"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
