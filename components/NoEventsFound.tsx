"use client";

interface NoEventsFoundProps {
  message?: string;
  subMessage?: string;
}

const NoEventsFound = ({
  message = "No events found.",
  subMessage = "Try adjusting your search or check back later for new events.",
}: NoEventsFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      {/* Main Message */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
        {message}
      </h2>

      {/* Sub Message */}
      <p className="text-lg text-gray-600 max-w-md mb-8 leading-relaxed">
        {subMessage}
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full transition-all transform hover:scale-105 shadow-lg"
        >
          Refresh Events
        </button>
        <button
          onClick={() => (window.location.href = '/events')}
          className="px-4 py-2 cursor-pointer border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-medium rounded-full transition-all"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default NoEventsFound;
