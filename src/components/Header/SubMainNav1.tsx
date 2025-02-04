"use client"

import React, { FC } from "react";
import SubLogo from "@/components/Logo/SubLogo";
import SubNavigation from "@/components/Navigation/SubNavigation";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Button from "../Button/Button";
import Link from "next/link";
import { useGlobalContext } from '@/context/GlobalContextProvider';
import { useThemeMode } from "@/hooks/useThemeMode";
import dynamic from "next/dynamic";

export interface MainNav1Props {
  domain1: string;
  domain2: string;
  author: any;
  nav: any;
}

const SubMenuBar = dynamic(() => import('@/components/MenuBar/SubMenuBar'), {
  ssr: false,
});

const SearchModal = dynamic(() => import('@/components/Header/SearchModal'), {
  ssr: false,
});

const SwitchDarkMode = dynamic(() => import('@/components/SwitchDarkMode/SwitchDarkMode'), {
  ssr: false,
});

export const renderDarkMode = (darkmode: any, darkmodeState: any) => {

  const { toLight } = darkmodeState;

  if(darkmode === true) {
    return <SwitchDarkMode />
  } else {
    toLight();
  }
}

export const renderLogo = (author: any, darkmodeState: boolean) => {
  
    if(author[0].logoimg == null) { 
      return (
        <div className="ttnc-logo inline-block">
          <Link href="/" legacyBehavior>
            <h2 className={`text-2xl md:text-2xl font-semibold`}>{author[0].metatitle.toUpperCase()}</h2>
          </Link> 
        </div>
      );
    }else {
      if(darkmodeState === false) { 
        return <SubLogo img={author[0].logoimg} title={author[0].metatitle} />
      }else {
        if(author[0].logoimgdark != null) {
          return <SubLogo img={author[0].logoimgdark} title={author[0].metatitle} />
        }else {
          return <SubLogo img={author[0].logoimg} title={author[0].metatitle} />
        }
      }
    }
}

const SubMainNav1: FC<MainNav1Props> = ({ domain1, domain2, author, nav }) => {

  const darkmodeState = useThemeMode();
  
  var actualmenu = [], menuE = [], navmenus = [], socials = [], buttons:any = [];

  if(nav.length > 0) {
    
    actualmenu = nav[0]['navigation_menu']; 

    menuE = actualmenu.slice(0, actualmenu.length - 1);

    navmenus = nav[0]['cta'] === false ? actualmenu : menuE; 

    socials = nav[0]['social_icons']; 
    
    buttons = nav[0]['cta'] === false ? [] : [actualmenu[actualmenu.length - 1]]
  }

  return (
    <div className="nc-MainNav1 relative z-10 bg-white dark:bg-slate-900 ">
      <div className="container">
        <div className="h-20 py-5 flex justify-between items-center">

          <div className="flex justify-start flex-1 items-center space-x-4 sm:space-x-10 2xl:space-x-14">
            {renderLogo(author, darkmodeState['isDarkMode'])}
            {
                navmenus.length != 0 && <SubNavigation navigations={navmenus} className="hidden lg:flex" />
            }
          </div>

          <div className="flex-1 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
            <div className="hidden items-center lg:flex gap-2">
              {renderDarkMode(author[0].darkmode, darkmodeState)}
              <SearchModal domain1={domain1} domain2={domain2} />
              <div className="px-1"></div>
              {
                buttons.length != 0 && (
                  <div className="flex w-full cursor-pointer items-center justify-center rounded-3xl border border-transparent bg-primary-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-500">
                    <Link href={buttons[0].link} target="_blank" legacyBehavior>
                      <div>
                        {buttons[0].name}
                      </div>
                    </Link>
                  </div>
                )
              }
            </div>
            <div className="flex items-center lg:hidden">
              <SearchModal domain1={domain1} domain2={domain2} />
              {
                navmenus.length > 0 ? 
                <div className="items-center md:hidden">
                  <SubMenuBar navigations={navmenus} socials={socials} authors={author} username={author[0].username} description={author[0].description} logo={author[0].logoimg} buttons={buttons} />
                </div>
                :
                <div className="flex md:hidden xl:hidden lg:hidden">
                  {renderDarkMode(author[0].darkmode, darkmodeState)}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubMainNav1;
