"use client";
import { Suspense } from "react";
import { Map } from "./_components/map";
import { Loading } from "./_components/loading";

export default function Home() {
  return (
    <div className='lg:col-start-2 col-start-1 col-end-13 row-start-3 row-end-[-1] max-h-[800px] pb-6 pl-6 pr-6 lg:pr-0 overflow-auto'>
      <title>نقشه</title>
      <Suspense
        fallback={
          <Loading
            variant='accent'
            type='spinner'
          />
        }>
        <Map />
      </Suspense>
    </div>
  );
}
