import { Avatar, Button, Card } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PostCard from "../../components/Post/PostCard";
import UserReelCard from "../../components/Reels/UserReelCard";
import { useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";

const tabs = [
  { value: "posts", label: "Posts" },
  { value: "reels", label: "Reels" },
  { value: "saved", label: "Saved" },
  { value: "repost", label: "Post" },
];


const posts = [1, 1, 1, 1, 1];
const reels = [1, 1, 1, 1, 1];
const savedPosts = [1, 1, 1, 1, 1];
const reposts = [1, 1, 1, 1, 1];

const Profile = () => {
  const { id } = useParams();
  const [value, setValue] = React.useState("posts");
  const {auth} = useSelector(store => store);

  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEditProfile = () =>{
    setOpen(true);
  }

  return (
    <Card className="my-10 w-[70%]">
      <div className="rounded-md">
        <div className="h-[15rem]">
          <img
            src="https://cdn.pixabay.com/photo/2023/12/13/17/54/bun-8447394_1280.jpg"
            alt="profile"
            className="rounded-t-md w-full h-full object-cover"
          />
        </div>
        <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            sx={{ width: "10rem", height: "10rem" }}
            src="https://cdn.pixabay.com/photo/2023/12/13/17/54/bun-8447394_1280.jpg"
          />
          {true ? (
            <Button sx={{ borderRadius: "20px" }} variant="outlined" onClick={handleEditProfile}>
              Edit Profile
            </Button>
          ) : (
            <Button variant="outlined">Follow</Button>
          )}
        </div>

        <div className="p-5">
          <div>
          <p className="font-bold">
                {auth.user?.firstName + " " + auth.user?.lastName}{" "}
              </p>
              <p className="opacity-70">
                @
                {auth.user?.firstName.toLowerCase() +
                  "-" +
                  auth.user?.lastName.toLowerCase()}
              </p>
          </div>
          <div className="flex gap-2 items-center py-3">
            <span>41 posts</span>
            <span>31 followers</span>
            <span>41 followings</span>
          </div>
          <section>
            <Box
              sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
              >
                {tabs.map((tab, index) => (
                  <Tab
                    key={index}
                    value={tab.value}
                    label={tab.label}
                    wrapped
                  />
                ))}
              </Tabs>
            </Box>
            <div className="flex justify-center">
              {value === "posts" ? (
                <div className="space-y-5 w-[70%] my-10">
                  {posts.map((post, index) => (
                    <div className="border border-slate-50 rounded-md">
                      <PostCard />
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
              {value === "reels" ? (
                <div className="flex justify-center flex-wrap gap-2 my-10">
                  {reels.map((post, index) => (
                    <div className="border border-slate-50 rounded-md">
                      <UserReelCard />
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
              {value === "saved" ? (
                <div className="space-y-5 w-[70%] my-10">
                  {savedPosts.map((post, index) => (
                    <div className="border border-slate-50 rounded-md">
                      <PostCard />
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
              {value === "repost" ? (
                <div className="space-y-5 w-[70%] my-10">
                  
                </div>
              ) : (
                ""
              )}
            </div>
          </section>
        </div>
      </div>
      <section>
        <ProfileModal open={open} handleClose={handleClose}>

        </ProfileModal>
      </section>
    </Card>
  );
};

export default Profile;
