export type MapTrackerProps = {
    location: [number | null, number | null];
    buttonPosition: {
        current: string | null
    };
}

export type MapState = {
    lat: number;
    lng: number;
}

export type OutOfViewButtonProps = {
    pinlat: number | null;
    pinlng: number | null;
    buttonPosition: {
        current: string | null
    };
}
