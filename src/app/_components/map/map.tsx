"use client";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { useLayerStore } from "@/stores/layers.store";
import {
  endRoute,
  liveIcon,
  OutOfViewButton,
  pinIcon,
  saveLocation,
  startRoute,
} from "./map-icons";
import { MapPositionTracker } from "./map-position-tracker";
import { IconPinlocation } from "../icons/icons";
import { useLocationsStore } from "@/stores/locations.store";
import { readData } from "@/core/http-service";
import { API_KEY } from "@/config/global";
import { RouteData } from "@/types/location.interface";
import { useNotificationStore } from "@/stores/notification.store";
import truncateText from "@/utils/truncateText";

export const Map: React.FC = () => {
  const buttonPosition = useRef<string | null>(null);
  const location = useSearchParams();
  const lat = Number(location.get("lat")) || 29.61563539020847;
  const lng = Number(location.get("lng")) || 52.5175996466605;
  const livelat = Number(location.get("livelat")) || null;
  const livelng = Number(location.get("livelng")) || null;
  const pinlat = Number(location.get("pinlat")) || null;
  const pinlng = Number(location.get("pinlng")) || null;
  const startLat = Number(location.get("startLat")) || null;
  const startLng = Number(location.get("startLng")) || null;
  const endLat = Number(location.get("endLat")) || null;
  const endLng = Number(location.get("endLng")) || null;
  const [polylineValue, setPolylineValue] = useState<[number, number][]>([]);

  const showNotification = useNotificationStore(
    (state) => state.showNotification,
  );

  //layer active
  const activeLayer = useLayerStore((state) =>
    state.layers.find((layer) => layer.isActive),
  );

  const locations = useLocationsStore((state) => state.locations);

  useEffect(() => {
    setPolylineValue([]);
    const getData = async () => {
      try {
        const { features }: { features: RouteData[] } = await readData(
          `/v2/directions/driving-car?api_key=${API_KEY}&start=${startLng},${startLat}&end=${endLng},${endLat}`,
        );
        setPolylineValue(
          features[0].geometry.coordinates.map(
            ([lng, lat]: [number, number]) => [lat, lng],
          ),
        );
      } catch {
        if (startLat !== null && endLat !== null) {
          showNotification({
            type: "error",
            message: "نقطه قابل مسیر یابی یافت نشد",
          });
        }
      }
    };
    getData();
  }, [startLat, endLat]);

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
        {startLat !== null && (
          <Polyline
            positions={polylineValue}
            color='blue'
          />
        )}
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
        {startLat && startLng && polylineValue.length > 0 && (
          <Marker
            position={[Number(startLat), Number(startLng)]}
            icon={startRoute}
          />
        )}
        {endLat && endLng && polylineValue.length > 0 && (
          <Marker
            position={[Number(endLat), Number(endLng)]}
            icon={endRoute}
          />
        )}
        {locations.length > 0 &&
          locations.map((location) => (
            <Marker
              key={location.address}
              position={[location.lat, location.lng]}
              icon={saveLocation}>
              <Popup autoPan={false}>
                {truncateText(location.placeName, 42)}
              </Popup>
            </Marker>
          ))}
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
