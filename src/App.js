import './App.css'
import Login from "./components/Login";
import Register from "./components/Register";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Navigate, Route, Routes } from "react-router-dom";
import Portal from "./components/Portal";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import { LoginContext } from './context/Context';
import { useContext, useEffect } from 'react';
import axios from 'axios';

function App() {

	const { loginData, setLoginData } = useContext(LoginContext);

	useEffect(() => {
		const getUser = () => {
		  fetch("http://localhost:3003/auth/login/success", {
			method: "GET",
			credentials: "include",
			headers: {
			  Accept: "application/json",
			  "Content-Type": "application/json",
			  "Access-Control-Allow-Credentials": true,
			},
		  })
			.then((response) => {
			  if (response.status === 200) return response.json();
			  throw new Error("authentication has been failed!");
			})
			.then((resObject) => {
			  setLoginData(resObject.user)
			})
			.catch((err) => {
			  console.log(err);
			});
		};
		getUser();
	  }, []);

	return (
		<div className="container">
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/user" element={<Portal />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/reset-password/:id/:token" element={<PasswordReset />} />
			</Routes>
		</div>
		
	);
}

export default App;
