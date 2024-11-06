"use client";

import { Layer } from "../layers";
import { LiveLocation } from "../live-location";
import { Pin } from "../pin";
import { Search } from "../search";

const Header: React.FC = () => {
  return (
    <header className='col-start-2 col-end-13 row-start-1 row-end-2 flex items-center justify-between pl-7'>
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