import { useMapEvents } from "react-leaflet";
import useUpdateLocation from "@/hooks/useUpdateLocation";
import { MapTrackerProps } from "./map-types";

export const MapPositionTracker: React.FC<MapTrackerProps> = ({
  location,
  buttonPosition,
}: MapTrackerProps) => {
  const updateLocation = useUpdateLocation();
  const map = useMapEvents({
    moveend: () => {
      if (location[0] !== null && location[1] !== null) {
        const bounds = map.getBounds();
        if (!bounds.contains(location as [number, number])) {
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
      }
      const center: { lat: number; lng: number } = map.getCenter();
      updateLocation({
        lat: center.lat,
        lng: center.lng,
      });
    },
  });
  return null;
};
