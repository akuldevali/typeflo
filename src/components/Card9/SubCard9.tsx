"use client"
import React, { FC, useState, useEffect } from "react";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "@/data/types";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import SubCategoryBadgeList from "@/components/CategoryBadgeList/SubCategoryBadgeList";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import PostFeaturedMedia from "@/components/PostFeaturedMedia/PostFeaturedMedia";
import Link from "next/link";
import Image from "next/legacy/image";
import { useReadingTime } from "react-hook-reading-time";

export interface Card9Props {
  className?: string;
  ratio?: string;
  posts: any;
  postHref?: any;
  hoverClass?: string;
}

const SubCard9: FC<Card9Props> = ({
  className = "h-full",
  ratio = "aspect-w-3 aspect-h-3 sm:aspect-h-4",
  posts,
  postHref,
  hoverClass = "",
}) => {
  const { title, featured_imgsd, created_at, category, reading_time } = posts;
  const [date, setDate] = useState<any>(null);

  useEffect(() => {
    const postDate = new Date(created_at).toLocaleString('en-us',{month:'short', day:'numeric', year:'numeric'});
    setDate(postDate)
  }, [created_at]);

  const renderMeta = (postHref:any) => {
    return (
      <div className="inline-flex items-center text-xs text-neutral-300">
        <div className="block">
          <Link href={postHref} legacyBehavior>
            <h2 className="block  cursor-pointer text-base sm:text-lg font-semibold text-white ">
              <span className="line-clamp-2" title={title}>
                {title}
              </span>
            </h2>
          </Link>
          <div className="flex mt-2.5 relative">
            <span className="font-normal truncate">{date}</span>
            <span className="mx-[6px] font-medium">·</span>
            <span className="dark:text-neutral-300">
              {reading_time}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-Card9 relative flex flex-col group rounded-3xl overflow-hidden z-0 ${hoverClass} ${className}`}
    >
        <div className={`flex items-start relative cursor-pointer w-full ${ratio}`}>
          <Link href={postHref} legacyBehavior>
            <>
            <Image
              layout="fill"
              alt={title}
              className="object-cover w-full h-full rounded-3xl"
              src={featured_imgsd}
              sizes="(max-width: 600px) 480px, 500px"
            />
            <span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </>
          </Link>
        </div>
        <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col flex-grow">
          <div className="mb-3">
              <SubCategoryBadgeList categories={category} />
          </div>
          {renderMeta(postHref)}
        </div>
    </div>
  );
};

export default SubCard9;
