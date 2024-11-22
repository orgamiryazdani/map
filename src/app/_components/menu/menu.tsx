"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconAdd,
  IconArrowRight,
  IconBookmark,
  IconClose,
  IconHome,
  IconMap,
  IconMenuBar,
  IconMoon,
  IconSun,
} from "../icons/icons";
import { useEffect, useState } from "react";

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
    path: "/routes",
    icon: <IconArrowRight />,
  },
];

const Menu: React.FC = () => {
  const pathname = usePathname();
  const [activeTheme, setActiveTheme] = useState<string>("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "system" || !savedTheme) {
      applySystemTheme();
      setActiveTheme("system");
    } else {
      applyTheme(savedTheme);
      setActiveTheme(savedTheme);
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      if (!savedTheme || savedTheme === "system") {
        applySystemTheme();
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  const applyTheme = (theme: string) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setActiveTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "system") {
      applySystemTheme();
    } else {
      applyTheme(newTheme);
    }
  };

  const applySystemTheme = () => {
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (systemPrefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <IconMenuBar
        className='lg:hidden absolute top-[73px] left-5 w-10 h-10'
        onClick={() => setShowMenu(true)}
      />
      <div
        className={`absolute w-svw h-svh dark:bg-base-100 lg:hidden bg-secondary-content !z-[5000] justify-end items-start flex p-5 transition-all duration-300 ease-in-out ${
          showMenu ? "right-0" : "-right-[1000px]"
        }`}>
        <IconClose
          onClick={() => setShowMenu(false)}
          className='w-10 h-10'
        />
      </div>
      <nav
        className={`col-start-1 col-end-2 row-start-1 row-end-13 h-svh lg:flex items-start justify-center transition-all duration-300 ease-in-out absolute top-7 lg:top-0 lg:pt-5 lg:relative !z-[6000] lg:!z-0 ${
          showMenu ? "right-5 top-7" : "-right-[1000px]"
        } lg:right-0`}>
        <div className='navigation relative w-[70px] h-[93svh] bg-base-content flex justify-center items-center rounded-2xl max-h-[830px]'>
          <div className='w-[51px] h-[58px] rounded-2xl bg-base-100 font-bold text-2xl absolute top-4 flex items-center justify-center'>
            <IconMap stroke='#fff' />
          </div>
          <ul className='flex flex-col w-[70px] h-[100%] pt-[115px]'>
            {menuItems.map((item) => (
              <li
                key={item.id}
                onClick={() => setShowMenu(false)}
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
            <div className='indicator absolute right-[65%] w-[55px] h-[120px] transition-all duration-300 ease-in-out dark:bg-base-100 bg-primary-content border-[6px] dark:border-base-100 border-primary-content rounded-[20px] flex justify-center items-center rotate-[270deg]'></div>
          </ul>
          <div className='absolute bottom-5 cursor-pointer'>
            {activeTheme === "light" ? (
              <IconSun onClick={() => handleThemeChange("dark")} />
            ) : (
              <IconMoon
                stroke='#000'
                onClick={() => handleThemeChange("light")}
              />
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menu;
