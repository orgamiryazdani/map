"use client";
import { Button } from "@/app/_components/button";
import { IconDelete } from "@/app/_components/icons/icons";
import { useLocationsStore } from "@/stores/locations.store";
import truncateText from "@/utils/truncateText";
import Link from "next/link";

const LocationCard: React.FC = () => {
  const { deleteLocation, locations } = useLocationsStore((state) => state);

  return (
    <>
      {locations.length > 0 ? (
        locations.map((location) => (
          <div
            key={location.placeName}
            className='lg:w-[31.7%] w-72 h-auto max-h-44 rounded-2xl text-base-50 saveLocationCardBg p-3 flex flex-col justify-between'>
            <Link
              href={`/?lat=${location.lat}&lng=${location.lng}`}
              className='h-[113px] flex flex-col justify-between'>
              <p className='font-black text-2xl'>
                {truncateText(location.placeName, 27)}
              </p>
              <p className='font-bold text-lg'>
                {truncateText(location.address, 35)}
              </p>
              <p className='font-semibold'>
                دسته بندی : {location.categoryName}
              </p>
            </Link>
            <div className='flex justify-between'>
              <div className='flex items-center gap-x-3 [&>*]:bg-base-25 [&>*]:px-2 [&>*]:text-secondary-content [&>*]:rounded-md [&>*]:h-6 [&>*]:pt-0.5'>
                <p>{location.lat}</p>
                <p>{location.lng}</p>
              </div>
              <div className='flex items-center gap-x-2'>
                {/* <IconEdit /> */}
                <IconDelete
                  onClick={() => deleteLocation(location.lat, location.lng)}
                  className='cursor-pointer'
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='w-full h-32 flex flex-col items-center justify-center gap-y-4 px-4 lg:px-0'>
          <div className='w-full h-12 p-3 rounded-md bg-base-25 text-secondary-content'>
            هیج مکان ذخیره شده ای وجود ندارد
          </div>
          <Link
            href='/add-location'
            className='w-full'>
            <Button
              shape='full'
              className="bg-secondary"
              variant='secondary'>
              افزودن یک مکان
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default LocationCard;
