import { useSearchParams } from "next/navigation";
import { Button } from "../button";
import { IconPin } from "../icons/icons";
import useUpdateLocation from "@/hooks/useUpdateLocation";

export const Pin = () => {
  const updateLocation = useUpdateLocation();
  const location = useSearchParams();
  const lat = Number(location.get("lat")) || null;
  const lng = Number(location.get("lng")) || null;

  const pinHandler = () => {
    updateLocation({
      pinlat: lat,
      pinlng: lng,
    });
  };

  return (
    <Button
      onClick={pinHandler}
      className='w-10 h-10 bg-base-25 text-base-content'
      shape='square'
      variant='neutral'>
      <IconPin />
    </Button>
  );
};
