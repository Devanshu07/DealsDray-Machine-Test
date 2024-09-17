import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";

const Login = () => {
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");
	let navigate = useNavigate();

	let login = () => {
		let payload = { email, password };
		axios.post("http://localhost:4001/login", payload).then((e) => {
			if (e.data.status === "success") {
				navigate(`/dashbord/${e.data.id}`);
			} else if (e.data.status === "fail") {
				alert("wrong password");
			} else if (e.data.status === "noUser") {
				alert("Invalid Email");
			}
		});
	};

	return (
		<div className="bg-lime-200 w-screen h-screen">
		<p className="text-stone-800 font-eczar font-bold text-4xl p-5">LOGO HERE</p>

			<h1 className="text-center font-eczar font-bold text-3xl my-3">Login Form</h1>
			<div className="bg-amber-200 border-4 border-blue-900 rounded-3xl max-w-[380px]  h-[442px] mx-auto my-5 p-10">
				<input
					className="bg-lime-200 font-eczar border-2 border-violet-400 text-xl text-black my-3 p-1 placeholder-black"
					placeholder="Enter Email"
					type="text"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<br />
				<input
					className="bg-lime-200 font-eczar border-2 border-violet-400 text-xl text-black my-3 p-1 placeholder-black"
					placeholder="Enter Password"
					type="text"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<button className="bg-lime-400 font-eczar rounded-lg m-3 p-2 font-bold mt-10 mb-10 ml-24" onClick={login}>
					LOGIN
				</button>
				<br />
				<p className="font-eczar font-semibold text-rose-600 mb-4">
					Don't have Account?{" "}
				</p>
				<Button variant="outlined">
					<Link to="/register"><b className="text-teal-900 font-eczar text-teal-700 text-bold">Sign Up</b></Link>
				</Button>{" "}
			</div>
			
		</div>
	);
};

export default Login;
