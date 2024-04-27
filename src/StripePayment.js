import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import axios from './axios';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { db } from './firebase';
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

// Load your Stripe publishable key
const stripePromise = loadStripe('pk_test_51P4lMDKMXxBxcQTl8KzfTPmRU5BAq2eLzVX1LbpjwQdFFYC4XaPUv52tmTOmkASj19L0lcLsex33XGtBdVlx2iR800PJq5iRlu');

const StripePayment = () => {
    const navigate = useNavigate();
    const [{ basket, user }, dispatch] = useStateValue();



    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {

         // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            try {
                const response = await axios({
                    method: 'post',
                     // Stripe expects the total in a currencies subunits
                    url: `/payments/create?total=${getBasketTotal(basket) * 100}`
                });
                if (response.data && response.data.clientSecret) {
                    setClientSecret(response.data.clientSecret);
                } else {
                    console.error('Invalid response data:', response.data);
                }
            } catch (err) {
                console.error('Failed to get client secret:', err);
            }
        };

        getClientSecret();
    }, [basket]);

    const handleChange = (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };


    console.log('THE SECRET IS >>>', clientSecret)
    console.log('👱', user)

    const handleSubmit = async (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();
        setProcessing(true);
    
        try {
            // Confirm card payment with the client secret and card element
            const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                }
            });
    
            if (paymentError) {
                // Handle payment failure
                setError(`Payment failed: ${paymentError.message}`);
                setProcessing(false);
                return;
            }
    
            // Payment succeeded
            setSucceeded(true);
            setError(null);
            setProcessing(false);
    
            // Save order data to Firestore
            const userDocRef = doc(collection(db, 'users'), user?.uid);
            const ordersCollectionRef = collection(userDocRef, 'orders');
            const orderDocRef = doc(ordersCollectionRef, paymentIntent.id);
    
            await setDoc(orderDocRef, {
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
            });
    
            // Clear the basket after successful payment
            dispatch({
                type: 'EMPTY_BASKET'
            });
    
            // Navigate to the orders page
            navigate('/orders');
    
        } catch (error) {
            // Handle any other errors that may occur
            setError(`An error occurred: ${error.message}`);
            setProcessing(false);
        }
    };
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
                <div className="payment__priceContainer">
                    <CurrencyFormat
                        renderText={(value) => (
                            <h3 className="pb-5">Order Total: {value}</h3>
                        )}
                        decimalScale={2}
                        value={getBasketTotal(basket)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                    />
                    <button disabled={processing || disabled || succeeded} className='bg-yellow-400 rounded-md w-full h-8 border border-solid font-semibold mt-2 border-yellow-600 text-gray-800'>
                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                    </button>
                </div>
                {error && <div>{error}</div>}
            </form>
        </div>
    );
};

export default StripePayment;
