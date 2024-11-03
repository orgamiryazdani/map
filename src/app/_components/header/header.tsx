"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../button";
import {
  IconClose,
  IconLayer,
  IconLocation,
  IconPin,
  IconSearch,
} from "../icons/icons";
import { Textbox } from "../textbox";
import { useState, useRef } from "react";
import { readData } from "@/core/http-service";
import { API_KEY } from "@/config/global";
import { Feature, GeocodingResponse } from "@/types/location.interface";

const Header: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const [locationResults, setLocationResults] = useState<Feature[] | []>([]);

  const setQueryLocation = async (location: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lng", String(location[0]));
    params.set("lat", String(location[1]));
    await router.push(`${pathname}?${params.toString()}`);
    setLocationResults([]);
  };

  const getLocation = async () => {
    const inputValue = inputRef.current?.value || "";
    if (inputValue.trim()) {
      const locationSearchParams: GeocodingResponse = await readData(
        `/geocode/search?api_key=${API_KEY}&text=${inputValue}`,
      );
      if (locationSearchParams.features?.length > 0) {
        setLocationResults(locationSearchParams.features);
      }
    }
  };

  return (
    <header className='col-start-2 col-end-13 row-start-1 row-end-2 flex items-center justify-between pl-7'>
      <div className='flex items-center justify-center w-2/5 gap-x-2 relative'>
        {/* search box */}
        <IconSearch className='absolute right-0 mr-2' />
        <Textbox
          className='h-10 dark:border-neutral bg-neutral pr-9 !outline-none'
          placeholder='نام یک مکان یا شهر'
          variant='neutral'
          ref={inputRef}
        />
        {/* location results box */}
        {locationResults.length > 0 && (
          <div className='absolute w-full h-auto box flex flex-col gap-y-0 min-h-12 bg-base-25 top-12 z-50 rounded-xl p-3 text-sm '>
            <IconClose
              className='left-3 top-4 cursor-pointer absolute'
              onClick={() => setLocationResults([])}
            />
            {locationResults.map((location) => (
              <div
                className='hover:bg-base-content hover:text-base-300 rounded-lg p-2 cursor-pointer'
                key={location.properties.label}
                onClick={() => setQueryLocation(location.geometry.coordinates)}>
                {location.properties.label}
              </div>
            ))}
          </div>
        )}
        {/* search btn */}
        <Button
          onClick={getLocation}
          className='h-10 text-sm dark:bg-base-content dark:text-base-300'
          variant='ghost'>
          جستجو
        </Button>
      </div>
      {/* feature btn => live location , layer map , pin location */}
      <div className='flex items-center gap-x-4'>
        <Button
          className='w-10 h-10'
          shape='square'
          variant='neutral'>
          <IconLayer />
        </Button>
        <Button
          className='w-10 h-10'
          shape='square'
          variant='neutral'>
          <IconLocation />
        </Button>
        <Button
          className='w-10 h-10'
          shape='square'
          variant='neutral'>
          <IconPin />
        </Button>
      </div>
    </header>
  );
};

export default Header;
