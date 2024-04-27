import React from 'react'
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Header from './Header';
import { Link } from 'react-router-dom';

import StripePayment from './StripePayment';

const Payment = () => {

    const [{ basket, user }, dispatch] = useStateValue();

  return (
    
    <div>
    <Header/>
   
    <div className='payment bg-white'>
    
    <div className='payment__container'>
        <h1 className=' text-center p-3 font-normal bg-ckeckColor border-b-2 border-solid border-ckeckBdColor '>
            Checkout (
                <Link to="/checkout">{basket?.length} items</Link>
                )
        </h1>


        {/* Payment section - delivery address */}
        <div className='payment__section flex p-5 mx-5 my-0 border-b-2 border-solid	 border-ckeckBdColor'>
            <div className='payment__title flex-[0.2]'>
                <h3>Delivery Address</h3>
            </div>
            <div className='payment__address flex-[0.8]'>
                <p>{user?.email}</p>
                <p>123 React Lane</p>
                <p>Los Angeles, CA</p>
            </div>
        </div>

        {/* Payment section - Review Items */}
        <div className='payment__section flex p-5 mx-5 my-0 border-b-2 border-solid	 border-ckeckBdColor'>
        <div className='payment__title flex-[0.2]'>
                <h3>Review items and delivery</h3>
            </div>
            <div className='payment__items flex-[0.8]'>
                {basket.map((item ,index) => (
                    <CheckoutProduct
                    key={index}
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                    />
                ))}
            </div>
        </div>
    

        {/* Payment section - Payment method */}
        <div className='payment__section flex p-5 mx-5 my-0 border-b-2 border-solid	 border-ckeckBdColor'>
        <div className="payment-title flex-[0.2]">
            <h3>Payment Method</h3>
        </div>
        <div className="payment-detials flex-[0.8]">
        <StripePayment/>
        </div>
    
        </div>
    </div>
</div>
 </div>
  )
}

export default Payment