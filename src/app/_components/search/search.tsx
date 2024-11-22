"use client";
import { searchAction } from "@/actions/search";
import { useFormState } from "react-dom";
import { IconClose, IconSearch } from "../icons/icons";
import { Textbox } from "../textbox";
import { Button } from "../button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { Feature } from "@/types/location.interface";
import { useNotificationStore } from "@/stores/notification.store";

export const Search: React.FC = () => {
  const [formState, action] = useFormState(searchAction, null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const [locationResults, setLocationResults] = useState<Feature[] | []>([]);
  const showNotification = useNotificationStore(
    (state) => state.showNotification,
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (formState && !formState.isSuccess && formState.error) {
      showNotification({
        message: formState.error.detail!,
        type: "error",
      });
    } else if (formState?.response && formState.isSuccess) {
      if (formState.response.features.length > 0) {
        setLocationResults(formState.response.features);
      } else {
        showNotification({
          message: "هیچ مکانی یافت نشد",
          type: "error",
        });
      }
    }
  }, [formState, showNotification]);

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
      const formData = new FormData();
      formData.append("text", inputValue.trim());
      startTransition(async () => {
        await action(formData);
      });
    } else {
      showNotification({
        message: "لطفا مقداری وارد کنید",
        type: "error",
      });
    }
  };

  const enterSearchHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getLocation();
    }
  };

  return (
    <div className='flex items-center justify-center w-2/5 gap-x-2 relative'>
      {/* search box */}
      <IconSearch className='absolute right-0 mr-2 text-base-content' />
      <Textbox
        className='h-10 dark:border-neutral bg-base-25 text-base-content pr-9 !outline-none'
        placeholder='نام یک مکان یا شهر'
        variant='neutral'
        ref={inputRef}
        onKeyDown={enterSearchHandler}
      />
      {/* location results box */}
      {locationResults.length > 0 && (
        <div className='absolute w-full h-auto max-h-96 overflow-y-auto box flex flex-col gap-y-0 min-h-12 bg-base-25 top-12 z-50 rounded-xl p-3 text-sm '>
          <IconClose
            className='left-3 top-4 cursor-pointer absolute text-base-content'
            onClick={() => setLocationResults([])}
          />
          {locationResults.map((location) => (
            <div
              className='hover:bg-base-content hover:text-base-300 text-base-content rounded-lg p-2 cursor-pointer'
              key={location.properties.label}
              onClick={() => setQueryLocation(location.geometry.coordinates)}>
              {location.properties.label}
            </div>
          ))}
        </div>
      )}
      {/* search btn */}
      <Button
        isLoading={isPending}
        loadingText='جستجو'
        onClick={getLocation}
        className='h-10 text-sm dark:bg-base-content bg-base-content dark:text-base-300'
        variant='ghost'>
        جستجو
      </Button>
    </div>
  );
};
