import React from 'react'
import { Grid } from '@mui/material'
import Login from './Login'
import Register from './Register'
import { Route, Routes } from 'react-router-dom'

const Authentication = () => {
  return (
    <div>

      <Grid  container>
        <Grid className='h-screen overflow-hidden' item md={3.5}>

        </Grid>
        <Grid className='' item md={5} xs={12}>
          <div className='px-20 flex flex-col justify-center h-full outline-1'>
            <div className='card p-8'>
              <div className='flex flex-col items-center mb-5 space-y-1'>
              <h1 className='logo text-center'>Simi Social Media</h1>
              <p className='text-center text-sm w-[70&]'>Connecting Lives, Sharing Stories: Your Social World, Your Way</p>

              </div>

                <Routes>
                <Route path='/' element={<Login/>} />

                  <Route path='/login' element={<Login/>} />
                  <Route path='/register' element={<Register/>} />

                </Routes>
            </div>
          </div>
          </Grid>
          <Grid className='h-screen overflow-hidden' item md={3.5}>

        </Grid>
        
      </Grid>

    </div>
  )
}

export default Authentication