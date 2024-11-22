import LocationCard from "../_components/location-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مکان های ذخیره شده",
};

const SaveLocation = () => {
  return (
    <div className='lg:col-start-2 col-start-1 col-end-13 row-start-3 row-end-8 lg:pl-6 pb-6 z-10 flex items-center lg:items-start lg:justify-start justify-center gap-y-5 flex-wrap gap-x-7'>
      <LocationCard />
    </div>
  );
};

export default SaveLocation;
