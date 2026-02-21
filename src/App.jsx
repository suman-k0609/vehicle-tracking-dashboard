import { useState } from "react";
import MapComponent from "./MapComponent";
import Sidebar from "./Sidebar";
import DetailsPanel from "./DetailsPanel";

function App(){

  const [alerts,setAlerts] = useState([]);
  const [selectedCab,setSelectedCab] = useState(null);
  const [connected,setConnected] = useState(true);
  const [focusCab,setFocusCab] = useState(null);
  const [filter,setFilter] = useState("All");
  const [toast,setToast] = useState(null);

  return(
    <div className="main-container">

      {/* SIDEBAR */}
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

        <div className="title-bar">
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

      {/* DETAILS */}
      {selectedCab && (
        <DetailsPanel 
          cab={selectedCab} 
          setSelectedCab={setSelectedCab}
        />
      )}

      {/* TOAST */}
      {toast && (
        <div className="toast">
          🚨 {toast}
        </div>
      )}

    </div>
  )
}

export default App;