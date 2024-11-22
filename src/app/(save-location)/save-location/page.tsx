"use client";
import { useLocationsStore } from "@/stores/locations.store";
import LocationCard from "../_components/location-card";
import { FormLocationValue } from "@/types/location.interface";
import { Button } from "@/app/_components/button";
import Link from "next/link";

const SaveLocation = () => {
  const locations: FormLocationValue[] = useLocationsStore(
    (state) => state.locations,
  );

  return (
    <div className='lg:col-start-2 col-start-1 col-end-13 row-start-3 row-end-8 lg:pl-6 pb-6 z-10 flex items-center lg:items-start lg:justify-start justify-center gap-y-5 flex-wrap gap-x-7'>
      {locations.length > 0 ? (
        locations.map((location) => (
          <LocationCard
            key={location.placeName}
            location={location || []}
          />
        ))
      ) : (
        <div className="w-full h-32 flex flex-col items-center justify-center gap-y-4 px-4 lg:px-0">
          <div className='w-full h-12 p-3 rounded-md bg-base-25'>
            هیج مکان ذخیره شده ای وجود ندارد
          </div>
          <Link href='/add-location' className="w-full">
          <Button shape="full" variant='secondary' >افزودن یک مکان</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SaveLocation;
