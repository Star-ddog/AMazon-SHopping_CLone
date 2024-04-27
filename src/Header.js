import React from 'react'
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import basketshop from '../img/shopping-basket.png';
import search from '../img/search-interface-symbol.png';


const Header = () => {

  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () =>{
    if(user) {
      auth.signOut();
    }
  }

  return (
    <div className="header h-15 flex items-center sticky top-0 bg-bgHeader z-20 ">

    <Link to={"/"}>
    <img
          className="header__logo w-24 object-contain my-0 mx-5 mt-4 "
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
    </Link>
       

      <div className="header__search flex flex-1 items-center rounded-3xl">
        <input className="header__searchInput h-3 p-3 border-none w-full"
         type="text" 

         />
       <img src={search} alt=""  
        className="header__searchIcon p-1 h-6 bg-seachIcon "
       />
      </div>

      <div className="header__nav flex justify-evenly">
        
          <Link to={!user && '/login'}>
          <div onClick={user && handleAuthentication} className="header__option flex flex-col ml-3 mr-3 text-white">
            <span className="header__optionLineOne text-xs  ">{!user ? 'Hello Guest' :`WELCOME ${user.email}`  }</span>
            <span className="header__optionLineTwo font-extrabold text-sm ">{user ? 'Sign Out' :'Sign In' }</span>
          </div>
          </Link>
        

        
       <Link to={"/orders"}>
       <div className="header__option flex flex-col ml-3 mr-3 text-white">
            <span className="header__optionLineOne text-xs">Returns</span>
            <span className="header__optionLineTwo font-extrabold text-sm">& Orders</span>
          </div>
       </Link>
        
        

        <div className="header__option flex flex-col ml-3 mr-3 text-white">
          <span className="header__optionLineOne text-xs">Your</span>
          <span className="header__optionLineTwo font-extrabold text-sm">Prime</span>
        </div>


        <Link to="/checkout">
        <div className="header__optionBasket flex items-center text-white">
           <img src={basketshop} alt="" />
            <span className="header__optionLineTwo header__basketCount font-extrabold text-sm mx-3">
            {basket?.length}
            </span>
          </div>
        </Link>
        
          
        
      </div>
    </div>
  )
}

export default Header