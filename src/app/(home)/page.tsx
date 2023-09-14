import React from "react";
import SectionLargeSlider from "@/app/(home)/SectionLargeSlider";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionSubscribe3 from "@/components/SectionSubscribe3/SectionSubscribe3";
import supabaseClient from "@/utils/supabaseClient";
import getAuthorSlugv2 from "@/utils/getAuthorSlugv2";
import dynamic from 'next/dynamic';
import { supabaseFetchMultipleEq } from "@/utils/functions";
import { Metadata } from 'next';

const SectionArticles = dynamic(() => import('@/app/(home)/SectionsArticles'), {
  ssr: false,
});

export const revalidate = 0;

const fetchPosts = async (domain1: string, domain2: string) => { 
  const returnCon:{
    error: String;
    posts: any[];
    author: any[];
  } = {
    error: "",
    posts: [],
    author: [],
  }

  var posts:any = await supabaseClient
  .from("posts")
  .select(
    "id, posttitle, title, featured_imghd, featured_imgsd, docsid, href, excerpt, metatitle, metadescription, created_at, postClamp, reading_time, authors!inner(id, title, description, newslettermode, newsletterC, posts, users!users(*)), category!inner(*), refauthors!inner(id, name, avatar)",
  )
  .eq("authors.username", domain1)
  .eq("authors.cus_domain", domain2)
  .range(0, 10)
  .order("created_at", { ascending: false });

  if (posts.error) {
    returnCon["error"] = posts.error.message;

  }else if (posts.data.length == 0) {
    var authors:any = await supabaseFetchMultipleEq("authors", "*, custom_code!custom_code(*), users!users(*)", "username", domain1, 'cus_domain', domain2);

    if (authors.error) {
      returnCon["error"] = posts.error.message;
    }

    returnCon["author"] = authors.data;

  } else {
    returnCon["posts"] = [...posts.data];
    returnCon["author"] = [posts.data[0].authors];
  }
  return returnCon;
}

const fetchCat = async (domain1: string, domain2: string) => { 
  const {data, error} = await supabaseClient
  .from('category')
  .select('*, authors!inner(*)')
  .eq('authors.username', domain1)
  .eq('authors.cus_domain', domain2)
  .order('created_at', {ascending: false})
  .gt('posts', 0);

  if(error) {
    throw error.message;
  }
  return data;
}

const fetchMeta = async () => { 
  const { domain1, domain2 } = getAuthorSlugv2();

    var authors:any = await supabaseFetchMultipleEq("authors", "metatitle, metadescription, title, faviconimg", "username", domain1, 'cus_domain', domain2);

    if (authors.error) {
      return { error: true, data: null };
    }
    return { error: false, data: authors.data };
}

export async function generateMetadata(): Promise<Metadata> {

  const { error, data } = await fetchMeta();

  if(error || data.length == 0) {
    return {
      title: 'Typeflo',
      description: '',
      keywords: 'Typeflo Blog typeflo',
    };
    
  }
  return {
    title: data[0].metatitle,
    description:  data[0].metadescription,
    keywords: data[0].title + ' ' + data[0].metatitle + ' ' + data[0].metadescription,
    icons: {
      icon: {
        url: data[0].faviconimg ? data[0].faviconimg : "/favicon.png",
        type: "image/png",
      },
    }
  };
}


const PageHome = async (props: any) => {
  const { domain1, domain2 } = getAuthorSlugv2();

  const [postsData, categoryData] = await Promise.all([fetchPosts(domain1, domain2), fetchCat(domain1, domain2)]);

  const { posts, author } = postsData;

  console.log(author)

  const postsFiltered = posts?.sort((a:any, b:any) => {
    return b.created_at - a.created_at;
  }).slice(0, 3);

  return (
    <div className="nc-PageHome relative overflow-x-hidden bg-white dark:bg-slate-800">
      <div className="container relative">
        <SectionLargeSlider
          className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
          heading={author[0].title}
          desc={author[0].description}
          posts={postsFiltered}
        />

        {posts.length > 0 && <SectionArticles
            post={posts}
            cat={categoryData}
            domain1={domain1}
            domain2={domain2}
            authorPosts={author[0].posts}
        />}

        {
          author[0].newslettermode && <div className="relative">
            <BackgroundSection />
            <SectionSubscribe3 author={author} className="pt-16 pb-10 lg:pt-28" />
          </div>
        }
      </div>
    </div>
  );
};

export default PageHome;
