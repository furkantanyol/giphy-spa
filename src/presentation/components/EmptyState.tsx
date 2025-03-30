'use client';

export default function EmptyState() {
  return (
    <div className="w-full py-12 flex flex-col items-center justify-center text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-medium text-gray-700 mb-2">No GIFs found</h3>
      <p className="text-gray-500 max-w-md">
        Try searching for something else or check your internet connection.
      </p>
    </div>
  );
}
