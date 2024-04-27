import React, { useEffect, useState } from 'react'
import { useStateValue } from './StateProvider'
import { collection, doc, onSnapshot, orderBy } from 'firebase/firestore';
import Order from './Order';
import { db } from './firebase';
import Header from './Header';

const Orders = () => {

    const [{basket, user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);


    console.log("User:", user);
  
    

    useEffect(() => {
        try {
            if (user) {
                const userDocRef = doc(collection(db, 'users'), user?.uid); 
                const ordersCollectionRef = collection(userDocRef, 'orders');
                // const OrderBy = orderBy(ordersCollectionRef, 'created', 'desc');          
    
                const unsubscribe = onSnapshot(ordersCollectionRef, async (snapshot) => {
                    setOrders(snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data()

                    })));

                    console.log(" this is",setOrders);
                    
                });
    
                return () => unsubscribe(); // Cleanup function to unsubscribe from snapshot listener when component unmounts
            } else {
                setOrders([]);
            }
        } catch (error) {
            console.log("ORDERS error:", error);
        }
    }, [user]);
    

  return (

    <div>
        <Header/>
     
        <div className='orders py-5 px-20'>
            <h1 className='m-'>Your Orders</h1>

            <div className='orders__order'>
                {orders.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>

    </div>
   
  )
}

export default Orders