// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./Header";
import Home from "./Home";
import Checkout from './Checkout';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';
import { auth } from './firebase';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import Orders from './Orders';
import PaystackPayment from './PaystackPayment';
import { Elements } from '@stripe/react-stripe-js';



// Load your Stripe publishable key
const stripePromise = loadStripe(
  'pk_test_51P4lMDKMXxBxcQTl8KzfTPmRU5BAq2eLzVX1LbpjwQdFFYC4XaPUv52tmTOmkASj19L0lcLsex33XGtBdVlx2iR800PJq5iRlu'); // Replace with your actual Stripe publishable key
 


function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    
    auth.onAuthStateChanged((authUser) =>{
      console.log("THE USER IS >>> ", authUser);

      if(authUser){

        dispatch({
          type: "SET_USER",
          user: authUser
        });
      }else{
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    })
  }, [])
  
  return (
    <div>
            <Router>
                <div>

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path='/checkout' element={<Checkout />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/orders' element={<Orders />} />
                        {/* <Route path='/payment' element={<PaystackPayment />} /> */}
                        {/* Wrap the Payment route in the <Elements> provider */}
                        <Route path='/payment' element={<Elements stripe={stripePromise}><Payment /></Elements>} />
                    </Routes>
                </div>
            </Router>
        </div>

    
  );
}

export default App;

