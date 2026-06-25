"use client";

import {
  Bell,
  Menu,
  Moon,
  Search,
} from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">

      {/* Left */}

      <div className="flex items-center gap-5">

        <button className="h-10 w-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition">

          <Menu size={22} />

        </button>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        {/* Search */}

        <div className="relative hidden md:block">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            placeholder="Search anything..."
            className="
            w-[380px]
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            py-3
            pl-11
            pr-16
            outline-none
            focus:ring-2
            focus:ring-violet-500
            "
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border bg-white px-2 py-1 text-xs text-gray-500">

            ⌘ K

          </div>

        </div>

        {/* Notification */}

        <button className="relative h-11 w-11 rounded-full hover:bg-gray-100 flex items-center justify-center">

          <Bell size={21} />

          <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">

            3

          </span>

        </button>

        {/* Theme */}

        <button className="h-11 w-11 rounded-full hover:bg-gray-100 flex items-center justify-center">

          <Moon size={20} />

        </button>

        {/* Divider */}

        <div className="h-10 w-px bg-gray-200" />

        {/* Profile */}

        <button className="flex items-center gap-3">

          <img
            src="https://i.pravatar.cc/150?img=32"
            alt="Profile"
            className="h-11 w-11 rounded-full object-cover"
          />

        </button>

      </div>

    </header>
  );
}