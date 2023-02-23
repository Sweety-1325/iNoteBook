import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import noteContext from "../context/notes/noteContext";

const Login = (props) => {
    
    let navigate=useNavigate();
    const [credentials, setCredentials] = useState({email:"",password:""})
    

    //--------------ON CHANGE FUNCTION--------------------------
    const onChange=((e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
     })

  //--------------HANDLE SUBMIT FUNCTION--------------------------------------
    const handleSubmit=(async(e)=>{
        e.preventDefault();//prevents the page from reloading

        //fetching the api
        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
      
              headers: {
                "Content-Type": "application/json" },
                body: JSON.stringify({email:credentials.email,password:credentials.password})
            }
          );
          const json=await response.json();
          console.log(json);
          if(json.success)
          {
            //save the auth token and redirect
            localStorage.setItem('token',json.authToken)//helps us store the key-value pair locally in users browser
            props.showAlert("Logged in!!","success");
            navigate("/");
            
          }
          else{
            props.showAlert("Invalid Credentials!!","danger");
          }
          setCredentials({email:"",password:""});

    })
  return (
    <div className="container my-4">
      <h1>Please Login to continue!!</h1>
      <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Id
          </label>
          <input
            type="email"
            value={credentials.email}
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
          value={credentials.password}
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn" style={{backgroundColor:"#23b895"}} >
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
