import { Map } from "@/app/_components/map";
import { AddLocationForm } from "../_components/add-location-form";

const AddLocation = () => {
  return (
    <section className='col-start-2 col-end-13 row-start-2 row-end-8 z-10 flex pl-6 pb-6 gap-x-7'>
      <AddLocationForm />
      <div className='w-1/2 h-auto'>
        <Map />
      </div>
    </section>
  );
};

export default AddLocation;