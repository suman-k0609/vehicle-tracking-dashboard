function Sidebar({ alerts, connected, onAlertClick, filter, setFilter }) {

  return (
    <div>

      {/* Live Tracking Status */}
      <h3 style={{color:"#22c55e"}}>
        ● Live Tracking {connected ? "" : "(Disconnected)"}
      </h3>

      {/* Filter Dropdown */}
      <select
        value={filter}
        onChange={(e)=>setFilter(e.target.value)}
        style={{
          width:"100%",
          padding:"8px",
          marginBottom:"15px"
        }}
      >
        <option>All</option>
        <option>Moving</option>
        <option>Inside Office</option>
        <option>Alert</option>
      </select>

      <h3>Live Alerts</h3>

      {/* 🔥 ALERT LIST */}
      <div className="alert-list">
        {/* FILTER ALERTS LOGIC */}
{alerts
.filter(a=>{
  if(filter==="All") return true;
  if(filter==="Inside Office" && a.msg==="Entered office") return true;
  if(filter==="Alert" && a.msg==="Speeding") return true;
  if(filter==="Moving" && a.msg==="Moving") return true;
  return false;
})
.map((a,i)=>(
  <div key={i}
    className="alert-item"
    onClick={()=>onAlertClick(a)}
  >
    {a.id} - {a.msg}
  </div>
))}
      </div>

    </div>
  )
}

export default Sidebar;
