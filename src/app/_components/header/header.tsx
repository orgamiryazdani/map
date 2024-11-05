"use client";

import { Button } from "../button";
import { IconPin } from "../icons/icons";
import { Layer } from "../layers";
import { LiveLocation } from "../live-location";
import { Search } from "../search";

const Header: React.FC = () => {
  return (
    <header className='col-start-2 col-end-13 row-start-1 row-end-2 flex items-center justify-between pl-7'>
      <Search />
      {/* feature btn => live location , layer map , pin location */}
      <div className='flex items-center gap-x-4'>
        <Layer />
        <LiveLocation />
        <Button
          className='w-10 h-10'
          shape='square'
          variant='neutral'>
          <IconPin />
        </Button>
      </div>
    </header>
  );
};

export default Header;
