import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import { Avatar, Backdrop, Button, CircularProgress, IconButton } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { useState } from "react";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { uploadToCloudniry } from "../../utils/uploadToCloudniry";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "0.6rem",
  outline: "none",
};

const CreatePostModal = ({ handleClose, open }) => {
    const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const handleSelectImage = async (e) => {
    setIsLoading(true);
    const imageUrl = await uploadToCloudniry(e.target.files[0], "image");
    setSelectedImage(imageUrl);
    setIsLoading(false);
    formik.setFieldValue("image", imageUrl);

  };

  const handleSelectVideo = async (e) => {
    setIsLoading(true);
    const videoUrl = await uploadToCloudniry(e.target.files[0], "video");
    setSelectedImage(videoUrl);
    setIsLoading(false);
    formik.setFieldValue("video", videoUrl);

  };

  const formik = useFormik({
    initialValues:{
        caption:"",
        image:"",
        video:""
    },
    onSubmit: (values) => {
      console.log("formik values", values);
    },
  });


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="flex space-x-4 items-center">
              <Avatar />
              <div>
                <p className="font-bold text-lg">Simi</p>
                <p className="text-sm">@Simi</p>
              </div>
            </div>
            <textarea
            className="outline-none w-full mt-5 p-5 bg-slate-100 rounded-md bg-transparent border-[#3b4054] border"
              placeholder="Write caption..."
              name="caption"
              id=""
              value={formik.caption}
              onChange={formik.handleChange}
              rows="3"
            ></textarea>
            <div className="flex space-x-5 items-center mt-5">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  id="image-input"
                  onChange={handleSelectImage}
                  style={{ display: "none" }}
                />
                <label htmlFor="image-input">
                  <IconButton color="primary" component="span">
                    <ImageIcon />
                  </IconButton>
                </label>
                <span>Image</span>
              </div>
              <div>
                <input
                  type="file"
                  accept="video/*"
                  id="video-input"
                  onChange={handleSelectVideo}
                  style={{ display: "none" }}
                />
                <label htmlFor="video-input">
                  <IconButton color="primary" component="span">
                    <VideoCallIcon />
                  </IconButton>
                </label>
                <span>Video</span>
              </div>
            </div>
            {selectedImage && (
              <div>
                <img className="h-[10rem]" src={selectedImage} />
              </div>
            )}
            {selectedVideo && (
              <div>
                <video className="h-[10rem]" src={selectedVideo} controls />
              </div>
            )}

            <div className="flex w-full justify-end">
                <Button 
                variant="contained"
                type="submit"
                sx={{borderRadius:"1.5rem"}}>Post</Button>
            </div>
          </div>
        </form>
        <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={isLoading}
  onClick={handleClose}
>
  <CircularProgress color="inherit" />
</Backdrop>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;
