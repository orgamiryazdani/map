"use client";
import { Map } from "./_components/map";

export default function Home() {
  return (
    <div className='lg:col-start-2 col-start-1 col-end-13 row-start-3 row-end-[-1] max-h-[800px] pb-6 pl-6 pr-6 lg:pr-0 overflow-auto'>
      <title>نقشه</title>
      <Map />
    </div>
  );
}