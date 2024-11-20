"use client";
import { Button } from "@/app/_components/button";
import { IconClose } from "@/app/_components/icons/icons";
import useUpdateLocation from "@/hooks/useUpdateLocation";
import { useLocationsStore } from "@/stores/locations.store";
import { FormLocationValue } from "@/types/location.interface";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

const RoutesForm: React.FC = () => {
  const location = useSearchParams();
  const lat = Number(location.get("lat")) || 29.61563539020847;
  const lng = Number(location.get("lng")) || 52.5175996466605;
  const [step, setStep] = useState(1);

  const routeLocation = useRef({
    startLat: 0,
    startLng: 0,
    endLat: 0,
    endLng: 0,
  });

  const routeLocationHandler = (stepValue: number) => {
    setStep(stepValue);
    if (stepValue === 2) {
      routeLocation.current.startLat = lat;
      routeLocation.current.startLng = lng;
    }
    if (stepValue === 3) {
      routeLocation.current.endLat = lat;
      routeLocation.current.endLng = lng;
    }
  };

  const locations: FormLocationValue[] = useLocationsStore(
    (state) => state.locations,
  );

  const setLocation = useUpdateLocation();

  const setLocationToSaveLocation = (saveLat:number, saveLng:number) => {
    setLocation({
      lat: saveLat,
      lng: saveLng,
    });
  };

  const setRouteHandler = () => {
    setLocation({
      startLat: routeLocation.current.startLat,
      startLng: routeLocation.current.startLng,
      endLat: routeLocation.current.endLat,
      endLng: routeLocation.current.endLng,
    });
  };

  return (
    <div className='w-1/2 h-full flex flex-col justify-between'>
      <div className='flex flex-col items-end gap-y-2'>
        <div className='w-full text-sm border border-neutral h-12 rounded-lg flex items-center justify-start px-3'>
          {routeLocation.current.startLat > 0
            ? `${routeLocation.current.startLat} , ${routeLocation.current.startLng}`
            : "مبدا خود را از روی نقشه انتخاب کنید"}
        </div>
        <div className='flex items-center justify-center gap-x-2'>
          {step > 1 && (
            <IconClose
              onClick={() => routeLocationHandler(1)}
              stroke='#ff0000'
              className='cursor-pointer'
            />
          )}
          <Button
            isDisabled={step === 3 || step === 2}
            onClick={() => routeLocationHandler(2)}
            className='w-36'
            variant='info'>
            تایید مبدا
          </Button>
        </div>
      </div>
      <div className='flex flex-col items-end gap-y-2'>
        <div className='w-full text-sm border border-neutral h-12 rounded-lg flex items-center justify-start px-3'>
          {routeLocation.current.endLat > 0
            ? `${routeLocation.current.endLat} , ${routeLocation.current.endLng}`
            : "مقصد خود را از روی نقشه انتخاب کنید"}
        </div>
        <div className='flex items-center justify-center gap-x-2'>
          {step > 2 && (
            <IconClose
              onClick={() => routeLocationHandler(2)}
              stroke='#ff0000'
              className='cursor-pointer'
            />
          )}
          <Button
            isDisabled={step !== 2}
            onClick={() => routeLocationHandler(3)}
            className='w-36'
            variant='primary'>
            تایید مقصد
          </Button>
        </div>
      </div>
      <label className='w-full'>مکان های ذخیره شده</label>
      {locations.length > 0 ? (
        <div className='flex flex-wrap justify-between gap-y-4 max-h-44 h-auto overflow-y-auto w-full pl-2'>
          {locations.map((location) => (
            <div
              key={location.address}
              onClick={() =>
                setLocationToSaveLocation(location.lat, location.lng)
              }
              className='w-72 gap-y-2 flex flex-col h-28 rounded-xl cursor-pointer saveLocationCardBg dark:text-base-25 p-2'>
              <p className='font-black text-lg'>{location.placeName}</p>
              <p className='font-bold'>{location.address}</p>
              <div className='flex items-center gap-x-2 [&>*]:bg-base-25 [&>*]:dark:text-white [&>*]:rounded-md [&>*]:px-2 [&>*]:pt-1 [&>*]:text-sm'>
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
      <Button
        onClick={setRouteHandler}
        shape='full'
        variant='neutral'>
        شروع سفر
      </Button>
    </div>
  );
};

export default RoutesForm;
