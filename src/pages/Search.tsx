
import { useState, useMemo } from "react";
import { ArrowLeft, Search as SearchIcon, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/ProductGrid";
import ProductModal from "@/components/ProductModal";
import BottomNav from "@/components/BottomNav";
import { Product } from "@/types/Product";

interface SearchProps {
  products: Product[];
  wishlist: number[];
  onBack: () => void;
  onProductClick: (product: Product) => void;
  onToggleWishlist: (productId: number) => void;
  onHomeClick: () => void;
  onCartClick: () => void;
  onContactClick: () => void;
  cartCount: number;
}

const categories = [
  "All", 
  "Electronics", 
  "Fashion", 
  "Home & Living", 
  "Beauty & Personal Care", 
  "Grocery & Food",
  "Books & Stationery",
  "Toys & Baby Products", 
  "Sports & Outdoors", 
  "Automotive", 
  "Health & Wellness"
];

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ৳50", min: 0, max: 50 },
  { label: "৳50 - ৳200", min: 50, max: 200 },
  { label: "৳200 - ৳500", min: 200, max: 500 },
  { label: "৳500 - ৳1000", min: 500, max: 1000 },
  { label: "Above ৳1000", min: 1000, max: Infinity }
];

const Search = ({ 
  products, 
  wishlist, 
  onBack, 
  onProductClick, 
  onToggleWishlist,
  onHomeClick,
  onCartClick,
  onContactClick,
  cartCount
}: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesPrice = product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchQuery, selectedCategory, selectedPriceRange, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedPriceRange(priceRanges[0]);
    setSortBy("name");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-extralight tracking-wide">Search Products</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className="h-8 w-8"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="px-4 py-3 space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search products, brands, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Filters</h3>
              <Button
                variant="ghost"
                onClick={clearAllFilters}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Clear All
              </Button>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Price Range</label>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((range) => (
                  <button
                    key={range.label}
                    onClick={() => setSelectedPriceRange(range)}
                    className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
                      selectedPriceRange.label === range.label
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "name", label: "Name" },
                  { value: "price-low", label: "Price: Low to High" },
                  { value: "price-high", label: "Price: High to Low" },
                  { value: "rating", label: "Rating" }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
                      sortBy === option.value
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Filters */}
        {(searchQuery || selectedCategory !== "All" || selectedPriceRange.label !== "All Prices") && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-gray-500">Active filters:</span>
            {searchQuery && (
              <span className="bg-black text-white px-2 py-1 rounded-full text-xs">
                "{searchQuery}"
              </span>
            )}
            {selectedCategory !== "All" && (
              <span className="bg-black text-white px-2 py-1 rounded-full text-xs">
                {selectedCategory}
              </span>
            )}
            {selectedPriceRange.label !== "All Prices" && (
              <span className="bg-black text-white px-2 py-1 rounded-full text-xs">
                {selectedPriceRange.label}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-light">
            {searchQuery ? `Results for "${searchQuery}"` : "All Products"}
          </h2>
          <span className="text-xs text-gray-500">{filteredProducts.length} items</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <SearchIcon className="h-8 w-8 mx-auto mb-2" />
            </div>
            <h3 className="text-base font-light mb-1">No products found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="mt-3 rounded-full text-sm"
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <ProductGrid 
            products={filteredProducts}
            wishlist={wishlist}
            onProductClick={onProductClick}
            onToggleWishlist={onToggleWishlist}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav 
        cartCount={cartCount}
        onHomeClick={onHomeClick}
        onSearchClick={() => {}}
        onCartClick={onCartClick}
        onContactClick={onContactClick}
        activeTab="search"
      />
    </div>
  );
};

export default Search;
