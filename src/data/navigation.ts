import { NavItemType } from "@/components/Navigation/NavigationItem";
import { Route } from "@/routers/types";
import _ from "lodash";

const randomId = _.uniqueId;

export const MEGAMENU_TEMPLATES: NavItemType[] = [
  // home pages ---------
  {
    id: randomId(),
    href: "/#",
    name: "Home Page",
    children: [
      { id: randomId(), href: "/", name: "Home page 1" },
      { id: randomId(), href: "/", name: "Header style 1", isNew: true },
    ],
  },

  // single pages ---------
  {
    id: randomId(),
    href: "/posts/demo-slug" as Route,
    name: "Single Pages",
    children: [
      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single page 1",
      },
      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single page 2",
      },
      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single page 3",
      },
      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single page 4",
      },

      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single Audio",
      },
      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single Video",
      },
      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single Gallery",
        isNew: true,
      },
    ],
  },

  // archive pages ---------
  {
    id: randomId(),
    href: "/#",
    name: "Archive Pages",
    children: [
      {
        id: randomId(),
        href: "/category/demo-slug" as Route,
        name: "Category page",
      },
      {
        id: randomId(),
        href: "/category/demo-slug" as Route,
        name: "Category audio",
      },
      {
        id: randomId(),
        href: "/category/demo-slug" as Route,
        name: "Category videos",
      },
      {
        id: randomId(),
        href: "/search",
        name: "Search page",
      },
      {
        id: randomId(),
        href: "/search-2",
        name: "Search page 2",
      },
      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Author page",
      },
    ],
  },

];

const OTHER_PAGE_CHILD: NavItemType[] = [
  // archive pages ----------------
  {
    id: randomId(),
    href: "/category/demo-slug" as Route,
    name: "Category pages",
    type: "dropdown",
    children: [
      {
        id: randomId(),
        href: "/category/demo-slug" as Route,
        name: "Category page 1",
      },
      {
        id: randomId(),
        href: "/category/demo-slug" as Route,
        name: "Category page 2",
      },
      {
        id: randomId(),
        href: "/category/demo-slug" as Route,
        name: "Category page 2",
      },
    ],
  },

  // single pages ----------------
  {
    id: randomId(),
    href: "/posts/demo-slug" as Route,
    name: "Single pages",
    type: "dropdown",
    children: [
      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single 1",
      },
      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single 2",
      },
      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single 3",
      },
      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single 4",
      },
      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single 5",
      },
      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single Audio",
      },
      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single Video",
      },
      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single Gallery",
      },
    ],
  },

  // seach pages ----------------
  {
    id: randomId(),
    href: "/search",
    name: "Search Page",
    type: "dropdown",
    children: [
      {
        id: randomId(),
        href: "/search",
        name: "Search page",
      },
      {
        id: randomId(),
        href: "/search-2",
        name: "Search page 2",
      },
    ],
  },

  // author pages ----------------
  {
    id: randomId(),
    href: "/posts/demo-slug" as Route,
    name: "Author page",
  },

];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: randomId(),
    href: "/",
    name: "Homes",
    type: "dropdown",
    children: [
      { id: randomId(), href: "/", name: "Home page 1" },
      { id: randomId(), href: "/", name: "Header style 1", isNew: true },
    ],
  },

  // single pages ----------------
  {
    id: randomId(),
    href: "/posts/demo-slug" as Route,
    name: "Singles",
    type: "dropdown",
    children: [
      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single page 1",
      },
      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single page 2",
      },
      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single page 3",
      },
      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single page 4",
      },

      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single Audio",
      },
      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single Video",
      },
      {
        id: randomId(),
        href: "/posts/demo-slug" as Route,
        name: "Single Gallery",
        isNew: true,
      },
    ],
  },

  //
  {
    id: randomId(),
    href: "/category/demo-slug" as Route,
    name: "Beauty",
  },

  {
    id: randomId(),
    href: "/category/demo-slug" as Route,
    name: "Sport",
  },
  {
    id: randomId(),
    href: "/search",
    name: "Templates",
    type: "megaMenu",
    children: MEGAMENU_TEMPLATES,
  },
  {
    id: randomId(),
    href: "/search",
    name: "Explore",
    type: "dropdown",
    children: OTHER_PAGE_CHILD,
  },
];
