import React from "react";
function Sidebar({ alerts, connected, onAlertClick, filter, setFilter }) {
return (
<div style={{
width: "270px",
background: "linear-gradient(180deg,#0f172a,#020617)",
color: "white",
padding: "22px",
fontFamily: "Arial",
height: "100vh"
}}>

<h2>🚖 Command Center</h2>
<hr style={{opacity:0.3}}/>

{/* CONNECTION */}
<div style={{margin:"10px 0"}}>
{connected 
 ? <span style={{color:"#22c55e"}}>🟢 Live Tracking</span>
 : <span style={{color:"red"}}>🔴 Reconnecting...</span>
}
</div>

{/* FILTER */}
<select 
value={filter}
onChange={(e)=>setFilter(e.target.value)}
style={{width:"100%",padding:"8px",marginBottom:"15px"}}
>
<option>All</option>
<option>Moving</option>
<option>Inside Office</option>
<option>Alert</option>
</select>

<h3>Live Alerts</h3>
{alerts
  .filter(a => {
    if(filter === "All") return true;
    if(filter === "Inside Office") return a.msg === "Entered office";
    if(filter === "Alert") return a.msg === "Speeding";
    if(filter === "Moving") return false; // moving ke liye alert nahi
  })
  .map((a,i)=>(
    <div key={i}
      onClick={()=>onAlertClick(a)}
      style={{
        background:"rgba(255,0,0,0.1)",
        padding:"8px",
        marginBottom:"8px",
        cursor:"pointer",
        borderLeft:"4px solid red"
      }}>
      {a.id} - {a.msg}
    </div>
))}


</div>
);
}
export default Sidebar;
