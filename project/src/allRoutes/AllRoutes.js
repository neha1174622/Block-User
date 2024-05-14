import React, { useEffect } from 'react'
import { Routes, Route} from 'react-router-dom'

import Users from '../components/admin/feature/Users'


const AllRoutes = () => {
  return (
        <>
            <Routes>
                                
                  <Route path='users' element={<Users />} />
                 
                
            </Routes>
        </>
  )
}





export default AllRoutes