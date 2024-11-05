"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { useLayerStore } from "@/stores/layers.store";
import { useLiveLocationStore } from "@/stores/livelocation.store";

const svgIcon = L.divIcon({
  html: `
  <?xml version="1.0" encoding="utf-8"?><svg width="30px" height="30px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 85.333333c-164.949333 0-298.666667 133.738667-298.666667 298.666667 0 164.949333 298.666667 554.666667 298.666667 554.666667s298.666667-389.717333 298.666667-554.666667c0-164.928-133.717333-298.666667-298.666667-298.666667z m0 448a149.333333 149.333333 0 1 1 0-298.666666 149.333333 149.333333 0 0 1 0 298.666666z" fill="#FF3D00" /></svg>`,
  className: "svg-icon",
});

const liveIcon = L.divIcon({
  html: `
  <?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg fill="#000000" width="30px" height="30px" viewBox="0 0 32 32" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><g transform="matrix(1,0,0,1,-384,-384)"><g transform="matrix(3.33333,0,0,1.33333,-639.868,50.3596)"><circle cx="312" cy="270" r="3" style="fill:rgb(144,224,239);"/></g><g transform="matrix(1.05882,0,0,1.05882,65.0139,108.948)"><path d="M316.5,262C321.191,262 325,265.809 325,270.5C325,275.191 321.191,284.667 316.5,284.667C311.809,284.667 308,275.191 308,270.5C308,265.809 311.809,262 316.5,262Z" style="fill:rgb(144,224,239);"/></g><path d="M393.514,406.316C391.44,402.848 390.132,398.272 390.132,395.36C390.132,389.84 394.612,385.36 400.132,385.36C405.651,385.36 410.132,389.84 410.132,395.36C410.132,398.272 408.823,402.848 406.749,406.316C407.937,406.703 408.921,407.187 409.625,407.73C410.631,408.506 411.132,409.426 411.132,410.36C411.132,411.293 410.631,412.213 409.625,412.989C407.843,414.364 404.267,415.36 400.132,415.36C395.996,415.36 392.42,414.364 390.638,412.989C389.632,412.213 389.132,411.293 389.132,410.36C389.132,409.426 389.632,408.506 390.638,407.73C391.342,407.187 392.326,406.703 393.514,406.316ZM405.578,408.037C403.998,410.057 402.101,411.36 400.132,411.36C398.162,411.36 396.265,410.057 394.685,408.037C393.862,408.267 393.138,408.55 392.541,408.876C392.061,409.138 391.672,409.421 391.41,409.736C391.244,409.935 391.132,410.138 391.132,410.36C391.132,410.581 391.244,410.784 391.41,410.983C391.672,411.298 392.061,411.581 392.541,411.843C394.252,412.777 397.019,413.36 400.132,413.36C403.244,413.36 406.011,412.777 407.722,411.843C408.202,411.581 408.591,411.298 408.853,410.983C409.019,410.784 409.132,410.581 409.132,410.36C409.132,410.138 409.019,409.935 408.853,409.736C408.591,409.421 408.202,409.138 407.722,408.876C407.125,408.55 406.401,408.267 405.578,408.037ZM400.132,387.36C404.547,387.36 408.132,390.944 408.132,395.36C408.132,398.193 406.737,402.756 404.612,405.957C403.335,407.881 401.835,409.36 400.132,409.36C398.428,409.36 396.928,407.881 395.651,405.957C393.526,402.756 392.132,398.193 392.132,395.36C392.132,390.944 395.716,387.36 400.132,387.36ZM400.132,389.36C397.372,389.36 395.132,391.6 395.132,394.36C395.132,397.119 397.372,399.36 400.132,399.36C402.891,399.36 405.132,397.119 405.132,394.36C405.132,391.6 402.891,389.36 400.132,389.36ZM400.132,391.36C401.787,391.36 403.132,392.704 403.132,394.36C403.132,396.015 401.787,397.36 400.132,397.36C398.476,397.36 397.132,396.015 397.132,394.36C397.132,392.704 398.476,391.36 400.132,391.36Z" style="fill:rgb(25,144,167);"/></g></svg>
  `,
  className: "live-icon",
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

  const liveLocation = useLiveLocationStore((state) => state.liveLocation);

  const [latLng, setLatLng] = useState<[number, number]>([
    Number(lat),
    Number(lng),
  ]);

  useEffect(() => {
    const newLatLng: [number, number] = [Number(lat), Number(lng)];
    setLatLng(newLatLng);
  }, [lat, lng]);

  useEffect(() => {
    if (liveLocation.lat !== null && liveLocation.lng !== null) {
      setLatLng([liveLocation.lat, liveLocation.lng]);
    }
  }, [liveLocation]);

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

        {liveLocation.lat && liveLocation.lng && (
          <Marker
            position={[liveLocation.lat, liveLocation.lng]}
            icon={liveIcon}
          />
        )}
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
