import React from 'react';
import { Typography, Button, Divider } from '@mui/material';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';

// Load Stripe with the public key from environment variables
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, shippingData, backStep, onCaptureCheckout, nextStep, timeout}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return; // Ensure that Stripe and elements are loaded

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

      if (error) {
        console.log('Payment error: ', error);
        alert(`Payment error: ${error.message}`);
      } else {
        const orderData = {
          line_items: checkoutToken.line_items,
          customer: {
            firstname: shippingData.firstname,
            lastname: shippingData.lastname,
            email: shippingData.email,
          },
          shipping: {
            name: 'Primary',
            street: shippingData.address1,
            town_city: shippingData.city,
            country_state: shippingData.shippingSubdivision,
            postal_zip_code: shippingData.zip,
            country: shippingData.shippingCountry,
          },
          fulfillment: { shippingMethod: shippingData.shippingOption },
          payment: {
            gateway: 'stripe',
            stripe: {
              payment_method_id: paymentMethod.id,
            },
          },
        };
        console.log('Order Data: ', orderData);

        await onCaptureCheckout(checkoutToken.id, orderData);

        timeout()
        nextStep();
      }
    } catch (err) {
      console.error('Error in handleSubmit: ', err);
      alert('An unexpected error occurred. Please try again.');
    }
  };


  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment Method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={backStep}>Back</Button>
                <Button variant="contained" type="submit" disabled={!stripe} color="primary">
                  Pay {checkoutToken.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
