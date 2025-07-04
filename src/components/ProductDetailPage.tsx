
import { useState, useMemo } from "react";
import { ArrowLeft, Heart, ShoppingBag, Share2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";
import ProductGrid from "@/components/ProductGrid";
import BottomNav from "@/components/BottomNav";

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  wishlist: number[];
  onBack: () => void;
  onAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (productId: number) => void;
  onProductClick: (product: Product) => void;
  onHomeClick: () => void;
  onSearchClick: () => void;
  onCartClick: () => void;
  onContactClick: () => void;
  cartCount: number;
}

const ProductDetailPage = ({ 
  product, 
  allProducts, 
  wishlist, 
  onBack, 
  onAddToCart, 
  onToggleWishlist, 
  onProductClick,
  onHomeClick,
  onSearchClick,
  onCartClick,
  onContactClick,
  cartCount
}: ProductDetailPageProps) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes ? "" : "Default");

  const suggestedProducts = useMemo(() => {
    return allProducts
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 6);
  }, [allProducts, product]);

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart(product, selectedSize);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) 
            ? "text-yellow-400 fill-current" 
            : i < rating 
            ? "text-yellow-400 fill-current opacity-50" 
            : "text-gray-200"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h3 className="font-light tracking-wide">Product Details</h3>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Product Image */}
      <div className="aspect-[3/4] bg-gray-50 relative">
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-4 right-4 h-10 w-10 rounded-full transition-all ${
            wishlist.includes(product.id)
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-white/80 hover:bg-white"
          }`}
          onClick={() => onToggleWishlist(product.id)}
        >
          <Heart className={`h-5 w-5 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
        </Button>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-medium">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-4 bg-white">
        <div>
          <h1 className="text-2xl font-light mb-2">{product.name}</h1>
          <p className="text-2xl font-medium text-black">৳{product.price}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full uppercase tracking-wider">
              {product.subcategory}
            </span>
            {product.brand && (
              <span className="text-sm text-gray-600">{product.brand}</span>
            )}
          </div>
          {product.rating && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-600">({product.rating}/5)</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 leading-relaxed">
          {product.description}
        </p>

        {/* Size Selection */}
        {product.sizes && (
          <div className="space-y-3">
            <h4 className="font-medium">Select Size</h4>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-3 text-sm border rounded-lg transition-all ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!selectedSize || !product.inStock}
          className="w-full bg-black text-white hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 rounded-full py-3"
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          {!product.inStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>

      {/* Suggested Products */}
      {suggestedProducts.length > 0 && (
        <div className="p-4 bg-white mt-2">
          <h3 className="text-lg font-light mb-4">You might also like</h3>
          <ProductGrid 
            products={suggestedProducts}
            wishlist={wishlist}
            onProductClick={onProductClick}
            onToggleWishlist={onToggleWishlist}
          />
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav 
        cartCount={cartCount}
        onHomeClick={onHomeClick}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onContactClick={onContactClick}
        activeTab="home"
      />
    </div>
  );
};

export default ProductDetailPage;
