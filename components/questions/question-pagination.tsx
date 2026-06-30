"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Props {
  pagination: {
    page: number;
    page_size: number;
    total_records: number;
    total_pages: number;
    has_next: boolean;
    has_previous: boolean;
  };
  onPageChange?: (page: number) => void;
}

export default function QuestionPagination({
  pagination,
  onPageChange,
}: Props) {
  const {
    page,
    page_size,
    total_records,
    total_pages,
    has_next,
    has_previous,
  } = pagination;

  return (
    <div className="flex flex-col gap-4 border-t border-slate-100 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
      <p className="text-sm text-slate-500">
        Showing{" "}
        {Math.min(
          (page - 1) * page_size + 1,
          total_records
        )}{" "}
        to{" "}
        {Math.min(
          page * page_size,
          total_records
        )}{" "}
        of {total_records} results
      </p>

      <div className="flex items-center gap-3">
        <button
          disabled={!has_previous}
          onClick={() =>
            onPageChange?.(page - 1)
          }
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            text-slate-700
            transition
            hover:bg-slate-50
            disabled:opacity-40
          "
        >
          <ChevronLeft size={18} />
        </button>

        <span className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white">
          {page}
        </span>

        <span className="text-sm text-slate-500">
          of {total_pages}
        </span>

        <button
          disabled={!has_next}
          onClick={() =>
            onPageChange?.(page + 1)
          }
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            text-slate-700
            transition
            hover:bg-slate-50
            disabled:opacity-40
          "
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}