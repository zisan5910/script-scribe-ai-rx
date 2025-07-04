import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import ProductGrid from "@/components/ProductGrid";
import ProductModal from "@/components/ProductModal";
import Cart from "@/components/Cart";
import BottomNav from "@/components/BottomNav";
import { Product } from "@/types/Product";
import { products } from "@/data/products";
import { useEnhancedOffline } from "@/hooks/useEnhancedOffline";
import PWAInstallPopup from "@/components/PWAInstallPopup";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get("category") || null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<{ product: Product; size: string; quantity: number; }[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isOnline, addOfflineAction, getOfflineStatus } = useEnhancedOffline();

  // Update the product list to use the imported products
  const [allProducts] = useState<Product[]>(products);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("q", searchTerm);
    if (selectedCategory) params.set("category", selectedCategory);
    setSearchParams(params);
  }, [searchTerm, selectedCategory, setSearchParams]);

  const handleAddToCart = async (product: Product, size: string) => {
    const existingItemIndex = cartItems.findIndex(
      item => item.product.id === product.id && item.size === size
    );

    if (existingItemIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      const newItem = { product, size, quantity: 1 };
      setCartItems(prev => [...prev, newItem]);
    }

    // Save offline action
    await addOfflineAction({
      type: 'cart',
      action: 'add',
      data: { productId: product.id, size, quantity: 1 }
    });

    toast({
      title: `${product.name} added to cart`,
      description: `Size: ${size}`,
    });
    
    setSelectedProduct(null);
  };

  const handleToggleWishlist = async (productId: number) => {
    setWishlist(prev => {
      const isInWishlist = prev.includes(productId);
      const newWishlist = isInWishlist 
        ? prev.filter(id => id !== productId)
        : [...prev, productId];

      // Save offline action
      addOfflineAction({
        type: 'wishlist',
        action: isInWishlist ? 'remove' : 'add',
        data: { productId }
      });

      const product = allProducts.find(p => p.id === productId);
      toast({
        title: isInWishlist ? "Removed from wishlist" : "Added to wishlist",
        description: product?.name,
      });

      return newWishlist;
    });
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const searchTermMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = !selectedCategory || product.category === selectedCategory;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      return searchTermMatch && categoryMatch && priceMatch;
    });
  }, [allProducts, searchTerm, selectedCategory, priceRange]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleHomeClick = () => {
    setSelectedCategory(null);
    setSearchTerm("");
  };

  const handleSearchClick = () => {
    // Handle search click logic
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleContactClick = () => {
    // Handle contact click logic
  };

  const updateCartItemQuantity = async (productId: number, size: string, quantity: number) => {
    if (quantity <= 0) {
      // Remove item from cart
      const updatedItems = cartItems.filter(
        item => !(item.product.id === productId && item.size === size)
      );
      setCartItems(updatedItems);

      // Save offline action
      await addOfflineAction({
        type: 'cart',
        action: 'remove',
        data: { productId, size }
      });
    } else {
      // Update quantity
      const updatedItems = cartItems.map(item => {
        if (item.product.id === productId && item.size === size) {
          return { ...item, quantity };
        }
        return item;
      });
      setCartItems(updatedItems);

      // Save offline action
      await addOfflineAction({
        type: 'cart',
        action: 'update',
        data: { productId, size, quantity }
      });
    }
  };

  const offlineStatus = getOfflineStatus();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Offline Status Banner */}
      {!isOnline && (
        <div className="bg-yellow-500 text-white text-center py-2 text-sm z-50 relative">
          You are offline. Changes will sync when you're back online.
          {offlineStatus.hasPendingActions && (
            <span className="ml-2">({offlineStatus.pendingActionsCount} pending actions)</span>
          )}
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">printpoka</h1>
          <Input
            type="search"
            placeholder="Search for products..."
            className="max-w-md w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 flex items-center justify-start gap-4 overflow-x-auto">
          <Button
            variant="outline"
            onClick={() => handleCategoryClick(null)}
            className={`rounded-full px-4 py-2 text-sm whitespace-nowrap ${!selectedCategory ? 'bg-gray-100' : ''}`}
          >
            All
          </Button>
          {["Men", "Women", "Kids", "Accessories"].map((category) => (
            <Button
              key={category}
              variant="outline"
              onClick={() => handleCategoryClick(category)}
              className={`rounded-full px-4 py-2 text-sm whitespace-nowrap ${selectedCategory === category ? 'bg-gray-100' : ''}`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <h4 className="text-sm font-medium mb-2">Filter by Price</h4>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">৳{priceRange[0]}</span>
            <Slider
              defaultValue={priceRange}
              max={200}
              step={10}
              onValueChange={(value) => setPriceRange(value)}
              className="w-full max-w-md"
            />
            <span className="text-gray-500 text-sm">৳{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No products found.
          </div>
        ) : (
          <ProductGrid
            products={filteredProducts}
            wishlist={wishlist}
            onProductClick={handleProductClick}
            onToggleWishlist={handleToggleWishlist}
          />
        )}
      </div>

      {/* PWA Install Popup */}
      <PWAInstallPopup />

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isInWishlist={wishlist.includes(selectedProduct.id)}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={() => handleToggleWishlist(selectedProduct.id)}
        />
      )}

      {/* Cart */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartItemQuantity}
      />

      {/* Bottom Navigation */}
      <BottomNav
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onHomeClick={handleHomeClick}
        onSearchClick={handleSearchClick}
        onCartClick={handleCartClick}
        onContactClick={handleContactClick}
        activeTab="home"
      />
    </div>
  );
};

export default Index;
