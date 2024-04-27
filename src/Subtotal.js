import React from 'react'
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useNavigate  } from "react-router-dom";

const Subtotal = () => {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="subtotal flex flex-col justify-between w-80 h-28 p-5 bg-subtotalBakCol border-2 border-subtotalBorderCol border-solid rounded">
    <CurrencyFormat
      renderText={(value) => (
        <>
          <p>
            {/* Part of the homework */}
            Subtotal ({basket?.length} items): <strong>{value}</strong>
          </p>
          <small className="subtotal__gift flex items-center ">
            <input type="checkbox" className="mr-1" /> This order contains a gift
          </small>
        </>
      )}
      decimalScale={2}
      value={getBasketTotal(basket)} // Part of the homework
      displayType={"text"}
      thousandSeparator={true}
      prefix={"$"}
    />

    <button className="rounded-sm w-full h-8 border-solid mt-3 border-2 bg-subtotalButtonback border-subtotalBorderCol  text-subtotalButtoncol" 
    onClick={e => navigate('/payment')}
    >Proceed to Checkout</button>
  </div>
  )
}

export default Subtotal