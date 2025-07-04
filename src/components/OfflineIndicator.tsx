
import { useOffline } from "@/hooks/useOffline";

const OfflineIndicator = () => {
  const isOffline = useOffline();

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 text-sm z-50">
      You are currently offline. Some features may not work.
    </div>
  );
};

export default OfflineIndicator;
