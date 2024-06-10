import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import useOfferedPropertyById from '../../../../hooks/useOfferedPropertyById';
import PropTypes from 'prop-types'
const CheckoutForm = ({ id }) => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { acceptedProperty, reload, isLoading } = useOfferedPropertyById(id);
  console.log(isLoading);
  console.log(acceptedProperty);
  const navigate = useNavigate();
  const paymentPrice = acceptedProperty?.OfferedAmount;
  const propertyId = acceptedProperty?.propertyId;
  console.log(paymentPrice, propertyId);
  useEffect(() => {
    if (paymentPrice > 0) {
      axiosSecure
        .post('/create-payment-intent', { price: paymentPrice })
        .then(res => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, paymentPrice]);

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('payment error', error);
      setError(error.message);
    } else {
      console.log('payment method', paymentMethod);
      setError('');
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous',
          },
        },
      });

    if (confirmError) {
      console.log('confirm error');
    } else {
      console.log('payment intent', paymentIntent);
      if (paymentIntent.status === 'succeeded') {
        console.log('transaction id', paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const payment = {
          buyerEmail: user?.email,
          price: paymentPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          boughtId: id,
          propertyId: propertyId,
          agentEmail: acceptedProperty?.agentEmail,
          buyerName: user?.displayName,
          title: acceptedProperty?.title,
          location: acceptedProperty?.location,
        };

        const res = await axiosSecure.post('/payments', payment);
        console.log('payment saved', res.data);
        reload();
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            icon: 'success',
            title: 'Thank you for the taka paisa',
            showConfirmButton: false,
            timer: 1500,
          });
          event.target.reset();
          navigate('/dashboard/bought-properties');
        }
      }
    }
  };

  return (
    <div className="w-full rounded-lg md:w-[50%] mx-auto bg-orange-100 p-2 md:p-10">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#040c16',
                '::placeholder': {
                  color: '#040c16',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <div className="w-full flex flex-col justify-center items-center">
          <button
            className="btn bg-blue-500 w-32 text-white  my-4"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
          <p className="text-red-600">{error}</p>
          {transactionId && (
            <p className="text-green-600">
              {' '}
              Your transaction id: {transactionId}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

CheckoutForm.propTypes = {
  id: PropTypes.string,
 
};
export default CheckoutForm;
