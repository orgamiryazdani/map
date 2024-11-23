import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { FormLocationValue } from "@/types/location.interface";

type LocationsStore = {
  locations: FormLocationValue[];
  saveLocation: (formValue: FormLocationValue) => void;
  deleteLocation: (lat: number, lng: number) => void;
  editLocation: (lat: number, lng: number, updatedLocation: FormLocationValue) => void;
};

export const useLocationsStore = create<LocationsStore>()(
  devtools(
    persist(
      (set) => ({
        locations: [],
        saveLocation: (formValue) => {
          set((state) => ({
            locations: [...state.locations, formValue],
          }));
        },
        deleteLocation: (lat, lng) => {
          set((state) => ({
            locations: state.locations.filter(
              (item) => item.lat !== lat || item.lng !== lng
            ),
          }));
        },
        editLocation: (lat, lng, updatedLocation) => {
          set((state) => ({
            locations: state.locations.map((item) =>
              item.lat === lat && item.lng === lng ? updatedLocation : item
            ),
          }));
        },
      }),
      { name: "locations-storage" }
    )
  )
);
