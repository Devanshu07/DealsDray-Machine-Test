import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

const DashBord = () => {
	let [name, setname] = useState("");
	let ID = useParams();

	useEffect(() => {
		axios
			.get(`http://localhost:4001/user/${ID.ID}`)
			.then((e) => {
				setname(e.data);
			})
			.catch(() => {
				console.log("unable to fetch data in Edit comp");
			});
	}, []);

	return (
		<div className="bg-lime-200 w-screen h-screen">
			{/* <h1 className="bg-yellow-200 p-4">DashBord-Section</h1> */}
			<p className="bg-lime-500 text-stone-800 font-eczar text-center font-bold text-4xl p-5">Welcome To Admin Panel</p>
			<div id="navbar" className="bg-lime-300 p-5">
				<ul className="text-stone-800 font-eczar flex gap-24 justify-center">
					<li><b>HOME</b></li>
					<li>
						<Button variant="text">
							<Link to="/create-employee"><b className="text-stone-800 font-eczar text-teal-700 text-bold">Create Employee</b></Link>
						</Button>{" "}
					</li>
					<li>
						<Button variant="text">
							<Link to="/employee-list"> <b className="text-stone-800 font-eczar text-teal-700 text-bold">Employee list</b> </Link>
						</Button>{" "}
					</li>
					<li className="p-2 text-stone-800 font-bold border-red-400 ">Welcome {name}</li>
					<li><Button variant="text">
							<Link to="/"><b className="text-stone-800 font-eczar text-teal-700 text-bold">LogOut</b></Link>
						</Button>{" "}</li>
				</ul>
			</div>
		</div>
	);
};

export default DashBord;
