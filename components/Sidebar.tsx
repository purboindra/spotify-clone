"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";
import { SidebarItem } from "./SidebarItem";
import { Library } from "./Library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";

interface SiderbarProps {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar: React.FC<SiderbarProps> = ({ children, songs }) => {
  const pathName = usePathname();
  const player = usePlayer();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        isActive: pathName !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        isActive: pathName === "/search",
        href: "/search",
      },
    ],
    [pathName]
  );
  return (
    <div
      className={twMerge(`flex h-full`, player.activeId && "h-[cal(100%-80px]")}
    >
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2 ">
        <Box className="flex flex-col gap-y-4 px-5 py-4">
          <div>
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <div>
            <Library songs={songs} />
          </div>
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
