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
    <div className='col-start-2 col-end-13 row-start-2 row-end-8 pl-6 pb-6 z-10 flex flex-wrap gap-x-7'>
      {locations.length > 0 ? (
        locations.map((location) => (
          <LocationCard
            key={location.placeName}
            location={location || []}
          />
        ))
      ) : (
        <div className="w-full h-32 flex flex-col items-center justify-center gap-y-4">
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
