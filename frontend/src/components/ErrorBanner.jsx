const ErrorBanner = ({ message }) => (
  <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-lg">
    📡 {message || "Some data is temporarily unavailable. Please check again shortly."}
  </div>
);

export default ErrorBanner;
