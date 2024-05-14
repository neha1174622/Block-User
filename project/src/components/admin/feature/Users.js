import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {API_URL} from '../../../util/API_URL'

const Users = () => {

  let [allUser, setAllUser] = useState([]);

  useEffect(()=>{
    axios.get(`${API_URL}/user`).then(response=>{
      setAllUser(response.data);
    })
  },[])


  let changeStatus = async (obj)=>{ 

    if(obj.status==1){ //if status =1 than code to change to 0 
      let data = { status : 0 } 
      let response = await axios.put(`${API_URL}/user/${obj._id}`, data); // change status on server
      obj.status=0; //change status on broswer after change in server
      setAllUser(()=>{ //map is used becoz we want all user including updated status
        return allUser.map(v=> v._id==obj._id ? obj : v)
      })
      
    }else{ //if status =0 than code to change to 1
      let data = { status : 1 }
      let response = await axios.put(`${API_URL}/user/${obj._id}`, data); // change status on server
      obj.status=1; //change status on browser after change in server
      setAllUser(()=>{ //map is used becoz we want all user including updated status
        return allUser.map(v=> v._id==obj._id ? obj : v) 
      })
    }
  }
 
  return (
    <>
      <div className="container my-4">
        <div className="row">
          <div className="col-md-12">
            <h3 className='text-center'>List of All Users</h3>
            <table className="table table-dark">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Change</th>
                </tr>

              </thead>
              <tbody>
                {
                  allUser.map((value, index)=>{
                    return(
                      <tr key={value._id}>
                        <td>{index+1}</td>
                        <td>{value.name}</td>
                        <td>{value.email}</td>
                        <td>{value.contact}</td>
                        <td>{value.status==1 ? 'Enable' : 'Disable'}</td>
                        <td><button onClick={()=>changeStatus(value)} className='btn btn-info btn-sm'>Change</button></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
 
    </>
  )
}

export default Users