import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { almariService } from '../../services/customer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../src/app/layout';
import CardComponent from '../../src/components/CardComponent';
import AddToCartComponent from '../../src/components/AddToCartComponent'
import Router  from 'next/router';
import { useCartData } from '../../src/helpers/react-query';

const CartItems = () => {

	const user=Cookies.get('user');
	const [cartItems,setCartItems]=useState([]);
	const { data: activeCartData } = useCartData(user);

	useEffect(() => {
		import('bootstrap/dist/css/bootstrap.min.css');
		import('bootstrap/dist/js/bootstrap.bundle.min.js').then(() => {
		});
	}, []);
	
	useEffect(() => {
		if (activeCartData) {
      		setCartItems(activeCartData.data);
		}
	}, [ activeCartData]);

	return (
		<Layout>
			<div>
				<AddToCartComponent data={cartItems} />
			</div>
		</Layout>
	);
};

export default CartItems;