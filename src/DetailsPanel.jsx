import React from "react";

function DetailsPanel({ cab, setSelectedCab }) {

  const statusColor =
    cab.status === "Alert"
      ? "red"
      : cab.status === "Inside Office"
      ? "#22c55e"
      : "#3b82f6";

  return (
    <div
      style={{
        width: "320px",
        background: "#020617",
        color: "white",
        padding: "22px",
        height: "100vh",
        boxShadow: "-4px 0 15px rgba(0,0,0,0.5)",
        fontFamily: "Arial",
        position: "relative"
      }}
    >

      {/* HEADER */}
      <h2 style={{marginBottom:"5px"}}>🚖 Vehicle Details</h2>
      <hr style={{opacity:0.2}}/>

      {/* CAB ID */}
      <p><b>Cab ID:</b> {cab.id}</p>

      {/* DRIVER */}
      <p><b>Driver:</b> Rahul Sharma</p>

      {/* STATUS */}
      <p>
        <b>Status:</b>{" "}
        <span style={{color:statusColor, fontWeight:"bold"}}>
          {cab.status}
        </span>
      </p>

      {/* SPEED */}
      <p><b>Speed:</b> {Math.floor(Math.random()*60)+20} km/h</p>

      {/* ETA */}
      <p><b>ETA to Next Stop:</b> {Math.floor(Math.random()*15)+5} mins</p>

      {/* LOCATION */}
      <p><b>Latitude:</b> {cab.lat.toFixed(4)}</p>
      <p><b>Longitude:</b> {cab.lng.toFixed(4)}</p>

      {/* CLOSE BUTTON */}
      <button
        onClick={()=>setSelectedCab(null)}
        style={{
          marginTop:"25px",
          width:"100%",
          padding:"12px",
          background:"red",
          border:"none",
          color:"white",
          fontWeight:"bold",
          cursor:"pointer",
          borderRadius:"6px"
        }}
      >
        Close Panel
      </button>

    </div>
  );
}

export default DetailsPanel;