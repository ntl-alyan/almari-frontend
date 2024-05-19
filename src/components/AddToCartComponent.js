
import React, {  useState,useEffect } from 'react';
import Image from 'next/image';
import PrimaryModal from '../components/productDetailModal';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { almariService } from '../../services/customer';
import Router from "next/router";
import { useQueryClient } from "react-query";
import Link from 'next/link';

const initialState = {
  ID:'',
  TITLE: '',
  IMAGE: '',
  PRICE: '',
  DESCRIPTION: '',
};

export default function AddToCartComponent({ data }) {
  
  const queryClient = useQueryClient();
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [showReceiptModal, setShowReceiptlModal] = useState(false);
  const [productDetails, setProductDetails] = useState(initialState);
  const [types, setTypes] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const viewProductDetails = (id, title, description, price, image) => {
    setProductDetailModal(true);
    setProductDetails({
      ID:id,
      TITLE: title,
      IMAGE: image,
      PRICE: price,
      DESCRIPTION: description,
    });
  };

  const handleCloseModal = () => {
    setProductDetailModal(false);
  };

  const handleCloseRecieptModal = () => {
    setShowReceiptlModal(false);
  };

  const removeFromCart = async () => {
  {
    try{
      const deleteRes=await almariService.deleteFromCart(+productDetails.ID);
      if(deleteRes)
      {
        if(deleteRes.status==="SUCCESS"){
          toast.success(deleteRes.message);
          queryClient.invalidateQueries(['cart-data'])
          handleCloseModal(false);
        }
        else{
          toast.error(deleteRes.message)
        }
      }
    }
    catch(error)
    {
      console.log(error)
    }
  }
  }

  const placeOrder = async () => {
    toast.success("Order Has Been Placed Successfully.");
    setShowReceiptlModal(false);
  };

  useEffect(() => {
    if(data.length>0)
    {
      calculateTotalAmount();
    }
		
	}, [data]);


  const calculateTotalAmount = async () => {
    let amount = 0;
    if(data.length>0)
    {
      
      for (let i = 0; i < data.length; i++) {
        const priceWithoutCommas = data[i]['PRICE'].replace(/,/g, '');
        amount+=parseFloat(priceWithoutCommas)
    
      }
    }
    setTotalAmount(amount);
  }

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setTypes((prevTypes) =>
        event.target.checked
            ? [...prevTypes, category]
            : prevTypes.filter((type) => type !== category)
    );
};

  const handleShowReceipt = () => {
    setShowReceiptlModal(true);
  };

  const handleMatching =  () =>{
    try{
      if(types.length===0)
        {
          return toast.error("Please Select A Type First");
        }
      Router.push(`/MatchingItems?image_url=${productDetails.IMAGE}&type=${types}`)
    }
    catch(error)
    {
      console.log(error)
    }
  }
  
  return (
    <>
    {data.length > 0 ? (
      <div>
        <div className="card-container">
          {data.map((item, index) => (
            <div key={index} className="card">
              <div className="image-container">
                <Image src={item.IMAGE} alt={item.TITLE} width={200} height={200} />
              </div>
              <h4 className="item-price">Price: PKR {item.PRICE}</h4>
              
              <button
                className="view-item-button"
                onClick={() => viewProductDetails(item.ID, item.TITLE, item.DESCRIPTION, item.PRICE, item.IMAGE)}
              >
                View Item
              </button>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-info ml-2 mb-2 mr-3 flex-right" onClick={handleShowReceipt}>
                <a href="#" style={{ color: "white" , fontSize: 22}}>
                  Proceed To The Receipt
                </a>
              </button>
          </div>
        </div>
        
      ) : (
        <div>
        <div className="d-flex justify-content-center mb-5">
          <h4 className='text-danger'>
            No Items In Cart Found
          </h4>
        </div>

        <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-info mb-3 mr-3 flex-right">
            <Link href="/Home" style={{ color: "white" }}>
              Back to Home Page
            </Link>
          </button>
        </div>
        </div>
      )}

      {/* Display total amount */}
  

      <PrimaryModal isOpenProp={productDetailModal}>
        <section className="w-screen">
          <div className="m-5 mx-auto max-w-screen-lg rounded-md border border-gray-100 text-gray-600 ">
            <div className="relative flex h-full flex-col text-gray-600 md:flex-row">
             

              <div className="mx-auto flex items-center px-5 pt-1 md:p-8">
                <Image src={productDetails.IMAGE} alt="prodcutImage" width={400} height={400} />
              </div>
              <div className="relative p-8 md:w-4/6">
                <div className="flex flex-col mt-5 md:flex-row">
                  <h2 className="mb-2 text-2xl font-black">{productDetails.TITLE}</h2>
                </div>
                <div className="description-wrapper">
                  <p className="font-sans text-base tracking-normal">{productDetails.DESCRIPTION}</p>
                </div>
                <div className="flex flex-col md:flex-row md:items-end">
                  <p className="mt-6 text-4xl font-black">
                    PKR. {productDetails.PRICE}
                  </p>
                </div>
                <div className="description-wrapper mt-4 p-3 border rounded bg-light">
                <p className="font-sans text-2xl tracking-normal mb-3">Find Matching Items By:</p>
                  <div className="row g-3">
                      {["Shoes", "Lawn", "Suit", "Trousers"].map((category) => (
                          <div className="col-sm-6 col-md-4 col-lg-3" key={category}>
                              <div className="form-check">
                                  <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="CATEGORY"
                                      id={`${category.toLowerCase()}Radio`}
                                      value={category}
                                      onChange={handleCategoryChange}
                                  />
                                  <label className="form-check-label" htmlFor={`${category.toLowerCase()}Radio`}>
                                      {category}
                                  </label>
                              </div>
                          </div>
                      ))}
                  </div>
                  <button onClick={handleMatching} className="btn btn-primary mt-3">
                      Find Matching Items
                  </button>
              </div>
                
                <div className="mt-8 flex flex-col sm:flex-row">
                <button
                  type="button"
                    onClick={removeFromCart}
                    className="btn btn-danger "
                  >
                    Remove From Cart
                  </button>

                  <button
                  type='button'
                    onClick={handleCloseModal}
                    className="btn btn-light ml-2 btn-outline-dark"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PrimaryModal>

      <PrimaryModal isOpenProp={showReceiptModal}>
      <div className="container">
      <div className="bg-secondary w-100 py-3 mb-4">
        <h3 className="text-white font-weight-bold text-center">
          Receipt
        </h3>
      </div>
        <div className="row ml-2">
          {data.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title item-title">{item.TITLE}</h5>
                  <p className="card-text item-price font-weight-bold">Price: PKR {item.PRICE}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row ml-2">
          <h5>Total Amount: PKR. {totalAmount}</h5>
        </div>

        <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-light ml-2 mb-2 btn-outline-dark" onClick={handleCloseRecieptModal}>
            <a href="#" style={{ color: "black" , fontSize: 18}}>
             Cancel
            </a>
          </button>
        <button type="button" className="btn btn-success ml-2 mb-2 mr-3 flex-right" onClick={placeOrder}>
            <a href="#" style={{ color: "white" , fontSize: 18}}>
              Place Order
            </a>
          </button>
      </div>
      </div>
      </PrimaryModal>

      <style jsx>{`
        .description-wrapper {
          max-height: 150px; /* Set a maximum height for the description */
          overflow: wrap;
        }
        /* Add ellipsis for overflow text if needed */
        .description-wrapper p {
          text-overflow: ellipsis;
          white-space: wrap;
          overflow: hidden;
        }

        .card-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .card {
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 20px;
          margin: 20px;
          width: 250px;
          height: 300px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
          transition: 0.3s;
        }
        .card:hover {
          box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
          transform: scale(1.05);
        }
        .image-container {
          width: 100%;
          height: 200px;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          overflow: hidden;
        }
        .item-price {
          margin-top: 15px;
          font-size: 1.2rem;
          color: #333;
        }
        .view-item-button {
          margin-top: 10px;
          width: 100%;
          padding: 12px 0;
          background-color: #10b981;
          color: #ffffff;
          border: none;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.3s;
        }
        .view-item-button:hover {
          background-color: #059669;
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}
