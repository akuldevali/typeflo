import React, { FC } from "react";
import SubCategoryBadgeList from "@/components/CategoryBadgeList/SubCategoryBadgeList";
import SingleTitle from "./SingleTitle";
import dynamic from 'next/dynamic';

export interface SingleHeaderProps {
  hiddenDesc?: boolean;
  titleMainClass?: string;
  postData: any;
  className?: string;
}

const SubPostMeta2 = dynamic(() => import('@/components/PostMeta2/SubPostMeta2'), {
  ssr: false,
})

const SubSingleMetaAction2 = dynamic(() => import('@/app/(posts)/SubSingleMetaAction2'), {
  ssr: false,
})

const SubSingleHeader: FC<SingleHeaderProps> = ({
  titleMainClass,
  hiddenDesc = false,
  postData,
  className = "",
}) => {
  console.log(postData);

  const { title, category, created_at, authors, reading_time, refauthors, href, excerpt } = postData[0];

  return (
    <>
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-5">
          <SubCategoryBadgeList categories={category} />
          <SingleTitle
            mainClass={titleMainClass}
            title={title}
          />
          {excerpt && (
            <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
              {excerpt}
            </span>
          )}
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5">
            <SubPostMeta2
              size="large"
              className="leading-none flex-shrink-0"
              hiddenCategories 
              type={refauthors.id === '153de11c-9ce8-4d79-9d19-c10da778e84c' ? 'authors': 'refauthors'}
              meta={{ created_at, authors, reading_time, refauthors }}
              avatarRounded="rounded-full shadow-inner"
            />
            <SubSingleMetaAction2 meta={{ title, href }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubSingleHeader;
