import { Avatar, Card, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import StoryCircle from "./StoryCircle";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import ArticleIcon from "@mui/icons-material/Article";
import PostCard from "../Post/PostCard";
import CreatePostModal from "../CreatePost/CreatePostModal";
import { useDispatch } from "react-redux";
import { getAllPostAction } from "../../Redux/Post/post.action";
import { useSelector } from "react-redux";

const story = [11, 1, 1, 1, 1];

const MiddlePath = () => {
  const dispatch = useDispatch();
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const {post} = useSelector((state) => state);


  const handleCloseCreatePostModel = () =>setOpenCreatePostModal(false);

  const handleOpenCreatePostModel = () => {
    setOpenCreatePostModal(true);
  };

  useEffect(() => {
    dispatch(getAllPostAction());
    
  }, [post.newComment]);


  return (
    <div className="px-20">
      <section className="py-5 flex items-center p-5 rounded-b-md">
        <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar
            sx={{ width: "5rem", height: "5rem" }}
            // src="https://images.unsplash.com/photo-1634210000000-3e3e3e3e3e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjIwNzR8MHwxfGFsbHwxfHx8fHx8fHx8fHwxNjM0MjIwNzIw&ixlib=rb-1.2.1&q=80&w=400"
          >
            <AddIcon sx={{ fontSize: "3rem" }} />
          </Avatar>
          <p className="text-sm font-bold">Create Reel</p>
        </div>
        {story.map((item) => (
          <StoryCircle />
        ))}
      </section>
      <section>
        <Card className="p-5 mt-5">
          <div className="flex justify-between">
            <Avatar />
            <input
            onClick={handleOpenCreatePostModel}
              className="outline-none w-[90%] bg-slate-100 rounded-full px-5 bg-transparent border-[#3b4054] border"
              type="text"
            />
          </div>
          <div className="flex justify-center space-x-9 mt-5">
            <div className="flex items-center">
              <IconButton color="primary" onClick={handleOpenCreatePostModel}>
                <AddPhotoAlternateIcon />
              </IconButton>
              <span>media</span>
            </div>
            <div className="flex items-center">
              <IconButton color="primary" onClick={handleOpenCreatePostModel}>
                <VideoCallIcon />
              </IconButton>
              <span>video</span>
            </div>
            <div className="flex items-center">
              <IconButton color="primary" onClick={handleOpenCreatePostModel}>
                <ArticleIcon />
              </IconButton>
              <span>article</span>
            </div>
          </div>
        </Card>
        <div className="mt-5 space-y-5">
          {
            post && post.posts.map((item) => <PostCard item={item}/>)
          }
        </div>
        <div>
          <CreatePostModal handleClose={handleCloseCreatePostModel} open={openCreatePostModal}/>
        </div>
      </section>
    </div>
  );
};

export default MiddlePath;
