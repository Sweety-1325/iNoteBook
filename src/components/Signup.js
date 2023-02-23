import React,{useState} from "react";
import { useNavigate } from "react-router-dom";



const Signup = (props) => {
  let navigate=useNavigate();
   const [details, setDetails] = useState({name:"",email:"",password:""})
  //--------------ON CHANGE FUNCTION--------------------------
  const onChange=((e)=>{
    setDetails({...details,[e.target.name]:e.target.value});
 })
  //--------------HANDLE SUBMIT FUNCTION--------------------------------------
  const handleSubmit=(async(e)=>{
    e.preventDefault();//prevents the page from reloading

    //fetching the api
    const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
  
          headers: {
            "Content-Type": "application/json" },
            body: JSON.stringify({name:details.name,email:details.email,password:details.password})
        }
      );
      const json=await response.json();
      console.log(json);
      if(json.success)
      {
        //save the auth token and redirect
        localStorage.setItem('token',json.authToken)//helps us store the key-value pair locally in users browser
        navigate("/");
        props.showAlert("Account created successfully","success");
      }
      else{
        props.showAlert("Invalid Credentials!!","danger");
      }
      setDetails({name:"",email:"",password:""});

})



  return (
    <div className="container my-4">
      <h1>Please signup to continue!!</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Id
          </label>
          <input
            type="email"
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
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>
        
        <button type="submit" className="btn" style={{backgroundColor:"#23b895"}}>
          Signup
        </button>
      </form>
    </div>
  );
};
export default Signup;
