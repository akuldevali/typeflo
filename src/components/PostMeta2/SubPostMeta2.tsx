import React, { FC, useState, useEffect } from "react";
import Avatar from "@/components/Avatar/Avatar";
import { useReadingTime } from "react-hook-reading-time";
import { DEMO_POSTS } from "@/data/posts";
import Link from "next/link";

const metaDemo: PostMeta2Props["meta"] = DEMO_POSTS[0];

export interface PostMeta2Props {
  className?: string;
  meta?: any;
  type?: any;
  hiddenCategories?: boolean;
  size?: "large" | "normal";
  avatarRounded?: string;
}

const SubPostMeta2: FC<PostMeta2Props> = ({
  className = "leading-none",
  meta = metaDemo,
  type,
  hiddenCategories = false,
  size = "normal",
  avatarRounded,
}) => {
  const { created_at, authors, reading_time, refauthors } = meta;

  // const [date, setDate] = useState<any>(null);

  // useEffect(() => {
  //   const postDate = new Date(created_at).toLocaleString('en-us',{month:'short', day:'numeric', year:'numeric'});
  //   setDate(postDate)
  // }, [created_at]);

  return (
    <div
      className={`nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 ${
        size === "normal" ? "text-xs" : "text-sm"
      } ${className}`}
    >
        <Avatar
          radius={avatarRounded}
          sizeClass={
            size === "normal"
              ? "h-6 w-6 text-sm"
              : "h-10 w-10 sm:h-11 sm:w-11 text-xl"
          }
          imgUrl={type === 'authors' ? authors.users.avatar_url : refauthors.avatar}
          userName={type === 'authors' ? authors.users.full_name : refauthors.name}
        />
      <div className="ml-3">
        <div className="flex items-center">
          <p className="block font-semibold">
            {type === 'authors' ? authors.users.full_name : refauthors.name}
          </p>

          {/* {!hiddenCategories && (
            <>
              <span className="mx-2 font-semibold">·</span>
              <div className="ml-0">
                <span className="text-xs">🏷 </span>
                {categories.map((cat, index) => (
                  <Link key={cat.id} href={cat.href} className="font-semibold">
                    {cat.name}
                    {index < categories.length - 1 && <span>, </span>}
                  </Link>
                ))}
              </div>
            </>
          )} */}
        </div>
        <div className="text-xs mt-[6px]">
          <span className="text-neutral-700 dark:text-neutral-300">test</span>
          <span className="mx-2 font-semibold">·</span>
          <span className="text-neutral-700 dark:text-neutral-300">
            {reading_time}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubPostMeta2;
