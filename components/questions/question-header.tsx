"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

export default function QuestionHeader() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="text-4xl font-bold text-[#0B1020]">
          Question List
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your question bank used in AI interviews.
        </p>
      </div>

      <Link
        href="/questions/create"
        className="
          inline-flex
          items-center
          gap-2
          rounded-2xl
          bg-violet-600
          px-6
          py-4
          font-medium
          text-white
          shadow-lg
          transition
          hover:bg-violet-700
        "
      >
        <Plus size={18} />
        Create Question
      </Link>
    </div>
  );
}