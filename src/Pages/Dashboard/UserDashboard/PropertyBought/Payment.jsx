import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import SectionTitle from '../../../../components/Shared/SectionTitle';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { Helmet } from 'react-helmet-async';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
console.log(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
  const { id } = useParams();
  console.log('params', id);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(setLoading,500,false)
  }, []);
  return loading ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <ScaleLoader color="#36d7b7" height={80} width={5} />
    </div>
  ) : (
    <div>
      <Helmet>
        <title>RESIDENCE HUB | Payment</title>
      </Helmet>
      <SectionTitle
        heading="Payment"
        subHeading="Please pay your offered price"
      ></SectionTitle>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm id={id}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
