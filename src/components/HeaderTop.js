import React, { useEffect,useState } from "react";
import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from "react-icons/bs";

const HeaderTop = () => {
  return (
    <div className="border-bottom border-gray-200 d-none d-sm-block">
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-none d-lg-flex gap-4 align-items-center">
            {/* Facebook Icon */}
            <div className="header-top-icon">
              <a
                href="https://www.facebook.com/hafsa.bloch111113?mibextid=hIlR13"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsFacebook size={24} />
              </a>
            </div>
            {/* Instagram Icon */}
            <div className="header-top-icon">
              <a
                href="https://www.instagram.com/umm_e_hafsa___?igshid=YzVkODRmOTdmMw=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsInstagram size={24} />
              </a>
            </div>
            {/* Twitter Icon */}
            <div className="header-top-icon">
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsTwitter size={24} />
              </a>
            </div>
            {/* LinkedIn Icon */}
            <div className="header-top-icon">
              <a
                href="https://www.linkedin.com/in/umm-e-hafsa-79918020a/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Logout Button */}
          <button type="button" className="btn btn-danger">
            <a href="/Login" style={{ color: "white" }}>
              Logout
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
