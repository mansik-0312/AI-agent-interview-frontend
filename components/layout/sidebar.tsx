"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";

import {
  Home,
  Video,
  CalendarDays,
  ClipboardList,
  CirclePlus,
  Layers3,
  BarChart3,
  ChevronLeft,
  Bot,
  UserCircle2,
} from "lucide-react";


interface User {
  fName: string;
  lName: string;
  designation: string;
  profileImg: string;
}

const menu = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },

  {
    heading: "INTERVIEWS",
  },

  {
    title: "Interviews",
    href: "/interviews",
    icon: Video,
  },

  {
    title: "Schedule Interview",
    href: "/interviews/create",
    icon: CalendarDays,
  },

  {
    heading: "QUESTIONS",
  },

  {
    title: "Question List",
    href: "/questions",
    icon: ClipboardList,
  },

  {
    title: "Create Question",
    href: "/questions/create",
    icon: CirclePlus,
  },

  {
    heading: "TEMPLATES",
  },

  {
    title: "Template List",
    href: "/templates",
    icon: Layers3,
  },

  {
    title: "Create Template",
    href: "/templates/create",
    icon: CirclePlus,
  },

  {
    heading: "REPORTS",
  },

  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = getUser();
    setUser(userData);
  }, []);


  return (
    <aside className="w-[270px] h-screen sticky top-0 bg-[#0B1020] text-white flex flex-col">
      {/* Logo - Fixed */}
      <div className="h-20 shrink-0 px-6 flex items-center border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center">
          <Bot size={22} />
        </div>

        <h1 className="ml-3 text-xl font-bold leading-tight">
          AI Interview
          <br />
          Agent
        </h1>
      </div>

      {/* Scrollable Menu */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 py-6">
        {menu.map((item, index) => {
          if ("heading" in item) {
            return (
              <p
                key={index}
                className="text-xs uppercase tracking-widest text-gray-500 mt-8 mb-3"
              >
                {item.heading}
              </p>
            );
          }

          const Icon = item.icon;

          const active = (() => {
            const currentItem = menu
              .filter((m) => "href" in m)
              .sort((a, b) => b.href.length - a.href.length)
              .find(
                (m) =>
                  pathname === m.href ||
                  pathname.startsWith(m.href + "/")
              );

            return currentItem?.href === item.href;
          })();

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 mb-2 transition-all duration-200 ${
                active
                  ? "bg-violet-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>

      {/* User - Fixed */}
      <div className="shrink-0 border-t border-white/10 p-4">
        <div className="rounded-xl border border-white/10 p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {user?.profileImg ? (
              <img
                src={user.profileImg}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <UserCircle2 size={42} />
            )}

            <div>
              <h4 className="font-semibold">
                {user
                  ? `${user.fName} ${user.lName}`
                  : "Loading..."}
              </h4>

              <p className="text-xs text-gray-400">
                {user?.designation || "User"}
              </p>
            </div>
          </div>
        </div>

        <button className="w-full mt-4 flex items-center justify-center gap-2 text-gray-400 hover:text-white transition">
          <ChevronLeft size={18} />
          Collapse
        </button>
      </div>
    </aside>
  );
}