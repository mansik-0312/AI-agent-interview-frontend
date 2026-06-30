"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Menu,
  Moon,
  Search,
  UserCircle2,
} from "lucide-react";
import { getUser } from "@/lib/auth";

interface User {
  fName: string;
  lName: string;
  designation: string;
  profileImg: string;
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = getUser();
    setUser(userData);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-20 bg-[#0B1020] border-b border-white/10 flex items-center justify-between px-8">

      {/* Left */}
      <div className="flex items-center gap-5">
        <button className="h-10 w-10 rounded-lg hover:bg-white/10 flex items-center justify-center transition">
          <Menu size={22} className="text-white" />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <button className="relative h-11 w-11 rounded-full hover:bg-white/10 flex items-center justify-center">
          <Bell size={21} className="text-white" />

          <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">
            3
          </span>
        </button>

        {/* Theme */}
        <button className="h-11 w-11 rounded-full hover:bg-white/10 flex items-center justify-center">
          <Moon size={20} className="text-white" />
        </button>

        {/* Divider */}
        <div className="h-10 w-px bg-white/10" />

        {/* User */}
        <button className="flex items-center gap-3 rounded-xl px-2 py-1 hover:bg-white/10 transition">

          {user?.profileImg ? (
            <img
              src={user.profileImg}
              alt="Profile"
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <UserCircle2
              size={42}
              className="text-gray-300"
            />
          )}

          <div className="hidden lg:block text-left">
            <p className="text-sm font-semibold text-white">
              {user
                ? `${user.fName} ${user.lName}`
                : "Loading..."}
            </p>

            <p className="text-xs text-gray-400">
              {user?.designation || "User"}
            </p>
          </div>

        </button>

      </div>
    </header>
  );
}
