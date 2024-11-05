"use client";

import { useLiveLocationStore } from "@/stores/livelocation.store";
import { Button } from "../button";
import { IconLocation } from "../icons/icons";
import { useNotificationStore } from "@/stores/notification.store";

export const LiveLocation: React.FC = () => {
  const { error, isLoading, setUserLocation } = useLiveLocationStore(
    (state) => state,
  );
  const showNotification = useNotificationStore(
    (state) => state.showNotification,
  );

  if (error) {
    showNotification({
      message: error,
      type: "error",
    });
  }

  return (
    <Button
      onClick={setUserLocation}
      className='w-10 h-10'
      shape='square'
      isLoading={isLoading}
      loadingText=''
      variant='neutral'>
      <IconLocation />
    </Button>
  );
};
