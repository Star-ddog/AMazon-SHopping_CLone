import React from 'react';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useNavigate } from 'react-router-dom';

const Subtotal = () => {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();

  const orderTotal = getBasketTotal(basket);
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(orderTotal);

  return (
    <div className="subtotal flex flex-col justify-between w-80 h-28 p-5 bg-subtotalBakCol border-2 border-subtotalBorderCol border-solid rounded">
      <p>
        Subtotal ({basket?.length} items): <strong>{formattedTotal}</strong>
      </p>
      <small className="subtotal__gift flex items-center">
        <input type="checkbox" className="mr-1" /> This order contains a gift
      </small>
      <button
        className="rounded-sm w-full h-8 border-solid mt-3 border-2 bg-subtotalButtonback border-subtotalBorderCol  text-subtotalButtoncol"
        onClick={(e) => navigate('/payment')}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Subtotal;
