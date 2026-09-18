import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('dailymitra_cart');
    const initialItems = [
      {
        id: 1,
        title: 'Organic Green Big Sweet Pepper Seeds - Capsicum',
        category: 'Vegetables & Produce',
        price: 50,
        unit: '1000gm',
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&auto=format&fit=crop&q=80',
        frequency: 'Daily Morning'
      },
      {
        id: 2,
        title: 'Seoul Yopokki Spicy 4 flavors of Korean Topokki',
        category: 'Instant Food & Snacks',
        price: 85,
        unit: '1pack',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=80',
        frequency: 'One Time Buy'
      }
    ];

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((item) => {
          const matched = initialItems.find((i) => i.id === item.id);
          return matched ? { ...item, price: matched.price } : item;
        });
      } catch (e) {
        console.error('Failed to parse saved cart:', e);
      }
    }
    return initialItems;
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('dailymitra_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [ordersHistory, setOrdersHistory] = useState(() => {
    const saved = localStorage.getItem('dailymitra_user_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'ORD-89241',
        customer: 'Rahul Sharma',
        date: '16 Sep 2026',
        status: 'Out for Delivery',
        statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        total: 185,
        paymentMethod: 'UPI (GPay)',
        deliverySlot: 'Morning (6:00 AM - 7:00 AM)',
        address: 'Flat 402, Sunshine Apartments, Bengaluru',
        items: [
          { name: 'Organic Green Big Sweet Pepper Seeds', qty: 2, price: 50 },
          { name: 'Seoul Yopokki Spicy 4 flavors', qty: 1, price: 85 }
        ]
      },
      {
        id: 'ORD-89102',
        customer: 'Ananya Verma',
        date: '15 Sep 2026',
        status: 'Delivered',
        statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        total: 85,
        paymentMethod: 'Cash on Delivery',
        deliverySlot: 'Morning (6:00 AM - 7:00 AM)',
        address: 'Indiranagar 10th Main, Bengaluru',
        items: [
          { name: 'Seoul Yopokki Spicy Topokki', qty: 1, price: 85 }
        ]
      },
      {
        id: 'ORD-89088',
        customer: 'Vikram Singh',
        date: '15 Sep 2026',
        status: 'Delivered',
        statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        total: 249,
        paymentMethod: 'UPI (PhonePe)',
        deliverySlot: 'Morning (6:00 AM - 7:00 AM)',
        address: 'Koramangala 4th Block, Bengaluru',
        items: [
          { name: 'Mahin Basmati Rice 4pack', qty: 1, price: 249 }
        ]
      },
      {
        id: 'ORD-89012',
        customer: 'Pooja Mehta',
        date: '14 Sep 2026',
        status: 'Processing',
        statusColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
        total: 299,
        paymentMethod: 'NetBanking',
        deliverySlot: 'Morning (6:00 AM - 7:00 AM)',
        address: 'HSR Layout Sector 1, Bengaluru',
        items: [
          { name: 'APILIFE Black Seed Honey 500g', qty: 1, price: 299 }
        ]
      }
    ];
  });

  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem('dailymitra_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dailymitra_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('dailymitra_user_orders', JSON.stringify(ordersHistory));
  }, [ordersHistory]);

  const addToCart = (product, quantity = 1, frequency = 'Daily Morning') => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity, frequency }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const applyCoupon = (code) => {
    const validCoupons = {
      'DAILY20': 20,
      'FRESH10': 10,
      'FESTIVE15': 15
    };
    const cleanCode = code.toUpperCase().trim();
    if (validCoupons[cleanCode]) {
      setCoupon({ code: cleanCode, discountPercent: validCoupons[cleanCode] });
      return { success: true, message: `Coupon ${cleanCode} applied (${validCoupons[cleanCode]}% OFF)!` };
    }
    return { success: false, message: 'Invalid coupon code. Try DAILY20 or FRESH10.' };
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  // Metrics Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = coupon ? Math.round((subtotal * coupon.discountPercent) / 100) : 0;
  const deliveryFee = subtotal > 300 || cart.length === 0 ? 0 : 25;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const placeOrder = ({ addressDetails, paymentMethod, upiId, deliverySlot }) => {
    const newOrderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: newOrderId,
      customer: addressDetails?.fullName || 'Rahul Sharma',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Out for Delivery',
      statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      total: grandTotal,
      paymentMethod: paymentMethod === 'COD' ? 'Cash on Delivery' : paymentMethod === 'UPI' ? `UPI (${upiId || 'GPay'})` : paymentMethod,
      deliverySlot: deliverySlot || 'Morning (6:00 AM - 7:00 AM)',
      address: `${addressDetails?.flatNo || 'Flat 402'}, ${addressDetails?.street || 'Sunshine Apartments'}, ${addressDetails?.city || 'Bengaluru'} - ${addressDetails?.pincode || '560001'}`,
      items: cart.map((i) => ({ name: i.title, qty: i.quantity, price: i.price }))
    };

    setOrdersHistory((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrdersHistory((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          let statusColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
          if (newStatus === 'Delivered') {
            statusColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
          } else if (newStatus === 'Processing') {
            statusColor = 'text-blue-400 bg-blue-500/10 border-blue-500/30';
          } else if (newStatus === 'Cancelled') {
            statusColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
          }
          return { ...order, status: newStatus, statusColor };
        }
        return order;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        ordersHistory,
        coupon,
        subtotal,
        discountAmount,
        deliveryFee,
        grandTotal,
        totalItemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        clearCart,
        placeOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
