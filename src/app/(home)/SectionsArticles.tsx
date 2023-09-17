"use client";

import React, { FC, useState, useEffect } from "react";
import Heading from "@/components/Heading/Heading";
import SubArchiveFilterListBox from "@/components/ArchiveFilterListBox/SubArchiveFilterListBox";
import SubCard11 from "@/components/Card11/SubCard11";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Snackbar from '@mui/material/Snackbar';
import supabaseClient from "@/utils/supabaseClient";
import IconButton from '@mui/material/IconButton';

export interface SectionArticlesProps {
  filterShow?: boolean;
  post: any,
  domain1: String;
  domain2: String;
  cat: any;
  authorPosts: any;
}

var inPage:any = 0, fnPage:any = 10, postsLoc:any = [], icPage:any = 0, fcPage:any = 0, catVal: any = "-1", maxPost: any = 10;

const SectionArticles: FC<SectionArticlesProps> = ({
  filterShow = true,
  post,
  domain1,
  domain2,
  cat,
  authorPosts,
}) => {
  console.log(postsLoc + " " + maxPost);
  
  const [btnLoading, setbtnLoading] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);
  const [error, setError] = useState<any>();
  const [catLoading, setcatLoading] = useState<any>(false);
  const [catError, setcatError] = useState<any>();
  const [snackMsg, setsnackMsg] = useState<any>("");
  const [snackDuration, setsnackDuration] = useState<any>();
  const [snackStatus, setsnackStatus] = useState<any>(false);
  const [categories, setCategories] = useState<any>(cat);
  
  const [categoryList, setcategoryList] = useState<any>(catVal);
  const [categoryListL, setcategoryListL] = useState<any>("All");

  const [currentPosts, setcurrentPosts] = useState<any>(postsLoc);

  if(currentPosts?.length == 0){
    postsLoc = post;
    inPage = postsLoc?.length;
    fnPage = postsLoc?.length + maxPost;
    setcurrentPosts(postsLoc);
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setsnackStatus(false);
  };

  const snackAction = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        
        <XMarkIcon className={`w-5 h-5`} />
      </IconButton>
    </>
  );

  // var initRange:any = parseInt(localStorage.getItem('initpostRange')!);
  // var finRange:any = parseInt(localStorage.getItem('finpostRange')!);
  
  const fetchNxtPost = async () => {

    const {data,error} = await supabaseClient
      .from('posts')
      .select('id, title, created_at, featured_imgsd, href, postClamp, reading_time, authors!inner(*), category!inner(*)')
      .eq('authors.username', domain1)
      .eq('authors.cus_domain', domain2)
      .range(inPage, fnPage)
      .order("created_at", { ascending: false });

      if(error) {
        setsnackMsg(error.message);
        throw setsnackStatus(true);
      }

      if(data.length > 0) {
        console.log(data);
        postsLoc = [...postsLoc, ...data];
        inPage = postsLoc.length;
        fnPage = postsLoc.length + maxPost;
        
        console.log(inPage);
        console.log(fnPage);
    
        // localStorage.setItem('postsLoc', JSON.stringify(newPosts));
        // localStorage.setItem('initpostRange', iPage);
        // localStorage.setItem('finpostRange', fPage);

        // var npostsLoc:any = JSON.parse(localStorage.getItem('postsLoc')!);
        console.log(postsLoc);
        setcurrentPosts(postsLoc);
        setbtnLoading(false);

      }else {
        setbtnLoading(false);
        setsnackMsg("No Posts to show");
        setsnackStatus(true);

      }

  }

  const fetchNewCat = async (catId:any) => {
    
    const {data,error} = await supabaseClient
      .from('posts')
      .select('id, title, created_at, featured_imgsd, href, postClamp, reading_time, authors!inner(*), category!inner(*)')
      .eq('authors.username', domain1)
      .eq('authors.cus_domain', domain2)
      .eq('category.id', catId)
      .range(icPage, fcPage);

      if(error) {
        console.log(error);
        throw setError(error.message);
      }

      if(data.length > 0) {
        console.log(data);
        postsLoc = [...postsLoc, ...data];
        icPage = postsLoc.length;
        fcPage = postsLoc.length + maxPost;
        
        console.log(icPage);
        console.log(fcPage);

        setcurrentPosts(postsLoc);
        setLoading(false);

      }else {
        setLoading(false);
        setsnackMsg("No Posts to show");
        setsnackStatus(true);

      }
  }

  const fetchCatPost = async (catId:any) => {
    setLoading(true);
    catVal = catId.id;
    setcategoryListL(catId.name);
    setcategoryList(catId.id);
    if(catVal == "-1") {
      postsLoc = [];
      inPage = postsLoc.length;
      fnPage = postsLoc.length + maxPost;
      fetchNxtPost().then(() => {
        setLoading(false);
      });
    }else {
      postsLoc = [];
      icPage = postsLoc.length;
      fcPage = postsLoc.length + maxPost;
      fetchNewCat(catVal).then(() => {
        setLoading(false);
      });

    }

  }

  const setPosts = (catId:any) => {
    console.log(categoryList);
    setbtnLoading(true);
    if(catId == "-1") {
      fetchNxtPost();
    }else {
      fetchNewCat(catId).then(() => {
        setbtnLoading(false);
      });
    }
  }

  return (
    
    <div className="w-full pt-10 pb-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <div>
            {
                <div className={`flex flex-col sm:justify-between sm:flex-row ${categories.length != 0 ? `mb-8` : `-mb-1`} md:-mb-3 lg:-mb-3`}>
                  <Heading desc={""}>Articles</Heading>
                  {
                      categories.length != 0 && catLoading == false && <div className="flex justify-start -mt-2">
                      <SubArchiveFilterListBox lists={categories} selected={categoryListL} setSelected={fetchCatPost} />
                      </div>
                  }
                </div>
            }
            
            {
                (error) ? <Error/>
                : (loading) ? <Loading/>
                : (
                    <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-8 ">
                        {currentPosts.map((post:any) => (
                            <SubCard11 key={post.id} post={post} />
                        ))}
                    </div>

                    {
                          (authorPosts > maxPost) && (
                            
                            <div className="flex mt-20 justify-center items-center">
                              <ButtonPrimary loading={btnLoading} onClick={() => setPosts(categoryList)}>Show me more</ButtonPrimary>
                            </div>
                          ) 
                    }
                    </>
                )
            }
        </div>
        
        <Snackbar
          open={snackStatus}
          autoHideDuration={snackDuration}
          onClose={handleClose}
          action={snackAction}
          message={snackMsg}
        />
    </div>
  );
};

export default SectionArticles;
