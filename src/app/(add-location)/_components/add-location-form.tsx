"use client";

import { Button } from "@/app/_components/button";
import { Textbox } from "@/app/_components/textbox";
import { API_KEY } from "@/config/global";
import { readData } from "@/core/http-service";
import { useNotificationStore } from "@/stores/notification.store";
import { Feature, FormLocationValue } from "@/types/location.interface";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocationsStore } from "@/stores/locations.store";
import truncateText from "@/utils/truncateText";

const categoryItem: { id: number; title: string }[] = [
  { id: 1, title: "منطقه مسکونی" },
  { id: 2, title: "خرید" },
  { id: 3, title: "خدمات" },
  { id: 4, title: "هتل و اقامتگاه" },
  { id: 5, title: "فضای آزاد و تفریح" },
  { id: 6, title: "مذهب" },
  { id: 7, title: "دفتر کار و کارخانه" },
  { id: 8, title: "غذا و نوشیدنی" },
  { id: 9, title: "آموزشی" },
];

export const AddLocationForm: React.FC = () => {
  const location = useSearchParams();
  const lat = Number(location.get("lat")) || 29.61563539020847;
  const lng = Number(location.get("lng")) || 52.5175996466605;

  const [formValue, setFormValue] = useState<FormLocationValue>({
    address: "",
    placeName: "",
    categoryName: "منطقه مسکونی",
    lng: 0,
    lat: 0,
  });

  const showNotification = useNotificationStore(
    (state) => state.showNotification,
  );
  const { saveLocation, locations } = useLocationsStore((state) => state);

  useEffect(() => {
    const getData = async () => {
      const { features }: { features: [Omit<Feature, "bbox">] } =
        await readData(
          `/geocode/reverse?api_key=${API_KEY}&point.lat=${lat}&point.lon=${lng}&size=1`,
        );
      setFormValue((prev) => ({
        ...prev,
        address: features[0].properties.label,
        lng: features[0].geometry.coordinates[0],
        lat: features[0].geometry.coordinates[1],
      }));
    };
    getData();
  }, [lat, lng]);

  const saveLocationHandler = () => {
    if (formValue.placeName === "") {
      showNotification({
        message: "نام مکان را وارد کنید",
        type: "error",
      });
      return;
    }
    const isDuplicate = locations.some(
      (item: FormLocationValue) =>
        item.lat === formValue.lat && item.lng === formValue.lng,
    );
    if (isDuplicate) {
      showNotification({
        message: "این آدرس تکراری است",
        type: "error",
      });
      return;
    }
    saveLocation(formValue);
    showNotification({
      message: "آدرس شما با موفقیت اضافه شد",
      type: "success",
    });
    setFormValue((prev) => ({
      ...prev,
      placeName: "",
    }));
  };

  return (
    <div className='lg:w-1/2 w-full lg:h-full min-h-[500px] flex flex-col justify-between'>
      <div className='gap-y-1 flex flex-col'>
        <label>نام مکان</label>
        <Textbox
          value={formValue.placeName}
          onChange={(e) =>
            setFormValue({ ...formValue, placeName: e.target.value })
          }
        />
      </div>
      <div className='gap-y-1 flex flex-col'>
        <label>دسته بندی</label>
        <select
          className='h-12 border border-neutral bg-transparent rounded-lg px-2'
          onChange={(e) =>
            setFormValue({ ...formValue, categoryName: e.target.value })
          }>
          {categoryItem.map((category) => (
            <option
              className='text-base-300'
              key={category.id}
              value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div className='gap-y-1 flex flex-col'>
        <label
          className='flex items-center gap-x-1'>
          مختصات
          <span className='lg:text-[11px] text-[9px]'>
            ( مکان مورد نظر خود را از روی نقشه انتخاب کنید )
          </span>
        </label>
        <div className='flex flex-col gap-y-4 text-sm w-full h-32 p-3 rounded-xl dark:bg-neutral bg-base-content '>
          <p className='lg:text-xl text-sm font-bold'>
            آدرس : {truncateText(formValue.address, 45)}{" "}
          </p>
          <span>طول : {lng}</span>
          <span>عرض : {lat}</span>
        </div>
      </div>
      <Button
        variant='neutral'
        onClick={saveLocationHandler}
        className="text-base-300 bg-base-content"
        shape='full'>
        اضافه کردن
      </Button>
    </div>
  );
};
