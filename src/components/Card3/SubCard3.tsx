"use client";

import React, { FC, useState, useEffect } from "react";
import NcImage from "@/components/NcImage/NcImage";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import SubCardAuthor2 from "@/components/CardAuthor2/SubCardAuthor2";
import SubCategoryBadgeList from "@/components/CategoryBadgeList/SubCategoryBadgeList";
import { PostDataType } from "@/data/types";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import Link from "next/link";

export interface Card3Props {
  className?: string;
  posts: any;
  size?: "normal" | "large";
}

const SubCard3: FC<Card3Props> = ({ 
    className = "h-full",
    size="normal",
    posts,
 }) => {
    const { title, featured_imgsd, href, created_at, category, excerpt, postClamp } = posts;
    const [date, setDate] = useState<any>(null);
  
    useEffect(() => {
      const postDate = new Date(created_at).toLocaleString('en-us',{month:'short', day:'numeric', year:'numeric'});
      setDate(postDate)
    }, [created_at]);

    const postContent = excerpt ? excerpt : postClamp;

  return (
    <div
      className={`nc-Card3 relative flex flex-row items-center group ${className}`}
    >
      <div className="flex flex-col flex-grow">
        <div className="space-y-3.5">
        <SubCategoryBadgeList
            categories={category}
        />
          <Link href={href} className="block" legacyBehavior>
            <h2
              className={`nc-card-title block font-medium sm:font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base xl:text-lg`}
            >
              <span className="line-clamp-2" title={title}>
                {title}
              </span>
            </h2>

          </Link>
          <h2 className="text-[15px] text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-3">
          {postContent}
        </h2>
          {/* <PostCardMeta meta={{ ...post }} /> */}
        </div>
      </div>

      <div
        className={`block flex-shrink-0 w-24 sm:w-36 md:w-44 xl:w-56 ml-3 sm:ml-6 rounded-3xl overflow-hidden z-0 mb-5 sm:mb-0`}
      >
        <Link
          href={href}
          className="block w-full h-0 aspect-h-1 aspect-w-1 relative"
          legacyBehavior>
          <NcImage
            layout="fill"
            containerClassName="absolute inset-0"
            src={featured_imgsd}
            alt={title}
          />
          
        </Link>
        
      </div>
    </div>
  );
};

export default SubCard3;
