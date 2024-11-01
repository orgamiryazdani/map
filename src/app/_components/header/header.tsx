import { Button } from "../button";
import { IconLayer, IconLocation, IconPin, IconSearch } from "../icons/icons";
import { Textbox } from "../textbox";

const Header = () => {
  return (
    <header className='col-start-2 col-end-13 row-start-1 row-end-2 flex items-center justify-between pl-7'>
      <div className='flex items-center justify-center w-2/6 relative'>
        <IconSearch className='absolute right-0 mr-2' />
        <Textbox
          className='h-10 dark:border-base-25 bg-base-25 pr-9'
          placeholder='جستجو'
        />
      </div>
      <div className='flex items-center gap-x-4'>
        <Button
          className='w-10 h-10'
          shape='square'
          variant='neutral'>
          <IconLayer />
        </Button>
        <Button
          className='w-10 h-10'
          shape='square'
          variant='neutral'>
          <IconLocation />
        </Button>
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
