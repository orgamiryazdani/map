import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

type LocationData = {
    lat?: number;
    lng?: number;
    livelat?: number;
    livelng?: number;
    pinlat?: number | null;
    pinlng?: number | null;
    startLat?: number | null;
    startLng?: number | null;
    endLat?: number | null;
    endLng?: number | null;
};

const useUpdateLocation = () => {
    const router = useRouter();
    const pathname = usePathname();

    const updateLocation = useCallback(
        (locationData: LocationData) => {
            const params = new URLSearchParams(window.location.search);
            Object.entries(locationData).forEach(([key, value]) => {
                params.set(key, String(value));
            });
            router.replace(`${pathname}?${params.toString()}`);
        },
        [router, pathname]
    );
    return updateLocation;
};

export default useUpdateLocation;