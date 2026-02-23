import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function MapComponent({ setAlerts, setSelectedCab, setConnected, focusCab, filter, setToast }) {

  const mapRef = useRef(null);
  const markerRefs = useRef({});
  const mapInstance = useRef(null);
  const vehiclesRef = useRef([]);

  useEffect(() => {

    const map = L.map(mapRef.current).setView([28.61,77.20],11);
    mapInstance.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
      attribution:"© OpenStreetMap"
    }).addTo(map);

    // 📍 Office geofence
    const office=[28.61,77.20];
    const radius=2000;

    const officeCircle=L.circle(office,{
      radius:radius,
      color:"blue",
      fillOpacity:0.2,
      weight:3
    }).addTo(map);

    function blink(){
      officeCircle.setStyle({color:"red",weight:5});
      setTimeout(()=>officeCircle.setStyle({color:"blue",weight:3}),800);
    }

    // icons
    const green=new L.Icon({iconUrl:"https://maps.google.com/mapfiles/ms/icons/green-dot.png",iconSize:[32,32]});
    const blue=new L.Icon({iconUrl:"https://maps.google.com/mapfiles/ms/icons/blue-dot.png",iconSize:[32,32]});
    const red=new L.Icon({iconUrl:"https://maps.google.com/mapfiles/ms/icons/red-dot.png",iconSize:[32,32]});

    // 🚖 vehicles (source → pickup → office)
    const vehicles=[
      {id:"CAB101",lat:28.50,lng:77.05,pickLat:28.55,pickLng:77.15,status:"Moving",picked:false},
      {id:"CAB102",lat:28.72,lng:77.35,pickLat:28.68,pickLng:77.28,status:"Moving",picked:false},
      {id:"CAB103",lat:28.55,lng:77.30,pickLat:28.58,pickLng:77.26,status:"Moving",picked:false},
      {id:"CAB104",lat:28.69,lng:77.00,pickLat:28.64,pickLng:77.10,status:"Moving",picked:false},
      {id:"CAB105",lat:28.58,lng:77.42,pickLat:28.60,pickLng:77.32,status:"Moving",picked:false}
    ];

    vehiclesRef.current=vehicles;

    const objs=vehicles.map(v=>{

      const marker=L.marker([v.lat,v.lng],{icon:green})
      .addTo(map)
      .bindPopup(v.id+" 🟢 Moving");

      markerRefs.current[v.id]=marker;
      marker.on("click",()=>setSelectedCab({...v}));

      const route=L.polyline([[v.lat,v.lng]],{color:"yellow",weight:4}).addTo(map);

      // pickup marker
      L.circle([v.pickLat,v.pickLng],{
        radius:200,
        color:"orange",
        fillOpacity:0.4
      }).addTo(map);

      return {data:v,marker,route};
    });

    // connection simulation
    const connectionInterval=setInterval(()=>{
      if(Math.random()<0.1){
        setConnected(false);
        setTimeout(()=>setConnected(true),2000);
      }
    },5000);

    // 🚀 movement loop
    const interval=setInterval(()=>{

      objs.forEach(o=>{

        if(o.data.status==="Inside Office") return;

        const officeLoc=[office[0],office[1]];
        const pickupLoc=[o.data.pickLat,o.data.pickLng];

        let target;

        if(!o.data.picked){
          target=pickupLoc;
        }else{
          target=officeLoc;
        }

        const dist=map.distance([o.data.lat,o.data.lng],target);

        // pickup reached
        if(!o.data.picked && dist<200){
          o.data.picked=true;

          setToast(`${o.data.id} picked employee`);
          setTimeout(()=>setToast(null),2000);

          o.marker.setPopupContent(o.data.id+" 👤 Employee Picked");
          return;
        }

        // office reached
        if(o.data.picked && map.distance([o.data.lat,o.data.lng],officeLoc)<radius){

          o.data.status="Inside Office";
          o.marker.setIcon(blue);
          o.marker.setPopupContent(o.data.id+" 🔵 Inside Office");

          blink();

          setToast(`${o.data.id} reached office`);
          setTimeout(()=>setToast(null),2500);

          setAlerts(prev=>{
            if(prev.find(a=>a.id===o.data.id && a.msg==="Entered office")) return prev;
            return [{id:o.data.id,msg:"Entered office"},...prev.slice(0,4)];
          });

          return;
        }

        // 🔴 random speeding
        if(Math.random()<0.01){
          o.data.status="Alert";
          o.marker.setIcon(red);
          o.marker.setPopupContent(o.data.id+" 🔴 Speeding");

          setAlerts(prev=>{
            if(prev.find(a=>a.id===o.data.id && a.msg==="Speeding")) return prev;
            return [{id:o.data.id,msg:"Speeding"},...prev.slice(0,4)];
          });
        }else{
          o.data.status="Moving";
          o.marker.setIcon(green);
          o.marker.setPopupContent(o.data.id+" 🟢 Moving");
        }

        // move smooth
        const speed=0.002;
        const angle=Math.atan2(target[0]-o.data.lat,target[1]-o.data.lng);

        o.data.lat += Math.sin(angle)*speed;
        o.data.lng += Math.cos(angle)*speed;

        o.marker.setLatLng([o.data.lat,o.data.lng]);
        o.route.addLatLng([o.data.lat,o.data.lng]);

      });

    },1500);

    setTimeout(()=>map.invalidateSize(),500);

    return ()=>{
      clearInterval(interval);
      clearInterval(connectionInterval);
      map.remove();
    };

  },[]);

  // 🎯 FILTER (perfect working)
  useEffect(()=>{

    vehiclesRef.current.forEach(v=>{
      const marker=markerRefs.current[v.id];
      if(!marker) return;

      if(filter==="All") marker.setOpacity(1);
      else if(filter==="Moving") marker.setOpacity(v.status==="Moving"?1:0);
      else if(filter==="Inside Office") marker.setOpacity(v.status==="Inside Office"?1:0);
      else if(filter==="Alert") marker.setOpacity(v.status==="Alert"?1:0);
    });

  },[filter]);

  // alert click zoom
  useEffect(()=>{
    if(focusCab && markerRefs.current[focusCab.id]){
      const m=markerRefs.current[focusCab.id];
      mapInstance.current.flyTo(m.getLatLng(),14);
      m.openPopup();
    }
  },[focusCab]);

  return <div ref={mapRef} style={{height:"100%",width:"100%"}}/>;
}

export default MapComponent;