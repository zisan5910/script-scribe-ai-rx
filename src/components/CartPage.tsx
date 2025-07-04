
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";

interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, size: string, quantity: number) => void;
  onBack: () => void;
}

const CartPage = ({ items, onUpdateQuantity, onBack }: CartPageProps) => {
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = total > 200 ? 0 : 15;
  const finalTotal = total + shipping;

  const handleCheckout = () => {
    const orderSummary = items.map(item => 
      `${item.product.name} (Size: ${item.size}, Qty: ${item.quantity}) - $${(item.product.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const orderDetails = `
Order Summary:
${orderSummary}

Subtotal: $${total.toFixed(2)}
Shipping: ${shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
Total: $${finalTotal.toFixed(2)}
    `.trim();

    const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSf_EXAMPLE_FORM_ID/viewform";
    const formUrlWithData = `${googleFormUrl}?usp=pp_url&entry.REPLACE_WITH_FIELD_ID=${encodeURIComponent(orderDetails)}`;
    
    window.open(formUrlWithData, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-medium">Cart ({items.length})</h1>
        </div>
      </div>

      {/* Content */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center min-h-[50vh]">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some items to get started</p>
          <Button onClick={onBack} className="bg-black text-white">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {/* Free Shipping Banner */}
          {total < 200 && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800 mb-2">
                Add ${(200 - total).toFixed(2)} more for free shipping
              </p>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${(total / 200) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items */}
          {items.map((item, index) => (
            <div key={`${item.product.id}-${item.size}-${index}`} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex gap-4">
                <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{item.product.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">Size: {item.size}</p>
                  <p className="text-lg font-medium">${item.product.price}</p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
                      onClick={() => onUpdateQuantity(item.product.id, item.size, 0)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Order Summary */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-medium text-lg pt-2 border-t">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              className="w-full mt-4 bg-black text-white"
              onClick={handleCheckout}
            >
              Checkout - ${finalTotal.toFixed(2)}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
