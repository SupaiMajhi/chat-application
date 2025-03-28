 

import Sidebar from "../components/Sidebar";
import FriendList from "../components/FriendList";
import MessageFeed from "../components/MessageFeed";
import { useEffect, useState } from "react";

//userStore imports
import useUserStore from "../store/useUserStore.js";
import useChatStore from "../store/useChatStore.js";

const Dashboard = () => {
  console.log("dashboard");

  const selectedUser = useUserStore((state) => state.selectedUser);
  const receiverId = useUserStore((state) => state.receiverId);
  const addMessage = useChatStore((state) => state.addMessage);
  
  const[socket, setSocket] = useState(null);


  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/${receiverId}`);

    ws.onopen = () => {
      console.log("a new client is connected");
      setSocket(ws);
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data.message);
      if(data.type === "newMessage") {
        addMessage(data.message);
      }
      else {
        console.log("some error in onmessage");
      }
    }

    ws.onclose = () => {
      console.log("a client is disconnected");
    }
    
    return () => {
      ws.close();
    };
  }, [receiverId]);


  return (
    <div className='w-screen h-screen bg-white flex text-onyx'>
      <Sidebar />
      <FriendList />
      { selectedUser?.selectedUser ? <MessageFeed socket={socket} /> : <></> }
    </div>
)
}

export default Dashboard