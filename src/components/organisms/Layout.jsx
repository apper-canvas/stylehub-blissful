import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/organisms/Header';
import CartDrawer from '@/components/organisms/CartDrawer';
import { useCart } from '@/hooks/useCart';

const Layout = () => {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    // In a real app, this would navigate to checkout
    clearCart();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onCartClick={() => setIsCartDrawerOpen(true)} />
      
      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Layout;