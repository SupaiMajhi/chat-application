

import { useEffect, useState } from 'react';
import Friend from './Friend';
import { getUsers } from '../lib/lib.js';

const FriendList = ({ setIsFetchingMessages, setMessages, setReceiverId }) => {

  const [friends, setFriends] = useState([]);

  console.log("friendList");

  useEffect(() => {
    const fetchingUser = async () => {
      const data = await getUsers();
      setFriends(data.users);
    }
    fetchingUser();
  }, []);

  return (
    <div className="w-[350px] h-full p-5 bg-ghostwhite">
        <h1 className="text-[1.2rem] text-onyx font-medium mb-1">Chats</h1>
        <div className="w-full h-[40px] mb-3">
            <input type="text" className='w-full h-full bg-lightbluegray text-[0.9rem] font-medium px-10 rounded-md outline-none border-none ' placeholder='Search messages or users' />
        </div>
        <h1 className="text-[1.2rem] text-onyx font-medium mb-[100px]">Users online</h1>
        <h1 className="text-[1rem] text-onyx font-semibold mb-4">Recent</h1>
        <div className="w-full h-[400px] flex flex-col overflow-y-auto">
          {friends.map((f) => (
            <Friend key={f._id} f={f} id={f._id} setIsFetchingMessages={setIsFetchingMessages} setReceiverId={setReceiverId} />
          ))}
        </div>
    </div>
  )
}

export default FriendList