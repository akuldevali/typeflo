"use client";

import React, { FC, useState, useEffect } from "react";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import SubCategoryBadgeList from "@/components/CategoryBadgeList/SubCategoryBadgeList";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import Image from "next/image";
import Link from "next/link";
import { useReadingTime } from "react-hook-reading-time";

export interface Card11Props {
  className?: string;
  badge?: boolean;
  post: any;
  ratio?: string;
  hiddenAuthor?: boolean;
  postTextShow?: boolean;
  onClick?: () => void;
}

const SubCard11: FC<Card11Props> = ({
  className = "h-full",
  badge = true,
  post,
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
  postTextShow = true,
  onClick,
}) => {
  const { title, featured_imgsd, href, created_at, category, excerpt, postClamp, reading_time } = post;
  const [date, setDate] = useState<any>(null);

  useEffect(() => {
    const postDate = new Date(created_at).toLocaleString('en-us',{month:'short', day:'numeric', year:'numeric'});
    setDate(postDate)
  }, [created_at]);

  const postText = postTextShow === true ? excerpt ? excerpt : postClamp : '';

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`nc-Card11 relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="Card11"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      //
      onClick={onClick}
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-xl cursor-pointer overflow-hidden ${ratio}`}
      >
        <Link href={href} legacyBehavior>
          <div>
            <Image
              fill
              className="object-cover rounded-3xl"
              src={featured_imgsd}
              alt={title}
            />
          </div>
        </Link>
      </div>
      {
        badge && <div className="absolute top-3 inset-x-3 z-10">
          <SubCategoryBadgeList categories={category} />
        </div>
      }

        <div className="p-4 flex flex-col space-y-3">
          <div className="text-xs mt-[6px]">
            <span className="text-xs text-neutral-500">{date}</span>
            {
              postTextShow && 
              <>
              <span className="mx-2 font-semibold">·</span>
              <span className="text-neutral-700 dark:text-neutral-300">
                {reading_time}
              </span>
              </>
            }
          </div>
          <Link href={href} legacyBehavior>
            <h2 className="nc-card-title cursor-pointer block text-[18px] text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
              {title}
            </h2>
          </Link>
          {
            postTextShow && <span className="text-[13px] line-clamp-2">{postText}</span>
          }
        </div>
    </div>
  );
};

export default SubCard11;
