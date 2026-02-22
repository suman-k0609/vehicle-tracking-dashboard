import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function MapComponent({ setAlerts, setSelectedCab, setConnected, focusCab, filter, setToast }) {

  const mapRef = useRef(null);
  const markerRefs = useRef({});
  const mapInstance = useRef(null);

  useEffect(()=>{

    const map = L.map(mapRef.current).setView([28.61,77.20],12);
    mapInstance.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
      attribution:"© OpenStreetMap"
    }).addTo(map);

    // 📍 Office geofence
    const office=[28.61,77.20];
    const radius=2000;

    const officeCircle = L.circle(office,{
      radius:radius,
      color:"blue",
      fillOpacity:0.2,
      weight:3
    }).addTo(map);

    // ⭐ blink effect
    let lastBlink = {};
    function blinkGeofence(id){
      if(lastBlink[id]) return;
      lastBlink[id] = true;

      officeCircle.setStyle({color:"red", weight:5});
      setTimeout(()=>{
        officeCircle.setStyle({color:"blue", weight:3});
        lastBlink[id] = false;
      },1000);
    }

    // icons
    const green=new L.Icon({iconUrl:"https://maps.google.com/mapfiles/ms/icons/green-dot.png",iconSize:[32,32]});
    const blue=new L.Icon({iconUrl:"https://maps.google.com/mapfiles/ms/icons/blue-dot.png",iconSize:[32,32]});
    const red=new L.Icon({iconUrl:"https://maps.google.com/mapfiles/ms/icons/red-dot.png",iconSize:[32,32]});

    // vehicles
    const vehicles=[
      {id:"CAB101",lat:28.61,lng:77.20,status:"Moving"},
      {id:"CAB102",lat:28.63,lng:77.18,status:"Moving"},
      {id:"CAB103",lat:28.59,lng:77.22,status:"Moving"},
      {id:"CAB104",lat:28.62,lng:77.25,status:"Moving"},
      {id:"CAB105",lat:28.58,lng:77.19,status:"Moving"}
    ];

    // markers
    const objs = vehicles.map(v=>{
      const marker=L.marker([v.lat,v.lng],{icon:green}).addTo(map).bindPopup(v.id+" 🟢 Moving");
      markerRefs.current[v.id]=marker;

      marker.on("click",()=> setSelectedCab({...v}));

      const route=L.polyline([[v.lat,v.lng]],{color:"yellow"}).addTo(map);
      return {data:v,marker,route};
    });

    // 🔴 fake connection
    const connectionInterval=setInterval(()=>{
      if(Math.random()<0.1){
        setConnected(false);
        setTimeout(()=>setConnected(true),2000);
      }
    },5000);

    // 🚀 movement loop
    const interval=setInterval(()=>{
      objs.forEach(o=>{

        o.data.lat+=(Math.random()-0.5)*0.01;
        o.data.lng+=(Math.random()-0.5)*0.01;

        o.marker.setLatLng([o.data.lat,o.data.lng]);
        o.route.addLatLng([o.data.lat,o.data.lng]);

        const d=map.distance([o.data.lat,o.data.lng],office);

        // 🔵 ENTER OFFICE
        if(d < radius){

          if(o.data.status !== "Inside Office"){

            blinkGeofence(o.data.id);

            setToast(`Vehicle ${o.data.id} entered office`);
            setTimeout(()=>setToast(null),3000);

            setAlerts(prev=>{
              const exist = prev.find(a=>a.id===o.data.id && a.msg==="Entered office");
              if(exist) return prev;

              return [
                {id:o.data.id,msg:"Entered office"},
                ...prev.slice(0,4)
              ];
            });
          }

          o.data.status="Inside Office";
          o.marker.setIcon(blue);
          o.marker.setPopupContent(o.data.id+" 🔵 Inside Office");
        }

        // 🔴 SPEEDING ALERT
        else if(Math.random()<0.08){

          o.data.status="Alert";
          o.marker.setIcon(red);
          o.marker.setPopupContent(o.data.id+" 🔴 Speeding");

          setToast(`⚠ ${o.data.id} speeding`);
          setTimeout(()=>setToast(null),2000);

          setAlerts(prev=>[
            {id:o.data.id,msg:"Speeding"},
            ...prev.slice(0,4)
          ]);
        }

        // 🟢 MOVING
        else{
          o.data.status="Moving";
          o.marker.setIcon(green);
          o.marker.setPopupContent(o.data.id+" 🟢 Moving");
        }

        // 🎯 FILTER
        if(filter!=="All" && o.data.status!==filter){
          o.marker.setOpacity(0);
          o.route.setStyle({opacity:0});
        }else{
          o.marker.setOpacity(1);
          o.route.setStyle({opacity:1});
        }

      });
    },2000);

    setTimeout(()=>map.invalidateSize(),500);

    return ()=>{
      clearInterval(interval);
      clearInterval(connectionInterval);
      map.remove();
    }

  },[filter]);

  // 🎯 click alert zoom
  useEffect(()=>{
    if(focusCab && markerRefs.current[focusCab.id]){
      const m=markerRefs.current[focusCab.id];
      mapInstance.current.flyTo(m.getLatLng(),15);
      m.openPopup();
    }
  },[focusCab]);

  return <div ref={mapRef} style={{height:"100%",width:"100%"}}/>;
}

export default MapComponent;