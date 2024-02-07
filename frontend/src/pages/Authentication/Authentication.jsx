import React from 'react'
import { Grid } from '@mui/material'
import Login from './Login'
import Register from './Register'

const Authentication = () => {
  return (
    <div>
      <Grid  container>
        <Grid className='h-screen overflow-hidden' item xs={7}>
          <img className='h-full w-full' src='https://cdn.pixabay.com/photo/2016/03/31/23/20/communication-1297544_640.png'></img>

        </Grid>
        <Grid className='' item xs={5}>
          <div className='px-20 flex flex-col justify-center h-full outline-1'>
            <div className='card p-8'>
              <div className='flex flex-col items-center mb-5 space-y-1'>
              <h1 className='logo text-center'>Simi Social Media</h1>
              <p className='text-center text-sm w-[70&]'>Connecting Lives, Sharing Stories: Your Social World, Your Way</p>

              </div>
                <Login/>
            </div>
          </div>
          </Grid>
        
      </Grid>

    </div>
  )
}

export default Authentication