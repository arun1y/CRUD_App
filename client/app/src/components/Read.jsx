import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

function Read() {
    const {id}=useParams();
    const [student,setStudent]=useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/read/'+id)
        .then(res=>{
            console.log(res.data);
            setStudent(Array.isArray(res.data)?res.data[0]:res.data);
        })
        .catch(err=>console.log(err))
    },[id]);

        const buttonClass = "bg-red-500 hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-4 rounded m-1";

  return (
    <div className='flex items-center justify-center min-h-screen bg-blue-400 '>
        <div className='bg-white p-6 rounded-lg'>
            {student && student.id &&(
        <div className=''>
            <h1 className='text-center p-2 m-2'>Student Detail</h1>
            <h2>{student.id}</h2>
            <h2>{student.name}</h2>
            <h2>{student.age}</h2>
            <h2>{student.email}</h2>
            <h2>{student.gender}</h2>
        </div>
        )}
        <div className='flex justify-center m-2'>
            <Link to="/" className={buttonClass}>Back</Link>
            <Link to={`/update/${student.id}`} className={buttonClass}>Edit</Link>
        </div>
        
        </div>
    </div>
  )
}

export default Read