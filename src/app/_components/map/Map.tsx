"use client";

import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Map: React.FC = () => {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
  return (
    <section className='md:w-[94vw] w-[90vw] h-[90vh] z-50 relative'>
        <input type="text" className="absolute w-[70%] h-10 rounded-full bg-secondary top-3 right-3 shadow-md z-50 px-3 text-sm outline-none text-primary" placeholder="جستجو..."  name="" id="" />
        <div className="absolute sm:w-[370px] w-72 h-32 rounded-3xl background bottom-3 left-[50%] -translate-x-[50%] shadow-md z-50"></div>
      <MapContainer
      className="w-full h-full rounded-3xl z-40"
        center={position}
        zoom={13}
        scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
         <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> *
      </MapContainer>
    </section>
  );
};

export default Map;
