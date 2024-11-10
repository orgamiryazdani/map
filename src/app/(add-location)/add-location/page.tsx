"use client";

import { Button } from "@/app/_components/button";
import { Map } from "@/app/_components/map";
import { Textbox } from "@/app/_components/textbox";
import { API_KEY } from "@/config/global";
import { readData } from "@/core/http-service";
import { Feature } from "@/types/location.interface";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const categoryItem = [
  {
    id: 1,
    title: "غذا و نوشیدنی",
  },
  {
    id: 2,
    title: "خرید",
  },
  {
    id: 3,
    title: "خدمات",
  },
  {
    id: 4,
    title: "هتل و اقامتگاه",
  },
  {
    id: 5,
    title: "فضای آزاد و تفریح",
  },
  {
    id: 6,
    title: "مذهب",
  },
  {
    id: 7,
    title: "دفتر کار و کارخانه",
  },
  {
    id: 8,
    title: "منطقه مسکونی",
  },
  {
    id: 9,
    title: "آموزشی",
  },
];

const AddLocation = () => {
  const [address, setAddress] = useState("");
  const location = useSearchParams();
  const lat = Number(location.get("lat")) || 29.61563539020847;
  const lng = Number(location.get("lng")) || 52.5175996466605;

  useEffect(() => {
    const getData = async () => {
      const { features }: { features: [Omit<Feature, "bbox">] } =
        await readData(
          `/geocode/reverse?api_key=${API_KEY}&point.lat=${lat}&point.lon=${lng}&size=1`,
        );
      setAddress(features[0].properties.label);
    };
    getData();
  }, [lat, lng]);

  return (
    <section className='col-start-2 col-end-13 row-start-2 row-end-8 z-10 flex pl-6 pb-6 gap-x-7'>
      <div className='w-1/2 h-full flex flex-col justify-between'>
        <div className='gap-y-1 flex flex-col'>
          <label htmlFor=''>نام مکان</label>
          <Textbox />
        </div>
        <div className='gap-y-1 flex flex-col'>
          <label htmlFor=''>دسته بندی</label>
          <select className="h-12 border border-neutral bg-transparent rounded-lg px-2">
            {categoryItem.map((category) => (
              <option
              className="text-base-300"
                key={category.id}
                value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          {/* <Textbox /> */}
        </div>
        <div className='gap-y-1 flex flex-col'>
          <label
            className='flex items-center gap-x-1'
            htmlFor=''>
            مختصات
            <span className='text-[11px]'>
              ( مکان مورد نظر خود را از روی نقشه انتخاب کنید )
            </span>
          </label>
          <div className='flex flex-col gap-y-4 text-sm w-full h-32 p-3 rounded-xl bg-neutral'>
            <p className='text-xl font-bold'>آدرس : {address}</p>
            <span>طول : {lng}</span>
            <span>عرض : {lat}</span>
          </div>
        </div>
        <Button
          variant='neutral'
          shape='full'>
          اضافه کردن
        </Button>
      </div>
      <div className='w-1/2 h-auto'>
        <Map />
      </div>
    </section>
  );
};

export default AddLocation;
