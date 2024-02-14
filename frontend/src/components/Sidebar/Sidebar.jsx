import React from "react";
import { navigationMenu } from "./SidebarNavigation";
import { Avatar, Card, Divider } from "@mui/material";
import { Button, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNavigate = (e, item) => {
    if (e.target.innerText === "Profile") {
      navigate(`/profile/${auth.user.id}`);
    } else {
      navigate(item.path);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className="card h-screen flex flex-col justify-between py-5">
      <div className="space-y-8 pl-5">
        <div>
          <p className="logo font-bold text-xl">Simi Social Media</p>
        </div>
        <div className="space-y-8">
          {navigationMenu.map((item, index) => {
            return (
              <div
                key={index}
                onClick={(e) => handleNavigate(e, item)}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <div className="icon">{item.icon}</div>
                <p className="text-xl">{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <Divider />
        <div className="pl-5 flex items-center justify-between pt-5">
          <div className="flex items-center space-x-3">
            <Avatar src="https://images.unsplash.com/photo-1634210000000-3e3e3e3e3e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjIwNzR8MHwxfGFsbHwxfHx8fHx8fHx8fHwxNjM0MjIwNzIw&ixlib=rb-1.2.1&q=80&w=400" />
            <div>
              <p className="font-bold">
                {auth.user?.firstName + " " + auth.user?.lastName}{" "}
              </p>
              <p className="opacity-70">
                @
                {auth.user?.firstName.toLowerCase() +
                  "_" +
                  auth.user?.lastName.toLowerCase()}
              </p>
            </div>
          </div>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleOpen}
            >
              <MoreVertIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
