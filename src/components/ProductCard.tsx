import Image from "next/image";
import React from "react";

interface propsType {
  img: string;
  title: string;
  desc: string;
  rating: number;
  price: string;
}

const ProductCard: React.FC<propsType> = ({
  img,
  title,
  desc,
  rating,
  price,
}) => {
  const generateRating = (rating: number) => {
    switch (rating) {
      case 1:
        return (
          <div className="d-flex gap-1 text-warning fs-4">
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
          </div>
        );
      case 2:
        return (
          <div className="d-flex gap-1 text-warning fs-4">
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
          </div>
        );
      case 3:
        return (
          <div className="d-flex gap-1 text-warning fs-4">
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
          </div>
        );
      case 4:
        return (
          <div className="d-flex gap-1 text-warning fs-4">
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star"></i>
          </div>
        );
      case 5:
        return (
          <div className="d-flex gap-1 text-warning fs-4">
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="px-4 border border-2 border-gray-200 rounded-xl  ">
      <div>
        <img
          className="w-100 h-auto"
          src={img}
          width={200}
          height={200}
          alt={title}
        />
      </div>

      <div className="space-y-2 py-2">
        <h2 className="text-black font-weight-medium text-uppercase">{title}</h2>
        <p className="text-gray-500 max-w-150">{desc}</p>
        <div>{generateRating(rating)}</div>

        <div className="font-weight-bold d-flex gap-4">
          Rs. {price}
          <del className="text-gray-500 font-weight-normal">
            Rs. {parseInt(price) + 1000}.00
          </del>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
