
import { useState } from "react";

//userStore imports
import useUserStore from "../store/useUserStore.js";
import useChatStore from "../store/useChatStore.js";

const Friend = ({ f, id }) => {
  console.log("friend");
  
  const getSelectedUserInfo = useUserStore((state) => state.getSelectedUserInfo);
  const fetchMessage = useChatStore((state) => state.fetchMessage);
  const [isFetchingMessages, setIsFetchingMessages] = useState(false);
  

  const handleFetchMessage = async (id) => {
    setIsFetchingMessages(true);
    getSelectedUserInfo(id);
    fetchMessage(id);
    setIsFetchingMessages(false);
  }

  
  return (
    <div className="w-full h-[90px] flex items-center gap-4 rounded-md py-3 px-2 cursor-pointer hover:bg-lightbluegray" onClick={() => handleFetchMessage(id)}>
      <div className="avatar">
        <div className="w-14 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div className="w-[150px] h-full flex flex-col">
          <h1 className='text-[1.1rem] font-semibold text-onyx'>{f.username}</h1>
          <p className="text-[1rem] font-[400] text-lightslategray">heyy, how are you?</p>
      </div>
      <div className='h-full flex flex-col items-end'>
        <p className="text-[1rem] font-[400] text-lightslategray">1.30</p>
      </div>
    </div>
  )
}

export default Friend;