import React from 'react'
import { Outlet } from 'react-router-dom'

function Meeting() {
  return (
    <div className='h-full w-full '>
        <Outlet/>
    </div>
  )
}

export default Meeting