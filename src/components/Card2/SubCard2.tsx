"use client"

import React, { FC, useState, useEffect } from "react";
import NcImage from "@/components/NcImage/NcImage";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "@/data/types";
import SocialsShare from "@/components/SocialsShare/SocialsShare";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import SubCardAuthor2 from "@/components/CardAuthor2/SubCardAuthor2";
import SubCategoryBadgeList from "@/components/CategoryBadgeList/SubCategoryBadgeList";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import Link from "next/link";
import Image from "next/image";
import PostCardMeta from "../PostCardMeta/PostCardMeta";

export interface Card2Props {
  className?: string;
  posts: any;
  size?: "normal" | "large";
}

const SubCard2: FC<Card2Props> = ({
  className = "h-full",
  size = "normal",
  posts,
}) => {
  const { title, featured_imgsd, href, created_at, category, authors, refauthors, excerpt, postClamp } = posts;
  const [date, setDate] = useState<any>(null);

  useEffect(() => {
    const postDate = new Date(created_at).toLocaleString('en-us',{month:'short', day:'numeric', year:'numeric'});
    setDate(postDate);
  }, []);

  const postContent = excerpt ? excerpt : postClamp;

  return (
    <div className={`nc-Card2 group relative flex flex-col  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] overflow-hidden ${className}`}
    data-nc-id="Card2">
      <Link href={href} className="absolute inset-0" legacyBehavior>
        <span className="block cursor-pointer flex-shrink-0 flex-grow relative w-full h-0 pt-[75%] sm:pt-[55%] rounded-xl sm:rounded-b-none overflow-hidden">
          <Image
            fill
            priority
            className="object-cover rounded-3xl"
            src={featured_imgsd}
            alt={title}
          />
        </span>
      </Link>

      <div className="p-4 sm:p-5 flex flex-col">
        <div className="space-y-3">
          <SubCategoryBadgeList
            categories={category}
          />
          <h2
            className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors ${
              size === "large" ? "text-lg sm:text-2xl" : "text-base"
            }`}
          >
            <Link href={href} className="line-clamp-2" title={title} legacyBehavior>
              {title}
            </Link>
          </h2>
        </div>
        <SubCardAuthor2 className="relative my-4" type={refauthors.id === '153de11c-9ce8-4d79-9d19-c10da778e84c' ? 'authors': 'refauthors'} author={refauthors.id === '153de11c-9ce8-4d79-9d19-c10da778e84c' ? authors : refauthors} date={date} />
        <h2 className="text-[15px] text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-3">
          {postContent}
        </h2>
      </div>
    </div>
  );
};

export default SubCard2;
