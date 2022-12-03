import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/Context";
// import { Outlet } from 'react-router-dom'
import Header from "./Header";

const Portal = () => {

  const {loginData,setLoginData} = useContext(LoginContext);
  const navigate = useNavigate();

  const logoutUser = () => {
     localStorage.removeItem("AuthToken");
     navigate("/")
  }

  const dashboardValid = async()=>{
    let token = localStorage.getItem("AuthToken");
    const user = await axios.get("http://localhost:3003/users/validUser",{
      headers : {
        "Authorization" : token
      }
    })

    setLoginData(user.data);
    // console.log(user.data);
  }

  useEffect(() => {
     dashboardValid();
  },[])

  return (
    <div>
      <Header logoutUser={logoutUser}/>
      <div className="dash-container">
        <img
          className="profile-pic"
          src="https://w1.pngwing.com/pngs/743/500/png-transparent-circle-silhouette-logo-user-user-profile-green-facial-expression-nose-cartoon.png"
          alt="profile-img"
        />
        <h1>Email : {loginData.email}</h1>
      </div>
    </div>
  );
};

export default Portal;
