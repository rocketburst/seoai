import { SidebarNavItem } from "@/types"

export const dashboardNav: SidebarNavItem[] = [
  {
    title: "Generate",
    icon: "generate",
    href: "/dashboard",
  },
  {
    title: "Previous",
    icon: "time",
    href: "/dashboard/generations",
  },

  {
    title: "Profile",
    icon: "user",
    href: "/dashboard/profile",
  },
  {
    title: "API Usage",
    icon: "api",
    href: "/dashboard/usage",
  },
]
