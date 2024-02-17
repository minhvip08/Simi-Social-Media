import { Avatar, Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import WestIcon from "@mui/icons-material/West";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PhotoIcon from "@mui/icons-material/Photo";
import SearchUser from "../../components/SearchUser/SearchUser";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChats } from "../../Redux/Message/message.action";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { uploadToCloudniry } from "../../utils/uploadToCloudniry";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Messages = () => {
  const [loading, setLoading] = useState(false);

  const { message, auth } = useSelector((state) => state);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectImage = async (e) => {
    setLoading(true);
    console.log("Select Image");
    const imageUrl = await uploadToCloudniry(e.target.files[0], "image");
    setSelectedImage(imageUrl);
    setLoading(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllChats());
  }, [ ]);

  console.log("Chats ", message.chats);
  const handleCreateMessage = (value) => {
    const message = {
      chatId: currentChat.id,
      content: value,
      image: selectedImage,
    };
    dispatch(createMessage(message));
  };

  useEffect(() => {
    setMessages([...messages, message.message]);}
  , [message.message]);

  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden">
        <Grid className="px-5" item xs={3}>
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              <div className="flex space-x-4 items-center py-5">
                <WestIcon />
                <h1 className="text-xl font-bold">Home</h1>
              </div>
              <div className="h-[83vh]">
                <div className="">
                  <SearchUser />
                </div>
                <div className="h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar">
                  {message.chats.map((item) => (
                    <div
                      onClick={() => {
                        setCurrentChat(item);
                        setMessages(item.messages);
                      }}
                    >
                      <UserChatCard key={item.id} chat={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className="h-full" item xs={9}>
          {currentChat ? (
            <div>
              <div className="flex justify-between items-center border-l p-5">
                <div className="flex items-center space-x-3">
                  <Avatar src="https://cdn.pixabay.com/photo/2023/12/13/17/54/bun-8447394_1280.jpg" />
                  <p className="text-bold">
                    {auth.user.id === currentChat.users[0].id
                      ? currentChat.users[1].firstName +
                        " " +
                        currentChat.users[1].lastName
                      : currentChat.users[0].firstName +
                        " " +
                        currentChat.users[0].lastName}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <IconButton>
                    <CallIcon />
                  </IconButton>
                  <IconButton>
                    <VideoCallIcon />
                  </IconButton>
                </div>
              </div>
              <div className=" overflow-y-scroll hideScrollbar h-[82vh] px-2 space-y-5 py-5">
                {messages.map((item)=><ChatMessage item={item}/>)}
              </div>
              <div className="sticky bottom-0 border-1 ">
              {selectedImage && <img className="w-[5rem] h-[5rem] object-cover px-2" src={selectedImage} alt="" />}

                <div className="py-5 flex items-center justify-center space-x-5">
                  <input
                  onKeyUp={
                    (e) => {
                      if (e.key === "Enter" ) {
                        handleCreateMessage(e.target.value);
                        e.target.value = "";
                        setSelectedImage("");
                      }

                    }
                  }
                    className="bg-transparent border border-[#3b40544] rounded-full w-[90%] py-3 px-5"
                    placeholder="Type more ..."
                    type="text"
                  ></input>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSelectImage}
                      className="hidden"
                      id="image-input"
                    />
                    <label htmlFor="image-input">
                      <PhotoIcon />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full space-y-5 flex flex-col justify-center items-center">
              <ChatBubbleOutlineIcon
                sx={{ fontSize: "15rem" }}
                className=" text-gray-300"
              />
              <p className="text-xl font-semibold">No chat Selected</p>
            </div>
          )}
        </Grid>
      </Grid>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Messages;
