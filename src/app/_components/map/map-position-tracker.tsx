import { useMapEvents } from "react-leaflet";
import { useRef } from "react";
import useUpdateLocation from "@/hooks/useUpdateLocation";
import { MapTrackerProps } from "./map-types";

export const MapPositionTracker: React.FC<MapTrackerProps> = ({
  location,
  buttonPosition,
}) => {
  const updateLocation = useUpdateLocation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const map = useMapEvents({
    move: () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    },
    moveend: () => {
      timeoutRef.current = setTimeout(() => {
        const center = map.getCenter();

        updateLocation({
          lat: center.lat,
          lng: center.lng,
        });

        const bounds = map.getBounds();
        if (
          location[0] !== null &&
          location[1] !== null &&
          !bounds.contains([location[0], location[1]])
        ) {
          if (location[0] > bounds.getNorth()) {
            buttonPosition.current = "top";
          } else if (location[0] < bounds.getSouth()) {
            buttonPosition.current = "bottom";
          } else if (location[1] < bounds.getWest()) {
            buttonPosition.current = "left";
          } else if (location[1] > bounds.getEast()) {
            buttonPosition.current = "right";
          }
        } else {
          buttonPosition.current = null;
        }

        timeoutRef.current = null;
      }, 200);
    },
  });

  return null;
};
