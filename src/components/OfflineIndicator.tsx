
import { Wifi, WifiOff } from "lucide-react";
import { useOffline } from "@/hooks/useOffline";

const OfflineIndicator = () => {
  const isOffline = useOffline();

  if (!isOffline) return null;

  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-lg flex items-center gap-2 z-50">
      <WifiOff className="h-4 w-4" />
      <span className="text-sm">Offline</span>
    </div>
  );
};

export default OfflineIndicator;
