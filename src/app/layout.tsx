import "./globals.css";
import "@/styles/index.scss";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import { Poppins } from "next/font/google";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import getAuthorSlugv2 from "@/utils/getAuthorSlugv2";
import { supabaseFetchMultipleEq } from "@/utils/functions";
import SubFooter from "@/components/Footer/SubFooter";
import SubHeader2 from "@/components/Header/SubHeader2";

//import sanitizeHtml from 'sanitize-html';
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});


const fetchAuthor = async (domain1:string, domain2:string) => { 

  const { data, error } =  await supabaseFetchMultipleEq("authors", "description, logoimg, logoimgdark, metatitle, darkmode", "username", domain1, 'cus_domain', domain2);

  if (error) {
     throw error.message;
  }
  return data;
}

const fetchNav = async (domain1:string, domain2:string) => {

  const { data, error } = await supabaseFetchMultipleEq("navigationv2", "*, authors!inner(username, cus_domain)", "authors.username", domain1, 'authors.cus_domain', domain2);

  if(error) {
    throw error.message;
  }
  return data;
}

function extractAttributes(scriptTag:any) {
  const attributeNames = [
    'id', 'src', 'type', 'async', 'defer', 'charset', 'crossorigin', 'integrity',
    'language', 'nomodule', 'referrerpolicy', 'nonce', 'onerror', 'onload', 'accesskey',
    'class', 'contenteditable', 'dir', 'draggable', 'hidden', 'lang', 'spellcheck', 
    'style', 'tabindex', 'title', 'translate', 'data-id', 'data-message',
  ];
  
  const attributes:any = {};

  attributeNames.forEach(attributeName => {
    const regex = new RegExp(`${attributeName}=(?:"|')(.*?)(?:"|')`, 'i');
    const match = scriptTag.match(regex);

    if (match) {
      attributes[attributeName] = match[1];
    }
  });

  return attributes;
}


// function injectScriptsFromHTML(html:any, strategy:any) {
//   var extractedTags = sanitizeHtml(html, {
//     allowedTags: ['script'],
//     allowedAttributes: {
//       'script': ['src', 'type', 'async', 'id', 'data-id', 'data-message']
//     },
//     nonTextTags: ['button', 'div', 'link', 'p', 'b', 'i', 'u', 'strong', 'em', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'img', 'ul', 'li', 'ol', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'tfoot', 'blockquote', 'pre', 'code', 'br', 'hr', 'dd', 'dl', 'dt', 'del', 'ins', 'sup', 'sub', 'kbd', 'samp', 'var', 'cite', 'abbr', 'acronym', 'q', 'mark', 'small', 'time', 'dfn', 'ruby', 'rt', 'rp', 'wbr', 'details', 'summary', 'figure', 'figcaption', 'audio', 'video', 'source', 'track', 'embed', 'object', 'param', 'canvas', 'noscript', 'svg', 'math', 'input', 'textarea', 'select', 'option', 'optgroup', 'button', 'datalist', 'keygen', 'output', 'progress', 'meter', 'fieldset', 'legend', 'label', 'form', 'iframe', 'style', 'title', 'base', 'meta', 'html', 'body', 'frameset', 'frame', 'noframes']
//   });
//   const regex = /<script(?:\s+[^>]+)?>([\s\S]*?)<\/script>/gi;
//   const scriptTags = extractedTags.match(regex);
//   //console.log("ext" + extractedTags);
//   //console.log(scriptTags)

//   if (!scriptTags) {
//     return <></>;
//   }

//   return scriptTags.map((scriptTag, index) => {
//     const srcMatch = scriptTag.match(/src=(?:"|')(.*?)(?:"|')/i);
//     const scriptAttr = extractAttributes(scriptTag);
//     const scriptContent = scriptTag.replace(/<\/?script(?:\s+[^>]+)?>/gi, '');

//     if (srcMatch) {
//       const src = srcMatch[1];
      
//       return <Script key={index} src={src} strategy={strategy} {...scriptAttr} />;
//     } else if (scriptContent) {

//       return (
//         <Script id={index} key={index} strategy={strategy} {...scriptAttr}>
//           {`${scriptContent}`}
//         </Script>
//       );
//     }

//     return <></>;
//   });
// }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { domain1, domain2 } = getAuthorSlugv2();

  const [authorData, navigationData] = await Promise.all([fetchAuthor(domain1, domain2), fetchNav(domain1, domain2)]);


  // const userData = await fetchAuthor();

  // const { errors, author, nav } = userData;
  
  // var headerHTML = author.length > 0 && author[0].custom_code ? "<head>" + author[0].custom_code.header_code + "</head>" : "<></>";
  // var footerHTML = author.length > 0 && author[0].custom_code ? "<footer>" + author[0].custom_code.footer_code + "</footer>" : "<></>";

  // const headerScripts = injectScriptsFromHTML(headerHTML, "afterInteractive");
  // const footerScripts = injectScriptsFromHTML(footerHTML, "lazyOnload");
  // //console.log(headerScripts)

  //const themeColour = author[0].theme_colour;

  return (
    <html lang="en" className={poppins.className}>
      {/* <head>
        {headerScripts}
      </head> */}
      <body suppressContentEditableWarning={true} className={` bg-[#f8f8f8] text-base dark:bg-neutral-900/95 text-neutral-900 dark:text-neutral-200`}>
        <SubHeader2 
          domain1={domain1}
          domain2={domain2}
          author={authorData}
          nav={navigationData}
        />
        {children}
        <SubFooter
          authors={authorData}
          menus={navigationData}
        />
        {/* {footerScripts} */}
      </body>
    </html>
  );
}
