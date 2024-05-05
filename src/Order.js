import moment from 'moment/moment';
import React from 'react';
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';

const Order = ({order}) => {
    const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="order p-10 my-5 mx-0 border border-gray-200 bg-white relative">
        <h2>Order</h2>
        <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
        <p className="order__id absolute top-10 right-5">
                <small>{order.id}</small>
            </p>
            {order.data.basket?.map(item =>(
                <CheckoutProduct
                     id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    hideButton
                />
            ))}
            <CurrencyFormat
                renderText={(value) => (
                    <h3 className="order__total font-medium text-right">Order Total: {value}</h3>
                )}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />   
   
    </div>
  )
}

export default Order