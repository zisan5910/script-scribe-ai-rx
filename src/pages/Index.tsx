import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, User, Home, Phone } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import ProductModal from "@/components/ProductModal";
import ProductDetailPage from "@/components/ProductDetailPage";
import BottomNav from "@/components/BottomNav";
import PWAInstallPopup from "@/components/PWAInstallPopup";
import { Product } from "@/types/Product";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailPageOpen, setDetailPageOpen] = useState(false);
  const [wishlist, setWishlist] = useLocalStorage<number[]>("wishlist", []);
  const [cart, setCart] = useLocalStorage<{[id: number]: {size: string, quantity: number}}>("cart", {});

  const products: Product[] = [
    {
      id: 1,
      name: "Classic White T-Shirt",
      price: 899,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=500&fit=crop",
      category: "clothing",
      subcategory: "t-shirts",
      sizes: ["XS", "S", "M", "L", "XL"],
      description: "A comfortable classic white t-shirt made from 100% cotton. Perfect for everyday wear.",
      brand: "StitchStyle",
      rating: 4.5,
      inStock: true
    },
    {
      id: 2,
      name: "Denim Jacket",
      price: 2499,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=500&fit=crop",
      category: "clothing",
      subcategory: "jackets",
      sizes: ["S", "M", "L", "XL"],
      description: "Stylish denim jacket with a modern fit. Great for layering in any season.",
      brand: "Urban Style",
      rating: 4.7,
      inStock: true
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 3299,
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=400&h=500&fit=crop",
      category: "footwear",
      subcategory: "sports",
      sizes: ["7", "8", "9", "10", "11"],
      description: "Lightweight running shoes with excellent cushioning and support for your daily runs.",
      brand: "SportMax",
      rating: 4.3,
      inStock: true
    },
    {
      id: 4,
      name: "Leather Wallet",
      price: 1299,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=500&fit=crop",
      category: "accessories",
      subcategory: "wallets",
      description: "Premium leather wallet with multiple card slots and a sleek design.",
      brand: "LeatherCraft",
      rating: 4.8,
      inStock: true
    },
    {
      id: 5,
      name: "Summer Dress",
      price: 1899,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=500&fit=crop",
      category: "clothing",
      subcategory: "dresses",
      sizes: ["XS", "S", "M", "L"],
      description: "Light and breezy summer dress perfect for warm weather outings.",
      brand: "SummerVibes",
      rating: 4.6,
      inStock: true
    },
    {
      id: 6,
      name: "Backpack",
      price: 2199,
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=500&fit=crop",
      category: "accessories",
      subcategory: "bags",
      description: "Durable backpack with multiple compartments, perfect for work or travel.",
      brand: "TravelGear",
      rating: 4.4,
      inStock: false
    },
    {
      id: 7,
      name: "Formal Shirt",
      price: 1599,
      image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=500&fit=crop",
      category: "clothing",
      subcategory: "shirts",
      sizes: ["S", "M", "L", "XL", "XXL"],
      description: "Crisp formal shirt suitable for office wear and formal occasions.",
      brand: "OfficeWear",
      rating: 4.2,
      inStock: true
    },
    {
      id: 8,
      name: "Casual Sneakers",
      price: 2799,
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=400&h=500&fit=crop",
      category: "footwear",
      subcategory: "casual",
      sizes: ["6", "7", "8", "9", "10", "11"],
      description: "Comfortable casual sneakers for everyday wear with a trendy design.",
      brand: "StreetWalk",
      rating: 4.5,
      inStock: true
    },
    {
      id: 9,
      name: "Wrist Watch",
      price: 4599,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=500&fit=crop",
      category: "accessories",
      subcategory: "watches",
      description: "Elegant wrist watch with a stainless steel band and water resistance.",
      brand: "TimeKeeper",
      rating: 4.9,
      inStock: true
    },
    {
      id: 10,
      name: "Hoodie",
      price: 1999,
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=500&fit=crop",
      category: "clothing",
      subcategory: "hoodies",
      sizes: ["S", "M", "L", "XL"],
      description: "Cozy hoodie perfect for casual outings and cool weather.",
      brand: "ComfortWear",
      rating: 4.3,
      inStock: true
    },
    {
      id: 11,
      name: "Sunglasses",
      price: 899,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=500&fit=crop",
      category: "accessories",
      subcategory: "eyewear",
      description: "Stylish sunglasses with UV protection for sunny days.",
      brand: "SunShade",
      rating: 4.1,
      inStock: true
    },
    {
      id: 12,
      name: "Jeans",
      price: 2299,
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=500&fit=crop",
      category: "clothing",
      subcategory: "jeans",
      sizes: ["28", "30", "32", "34", "36"],
      description: "Classic blue jeans with a comfortable fit and durable material.",
      brand: "DenimCo",
      rating: 4.6,
      inStock: true
    }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setSearchParams(term ? { q: term } : {});
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleAddToCart = (product: Product, size: string) => {
    setCart(prevCart => {
      const existingItem = prevCart[product.id];
      if (existingItem) {
        return {
          ...prevCart,
          [product.id]: {
            size: size,
            quantity: (existingItem.quantity || 1) + 1
          }
        };
      } else {
        return {
          ...prevCart,
          [product.id]: { size: size, quantity: 1 }
        };
      }
    });
  };

  const handleToggleWishlist = (productId: number) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter(id => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleProductDetailsClick = (product: Product) => {
    setSelectedProduct(product);
    setDetailPageOpen(true);
  };

  const handleBack = () => {
    setDetailPageOpen(false);
    setSelectedProduct(null);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSearchClick = () => {
    // Implement search navigation if needed
  };

  const handleCartClick = () => {
    // Implement cart navigation if needed
  };

  const handleContactClick = () => {
    // Implement contact navigation if needed
  };

  const cartCount = Object.values(cart).reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <PWAInstallPopup />
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold tracking-tight">
              Stitch Style
            </h1>
            <div className="flex items-center space-x-2">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="max-w-xs rounded-full bg-gray-50 border-gray-200 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-2 py-0">
                    {cartCount}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto p-4">
        {isDetailPageOpen && selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={products}
            wishlist={wishlist}
            onBack={handleBack}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onProductClick={handleProductDetailsClick}
            onHomeClick={handleHomeClick}
            onSearchClick={handleSearchClick}
            onCartClick={handleCartClick}
            onContactClick={handleContactClick}
            cartCount={cartCount}
          />
        ) : (
          <ProductGrid
            products={filteredProducts}
            wishlist={wishlist}
            onProductClick={handleProductDetailsClick}
            onToggleWishlist={handleToggleWishlist}
          />
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isInWishlist={wishlist.includes(selectedProduct.id)}
          onClose={handleModalClose}
          onAddToCart={handleAddToCart}
          onToggleWishlist={() => handleToggleWishlist(selectedProduct.id)}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNav
        cartCount={cartCount}
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
