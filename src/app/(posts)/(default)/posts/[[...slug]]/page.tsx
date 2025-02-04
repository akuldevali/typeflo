import React from "react";
import NcImage from "@/components/NcImage/NcImage";
import SubSingleHeader from "@/app/(posts)/SubSingleHeader";
import supabaseClient from "@/utils/supabaseClient";
import getAuthorSlugv2 from "@/utils/getAuthorSlugv2";
import SubSingleContent from "@/app/(posts)/SubSingleContent";
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import parse from 'html-react-parser';

type Props = {
  params: { slug: string };
};

const SubSingleRelatedPosts = dynamic(() => import("@/app/(posts)/SubSingleRelatedPosts"), {
  ssr: false,
})

export const revalidate = 0;

const returnFun = (error: any, posts: any) => { 
  return { errors: error, post: posts };
}

const fetchPost = async (postslug: string, domain1: string, domain2: string) => {

  const { data, error } = await supabaseClient
    .from('posts')
    .select(`*, authors!inner(username, cus_domain, metatitle, newsletterC, users!users(*)), category!inner(*), refauthors!inner(*)`)
    .eq('posttitle', postslug)
    .eq('authors.username', domain1)
    .eq('authors.cus_domain', domain2)

    if(error) {
      return returnFun("Please check your internet connection & refresh the page", null);
    }

    if(data) {
      const postContent = parse(data[0].post)
      const postData = [
        ...data,
        postContent,
      ]
      return returnFun(null, postData);
    } else {
      return returnFun("Please check your internet connection & refresh the page", null);
    }
}

const fetchPostMeta = async (postslug: string) => {
  const { domain1, domain2 } = getAuthorSlugv2();

  const { data, error } = await supabaseClient
    .from('posts')
    .select(`title, metatitle, metadescription, authors!inner(username, cus_domain)`)
    .eq('posttitle', postslug)
    .eq('authors.username', domain1)
    .eq('authors.cus_domain', domain2)
    
    if (error) {
      return { error: true, data: [] };
    }
    return { error: false, data: data };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { error, data } = await fetchPostMeta(params.slug);

  if(error) {
    return {
      title: 'Typeflo',
      description: '',
      keywords: 'Typeflo Blog typeflo',
    };
    
  }else if(data.length == 0) { 
    return {
      title: 'Typeflo',
      description: '',
      keywords: 'Typeflo Blog typeflo',
    };

  }
  return {
    title: (data[0].metatitle === null ? data[0].title : data[0].metatitle),
    description: data[0].metadescription,
  };
}

const PageSingle = async ({ params }: { params: { slug: string } }) => {
  //console.log(params.slug)
  const { domain1, domain2 } = getAuthorSlugv2();
  
  const postData = await fetchPost(params.slug[0], domain1, domain2);

  console.log(postData.post[1]);

  // if(postData.errors) {
  //   return <Error textSizeSH={'text-2xl'} />
  // }
  // if(postData.post.length == 0) {
  //   return <NotFound />;
  // }
  return (
      <div className={`nc-PageSingle bg-white dark:bg-slate-800 pt-8 lg:pt-16`}>
        <div className="container rounded-xl">
          <div className="max-w-screen-md mx-auto">
            <SubSingleHeader postData={postData.post} />
          </div>
        </div>

        {/* FEATURED IMAGE */}
        <NcImage
          alt="single"
          containerClassName="container my-10 sm:my-12"
          className="w-full rounded-xl"
          src={postData.post[0].featured_imghd}
          width={1260}
          height={750}
          sizes="(max-width: 1024px) 100vw, 1280px"
        />

        {/* SINGLE MAIN CONTENT */}
        <div className="container mt-10">
          <SubSingleContent data={postData.post[1]} author={postData.post[0].authors} />
        </div>
  
        {/* RELATED POSTS */}
        <SubSingleRelatedPosts type={postData.post[0].refauthors.id === '153de11c-9ce8-4d79-9d19-c10da778e84c' ? 'authors': 'refauthors'} category={postData.post[0].category.id} postTitle={postData.post[0].posttitle} domain1={postData.post[0].refauthors.id === '153de11c-9ce8-4d79-9d19-c10da778e84c' ? domain1 : postData.post[0].refauthors.id} domain2={domain2} />
      </div>
  );
};

export default PageSingle;
