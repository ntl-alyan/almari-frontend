import React from "react";
import { FiHeart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoMenuOutline } from "react-icons/io5";
import { AiOutlineHome, AiOutlineAppstore } from "react-icons/ai";

export default function MobNavbar() {
  return (
    <div className="d-lg-none position-fixed bottom-0 w-100 bg-white start-50 translate-middle-x max-w-500px mob_navbar px-3">
      <div className="d-flex justify-content-between align-items-center text-28px py-2">
        <IoMenuOutline />
        <div className="position-relative">
          <HiOutlineShoppingBag />
          <div className="bg-danger rounded-circle position-absolute top-0 end-0 w-18 h-18 text-center text-white">
            0
          </div>
        </div>

        <AiOutlineHome />

        <div className="position-relative">
          <FiHeart />
          <div className="bg-danger rounded-circle position-absolute top-0 end-0 w-18 h-18 text-center text-white">
            0
          </div>
        </div>

        <AiOutlineAppstore />
      </div>
    </div>
  );
};
