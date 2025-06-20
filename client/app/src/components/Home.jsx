import React from 'react'
import {useState,useEffect} from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';


function Home() {
    const [users,setUsers]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:5000/")
        .then(res=>setUsers(res.data))
        .catch(err=>console.error("Error fetching users:",err));
    },[]);

    const buttonClass = "bg-red-500 hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-4 rounded m-1";
    const borderClass="border-t border-b border-gray-400 border-collapse ";

    const handleDelete=(id)=>{
      axios.delete('http://localhost:5000/delete/'+id)
      .then(res=>{
        location.reload();
      })
      .catch(err=>console.log(err))
    }

  return (
  
        <div className='min-h-screen flex justify-center items-center bg-blue-400'>
               <div className='p-6 bg-white shadow-md rounded-lg max-w-6xl'>
             <h1 className='text-center font-semibold'>Student List</h1> <br />
             <div className='flex justify-end'>
                <Link to="/create" className='btn btn-success bg-green-700 font-semibold text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-4 rounded m-1'>Create +</Link>
             </div>
           <div className='overflow-x-auto'>
           <table className='w-full border-collapse'>
                 <thead>
                 <tr className='px-4 py-2 sm:text-base text-sm'>
                 <th className='px-4 py-2 sm:text-base text-sm'>ID</th>
                 <th className='px-4 py-2 sm:text-base text-sm'>Name</th>
                 <th className='px-4 py-2 sm:text-base text-sm'>Age</th>
                 <th className='px-4 py-2 sm:text-base text-sm'>Email</th>
                 <th className='px-4 py-2 sm:text-base text-sm'>Gender</th>
                 <th className='px-4 py-2 sm:text-base text-sm'>Actions</th>
                    </tr>
             </thead>
             <tbody className=''>
                 {users.map((user)=>(
                         <tr key={user.id} className={borderClass}>
                            <td className='px-4 py-2'>{user.id}</td>
                            <td className='px-4 py-2'>{user.name}</td>
                            <td className='px-4 py-2'>{user.age}</td>
                            <td className='px-4 py-2'>{user.email}</td>
                            <td className='px-4 py-2'>{user.gender}</td>
                            <td className='px-4 py-2'> 
                              <Link to={`/read/${user.id}`}  className={buttonClass} >Read</Link> 
                              <Link to={`/update/${user.id}`} className={buttonClass}>Update</Link> 
                              <button onClick={()=>handleDelete(user.id)} className={buttonClass}>Delete</button> 
                            </td>
                   </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div> 
   
    </div>
  )
}

export default Home