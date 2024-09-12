import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Products, Navbar, Cart, Checkout } from "./Components";
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const theme = createTheme();

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ line_items: [], total_items: 0, subtotal: { formatted_with_symbol: '' } });
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    const cartData = await commerce.cart.retrieve();
    setCart(cartData);
  };

  const handleAddToCart = async (productId, quantity) => {
    console.log('Adding to cart:', productId, quantity);
    const response = await commerce.cart.add(productId, quantity);
    setCart(response);
  };


  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });
    setCart(response);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);
    setCart(response)
  };


  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
    console.log("cart refreshed")
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    refreshCart()
  };


  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  console.log(cart)

  return (
    <Router>
      <div>
        <ThemeProvider theme={theme}>
          <Navbar totalItems={cart?.total_items || 0} />
          <Routes>
            <Route
              path='/'
              element={<Products products={products} onAddToCart={handleAddToCart} />}
            />

            <Route
              path='/cart'
              element={<Cart
                cart={cart}
                handleRemoveFromCart={handleRemoveFromCart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleEmptyCart={handleEmptyCart}
              />}
            />
            <Route
              path='/checkout'
              element={
                <Checkout
                  cart={cart}
                  order={order}
                  onCaptureCheckout={handleCaptureCheckout}
                  error={errorMessage}
                />
              }
            />
          </Routes>
        </ThemeProvider>
      </div>
    </Router>
  );
};

export default App;
