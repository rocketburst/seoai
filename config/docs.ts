import { DocsConfig } from "types"

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },

    {
      title: "Profile",
      href: "/dashboard/profile",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
      ],
    },
    {
      title: "Documentation",
      items: [
        {
          title: "Generate SEO",
          href: "/docs/generate/seo",
        },
        {
          title: "Generate Post",
          href: "/docs/generate/post",
        },
      ],
    },
  ],
}
