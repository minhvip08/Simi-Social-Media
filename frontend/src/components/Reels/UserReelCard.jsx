import React from "react";

const UserReelCard = () => {
  return (
    <div className="w-[15rem] px-2">
      <video controls
        className="w-full h-full"
        src="https://player.vimeo.com/progressive_redirect/playback/902916600/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=a44962d6b57e6b1af2c4cb919035bd224089f4de44d440cafe4353118f44a276"
      />
    </div>
  );
};

export default UserReelCard;
