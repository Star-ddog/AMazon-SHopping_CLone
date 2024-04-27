import React from 'react'
import { useStateValue } from './StateProvider';

const Product = ({id, title, price, rating, image}) => {

  const [{ basket }, dispatch] = useStateValue();

  console.log(basket)

  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product flex flex-col items-center justify-end m-3 p-5 w-full min-w-28 bg-white z-10 max-h-full
     hover:shadow-xl hover:scale-103 transition duration-500 ease-in-out cursor-pointer">
      <div className="product__info h-28 mb-4">
        <p>{title}</p>
        <p className="product__price mt-1">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" className="max-h-52 w-full object-contain mb-4
      hover:scale-110 transition duration-500 ease-in-out"
       />

      <button className="border-2 border-solid mt-3 bg-buttonBg text-buttonCol border-boderColor"
      onClick={addToBasket}
      >Add to Basket</button>
    </div>
  )
}

export default Product