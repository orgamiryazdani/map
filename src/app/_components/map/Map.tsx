"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useLayerStore } from "@/stores/layers.store";

const svgIcon = L.divIcon({
  html: `
  <?xml version="1.0" encoding="utf-8"?><svg width="30px" height="30px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 85.333333c-164.949333 0-298.666667 133.738667-298.666667 298.666667 0 164.949333 298.666667 554.666667 298.666667 554.666667s298.666667-389.717333 298.666667-554.666667c0-164.928-133.717333-298.666667-298.666667-298.666667z m0 448a149.333333 149.333333 0 1 1 0-298.666666 149.333333 149.333333 0 0 1 0 298.666666z" fill="#FF3D00" /></svg>`,
  className: "svg-icon",
});

const MapEvents = ({
  setLatLng,
  skipNextUrlUpdate,
}: {
  setLatLng: (center: [number, number]) => void;
  skipNextUrlUpdate: React.MutableRefObject<boolean>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const map = useMapEvents({
    moveend: async () => {
      if (skipNextUrlUpdate.current) {
        skipNextUrlUpdate.current = false;
        return;
      }
      const center = map.getCenter();
      setLatLng([center.lat, center.lng]);
      const params = new URLSearchParams(searchParams.toString());
      params.set("lng", String(center.lng));
      params.set("lat", String(center.lat));
      await router.push(`${pathname}?${params.toString()}`);
      skipNextUrlUpdate.current = true;
    },
  });

  return null;
};

const MapViewUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);

  return null;
};

export const Map: React.FC = () => {
  const location = useSearchParams();
  const lat = location.get("lat") || 29.61563539020847;
  const lng = location.get("lng") || 52.5175996466605;
  const skipNextUrlUpdate = useRef(false);

  const activeLayer = useLayerStore((state) =>
    state.layers.find((layer) => layer.isActive),
  );

  const [latLng, setLatLng] = useState<[number, number]>([
    Number(lat),
    Number(lng),
  ]);

  useEffect(() => {
    const newLatLng: [number, number] = [Number(lat), Number(lng)];
    setLatLng(newLatLng);
  }, [lat, lng]);

  return (
    <section className='w-full h-full'>
      <MapContainer
        className='w-full h-full rounded-xl z-40'
        center={latLng}
        zoom={13}
        scrollWheelZoom={true}>
        <TileLayer
          attribution={activeLayer?.attribution}
          url={activeLayer?.url || ""}
        />
        <MapEvents
          setLatLng={setLatLng}
          skipNextUrlUpdate={skipNextUrlUpdate}
        />
        <MapViewUpdater center={latLng} />
      </MapContainer>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          pointerEvents: "none",
        }}
        dangerouslySetInnerHTML={{ __html: svgIcon.options.html || "" }}
      />
    </section>
  );
};
