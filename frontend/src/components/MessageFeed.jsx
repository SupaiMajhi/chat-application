import { useState } from "react";

//icon imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faPhone } from "@fortawesome/free-solid-svg-icons";

//userStore imports
import useUserStore from "../store/useUserStore.js";
import useChatStore from "../store/useChatStore.js";

const MessageFeed = ({ isFetchingMessages, socket }) => {
  console.log("messageFeed");
  
  const [text, setText] = useState("");
  const selectedUser = useUserStore((state) => state.selectedUser);
  const messages = useChatStore((state) => state.messages);
  const receiverId = useUserStore((state) => state.receiverId);
  const sendMessage = useChatStore((state) => state.sendMessage);



  const handleSendMessage = async () => {
    try {
      await sendMessage(receiverId, text);
      socket.send(text);
      setText('');
    } catch (error) {
      return console.log(error.message);
    }
  };

  if (isFetchingMessages) {
    return (
      <div className="w-screen h-screen flex flex-col space-x-4 px-3 py-5">
        <div className="chat chat-start">
          <div className="space-y-2">
            <div className="skeleton h-4 w-[250px] bg-lightslategray"></div>
            <div className="skeleton h-4 w-[200px] bg-lightslategray"></div>
          </div>
        </div>
        <div className="chat chat-end">
          <div className="space-y-2">
            <div className="skeleton h-4 w-[250px] bg-lightslategray"></div>
            <div className="skeleton h-4 w-[200px] bg-lightslategray"></div>
          </div>
        </div>
        <div className="chat chat-start">
          <div className="space-y-2">
            <div className="skeleton h-4 w-[250px] bg-lightslategray"></div>
            <div className="skeleton h-4 w-[200px] bg-lightslategray"></div>
          </div>
        </div>
        <div className="chat chat-end">
          <div className="space-y-2">
            <div className="skeleton h-4 w-[250px] bg-lightslategray"></div>
            <div className="skeleton h-4 w-[200px] bg-lightslategray"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="basis-[1100px]">
      <div>
        <div className="navbar bg-ghostwhite shadow-sm px-3">
          <div className="flex-1 gap-2">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <h1 className='text-[1.1rem] font-semibold text-onyx'>{selectedUser.selectedUser.username}</h1>
          </div>
          <div className="flex-none">
            <ul className="flex gap-7 items-center justify-center">
              <li className="btn btn-circle bg-white"><FontAwesomeIcon icon={faVideo} /></li>
              <li className="btn btn-circle bg-white"><FontAwesomeIcon icon={faPhone} /></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full h-[530px] py-3 px-5 overflow-y-auto">
        { messages.length > 0 ? 
          <div>
            {messages.map((m) => {
              if (m.receiverId === receiverId) {
                return (
                  <div className="chat chat-end" key={m._id}>
                    <div className="chat-bubble bg-ghostwhite text-onyx">
                      {m.content}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="chat chat-start" key={m._id}>
                    <div className="chat-bubble bg-mediumslateblue text-white">
                      {m.content}
                    </div>
                  </div>
                );
              }
            })}
          </div> 
          : 
          <div className="w-full h-full flex justify-center items-center text-[1.1rem] text-onyx font-[500]">No conversation yet...</div>
        }
      </div>
      <div className="fixed bottom-0 flex justify-even gap-2 w-full h-[70px] p-3 my-3 bg-ghostwhite">
        <input
          type="text"
          placeholder="Enter message..."
          className="lg:w-[500px] bg-white text-[0.9rem] font-[500] px-3 py-2 rounded-md outline-0 border border-lightslategray placeholder:text-onyx"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="w-[100px] h-full bg-mediumslateblue text-white rounded-md p-2 text-center text-[1.2rem] font-[400] outline-0"
          onClick={() => handleSendMessage(receiverId, text)}
        >
          send
        </button>
      </div>
    </div>
  );
};

export default MessageFeed;
