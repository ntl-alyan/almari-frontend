import React from "react";

interface propsType {
  img: string;
  title: string;
  mainTitle: string;
  price: string;
}

const Slide: React.FC<propsType> = ({ img, title, mainTitle, price }) => {
  return (
    <div className="position-relative">
      <div className="position-absolute start-0 top-50 translate-middle-y ps-3 ms-3 max-w-250 sm:max-w-350 bg-white bg-opacity-75 p-4 rounded-lg">
        <h3 className="text-accent fs-5 lh-lg">{title}</h3>
        <h2 className="text-blackish fs-2 fs-lg-4 fw-bold">{mainTitle}</h2>
        <h3 className="text-gray-500 fs-5 fs-md-6">
          starting at{" "}
          <b className="fs-4 fs-md-5 fs-lg-6">{price}.00</b>
        </h3>
        <div className="btn btn-accent btn-lg rounded-pill mt-2">Shop Now</div>
      </div>

      <img
        className="w-100 h-300 h-md-auto rounded-xl object-cover object-md-left-bottom"
        src={img}
        alt="banner"
      />
    </div>
  );
};

export default Slide;
