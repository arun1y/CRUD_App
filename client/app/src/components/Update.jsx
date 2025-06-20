import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Update() {

  const {id}=useParams();

    const[values,setValues]=useState({
      name:'',
      age:'',
      email:'',
      gender:'',
  });

      useEffect(()=>{
        axios.get('http://localhost:5000/read/'+id)
        .then(res=>{
          console.log(res.data);
        const student = res.data;
        if (student) {
          setValues({
            name: student.name,
            age: student.age,
            email: student.email,
            gender: student.gender,
          });
        }
        })
        .catch(err=>console.log(err))
    },[id]);

  const borderClass=' border border-gray-300 rounded px-2 py-1  w-full'

  const navigate=useNavigate();

  const handleUpdate=(event)=>{
    event.preventDefault();
    axios.put('http://localhost:5000/update/'+id,values)
    .then(res=>{
      console.log(res);
      navigate('/');
    })
    .catch(err=>console.log(err));
  }

  return (
    <div className='min-h-screen flex bg-blue-400 justify-center items-center'>
        <div className='bg-white p-6 shadow-md rounded-lg max-w-6xl overflow-x-auto'>
            <form onSubmit={handleUpdate} className='w-auto '>
                <div className='flex flex-col gap-1 '>
                <div className='flex justify-center'>
                <h2 className='text-2xl font-bold'>Update Student</h2>
                </div>
                <div className=''>
                    <label htmlFor="">Name</label> <br />
                    <input type="text" placeholder='Enter Name' className={borderClass} 
                    onChange={e=>setValues({...values, name:e.target.value})} value={values.name}/>
                </div>
                <div className=''>
                    <label htmlFor="">Age</label><br />
                    <input type="number" placeholder='Enter Age' className={borderClass}
                    onChange={e=>setValues({...values, age:e.target.value})} value={values.age}
                    />
                </div>
                <div className=''>
                    <label htmlFor="">Email</label><br />
                    <input type="email" placeholder='Enter Email' className={borderClass}
                    onChange={e=>setValues({...values, email:e.target.value})} value={values.email}
                    />
                </div>
                <div className=''>
                    <label htmlFor="">Gender</label><br />
                    <input type="text" placeholder='Enter Gender' className={borderClass}
                    onChange={e=>setValues({...values, gender:e.target.value})} value={values.gender}/>
                </div>
                </div>
                <div className='flex justify-center mt-2'>
                <button className=' bg-green-600 rounded-md px-2 py-1 sm:text-sm text-sm m-2 hover:cursor-pointer hover:bg-green-800 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110'>Update</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Update