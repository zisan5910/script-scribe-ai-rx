
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingMenu = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-24 right-4 z-30">
      <Button
        onClick={scrollToTop}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
        size="icon"
      >
        <ChevronUp className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default FloatingMenu;
