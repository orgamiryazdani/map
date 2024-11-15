"use client";
import { useLocationsStore } from "@/stores/locations.store";
import LocationCard from "../_components/location-card";
import { FormLocationValue } from "@/types/location.interface";

const SaveLocation = () => {
  const locations: FormLocationValue[] = useLocationsStore(
    (state) => state.locations,
  );

  return (
    <div className='col-start-2 col-end-13 row-start-2 row-end-8 pl-6 pb-6 z-10 flex flex-wrap gap-x-7'>
      {locations.map((location) => (
        <LocationCard key={location.placeName} location={location} />
      ))}
    </div>
  );
};

export default SaveLocation;
