"use client";

import Image from "next/image";
import { Button } from "../button";
import { IconLayer } from "../icons/icons";
import { useState } from "react";
import { useLayerStore } from "@/stores/layers.store";

export const Layer: React.FC = () => {
  const [showMapBox, setShowMapBox] = useState(false);
  const { layers, setActiveMap } = useLayerStore((state) => state);

  const changeLayerHandler = (id: number) => {
    setActiveMap(id);
    setShowMapBox(false);
  };

  return (
    <div className='relative flex flex-col items-center justify-center'>
      <Button
        onClick={() => setShowMapBox(!showMapBox)}
        className='w-10 h-10'
        shape='square'
        variant='neutral'>
        <IconLayer />
      </Button>

      {showMapBox && (
        <div className='w-56 h-44 p-1 gap-x-2 rounded-xl flex flex-wrap items-center justify-center bg-base-25 absolute top-14 z-50'>
          {layers.map((map) => (
            <div
              onClick={() => changeLayerHandler(map.id)}
              className='w-16 h-16 gap-y-1 text-xs flex flex-col items-center justify-center cursor-pointer rounded-md'
              key={map.id}>
              <Image
                alt={map.title}
                src={map.image}
                className={`bg-cover w-full rounded-md max-h-20 min-h-14 ${
                  map.isActive && "border-2 border-primary"
                }`}
              />
              <h1>{map.title}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
