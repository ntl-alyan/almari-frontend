import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { almariService } from '../../services/customer';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';



const initialState={
	EMAIL:"",
	PASSWORD:""
}
const LoginPage = () => {

	const [loginState,setLoginState]=useState(initialState);
	useEffect(() => {
		const username=Cookies.get('user');
		if(username){
			Cookies.remove('user');
		}
	}, []);
	
	const handleRegistration = () => 
	{
		window.location.href = 'http://localhost:3000/Signup';
	};
	
	const handleLogin = () => 
	{
		window.location.href = 'http://localhost:3000/Home';
	};
	
	const handleInputChange =(event)=>
	{
		setLoginState({
			...loginState,
			[event.target.name]: event.target.value,
		  });
	}

	const checkLogin = async ()=>
	{
		if(loginState.EMAIL==="" || loginState.PASSWORD===""){
			toast.error("Please fill all the fields");
			return;
		}

		const payload={
			EMAIL:loginState.EMAIL,
			PASSWORD:loginState.PASSWORD,
		}

		const response=await almariService.loginCustomer(payload);
		if(response)
		{
			if(response.status==="SUCCESS"){
				toast.success("Login Successfull");
				Cookies.set("user", loginState.EMAIL, { expires: 1 / 24 }); // Expires in 1 hour
				handleLogin();
			  }
			  else{
				toast.error("Invalid Credentials")
			  }
		}
		else{
			toast.error("Login Failed")
		}
	}

	return (
	
		
		<div className="container py-5 border mt-5" style={{boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.3)"}}>
		<div className="row justify-content-center">
			<div className="col-lg-8 shadow">
				<div className="card border-0 rounded-lg">
					<div className="row">
						<div className="col-lg-6 d-flex align-items-center justify-content-center text-white shadow" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/LoginImage.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
							<div className="p-5">
								<h2 className="display-4 mb-4" style={{ fontSize: '2.5rem' }}>Welcome Back!</h2>
								<p className="lead" style={{ fontSize: '1.25rem' }}>Log in to access your account.</p>
							</div>
						</div>
	
						<div className="col-lg-6 shadow-lg">
							<div className="card-body p-4 p-lg-5">
								<form>
									<h3 className="text-center mb-4">Login</h3>
									<div className="form-group mb-4 ">
										<label htmlFor="email" className="form-label">Email</label>
										<input
											type="email"
											id="email"
											className="form-control"
											onChange={handleInputChange}
											name="EMAIL"
											value={loginState.EMAIL}
											placeholder="Enter your email"
											required
										/>
									</div>
									<div className="form-group mb-4">
										<label htmlFor="password" className="form-label">Password</label>
										<input
											type="password"
											id="password"
											className="form-control"
											onChange={handleInputChange}
											name="PASSWORD"
											value={loginState.PASSWORD}
											placeholder="Enter your password"
											required
										/>
									</div>
									<div className="d-flex justify-content-right mt-2">
										<button type="button" className="btn btn-primary" onClick={checkLogin}>Login</button>
									</div>
									<div className="text-center mt-4">
										<a href="#" className="text-muted">Forgot password?</a>
									</div>
									<p className="text-center mt-3 mb-0">{"Don't have an account?"} <br></br> <Link href="/Signup" onClick={handleRegistration}>Register here</Link></p>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	);
};

export default LoginPage;
