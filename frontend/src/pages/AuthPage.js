import React, { useState } from "react";
import axios from "axios";
import "../styles/auth.css";

export default function AuthPage(){

const [isLogin,setIsLogin]=useState(true);

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const submit=async()=>{

try{

const url=isLogin
? "http://localhost:5000/api/auth/login"
: "http://localhost:5000/api/auth/register";

const res=await axios.post(url,{
name,
email,
password
});

alert(JSON.stringify(res.data));

}catch(err){

alert("Error");

}

};

return(

<div className="auth-container">

<div className="auth-box">

<h2>{isLogin ? "Login" : "Register"}</h2>

{!isLogin && (
<input
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>
)}

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={submit}>
{isLogin ? "Login" : "Register"}
</button>

<button
className="switch"
onClick={()=>setIsLogin(!isLogin)}
>
{isLogin ? "Create Account" : "Already have account"}
</button>

<button
className="google"
onClick={()=>window.location.href="http://localhost:5000/api/auth/google"}
>
Login with Google
</button>

</div>

</div>

);

}