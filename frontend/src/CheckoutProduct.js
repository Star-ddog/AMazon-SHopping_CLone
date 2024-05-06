import React from 'react'
import { useStateValue } from './StateProvider';

const CheckoutProduct = ({id, image, title, price, rating,hideButton}) => {

    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        // remove the item from the basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }

  return (

    <div className='checkoutProduct flex items-center mt-5 mb-5 border-b-2 p-6 space-x-6 '>
    <img className='checkoutProduct__image object-contain w-44 h-44' src={image} />

    <div className='checkoutProduct__info pl-5'>
        <p className='checkoutProduct__title text-base font-extrabold'>{title}</p>
        <p className="checkoutProduct__price">
            <small>$</small>
            <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating flex">
            {Array(rating)
            .fill()
            .map((_, i) => (
                <p>🌟</p>
            ))}
        </div>
        
      {!hideButton && (
        <button className="border-2 border-solid mt-3 bg-buttonBg text-buttonCol border-boderColor"
        onClick={removeFromBasket}
      >Remove from Basket</button>
      )} 
    </div>
</div>

  )
}

export default CheckoutProduct