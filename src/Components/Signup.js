import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
    const [Credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
    let history=useNavigate()

    const handleSubmit= async(e)=>{
        e.preventDefault()
        
        const url="http://localhost:5000/api/auth/createUser"
        const response = await fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({name:Credentials.name,email:Credentials.email,password:Credentials.password}), // body data type must match "Content-Type" header
          
        });
        const json= await response.json(); // parses JSON response into native JavaScript objects
        console.log(json)
        if(json.Success){
            localStorage.setItem('token',json.authtoken)
            history("/")
            alert("Sign Up Successful")
        }
        else{
            alert("user already exists")
        }
        
        
    }
    const onchange=(e)=>{
        setCredentials({...Credentials,[e.target.name]:e.target.value})
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Email address</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onchange} aria-describedby="emailHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onchange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' required minLength={5} onChange={onchange} id="password" /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='cpassword' minLength={5} required onChange={onchange} id="cpassword" /> 
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
