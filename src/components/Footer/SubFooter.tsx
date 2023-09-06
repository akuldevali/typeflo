"use client"

import React from "react";
import SubSocialsList from "@/components/SocialsList/SubSocialsList";
import { CustomLink } from "@/data/types";
import { renderLogo } from "@/components/Header/SubMainNav1";
import { useThemeMode } from "@/hooks/useThemeMode";
import Link from "next/link";
import SubNavigation from "@/components/Navigation/SubNavigation";
import { renderMainItem } from "@/components/MenuBar/SubMenuBar";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

export interface SubFooterProps {
    menus: any,
    authors: any,
}

const SubFooter: React.FC<SubFooterProps> = ({ authors, menus }) => {

  const socials = menus.length > 0 ? menus[0]['social_icons'] : [];
  const navigationFooter = menus.length > 0 ? menus[0]['navigation_menu_footer'] : [];
  const darkmodeState = useThemeMode();

  console.log(socials)

  const emptySocialLinks = socials.length > 0 ? socials.filter((social:any) => {
    return social.link === "";
  }) : [];

  console.log(emptySocialLinks)

  const socialsEmpty = emptySocialLinks.length === 4 ? [] : socials;

  console.log(socialsEmpty)

  return (
    <div className="nc-Footer bg-white dark:bg-slate-900 justify-end relative py-8 lg:py-8 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex flex-col items-center text-center justify-center">
            <div className="flex">
                {renderLogo(authors, darkmodeState['isDarkMode'])}
            </div>
            <div className="flex flex-wrap">
              {
                  navigationFooter.length != 0 && 
                  <>
                  <SubNavigation navigations={navigationFooter} className="flex-wrap justify-center items-center hidden lg:flex mr-150" />
                  <div className="text-center lg:hidden md:hidden">
                    <div className="flex-col text-center md:flex lg:flex">
                        {navigationFooter.map((item:any, index:any) => (
                            <Link
                                key={index}
                                target="_blank"
                                className={`w-full text-center lg:flex items-center py-2.5 px-2.5 rounded-xl font-light text-md hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg`}
                                href={item.link}
                            >
                              <p className={`text-neutral-900 dark:text-white`}>
                                  {item.name}
                              </p>
                            </Link>
                        ))}
                    </div>
                  </div>
                  </>
              }
            </div>
            {
                menus.length > 0 && socialsEmpty.length > 0 && 
                <div className="flex-col mt-3 mr-0 mb-5">
                    <SubSocialsList socials={socials} itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-200 text-xl dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200" />
                </div>
            }
            <p className={`mt-5 opacity-60 text-xs md:px-0 text-center`}>Copyright&nbsp;© 2022, {authors[0].metatitle}. All rights reserved</p>
        </div>
    </div>
  );
};

export default SubFooter;
