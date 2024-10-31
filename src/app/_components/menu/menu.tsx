'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = () => {
  const pathname = usePathname();
  
  return (
    <div className='col-start-1 col-end-2 row-start-1 row-end-13 h-svh flex items-center justify-center'>
      <div className='navigation relative w-[70px] h-[93svh] dark:bg-secondary-content flex justify-center items-center rounded-2xl'>
        <div className="w-[51px] h-[58px] rounded-2xl dark:bg-base-100 font-bold text-2xl absolute top-4 flex items-center justify-center">A</div>
        <ul className='flex flex-col w-[70px] h-[100%] pt-[115px]'>
          <li className={`relative w-[70px] h-[70px] list-none z-10 ${pathname == "/" ? "active" : ""}`}>
            <Link
              className='relative flex justify-center items-center flex-col w-full text-center'
              href='/'>
              <span className='relative block line-height-[75px] text-lg text-center duration-100'>
                🏠
              </span>
            </Link>
          </li>
          <li className={`relative w-[70px] h-[70px] list-none z-10 ${pathname == '/test' ? "active" : ""}`}>
            <Link
              className='relative flex justify-center items-center flex-col w-full text-center'
              href='/test'>
              <span className='relative block line-height-[75px] text-lg text-center duration-300'>
                😍
              </span>
            </Link>
          </li>
          <div className='indicator absolute right-[65%] w-[55px] h-[120px] dark:bg-base-100 border-[6px] border-base-100 rounded-[20px] flex justify-center items-center duration-300 rotate-[270deg]'></div>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
