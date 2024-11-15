import { FormLocationValue } from "@/types/location.interface";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type LocationsStore = {
  locations: FormLocationValue[];
  saveLocation: (formValue: FormLocationValue) => void;
  deleteLocation: (lat: number, lng: number) => void;
  editLocation: (lat: number, lng: number, updatedLocation: FormLocationValue) => void;
};

export const useLocationsStore = create<LocationsStore>()(
  devtools((set) => {
    const allLocations = JSON.parse(localStorage.getItem("locations") ?? "[]");

    return {
      locations: allLocations,

      saveLocation: (formValue) => {
        const oldItems: FormLocationValue[] = JSON.parse(
          localStorage.getItem("locations") ?? "[]",
        );
        const updatedLocations = [...oldItems, formValue];
        localStorage.setItem("locations", JSON.stringify(updatedLocations));
        set({ locations: updatedLocations });
      },

      deleteLocation: (lat, lng) => {
        const oldItems: FormLocationValue[] = JSON.parse(
          localStorage.getItem("locations") ?? "[]",
        );

        const updatedLocations = oldItems.filter(
          (item) => item.lat !== lat || item.lng !== lng,
        );

        localStorage.setItem("locations", JSON.stringify(updatedLocations));
        set({ locations: updatedLocations });
        console.log("مکان با موفقیت حذف شد");
      },

      editLocation: (lat, lng, updatedLocation) => {
        const oldItems: FormLocationValue[] = JSON.parse(
          localStorage.getItem("locations") ?? "[]",
        );

        const updatedLocations = oldItems.map((item) =>
          item.lat === lat && item.lng === lng ? updatedLocation : item,
        );

        localStorage.setItem("locations", JSON.stringify(updatedLocations));
        set({ locations: updatedLocations });
        console.log("مکان با موفقیت ویرایش شد");
      },
    };
  }),
);
