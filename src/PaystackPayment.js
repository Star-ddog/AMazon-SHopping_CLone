import React, { useEffect, useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import CurrencyFormat from 'react-currency-format';

const PaystackPayment = () => {
    const navigate = useNavigate();

    const [{ basket, user }, dispatch] = useStateValue();
    const [config, setConfig] = useState({
      reference: (new Date()).getTime().toString(),
      email: '',
      amount: 0,
      // publicKey: 'pk_live_616919935269fe31d2a9374427f847456e56455e',
      publicKey: 'pk_test_ceac2baa92e379aec1ad09106c4d5fab5766bbbf',
    });
  
    useEffect(() => {
      // Update config when basket or user changes
      setConfig(prevConfig => ({
        ...prevConfig,
        email: user?.email,
        amount: getBasketTotal(basket) * 100,
      }));
    }, [basket, user]);
  
    const handlePaystackSuccessAction = async (reference) => {
      try {
        console.log(reference);
        // Save order data to Firestore
        const userDocRef = doc(collection(db, 'users'), user?.uid);
        const ordersCollectionRef = collection(userDocRef, 'orders');
        // Generate a unique ID for the order document
        const orderDocRef = doc(ordersCollectionRef);
  
        await setDoc(orderDocRef, {
          basket: basket,
          amount: getBasketTotal(basket) * 100,
          reference: reference,
        });
  
        // Clear the basket after successful payment
        dispatch({ type: 'EMPTY_BASKET' });
  
        // Navigate to the orders page
        navigate('/orders');
      } catch (error) {
        console.error('Error processing payment:', error);
        // Handle error gracefully, e.g., show a message to the user
      }
    };
    const handlePaystackCloseAction = () => {
      console.log('closed');
      // Implement your logic for payment dialog closed here
    };
  
    const componentProps = {
      ...config,
      text: "Buy Now",
      onSuccess: (reference) => handlePaystackSuccessAction(reference),
      onClose: handlePaystackCloseAction,
    };
  
    return (
      <div>
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
        <PaystackButton {...componentProps}
          className='bg-yellow-400 rounded-md w-full h-8 border border-solid font-semibold mt-2 border-yellow-600 text-gray-800' />
      </div>
    );
};

export default PaystackPayment;
