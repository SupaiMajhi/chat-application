
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import useAuthStore from "../store/useAuthStore.js";

const Login = () => {

  const [isPassword, setIsPassword] = useState('password');
  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const [isloggingIn, setIsloggingIn] = useState(false);
  const loggedIn = useAuthStore((state) => state.loggedIn);
  const isloggedOut = useAuthStore((state) => state.isloggedOut);
  const handleLogin = useAuthStore((state) => state.handleLogin);

  console.log(loggedIn);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloggingIn(true);
    await handleLogin(form.username, form.password);
    setIsloggingIn(false);
  }


  return (
    <div className="w-screen h-screen bg-ghostwhite flex flex-col justify-center items-center">
      <img src={logo} alt="logo" className="w-[6rem] mb-10"/>
      <h1 className="text-[1.2rem] text-onyx font-medium mb-1">Login</h1>
      <h2 className="text-[0.9rem] font-[400] text-lightslategray mb-5">Sign in to continue to Chatvia.</h2>
      <form onSubmit={handleSubmit} className="w-[350px] min-h-[300px] bg-white flex flex-col p-4 rounded-md mb-5 ">
        <label htmlFor="username" className="label">Username</label>
        <div className="relative w-full h-[35px] mb-4">
          <input type="text" id="username" value={form.username} name="username" placeholder="Enter email" className="input-field" onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value})} />
        </div>
        <label htmlFor="password" className="label">Password</label>
        <div className="relative w-full h-[35px] mb-4">
          <input type={isPassword} id="password" value={form.password} name="password" placeholder="Enter password" className="input-field" onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
          { isPassword === 'password' ? <FontAwesomeIcon icon={faEye} className="absolute right-2 top-[30%] cursor-pointer text-[0.8rem]" onClick={() => setIsPassword('text')} /> : <FontAwesomeIcon icon={faEyeSlash} className="absolute right-2 top-[30%] cursor-pointer text-[0.8rem]" onClick={() => setIsPassword('password')} /> }
        </div>
        <p className="text-lightslategray font-[400] text-[0.7rem] text-right mb-4"><Link>Forgot password?</Link></p>
        <button 
          type="submit" 
          className="btnPrimary" 
          disabled={isloggingIn}
        >
          { isloggingIn ? <span className="loading loading-spinner loading-sm"></span> : "Login" }
        </button>
      </form>
      <p className="text-[0.9rem] font-[400] text-davyGray mb-3">Don't have an account ? <Link to={'/signup'} className="text-mediumslateblue">Signup now</Link></p>
      <p className="text-[0.9rem] text-davyGray font-[400]">© 2025 Chatvia. Crafted by Themesbrand</p>
    </div>
  )
}

export default Login