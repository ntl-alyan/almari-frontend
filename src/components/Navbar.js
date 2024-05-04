import Link from "next/link";
import React from "react";

export default function Navbar  ()  {


  return (
    <div className="hidden lg:block">
      <div className="container">
        <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-blackish">
          <Link className="navbar__link relative" href="/Home">
            HOME
          </Link>
          
          <Link className="navbar__link relative" href="/Shoes">
            {`SHOES`}
          </Link>
          <Link className="navbar__link relative" href="/Lawns">
            {`LAWNS`}
          </Link>
          <Link className="navbar__link relative" href="/Suits">
            SUITS
          </Link>
          <Link className="navbar__link relative" href="/Trousers">
            TROUSERS
          </Link>
         
        </div>
      </div>
    </div>
  );
};

