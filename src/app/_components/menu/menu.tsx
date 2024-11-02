"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconAdd,
  IconArrowRight,
  IconBookmark,
  IconHome,
  IconMap,
  IconMoon,
} from "../icons/icons";

const menuItems = [
  {
    id: 1,
    path: "/",
    icon: <IconHome />,
  },
  {
    id: 2,
    path: "/add-location",
    icon: <IconAdd />,
  },
  {
    id: 3,
    path: "/save-location",
    icon: <IconBookmark />,
  },
  {
    id: 4,
    path: "/location",
    icon: <IconArrowRight />,
  },
];

const Menu: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className='col-start-1 col-end-2 row-start-1 row-end-13 h-svh flex items-center justify-center'>
      <div className='navigation relative w-[70px] h-[93svh] dark:bg-base-content flex justify-center items-center rounded-2xl'>
        <div className='w-[51px] h-[58px] rounded-2xl dark:bg-base-100 font-bold text-2xl absolute top-4 flex items-center justify-center'>
          <IconMap stroke='#fff' />
        </div>
        <ul className='flex flex-col w-[70px] h-[100%] pt-[115px]'>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`relative w-[70px] h-[70px] list-none z-10 ${
                pathname == item.path ? "active" : ""
              }`}>
              <Link
                className='relative flex justify-center items-center flex-col w-full text-center'
                href={item.path}>
                <span className='relative block line-height-[75px] text-lg text-center duration-100'>
                  {item.icon}
                </span>
              </Link>
            </li>
          ))}
          <div className='indicator absolute right-[65%] w-[55px] h-[120px] dark:bg-base-100 border-[6px] border-base-100 rounded-[20px] flex justify-center items-center duration-300 rotate-[270deg]'></div>
        </ul>
        <div className='absolute bottom-5'>
          <IconMoon stroke='#000' />
        </div>
      </div>
    </div>
  );
};

export default Menu;
