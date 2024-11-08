"use client";

import useUpdateLocation from "@/hooks/useUpdateLocation";
import { Button } from "../button";
import { IconLocation } from "../icons/icons";
import { useNotificationStore } from "@/stores/notification.store";

export const LiveLocation: React.FC = () => {
  const showNotification = useNotificationStore(
    (state) => state.showNotification,
  );
  const updateLocation = useUpdateLocation();
  console.log(updateLocation);

  const setUserLocation = () => {
    if (!navigator.geolocation) {
      showNotification({
        message: "مرورگر شما از موقعیت جغرافیایی پشتیبانی نمی کند",
        type: "error",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          livelat: position.coords.latitude,
          livelng: position.coords.longitude,
        };
        updateLocation(locationData);
      },
      (error) => {
        showNotification({
          message: error.message,
          type: "error",
        });
      },
    );
  };

  return (
    <Button
      onClick={setUserLocation}
      className='w-10 h-10'
      shape='square'
      variant='neutral'>
      <IconLocation />
    </Button>
  );
};
