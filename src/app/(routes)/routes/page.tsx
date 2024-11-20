import { Map } from "@/app/_components/map";
import RoutesForm from "../_components/routes-form";

const Routes = () => {
  return (
    <div className='col-start-2 col-end-13 row-start-2 row-end-8 z-10 flex pl-6 pb-6 gap-x-7'>
      <RoutesForm />
      <div className='w-1/2 h-full'>
        <Map />
      </div>
    </div>
  );
};

export default Routes;
