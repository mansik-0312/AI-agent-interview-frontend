"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

export default function QuestionHeader() {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Question List</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your question bank used in AI interviews.
        </p>
      </div>

      <Link
        href="/questions/create"
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-800 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Create Question
      </Link>
    </div>
  );
}