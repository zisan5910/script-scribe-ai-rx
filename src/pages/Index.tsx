import { useState, useMemo } from "react";
import { Heart, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/ProductGrid";
import ProductModal from "@/components/ProductModal";
import Cart from "@/components/Cart";
import WishlistPage from "@/components/WishlistPage";
import BottomNav from "@/components/BottomNav";
import Contact from "@/pages/Contact";
import Search from "@/pages/Search";
import { Product } from "@/types/Product";

const mockProducts: Product[] = [
  // Electronics - Mobile Phones
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1199,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Mobile Phones",
    description: "Latest iPhone with advanced camera system and A17 Pro chip.",
    brand: "Apple",
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 1099,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Mobile Phones",
    description: "Premium Android phone with S Pen and AI features.",
    brand: "Samsung",
    rating: 4.7,
    inStock: true
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    price: 899,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Mobile Phones",
    description: "Google's flagship with advanced AI photography.",
    brand: "Google",
    rating: 4.6,
    inStock: true
  },
  {
    id: 4,
    name: "OnePlus 12",
    price: 699,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Mobile Phones",
    description: "Fast charging flagship with premium design.",
    brand: "OnePlus",
    rating: 4.5,
    inStock: true
  },
  {
    id: 5,
    name: "Xiaomi 14 Ultra",
    price: 799,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Mobile Phones",
    description: "Photography-focused smartphone with Leica partnership.",
    brand: "Xiaomi",
    rating: 4.4,
    inStock: true
  },
  {
    id: 6,
    name: "iPhone 14",
    price: 799,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Mobile Phones",
    description: "Reliable iPhone with great camera and performance.",
    brand: "Apple",
    rating: 4.6,
    inStock: true
  },
  {
    id: 7,
    name: "Samsung Galaxy A54",
    price: 449,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Mobile Phones",
    description: "Mid-range phone with premium features.",
    brand: "Samsung",
    rating: 4.3,
    inStock: true
  },
  {
    id: 8,
    name: "Nothing Phone 2",
    price: 599,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Mobile Phones",
    description: "Unique transparent design with Glyph interface.",
    brand: "Nothing",
    rating: 4.2,
    inStock: true
  },
  {
    id: 9,
    name: "Oppo Find X6 Pro",
    price: 849,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Mobile Phones",
    description: "Premium phone with excellent camera capabilities.",
    brand: "Oppo",
    rating: 4.4,
    inStock: true
  },
  {
    id: 10,
    name: "Realme GT 5 Pro",
    price: 549,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Mobile Phones",
    description: "Gaming-focused smartphone with fast performance.",
    brand: "Realme",
    rating: 4.3,
    inStock: true
  },

  // Electronics - Laptops & Computers
  {
    id: 11,
    name: "MacBook Pro 16-inch M3",
    price: 2499,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Laptops & Computers",
    description: "Professional laptop with M3 chip for demanding tasks.",
    brand: "Apple",
    rating: 4.9,
    inStock: true
  },
  {
    id: 12,
    name: "Dell XPS 13",
    price: 1299,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Laptops & Computers",
    description: "Ultra-portable laptop with premium build quality.",
    brand: "Dell",
    rating: 4.6,
    inStock: true
  },
  {
    id: 13,
    name: "HP Spectre x360",
    price: 1199,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Laptops & Computers",
    description: "2-in-1 convertible laptop with touch screen.",
    brand: "HP",
    rating: 4.5,
    inStock: true
  },
  {
    id: 14,
    name: "Lenovo ThinkPad X1 Carbon",
    price: 1599,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Laptops & Computers",
    description: "Business laptop with military-grade durability.",
    brand: "Lenovo",
    rating: 4.7,
    inStock: true
  },
  {
    id: 15,
    name: "ASUS ROG Strix G15",
    price: 1399,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Laptops & Computers",
    description: "Gaming laptop with RTX graphics and RGB lighting.",
    brand: "ASUS",
    rating: 4.4,
    inStock: true
  },
  {
    id: 16,
    name: "Surface Laptop 5",
    price: 999,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Laptops & Computers",
    description: "Microsoft's premium laptop with Windows 11.",
    brand: "Microsoft",
    rating: 4.5,
    inStock: true
  },
  {
    id: 17,
    name: "Acer Swift 3",
    price: 699,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Laptops & Computers",
    description: "Affordable laptop with good performance for everyday use.",
    brand: "Acer",
    rating: 4.2,
    inStock: true
  },
  {
    id: 18,
    name: "MSI Creator Z16",
    price: 2199,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Laptops & Computers",
    description: "Content creation laptop with professional display.",
    brand: "MSI",
    rating: 4.6,
    inStock: true
  },
  {
    id: 19,
    name: "MacBook Air M2",
    price: 1199,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Laptops & Computers",
    description: "Lightweight laptop perfect for students and professionals.",
    brand: "Apple",
    rating: 4.8,
    inStock: true
  },
  {
    id: 20,
    name: "Razer Blade 15",
    price: 1899,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=600&fit=crop",
    category: "Electronics",
    subcategory: "Laptops & Computers",
    description: "Premium gaming laptop with sleek design.",
    brand: "Razer",
    rating: 4.5,
    inStock: true
  },

  // Fashion - Women's Clothing
  {
    id: 21,
    name: "Elegant Silk Dress",
    price: 299,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
    category: "Fashion",
    subcategory: "Women's Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A timeless silk dress perfect for special occasions.",
    rating: 4.7,
    inStock: true
  },
  {
    id: 22,
    name: "Casual Summer Dress",
    price: 129,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=600&fit=crop",
    category: "Fashion",
    subcategory: "Women's Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Light and breezy summer dress in soft cotton.",
    rating: 4.5,
    inStock: true
  },
  {
    id: 23,
    name: "Business Blazer",
    price: 189,
    image: "https://images.unsplash.com/photo-1566479179817-3d823a12ad96?w=400&h=600&fit=crop",
    category: "Fashion",
    subcategory: "Women's Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Professional blazer perfect for office wear.",
    rating: 4.6,
    inStock: true
  },
  {
    id: 24,
    name: "Denim Jacket",
    price: 89,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
    category: "Fashion",
    subcategory: "Women's Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Classic denim jacket for casual styling.",
    rating: 4.4,
    inStock: true
  },
  {
    id: 25,
    name: "Yoga Leggings",
    price: 59,
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=600&fit=crop",
    category: "Fashion",
    subcategory: "Women's Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "High-performance leggings for workout and leisure.",
    rating: 4.3,
    inStock: true
  },
  {
    id: 26,
    name: "Knit Sweater",
    price: 79,
    image: "https://images.unsplash.com/photo-1544441892-794166f1e3be?w=400&h=600&fit=crop",
    category: "Fashion",
    subcategory: "Women's Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Cozy knit sweater for cold weather.",
    rating: 4.5,
    inStock: true
  },
  {
    id: 27,
    name: "Formal Pants",
    price: 99,
    image: "https://images.unsplash.com/photo-1544441892-794166f1e3be?w=400&h=600&fit=crop",
    category: "Fashion",
    subcategory: "Women's Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Tailored pants for professional settings.",
    rating: 4.4,
    inStock: true
  },
  {
    id: 28,
    name: "Bohemian Skirt",
    price: 69,
    image: "https://images.unsplash.com/photo-1544441892-794166f1e3be?w=400&h=600&fit=crop",
    category: "Fashion",
    subcategory: "Women's Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Flowing skirt with bohemian patterns.",
    rating: 4.2,
    inStock: true
  },
  {
    id: 29,
    name: "White Button Shirt",
    price: 49,
    image: "https://images.unsplash.com/photo-1544441892-794166f1e3be?w=400&h=600&fit=crop",
    category: "Fashion",
    subcategory: "Women's Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Classic white shirt for versatile styling.",
    rating: 4.6,
    inStock: true
  },
  {
    id: 30,
    name: "Evening Gown",
    price: 399,
    image: "https://images.unsplash.com/photo-1544441892-794166f1e3be?w=400&h=600&fit=crop",
    category: "Fashion",
    subcategory: "Women's Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Elegant gown for formal events.",
    rating: 4.8,
    inStock: true
  },

  // Home & Living - Furniture
  {
    id: 31,
    name: "Modern Sofa",
    price: 899,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=600&fit=crop",
    category: "Home & Living",
    subcategory: "Furniture",
    description: "Comfortable 3-seater sofa with modern design.",
    rating: 4.5,
    inStock: true
  },
  {
    id: 32,
    name: "Dining Table Set",
    price: 1299,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=600&fit=crop",
    category: "Home & Living",
    subcategory: "Furniture",
    description: "6-seater dining table with matching chairs.",
    rating: 4.6,
    inStock: true
  },
  {
    id: 33,
    name: "Queen Size Bed Frame",
    price: 699,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=600&fit=crop",
    category: "Home & Living",
    subcategory: "Furniture",
    description: "Sturdy wooden bed frame with headboard.",
    rating: 4.4,
    inStock: true
  },
  {
    id: 34,
    name: "Office Chair",
    price: 299,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=600&fit=crop",
    category: "Home & Living",
    subcategory: "Furniture",
    description: "Ergonomic office chair with lumbar support.",
    rating: 4.3,
    inStock: true
  },
  {
    id: 35,
    name: "Bookshelf",
    price: 199,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=600&fit=crop",
    category: "Home & Living",
    subcategory: "Furniture",
    description: "5-tier wooden bookshelf for storage.",
    rating: 4.2,
    inStock: true
  },
  {
    id: 36,
    name: "Coffee Table",
    price: 249,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=600&fit=crop",
    category: "Home & Living",
    subcategory: "Furniture",
    description: "Glass top coffee table with storage.",
    rating: 4.1,
    inStock: true
  },
  {
    id: 37,
    name: "Wardrobe",
    price: 799,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h+600&fit=crop",
    category: "Home & Living",
    subcategory: "Furniture",
    description: "3-door wardrobe with mirror and drawers.",
    rating: 4.4,
    inStock: true
  },
  {
    id: 38,
    name: "TV Stand",
    price: 179,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=600&fit=crop",
    category: "Home & Living",
    subcategory: "Furniture",
    description: "Modern TV stand with cable management.",
    rating: 4.0,
    inStock: true
  },
  {
    id: 39,
    name: "Recliner Chair",
    price: 599,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=600&fit=crop",
    category: "Home & Living",
    subcategory: "Furniture",
    description: "Comfortable reclining chair with footrest.",
    rating: 4.5,
    inStock: true
  },
  {
    id: 40,
    name: "Study Desk",
    price: 329,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=600&fit=crop",
    category: "Home & Living",
    subcategory: "Furniture",
    description: "Compact study desk with built-in storage.",
    rating: 4.3,
    inStock: true
  },

  // Beauty & Personal Care - Skincare
  {
    id: 41,
    name: "Vitamin C Serum",
    price: 29,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    category: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Brightening serum with 20% Vitamin C.",
    rating: 4.5,
    inStock: true
  },
  {
    id: 42,
    name: "Hydrating Face Moisturizer",
    price: 24,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    category: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Daily moisturizer for all skin types.",
    rating: 4.4,
    inStock: true
  },
  {
    id: 43,
    name: "Gentle Face Cleanser",
    price: 18,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    category: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Sulfate-free cleanser for sensitive skin.",
    rating: 4.3,
    inStock: true
  },
  {
    id: 44,
    name: "Retinol Night Cream",
    price: 39,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    category: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Anti-aging night cream with retinol.",
    rating: 4.6,
    inStock: true
  },
  {
    id: 45,
    name: "Sunscreen SPF 50",
    price: 22,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    category: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Broad spectrum sun protection.",
    rating: 4.5,
    inStock: true
  },
  {
    id: 46,
    name: "Hyaluronic Acid Serum",
    price: 26,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    category: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Intense hydration serum.",
    rating: 4.4,
    inStock: true
  },
  {
    id: 47,
    name: "Clay Face Mask",
    price: 16,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    category: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Purifying clay mask for oily skin.",
    rating: 4.2,
    inStock: true
  },
  {
    id: 48,
    name: "Eye Cream",
    price: 32,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    category: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Anti-aging eye cream with peptides.",
    rating: 4.3,
    inStock: true
  },
  {
    id: 49,
    name: "Facial Toner",
    price: 20,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    category: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Balancing toner with witch hazel.",
    rating: 4.1,
    inStock: true
  },
  {
    id: 50,
    name: "Exfoliating Scrub",
    price: 19,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    category: "Beauty & Personal Care",
    subcategory: "Skincare",
    description: "Gentle exfoliating scrub for smooth skin.",
    rating: 4.0,
    inStock: true
  },

  // Books & Stationery - Novels
  {
    id: 51,
    name: "The Great Gatsby",
    price: 12,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    category: "Books & Stationery",
    subcategory: "Novels",
    description: "Classic American novel by F. Scott Fitzgerald.",
    rating: 4.8,
    inStock: true
  },
  {
    id: 52,
    name: "1984",
    price: 14,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    category: "Books & Stationery",
    subcategory: "Novels",
    description: "Dystopian novel by George Orwell.",
    rating: 4.7,
    inStock: true
  },
  {
    id: 53,
    name: "To Kill a Mockingbird",
    price: 13,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    category: "Books & Stationery",
    subcategory: "Novels",
    description: "Pulitzer Prize winning novel by Harper Lee.",
    rating: 4.9,
    inStock: true
  },
  {
    id: 54,
    name: "Pride and Prejudice",
    price: 11,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    category: "Books & Stationery",
    subcategory: "Novels",
    description: "Romance novel by Jane Austen.",
    rating: 4.6,
    inStock: true
  },
  {
    id: 55,
    name: "The Catcher in the Rye",
    price: 15,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    category: "Books & Stationery",
    subcategory: "Novels",
    description: "Coming-of-age novel by J.D. Salinger.",
    rating: 4.4,
    inStock: true
  },
  {
    id: 56,
    name: "Harry Potter Series",
    price: 89,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    category: "Books & Stationery",
    subcategory: "Novels",
    description: "Complete 7-book series by J.K. Rowling.",
    rating: 4.9,
    inStock: true
  },
  {
    id: 57,
    name: "The Lord of the Rings",
    price: 45,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    category: "Books & Stationery",
    subcategory: "Novels",
    description: "Epic fantasy trilogy by J.R.R. Tolkien.",
    rating: 4.8,
    inStock: true
  },
  {
    id: 58,
    name: "Agatha Christie Collection",
    price: 34,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    category: "Books & Stationery",
    subcategory: "Novels",
    description: "Mystery novels collection.",
    rating: 4.7,
    inStock: true
  },
  {
    id: 59,
    name: "The Alchemist",
    price: 16,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    category: "Books & Stationery",
    subcategory: "Novels",
    description: "Philosophical novel by Paulo Coelho.",
    rating: 4.5,
    inStock: true
  },
  {
    id: 60,
    name: "Dune",
    price: 18,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=600&fit=crop",
    category: "Books & Stationery",
    subcategory: "Novels",
    description: "Science fiction epic by Frank Herbert.",
    rating: 4.6,
    inStock: true
  }
];

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

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<Array<{ product: Product; size: string; quantity: number }>>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<"home" | "search" | "contact">("home");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product: Product, size: string = "Default") => {
    const existingItem = cartItems.find(item => item.product.id === product.id && item.size === size);
    
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.product.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { product, size, quantity: 1 }]);
    }
    setSelectedProduct(null);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      return matchesCategory;
    });
  }, [selectedCategory]);

  const wishlistProducts = mockProducts.filter(product => wishlist.includes(product.id));

  if (currentPage === "contact") {
    return (
      <Contact 
        onBack={() => setCurrentPage("home")}
        onHomeClick={() => setCurrentPage("home")}
        onSearchClick={() => setCurrentPage("search")}
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cartItemsCount}
      />
    );
  }

  if (currentPage === "search") {
    return (
      <Search
        products={mockProducts}
        wishlist={wishlist}
        onBack={() => setCurrentPage("home")}
        onProductClick={setSelectedProduct}
        onToggleWishlist={toggleWishlist}
        onHomeClick={() => setCurrentPage("home")}
        onCartClick={() => setIsCartOpen(true)}
        onContactClick={() => setCurrentPage("contact")}
        cartCount={cartItemsCount}
      />
    );
  }

  if (isWishlistOpen) {
    return (
      <WishlistPage
        products={wishlistProducts}
        wishlist={wishlist}
        onProductClick={setSelectedProduct}
        onToggleWishlist={toggleWishlist}
        onBack={() => setIsWishlistOpen(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-extralight tracking-widest">printpoka</h1>
          
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-gray-50 h-8 w-8"
              onClick={() => setIsWishlistOpen(true)}
            >
              <Heart className="h-4 w-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                  {wishlist.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Category Filters */}
      <div className="px-4 py-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.slice(0, 4).map((category) => (
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
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className="ml-2 hover:bg-gray-50 h-8 w-8"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {showFilters && (
          <div className="bg-white rounded-lg p-3 space-y-2 border border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">All Categories</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(false)}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowFilters(false);
                  }}
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
        )}
      </div>

      {/* Products Section */}
      <section className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-light">
            {selectedCategory === "All" ? "All Products" : selectedCategory}
          </h2>
          <span className="text-xs text-gray-500">{filteredProducts.length} items</span>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-8">
            <h3 className="text-base font-light mb-1">No products found</h3>
            <p className="text-gray-500 text-sm">Try selecting a different category</p>
          </div>
        ) : (
          <ProductGrid 
            products={filteredProducts}
            wishlist={wishlist}
            onProductClick={setSelectedProduct}
            onToggleWishlist={toggleWishlist}
          />
        )}
      </section>

      {/* Bottom Navigation */}
      <BottomNav 
        cartCount={cartItemsCount}
        onHomeClick={() => setCurrentPage("home")}
        onSearchClick={() => setCurrentPage("search")}
        onCartClick={() => setIsCartOpen(true)}
        onContactClick={() => setCurrentPage("contact")}
        activeTab={currentPage}
      />

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isInWishlist={wishlist.includes(selectedProduct.id)}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          onToggleWishlist={() => toggleWishlist(selectedProduct.id)}
        />
      )}

      {/* Cart */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={(productId, size, quantity) => {
          if (quantity === 0) {
            setCartItems(cartItems.filter(item => !(item.product.id === productId && item.size === size)));
          } else {
            setCartItems(cartItems.map(item => 
              item.product.id === productId && item.size === size
                ? { ...item, quantity }
                : item
            ));
          }
        }}
      />
    </div>
  );
};

export default Index;
