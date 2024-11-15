"use client";
import { IconDelete } from "@/app/_components/icons/icons";
import { useLocationsStore } from "@/stores/locations.store";
import { FormLocationValue } from "@/types/location.interface";
import Link from "next/link";

const LocationCard: React.FC<{ location: FormLocationValue }> = ({
  location,
}: {
  location: FormLocationValue;
}) => {
  const { deleteLocation } = useLocationsStore((state) => state);
  const { address, categoryName, lat, lng, placeName } = location;

  return (
    <Link
      href={`/?lat=${lat}&lng=${lng}`}
      className='w-[31.7%] h-auto max-h-44 rounded-2xl text-base-50 saveLocationCardBg p-3 cursor-pointer flex flex-col justify-between gap-y-1'>
      <p className='font-black text-2xl'>{placeName}</p>
      <p className='font-bold text-lg'>{address}</p>
      <p className='font-semibold'>دسته بندی : {categoryName}</p>
      <div className='flex justify-between'>
        <div className='flex items-center gap-x-3 [&>*]:bg-base-25 [&>*]:px-2 [&>*]:text-secondary-content [&>*]:rounded-md [&>*]:h-6 [&>*]:pt-0.5'>
          <p>{lat}</p>
          <p>{lng}</p>
        </div>
        <div className='flex items-center gap-x-2'>
          {/* <IconEdit /> */}
          <IconDelete onClick={() => deleteLocation(lat, lng)} />
        </div>
      </div>
    </Link>
  );
};

export default LocationCard;