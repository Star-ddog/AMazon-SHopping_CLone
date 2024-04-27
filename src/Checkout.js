import React from 'react'
import Subtotal from './Subtotal'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider';

import Header from './Header';

const Checkout = () => {

    const [{ basket }, dispatch] = useStateValue();

  return (

    <div>
      <Header/>
   
    
    <div className='checkout flex p-5 bg-white h-max'>
    <div className="checkout__left">
        <img 
         src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
        alt="" className="checkout__ad" />

    <div>
        <h2 className="checkout__title mr-3 p-3 border-b-2 border-b-solid border-b-gray-200">
            Your Shopping Basket
        </h2>

        {basket.length > 0 ? (
  basket.map((item,index) => (
    <CheckoutProduct
      key={index} // Remember to add a unique key prop when rendering lists in React
      id={item.id}
      title={item.title}
      image={item.image}
      price={item.price}
      rating={item.rating}
    />
  ))
) : (
  <h3>Your basket is empty!</h3>
)}        
    </div>

    </div>

   
    <div className="checkout__right">
        <Subtotal/>
    </div>
    </div>

    </div>
  )
}

export default Checkout