import supabaseClient from "@/utils/supabaseClient";

export const supabaseFetchMultipleEq = async (table: string, query: string, type: string, authorSlug: string, type2: string, authorSlug2: string) => {
    const { data, error } = await supabaseClient.from(table).select(query).eq(type, authorSlug).eq(type2, authorSlug2);
  
    return { error, data };
};
  
export const returnFun = (error: any, posts: any, authors: any, nav: any, currentPost: any, domain1: string, domain2: string) => { 
    return { errors: error, post: posts, author: authors, nav: nav, currentpost: currentPost, domain1: domain1, domain2: domain2 };
}
  