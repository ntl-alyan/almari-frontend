/* eslint-disable @next/next/no-html-link-for-pages */
import React,{useEffect,useState} from "react";

import { BsSearch } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { almariService } from "../../services/customer";
import {useCartData } from "../helpers/react-query"
import { useQueryClient } from "react-query";
import  Router  from "next/router";
 
export default function HeaderMain  ({user})  {

  const [cartItems,setCartItems]=useState(0);
  const queryClient = useQueryClient();
  const { data: activeCartData } = useCartData(user);

  useEffect(() => {
		if (activeCartData) {
      setCartItems(activeCartData.data.length);
		}
	}, [ activeCartData]);


  return (
    <div className="border-b border-gray-200 py-6">
      <div className="container sm:flex justify-between items-center">
        <div className="font-bold text-4xl text-center pb-4 sm:pb-0 text-blackish" >
          Almari
        </div>


        <div className="hidden lg:flex gap-4 text-gray-500 text-[30px]">
        <div className="relative" >
          <a href="/Users" >
                <BiUser />
              </a>
          </div>

          <div className="relative" >
          <a href="/CartItems" >
                <HiOutlineShoppingBag />
              </a>
            <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
              {cartItems}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};