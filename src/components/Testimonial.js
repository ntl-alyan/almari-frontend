import Image from "next/image";
import React from "react";

export default function Testimonial() {
  return (
    <div className="container pt-5 pb-5">
      <h2 className="font-weight-medium fs-3 pb-4">Testimonials</h2>
      <div className="row row-cols-lg-2 g-4">
        <div className="col">
          <div className="border border-2 border-gray-300 rounded-2 p-4 p-lg-0 text-center">
            <div className="d-flex flex-column align-items-center gap-1">
              <Image
                className="rounded-circle"
                src="/speed.jpeg"
                width={80}
                height={80}
                alt="dp"
              />
              <h2 className="text-gray-500 fw-bold fs-5">Hammad Tahir</h2>
              <p className="fs-6">CEO & Founder Invision</p>
              <Image
                className="py-2"
                src="/quotes.svg"
                width={30}
                height={30}
                alt="quotes"
              />
              <p className="text-gray-500 fs-6">
                {"Fashion is like eating, you shouldn't stick to the same menu."}
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="bg-red-600 bg-[url(/cta-banner.jpg)] bg-cover h-100 rounded-2 p-4 text-center">
            <div className="bg-white bg-opacity-75 min-w-270 sm:min-w-300 md:min-w-500 rounded-xl py-4 p-sm-4 d-grid gap-3">
              <button className="btn btn-blackish p-2 rounded-md">
                25% DISCOUNT
              </button>
              <h2 className="font-weight-bold fs-2 text-[#272727]">
                Winter Collection
              </h2>
              <p className="text-gray-500 fs-5">
                Starting @ Rs. 2000 <b>Shop Now</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
