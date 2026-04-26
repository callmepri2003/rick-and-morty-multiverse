import { Link } from "react-router-dom";
import { Home, RotateCcw } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-8 h-32 w-32">
        <div className="absolute inset-0 animate-portal-spin rounded-full bg-gradient-to-r from-red-500 via-portal-teal to-red-500 opacity-40" />
        <div className="absolute inset-4 flex items-center justify-center rounded-full bg-portal-dark">
          <span className="text-5xl font-bold text-red-400">?</span>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-white">Dimension Not Found</h1>
      <p className="mt-3 max-w-md text-gray-400">
        Looks like you've portal-gunned into a dimension that doesn't exist. Even Rick can't find
        this one.
      </p>
      <p className="mt-1 text-2xl font-bold text-gray-700">404</p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg bg-portal-teal px-5 py-2.5 font-medium text-black transition-all hover:bg-portal-teal/80"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 rounded-lg border border-portal-border px-5 py-2.5 font-medium text-gray-300 transition-all hover:border-portal-teal hover:text-portal-teal"
        >
          <RotateCcw className="h-4 w-4" />
          Go Back
        </button>
      </div>
    </div>
  );
}
