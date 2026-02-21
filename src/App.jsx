// import { useState } from "react";
// import MapComponent from "./MapComponent";
// import Sidebar from "./Sidebar";
// import DetailsPanel from "./DetailsPanel";

// function App(){

//   const [alerts,setAlerts] = useState([]);
//   const [selectedCab,setSelectedCab] = useState(null);
//   const [connected,setConnected] = useState(true);
//   const [focusCab,setFocusCab] = useState(null);
//   const [filter,setFilter] = useState("All");
//   const [toast,setToast] = useState(null);   // ⭐ toast state

//   return(
//     <div style={{display:"flex", height:"100vh", width:"100vw"}}>

//       {/* LEFT SIDEBAR */}
//       <div style={{width:"270px", flexShrink:0}}>
//         <Sidebar 
//           alerts={alerts}
//           connected={connected}
//           onAlertClick={setFocusCab}
//           filter={filter}
//           setFilter={setFilter}
//         />
//       </div>

//       {/* MAP AREA */}
//       <div style={{flex:1, position:"relative"}}>

//         {/* ⭐ TITLE */}
//         <div style={{
//           position:"absolute",
//           top:"10px",
//           left:"50%",
//           transform:"translateX(-50%)",
//           background:"#0f172a",
//           color:"white",
//           padding:"10px 20px",
//           borderRadius:"8px",
//           fontWeight:"bold",
//           zIndex:999
//         }}>
//           🚖 Live Vehicle Tracking Dashboard
//         </div>

//         <MapComponent 
//           setAlerts={setAlerts}
//           setSelectedCab={setSelectedCab}
//           setConnected={setConnected}
//           focusCab={focusCab}
//           filter={filter}
//           setToast={setToast}   // ⭐ pass toast
//         />
//       </div>

//       {/* RIGHT DETAILS PANEL */}
//       {selectedCab && (
//         <DetailsPanel 
//           cab={selectedCab} 
//           setSelectedCab={setSelectedCab}
//         />
//       )}

//       {/* ⭐ TOAST MESSAGE */}
//       {toast && (
//         <div style={{
//           position:"fixed",
//           top:"20px",
//           right:"30px",
//           background:"#111827",
//           color:"white",
//           padding:"14px 20px",
//           borderLeft:"5px solid #22c55e",
//           borderRadius:"8px",
//           boxShadow:"0 4px 15px rgba(0,0,0,0.4)",
//           zIndex:9999,
//           fontWeight:"500"
//         }}>
//           🚨 {toast}
//         </div>
//       )}

//     </div>
//   )
// }

// export default App;
return(
  <div className="main-container">

    {/* LEFT SIDEBAR */}
    <div className="sidebar">
      <Sidebar 
        alerts={alerts}
        connected={connected}
        onAlertClick={setFocusCab}
        filter={filter}
        setFilter={setFilter}
      />
    </div>

    {/* MAP AREA */}
    <div className="map-container">

      {/* TITLE */}
      <div style={{
        position:"absolute",
        top:"10px",
        left:"50%",
        transform:"translateX(-50%)",
        background:"#0f172a",
        color:"white",
        padding:"10px 20px",
        borderRadius:"8px",
        fontWeight:"bold",
        zIndex:999
      }}>
        🚖 Live Vehicle Tracking Dashboard
      </div>

      <MapComponent 
        setAlerts={setAlerts}
        setSelectedCab={setSelectedCab}
        setConnected={setConnected}
        focusCab={focusCab}
        filter={filter}
        setToast={setToast}
      />
    </div>

    {/* RIGHT PANEL */}
    {selectedCab && (
      <DetailsPanel 
        cab={selectedCab} 
        setSelectedCab={setSelectedCab}
      />
    )}

    {/* TOAST */}
    {toast && (
      <div style={{
        position:"fixed",
        top:"20px",
        right:"30px",
        background:"#111827",
        color:"white",
        padding:"14px 20px",
        borderLeft:"5px solid #22c55e",
        borderRadius:"8px",
        zIndex:9999
      }}>
        🚨 {toast}
      </div>
    )}

  </div>
)