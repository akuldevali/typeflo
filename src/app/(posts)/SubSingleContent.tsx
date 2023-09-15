"use client"

import React, { FC } from "react";
import SubSingleContentDemo from "./SubSingleContentDemo";
import SectionSubscribe3 from "@/components/SectionSubscribe3/SectionSubscribe3";

export interface SingleContentProps {
    data: any;
    author: any;
}

const SubSingleContent: FC<SingleContentProps> = ({ data, author }) => {

  return (
    <div className="relative" suppressHydrationWarning={true}>
      <div className="nc-SingleContent space-y-5">
        {/* ENTRY CONTENT */}
        <div
          id="single-entry-content"
          className="prose lg:prose-lg !max-w-screen-md mx-auto dark:prose-invert"
          dangerouslySetInnerHTML={{__html: data}}
        />

      </div>
      <div className="container">
        <SectionSubscribe3 author={[author]} className="pt-16 pb-2 lg:pt-28" />
      </div>
    </div>
  );
};

export default SubSingleContent;
