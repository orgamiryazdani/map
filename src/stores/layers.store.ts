import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import standardMap from "/public/images/standardmap.png";
import satelliteMap from "/public/images/satellitemap.png";
import streetMap from "/public/images/streetmap.png";
import dayMap from "/public/images/daymap.png";
import nightMap from "/public/images/nightmap.png";
import { Layer } from "@/types/layer.interface";

type LayerStore = {
    layers: Layer[];
    setActiveMap: (id: number) => void;
}

export const useLayerStore = create<LayerStore>()(
    devtools(
        persist(
            (set) => ({
                layers: [
                    {
                        id: 1,
                        title: "استاندارد",
                        image: standardMap,
                        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`,
                        isActive: true,
                    },
                    {
                        id: 2,
                        title: "ماهواره‌ای",
                        image: satelliteMap,
                        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                        attribution: `&copy; <a href="https://www.esri.com">Esri</a>`,
                        isActive: false,
                    },
                    {
                        id: 3,
                        title: "خیابانی",
                        image: streetMap,
                        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
                        attribution: `&copy; <a href="https://www.esri.com">Esri</a>`,
                        isActive: false,
                    },
                    {
                        id: 4,
                        title: "روز",
                        image: dayMap,
                        url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
                        attribution: `&copy; <a href="https://carto.com/attributions">CARTO</a>`,
                        isActive: false,
                    },
                    {
                        id: 5,
                        title: "شب",
                        image: nightMap,
                        url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
                        attribution: `&copy; <a href="https://carto.com/attributions">CARTO</a>`,
                        isActive: false,
                    },
                ],
                setActiveMap: (id: number) => {
                    set((state) => ({
                        layers: state.layers.map((layer: Layer) => ({
                            ...layer,
                            isActive: layer.id === id,
                        })),
                    }));
                },
            }),
            {
                name: "local-layer",
                partialize: (state) =>
                    Object.fromEntries(
                        Object.entries(state).filter(([key]) => key !== "setActiveMap")
                    ),
            }
        )
    )
);
