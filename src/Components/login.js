import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'


const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    let history=useNavigate()

    const handleSubmit= async(e)=>{
        e.preventDefault()
        const url="http://localhost:5000/api/auth/login"
        const response = await fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({email:email,password:password}), // body data type must match "Content-Type" header
          
        });
        const json= await response.json(); // parses JSON response into native JavaScript objects
        console.log(json)
        if(json.Success){
            localStorage.setItem('token',json.authtoken)
            history("/")
            // alert("Login Successful")
        }
        else{
            alert("Invalid credentials")
        }
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" value={email} name="email" onChange={(e)=>setEmail(e.target.value)} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="password"/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
