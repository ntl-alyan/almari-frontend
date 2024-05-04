// components/CardComponent.js
import React, { useState } from 'react';
import Image from 'next/image';
import PrimaryModal from '../components/productDetailModal';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { almariService } from '../../services/customer';
import  Router  from "next/router";
import { useQueryClient } from "react-query";

const initialState=
	{
		TITLE:"",
		IMAGE:"",
		PRICE:"",
		DESCRIPTION:""
	}

export default function CardComponent({ data }) {
  const queryClient = useQueryClient();
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails,setProductDetails]=useState(initialState);
  

  const viewProductDetails = (title, description, price, image) => {
	setProductDetailModal(true);
	setProductDetails(
		{
			TITLE:title,
			IMAGE:image,
			PRICE:price,
			DESCRIPTION:description
			
		})
	
  };
  const handleCloseModal = () => 
  {
  	setProductDetailModal(false);
  }

  const handleAddToCart = async () => 
  {
    const username=Cookies.get('user');
    if(!username)
    {
      Router.push(`/Login`)
    }
    const payload={
      TITLE:productDetails?.TITLE,
      PRICE:productDetails?.PRICE,
      IMAGE:productDetails?.IMAGE,
      ITEMLINK:productDetails?.ITEMLINK,
      DESCRIPTION:productDetails?.DESCRIPTION,
      SKUCODE:productDetails?.SKUCODE,
      USERNAME:username
    }

    const response = await almariService.addToCart(payload);

    if(response)
    {
      if(response.status==="SUCCESS"){
        toast.success("Added to cart");
        setProductDetailModal(false);
        queryClient.invalidateQueries(['cart-data'])
        return;
      }
      else{
        toast.error("Something went wrong");
        return;
      }
    }
  }

  return (
	<>
	  <div className="card-container">
  {data.map((item, index) => (
    <div key={index} className="card">
      <div className="image-container">
        <Image src={item.image} alt={item.title} width={200} height={200} />
      </div>
      <h4 className="item-price">Price: PKR {item.price}</h4>
      
      <button type="button" className="btn btn-success"
        onClick={() => viewProductDetails(item.title, item.description, item.price, item.image)}
      >View Item</button>
    </div>
  ))}
  
</div>
<style jsx>{`
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
  .item-title {
    margin-top: 15px;
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }
  .item-description {
    margin-top: 10px;
    font-size: 1rem;
    color: #555;
    height: 60px;
    overflow: hidden;
  }
  .item-price {
    margin-top: 10px;
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

	<PrimaryModal isOpenProp={productDetailModal}>
  <section className="w-screen">
	<div className="m-5 mx-auto max-w-screen-lg rounded-md border border-gray-100 text-gray-600 ">
	  <div className="relative flex h-full flex-col text-gray-600 md:flex-row">

		<div className="mx-auto flex items-center px-5 pt-1 md:p-8">
		  <Image src={productDetails.IMAGE} alt={"prodcutImage"} width={400} height={400} />
		</div>
		<div className="relative p-8 md:w-4/6">
		  <div className="flex flex-col mt-5 md:flex-row">
			<h2 className="mb-2 text-2xl font-black">{productDetails.TITLE}</h2>
			{/* <span className="ml-2 text-xs uppercase">Tailwind</span> */}
		  </div>
		  <div className="description-wrapper">
			<p className="font-sans text-base tracking-normal">{productDetails.DESCRIPTION}</p>
		  </div>
		  <div className="flex flex-col md:flex-row md:items-end">
			<p className="mt-6 text-4xl font-black">PKR. {productDetails.PRICE}<sup className="align-super text-sm">00</sup></p>
			{/* <span className="ml-2 text-xs uppercase">258 Sales</span> */}
		  </div>
		  <div className="mt-8 flex flex-col sm:flex-row">
			<button onClick={handleAddToCart} className="mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md bg-emerald-400 py-2 px-8 text-center text-white transition duration-150 ease-in-out hover:translate-y-1 hover:bg-emerald-500">
			  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
			  </svg>
			  Buy now
			</button>
			<button onClick={handleCloseModal} className="mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md border py-2 px-8 text-center text-gray-500 transition duration-150 ease-in-out hover:translate-y-1 hover:bg-rose-500 hover:text-white">Close</button>
		  </div>
		</div>
	  </div>
	</div>
  </section>
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
`}</style>
	</>
  );
}
