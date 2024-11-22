"use client";

import { Layer } from "../layers";
import { LiveLocation } from "../live-location";
import { Pin } from "../pin";
import { Search } from "../search";

const Header: React.FC = () => {
  return (
    <header className='lg:col-start-2 col-start-1 col-end-13 row-start-1 row-end-3 lg:min-h-20 flex flex-col lg:flex-row lg:items-center items-start lg:justify-between gap-y-6 lg:pl-7 px-5 lg:px-0 py-4 lg:py-0'>
      <Search />
      {/* feature btn => live location , layer map , pin location */}
      <div className='flex items-center gap-x-4'>
        <Layer />
        <LiveLocation />
        <Pin />
      </div>
    </header>
  );
};

export default Header;