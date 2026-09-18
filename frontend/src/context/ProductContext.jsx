import React, { createContext, useContext, useState, useEffect } from 'react';
import { productsData as defaultProductsData } from '../data/products';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('dailymitra_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved products:', e);
      }
    }
    return defaultProductsData;
  });

  useEffect(() => {
    localStorage.setItem('dailymitra_products', JSON.stringify(products));
  }, [products]);

  const updateProduct = (id, updatedFields) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const addProduct = (newProductData) => {
    const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const newProduct = {
      id: newId,
      rating: 4.8,
      reviewsCount: 0,
      badges: ['New'],
      ...newProductData,
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetProducts = () => {
    setProducts(defaultProductsData);
    localStorage.setItem('dailymitra_products', JSON.stringify(defaultProductsData));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        updateProduct,
        addProduct,
        deleteProduct,
        resetProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
