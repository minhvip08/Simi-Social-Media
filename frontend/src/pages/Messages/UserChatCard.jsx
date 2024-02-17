import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React from "react";
import { useSelector } from "react-redux";

const UserChatCard = ({chat}) => {
    const {message, auth} = useSelector((state) => state);
  return (
    <Card>
      <CardHeader
        className="cursor-pointer"
        
        avatar={
          <Avatar
            sx={{
              width: "3.5rem",
              height: "3.5rem",
              fontSize: "1.5rem",
              bgcolor: "#191c29",
              color: "rgb(88,199,250)",
            }}
            src="https://cdn.pixabay.com/photo/2023/12/13/17/54/bun-8447394_1280.jpg"
          />
        }
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        title={auth.user.id === chat.users[0].id ? chat.users[1].firstName + " " + chat.users[1].lastName : chat.users[0].firstName + " " + chat.users[0].lastName}
        subheader={"new message"}
      ></CardHeader>
    </Card>
  );
};

export default UserChatCard;
