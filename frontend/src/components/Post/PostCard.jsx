import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAction,
  likePostAction,
} from "../../Redux/Post/post.action";
import { isLikedByReqUser } from "../../utils/isLikedByReqUser";

const PostCard = ({ item }) => {
  const [showComment, setShowComment] = useState(false);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  // console.log("Item ", item);
  const handleShowComment = () => {
    setShowComment(!showComment);
  };
  const handleCreateComment = (value) => {
    const reqData = {
      postId: item.id,
      data: {
        content: value,
      },
    };
    dispatch(createCommentAction(reqData));
  };

  const handleLikePost = () => {
    dispatch(likePostAction(item.id));
  };
  return (
    <Card className="">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {item.user.firstName[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.user.firstName + " " + item.user.lastName}
        subheader={
          "@" +
          item.user.firstName.toLowerCase() +
          "_" +
          item.user.lastName.toLowerCase()
        }
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.content}
        </Typography>
      </CardContent>

      <CardMedia component="img" height="194" image={item.image} />
      <CardMedia component="video" height="194" image={item.video} />

      <CardActions className="flex justify-between" disableSpacing>
        <div>
          <IconButton onClick={handleLikePost}>
            {isLikedByReqUser(auth.user.id, item) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton>{<ShareIcon />}</IconButton>
          <IconButton onClick={handleShowComment}>
            {<ChatBubbleIcon />}
          </IconButton>
        </div>
        <div>
          <IconButton>
            {true ? <BookmarkAddIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>
      </CardActions>
      {showComment && (
        <section>
          <div className="flex items-center space-x-5 mx-3 my-5">
            <Avatar sx={{}} />
            <input

              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleCreateComment(e.target.value);
                  e.target.value = "";
                }
              }}
              className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2"
              placeholder="Add a comment..."
              type="text"
            />
          </div>
          <Divider />

          {item.comments.map((item) => (
            <div className="mx-3 space-y-2 my-5 text-xs">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-5">
                  <Avatar
                    sx={{ height: "2rem", width: "2rem", fontSize: "0.8rem" }}
                  >
                    {item.user.firstName[0]}
                  </Avatar>
                  <p>{item.content}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </Card>
  );
};

export default PostCard;
