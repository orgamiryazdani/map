import { Map } from "@/app/_components/map";
import RoutesForm from "../_components/routes-form";

const Routes = () => {
  return (
    <div className='lg:col-start-2 col-start-1 col-end-13 row-start-3 row-end-8 max-h-[800px] overflow-y-auto gap-y-3 lg:gap-y-0 z-10 flex flex-col lg:flex-row pl-6 pr-6 lg:pr-0 pb-6 gap-x-7'>
      <RoutesForm />
      <div className='lg:w-1/2 w-full lg:h-full min-h-[300px]'>
        <Map />
      </div>
    </div>
  );
};

export default Routes;
