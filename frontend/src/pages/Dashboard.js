import React from "react";

export default function Dashboard(){

return(

<div className="dashboard">

<h1>Authentication System</h1>

<div className="card">
<h3>User Profile</h3>
<p>Status: Logged In</p>
</div>

<div className="card">
<h3>Security</h3>
<p>JWT Active</p>
</div>

<div className="card">
<h3>Role</h3>
<p>User / Admin</p>
</div>

</div>

);

}