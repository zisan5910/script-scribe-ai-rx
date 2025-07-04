
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useCallback } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import Contact from "./pages/Contact";
import BottomNav from "./components/BottomNav";
import Cart from "./components/Cart";
import CartPage from "./components/CartPage";
import OfflineIndicator from "./components/OfflineIndicator";
import { Product } from "./types/Product";

const queryClient = new QueryClient();

interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCartPage, setShowCartPage] = useState(false);

  const addToCart = useCallback((product: Product, size: string) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id && item.size === size);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId: number, size: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => !(item.product.id === productId && item.size === size)));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity }
            : item
        )
      );
    }
  }, []);

  const handleNavigation = useCallback((tab: string) => {
    setActiveTab(tab);
    setShowCart(false);
    setShowCartPage(false);
  }, []);

  const handleCartClick = useCallback(() => {
    setShowCartPage(true);
    setActiveTab("cart");
  }, []);

  const handleBackFromCart = useCallback(() => {
    setShowCartPage(false);
    setActiveTab("home");
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (showCartPage) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <OfflineIndicator />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen">
              <CartPage 
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onBack={handleBackFromCart}
              />
              <BottomNav
                cartCount={cartCount}
                onHomeClick={() => handleNavigation("home")}
                onSearchClick={() => handleNavigation("search")}
                onCartClick={handleCartClick}
                onContactClick={() => handleNavigation("contact")}
                activeTab="cart"
              />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <OfflineIndicator />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<Index addToCart={addToCart} />} />
              <Route path="/search" element={<Search />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            <Cart
              isOpen={showCart}
              onClose={() => setShowCart(false)}
              items={cartItems}
              onUpdateQuantity={updateQuantity}
            />
            
            <BottomNav
              cartCount={cartCount}
              onHomeClick={() => handleNavigation("home")}
              onSearchClick={() => handleNavigation("search")}
              onCartClick={handleCartClick}
              onContactClick={() => handleNavigation("contact")}
              activeTab={activeTab}
            />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
