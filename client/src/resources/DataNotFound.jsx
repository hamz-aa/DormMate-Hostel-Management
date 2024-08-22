import React from "react";
import noDataImage from "../assets/Images/No data-amico.svg"; // Add your image in the specified path

const DataNotFound = ({ onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <img
        src={noDataImage}
        alt="No Data Found"
        className="w-2/3 md:w-1/2 lg:w-1/3 object-cover"
      />
      <h1 className="text-3xl md:text-4xl  font-bold text-dashboardPrimary mb-4">
        No Data Found
      </h1>
      <p className="text-lg md:text-xl  text-gray-600 mb-8 text-center">
        Sorry, we couldn&apos;t find any data to display.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-200"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default DataNotFound;
