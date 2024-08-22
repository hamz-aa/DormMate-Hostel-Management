import React from "react";
import errorImage from "../assets/Images/Monster 404 Error-rafiki.svg"; // Add your image in the specified path

const ErrorPage = ({ errorMessage, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <img
        src={errorImage}
        alt="Error"
        className="w-2/3 md:w-1/2 lg:w-1/3 mb-8"
      />
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-800 mb-4">
        Oops! Something Went Wrong
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-4 text-center">
        {errorMessage ||
          "An unexpected error occurred. Please try again later."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-red-500 text-white text-lg rounded-lg shadow-md hover:bg-red-700 focus:ring-4 focus:ring-red-200"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorPage;
