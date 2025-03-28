


import messenger from "../assets/messenger.png";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
//useAuthStore imports
import useAuthStore from "../store/useAuthStore.js";

const Sidebar = () => {
    
  const handleLogout = useAuthStore((state) => state.handleLogout);

  return (
    <div className='basis-[70px] flex flex-col justify-between items-center p-2 bg-white'>
        <NavLink to={'/'} className="w-[30px] my-4"><img src={messenger} alt="logo" /></NavLink>
        <div className="flex flex-col justify-center items-center">
          <ul>
              <li><FontAwesomeIcon icon={faGear} /></li>
              <li onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} /></li>
          </ul>
          <div className="avatar">
            <div className="w-[50px] rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Sidebar