import { Avatar, Card, CardHeader } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../Redux/Auth/auth.action";
import { createChat } from "../../Redux/Message/message.action";

const SearchUser = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { message, auth } = useSelector((state) => state);
  
  const handleSearchUser = (e) => {
    setUsername(e.target.value);
    console.log(e.target.value);
    dispatch(searchUserAction(username));
  };
  const handleClick = (e) => {
    dispatch(createChat({user2Id: e}));
  };

  console.log("Search User ", auth.searchUsers);


  return (
    <div>
      <div className="py-5 relative">
        <input
          type="text"
          className="bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full"
          placeholder="Search user..."
          onChange={handleSearchUser}
        />
        {
          auth.searchUsers.map((item) => (
            <Card key={item.id} className="absolute w-full z-10 top-[4.5rem] cursor-pointer">
              <CardHeader
                onClick={() => {
                  handleClick(item.id);
                  setUsername("");
                }}
                avatar={
                  <Avatar src="https://cdn.pixabay.com/photo/2023/12/13/17/54/bun-8447394_1280.jpg" />
                }
                title={item.firstName + " " + item.lastName}
                subheader={"@" + item.firstName.toLowerCase() + "_" + item.lastName.toLowerCase()}
              />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default SearchUser;
