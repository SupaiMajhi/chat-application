

import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { toast } from "react-toastify";


//useAuthStore imports
import useAuthStore from "../store/useAuthStore.js";
const Signup = () => {

  const navigate = useNavigate();
  const [isPassword, setIsPassword] = useState('password');
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: ""
  });
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSignup = useAuthStore((state) => state.handleSignup);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSigningUp(true);
    const data = await handleSignup(form.email, form.username, form.password)
    if(data.error) {
      toast.error(data.error, {
        position: "top-right",
      });
    }
    else {
      toast.success(data.message, {
        position: "top-right",
      });
      navigate('/');
    }
    setIsSigningUp(false);
  }

  
  return (
    <div className="w-screen h-screen bg-ghostwhite flex flex-col justify-center items-center">
      <img src={logo} alt="logo" className="w-[6rem] mb-10" />
      <h1 className="text-[1.2rem] text-onyx font-medium mb-1">Register</h1>
      <h2 className="text-[0.9rem] font-[400] text-lightslategray mb-5">
        Get your Chatvia account now.
      </h2>
      <form onSubmit={handleSubmit} className="w-[350px] min-h-[300px] bg-white flex flex-col p-4 rounded-md mb-5 ">
      <label htmlFor="email" className="label">
          Email
        </label>
        <div className="relative w-full h-[35px] mb-4">
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value})}
            name="email"
            placeholder="Enter email"
            className="input-field"
          />
        </div>
        <label htmlFor="username" className="label">
          Username
        </label>
        <div className="relative w-full h-[35px] mb-4">
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value})}
            placeholder="Enter email"
            className="input-field"
          />
        </div>
        <label htmlFor="password" className="label">
          Password
        </label>
        <div className="relative w-full h-[35px] mb-4">
          <input
            type={isPassword}
            id="password"
            name="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value})}
            placeholder="Enter password"
            className="input-field"
          />
          {isPassword === "password" ? (
            <FontAwesomeIcon
              icon={faEye}
              className="absolute right-2 top-[30%] cursor-pointer text-[0.8rem]"
              onClick={() => setIsPassword("text")}
            />
          ) : (
            <FontAwesomeIcon
              icon={faEyeSlash}
              className="absolute right-2 top-[30%] cursor-pointer text-[0.8rem]"
              onClick={() => setIsPassword("password")}
            />
          )}
        </div>
        <button type="submit" className="btnPrimary" disabled={isSigningUp}>{ isSigningUp ? <span className="loading loading-spinner loading-sm"></span> : "Register" }</button>
      </form>
      <p className="text-[0.9rem] font-[400] text-davyGray mb-3">Already have an account ? <Link to={"/login"} className="text-mediumslateblue">Login</Link></p>
      <p className="text-[0.9rem] text-davyGray font-[400]">
        © 2025 Chatvia. Crafted by Themesbrand
      </p>
    </div>
  );
};

export default Signup;
