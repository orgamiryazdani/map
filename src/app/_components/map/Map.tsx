"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useLayerStore } from "@/stores/layers.store";
import { liveIcon, OutOfViewButton, pinIcon } from "./map-icons";
import { MapPositionTracker } from "./map-position-tracker";
import { IconPinlocation } from "../icons/icons";

export const Map: React.FC = () => {
  const buttonPosition = useRef<string | null>(null);
  const location = useSearchParams();
  const lat = Number(location.get("lat")) || 29.61563539020847;
  const lng = Number(location.get("lng")) || 52.5175996466605;
  const livelat = Number(location.get("livelat")) || null;
  const livelng = Number(location.get("livelng")) || null;
  const pinlat = Number(location.get("pinlat")) || null;
  const pinlng = Number(location.get("pinlng")) || null;

  //layer active
  const activeLayer = useLayerStore((state) =>
    state.layers.find((layer) => layer.isActive),
  );

  return (
    <section className='w-full h-full relative'>
      <MapContainer
        className='w-full h-full rounded-xl z-40'
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={true}>
        <TileLayer
          attribution={activeLayer?.attribution}
          url={activeLayer?.url || ""}
        />
        <MapPositionTracker
          location={[pinlat, pinlng]}
          buttonPosition={buttonPosition}
        />
        <MapViewUpdater center={[lat, lng]} />
        {/* live marker */}
        {livelat !== null && livelng !== null && (
          <Marker
            position={[livelat, livelng]}
            icon={liveIcon}
          />
        )}
        {/* pin marker */}
        {pinlat && pinlng && (
          <Marker
            position={[Number(pinlat), Number(pinlng)]}
            icon={pinIcon}
          />
        )}
        {/* go to pin location btn */}
        {buttonPosition.current !== null &&
          pinlat !== lat &&
          pinlng !== lng && (
            <OutOfViewButton
              pinlat={pinlat}
              pinlng={pinlng}
              buttonPosition={buttonPosition}
            />
          )}
      </MapContainer>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>
        <IconPinlocation
          fill='#ff0000'
          stroke='none'
          className='w-10 h-14 mt-4 '
        />
      </div>
    </section>
  );
};

const MapViewUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);

  return null;
};
