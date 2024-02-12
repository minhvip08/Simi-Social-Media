import React from 'react'
import { Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const StoryCircle = () => {
  return (
    <div>
         <div className="flex flex-col items-center mr-4 cursor-pointer">
        <Avatar
          sx={{ width: "5rem", height: "5rem" }}
          src="https://images.unsplash.com/photo-1634210000000-3e3e3e3e3e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjIwNzR8MHwxfGFsbHwxfHx8fHx8fHx8fHwxNjM0MjIwNzIw&ixlib=rb-1.2.1&q=80&w=400"
        >
          {/* <AddIcon sx={{ fontSize: "3rem" }} /> */}
        </Avatar>
        <p className="text-sm font-bold">simi</p>

        </div>
    </div>
  )
}

export default StoryCircle