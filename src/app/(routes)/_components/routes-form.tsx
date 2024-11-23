"use client";
import { Button } from "@/app/_components/button";
import useUpdateLocation from "@/hooks/useUpdateLocation";
import { useLocationsStore } from "@/stores/locations.store";
import { FormLocationValue } from "@/types/location.interface";
import truncateText from "@/utils/truncateText";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const RoutesForm: React.FC = () => {
  const location = useSearchParams();
  const lat = Number(location.get("lat")) || 29.61563539020847;
  const lng = Number(location.get("lng")) || 52.5175996466605;
  const startLng = Number(location.get("startLng")) || 0;
  const startLat = Number(location.get("startLat")) || 0;
  const endLng = Number(location.get("endLng")) || 0;
  const endLat = Number(location.get("endLat")) || 0;

  const [routeLocation, setRouteLocation] = useState({
    startLat,
    startLng,
    endLat,
    endLng,
  });

  const routeLocationHandler = (stepValue: number) => {
    if (stepValue === 2) {
      setRouteLocation((prev) => ({
        ...prev,
        startLat: lat,
        startLng: lng,
      }));
    }
    if (stepValue === 3) {
      setRouteLocation((prev) => ({
        ...prev,
        endLat: lat,
        endLng: lng,
      }));
    }
  };

  const locations: FormLocationValue[] = useLocationsStore(
    (state) => state.locations,
  );

  const setLocationToSaveLocation = (saveLat: number, saveLng: number) => {
    setLocation({
      lat: saveLat,
      lng: saveLng,
    });
  };

  const setLocation = useUpdateLocation();

  const setRouteHandler = () => {
    setLocation({
      startLat: routeLocation.startLat,
      startLng: routeLocation.startLng,
      endLat: routeLocation.endLat,
      endLng: routeLocation.endLng,
    });
  };

  return (
    <div className='lg:w-1/2 w-full lg:h-full min-h-[500px] flex flex-col justify-between'>
      <div className='flex flex-col items-end gap-y-2'>
        <div className='w-full text-sm border border-neutral h-12 rounded-lg flex items-center justify-start px-3'>
          {routeLocation.startLat > 0
            ? `${routeLocation.startLat} , ${routeLocation.startLng}`
            : "مبدا خود را از روی نقشه انتخاب کنید"}
        </div>
        <div className='flex items-center justify-center gap-x-2'>
          <Button
            onClick={() => routeLocationHandler(2)}
            className='w-48 bg-info text-primary-content'
            variant='info'>
            {startLat === 0 ? "تایید مبدا" : "انتخاب مبدا جدید"}
          </Button>
        </div>
      </div>
      <div className='flex flex-col items-end gap-y-2'>
        <div className='w-full text-sm border border-neutral h-12 rounded-lg flex items-center justify-start px-3'>
          {routeLocation.endLat > 0
            ? `${routeLocation.endLat} , ${routeLocation.endLng}`
            : "مقصد خود را از روی نقشه انتخاب کنید"}
        </div>
        <div className='flex items-center justify-center gap-x-2'>
          <Button
            onClick={() => routeLocationHandler(3)}
            className='w-48 bg-primary text-primary-content'
            variant='primary'>
            {endLat === 0 ? "تایید مقصد" : "انتخاب مقصد جدید"}
          </Button>
        </div>
      </div>
      <div className='flex flex-col gap-y-3'>
        <label className='w-full'>مکان های ذخیره شده</label>
        {locations.length > 0 ? (
          <div className='flex flex-wrap lg:justify-between justify-center gap-y-4 gap-x-4 lg:gap-x-0 max-h-44 h-auto overflow-y-auto w-full pl-2'>
            {locations.map((location) => (
              <div
                key={location.address}
                onClick={() =>
                  setLocationToSaveLocation(location.lat, location.lng)
                }
                className='w-72 gap-y-2 flex flex-col h-28 rounded-xl cursor-pointer saveLocationCardBg dark:text-base-25 p-2'>
                <p className='font-black text-lg'>
                  {truncateText(location.placeName, 26)}
                </p>
                <p className='font-bold'>
                  {truncateText(location.address, 33)}
                </p>
                <div className='flex items-center gap-x-2 [&>*]:bg-base-25 [&>*]:text-white [&>*]:rounded-md [&>*]:px-2 [&>*]:pt-1 [&>*]:text-sm'>
                  <span>{location.lat}</span>
                  <span>{location.lng}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='w-full p-3 rounded-md bg-base-25'>
            هیج مکان ذخیره شده ای وجود ندارد
          </div>
        )}
      </div>
      <Button
        onClick={setRouteHandler}
        className='bg-base-content'
        shape='full'
        variant='neutral'>
        شروع سفر
      </Button>
    </div>
  );
};

export default RoutesForm;
