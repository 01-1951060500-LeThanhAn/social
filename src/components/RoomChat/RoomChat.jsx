import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfile } from "../../storeActions";
import { fetchmessages, postMessages } from "../../storeActions/message";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Timestamp } from "firebase/firestore";

import { useUserAuth } from "../../AuthContext/userAuthContext";
import { toast } from "react-toastify";
import RightChat from "./RightChat";
import LeftChat from "./LeftChat";
const RoomChat = () => {
  const [info, setInfo] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { user } = useUserAuth();

  const handlePostMessages = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    if (newMessages.length === 0) {
      return toast.warning("Vui lòng điền bình luận");
    }

    const res = await postMessages({
      id: id,
      userId: user.uid,
      userName: user.displayName,
      avatar: user.photoURL,
      caption: newMessages,
      createAt: Timestamp.now(),
    });

    setMessages([...messages, res]);
    setLoading(false);
    setNewMessages("");
  };

  useEffect(() => {
    async function fetchProfile() {
      const data = await getProfile(id);

      setInfo(data);
    }

    fetchProfile(id);
  }, [id]);

  useEffect(() => {
    async function getMessages() {
      const mess = await fetchmessages(id);

      setMessages(mess);
    }

    getMessages(id);
  }, [id]);
  console.log(messages);

  return (
    <>
      <div className="py-2 px-4">
        <div className="flex items-center">
          <Link to="/home">
            <div className="pr-3">
              <AiOutlineArrowLeft />
            </div>
          </Link>
          <div className="flex items-center">
            <img
              className="w-12 h-12 rounded-full"
              src={info.photoURL}
              alt=""
            />
            <p className="pl-3">{info.displayName}</p>
          </div>
        </div>
      </div>

      {!loading
        ? messages.map((message) =>
            message.userId === user?.uid ? (
              <RightChat key={message.id} mess={message} />
            ) : (
              <LeftChat key={message.id} mess={message} />
            )
          )
        : null}
      <div className="fixed mx-2 flex justify-start items-center bottom-3 right-0 left-0 w-9/10 border-2 h-12">
        <input
        className="h-full w-full pl-2 relative outline-none"
          onChange={(e) => setNewMessages(e.target.value)}
          type="text"
          placeholder="Enter message"
        />
        <button className="absolute w-12 text-white bg-red-500 right-0 top-0 bottom-0" onClick={handlePostMessages}>Add</button>
      </div>
    </>
  );
};

export default RoomChat;
