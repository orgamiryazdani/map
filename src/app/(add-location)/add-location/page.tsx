"use client";
import { Map } from "@/app/_components/map";
import { AddLocationForm } from "../_components/add-location-form";
import { Suspense } from "react";
import { Loading } from "@/app/_components/loading";

const AddLocation = () => {
  return (
    <section className='lg:col-start-2 col-start-1 col-end-13 row-start-3 row-end-8 max-h-[800px] overflow-y-auto z-10 flex flex-col lg:flex-row pl-6 pr-6 lg:pr-0 pb-6 gap-x-7 gap-y-3 lg:gap-y-0'>
      <title>اضافه کردن مکان</title>
      <Suspense
        fallback={
          <Loading
            variant='accent'
            type='spinner'
          />
        }>
        <AddLocationForm />
        <div className='lg:w-1/2 w-full lg:h-auto min-h-[300px]'>
          <Map />
        </div>
      </Suspense>
    </section>
  );
};

export default AddLocation;
