import { StaticImageData } from "next/image";

export interface Layer {
    id: number;
    title: string;
    image: StaticImageData;
    url: string;
    attribution: string;
    isActive: boolean;
}