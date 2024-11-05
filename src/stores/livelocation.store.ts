import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface LiveLocationState {
    liveLocation: {
        lat: number | null;
        lng: number | null;
    };
    isLoading: boolean;
    error: string | null;
    setUserLocation: () => void;
}

export const useLiveLocationStore = create<LiveLocationState>()(
    devtools((set) => ({
        liveLocation: {
            lat: null,
            lng: null,
        },
        isLoading: false,
        error: null,
        setUserLocation: () => {
            if (!navigator.geolocation) {
                set({ error: "مرورگر شما از موقعیت جغرافیایی پشتیبانی نمی کند" });
                return;
            }

            set({ isLoading: true, error: null });

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    set({
                        liveLocation: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        },
                        isLoading: false,
                        error: null,
                    });
                },
                (error) => {
                    set({
                        error: error.message,
                        isLoading: false,
                    });
                }
            );
        },
    }))
);
