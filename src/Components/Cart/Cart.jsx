import React from 'react';
import { Container, Button, Typography, Grid } from '@mui/material';
import CartItem from "./CartItem/CartItem";
import useStyles from "./styles";
import { Link } from 'react-router-dom';

const Cart = ({ cart, handleRemoveFromCart, handleUpdateCartQty, handleEmptyCart }) => {
  const classes = useStyles();

  // Render empty cart message
  const renderEmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart,
      <Link className={classes.link} to="/">start adding some</Link>!
    </Typography>
  );

  // Render cart content
  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem item={lineItem} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
        <div>
          <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty cart</Button>
          <Button className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary">Checkout</Button>
        </div>
      </div>
    </>
  );

  // Show loading text if the cart data is not yet available
  if (!cart || !cart.line_items) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
      {cart.line_items.length === 0 ? renderEmptyCart() : renderCart()}
    </Container>
  );
};

export default Cart;
