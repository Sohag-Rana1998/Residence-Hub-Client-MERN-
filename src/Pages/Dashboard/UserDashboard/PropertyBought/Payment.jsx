import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../../components/Shared/SectionTitle";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import Loader from "../../../../components/Shared/Loader";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
// console.log(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
  const { id } = useParams();
  // console.log('params', id);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(setLoading, 500, false);
  }, []);
  return loading ? (
    <div>
      <Loader />
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
