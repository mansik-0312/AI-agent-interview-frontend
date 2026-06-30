"use client";

import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface Props {
  pagination: {
    page: number;
    page_size: number;
    total_records: number;
    total_pages: number;
    has_next: boolean;
    has_previous: boolean;
  };
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export default function QuestionPagination({
  pagination,
  onPageChange,
  onPageSizeChange,
}: Props) {
  const { page, page_size, total_records, total_pages, has_next, has_previous } = pagination;

  const startIndex = total_records === 0 ? 0 : (page - 1) * page_size + 1;
  const endIndex = Math.min(page * page_size, total_records);

  // Build a compact page list: first few pages, ellipsis, last page
  const pageNumbers: (number | "ellipsis")[] = [];
  const maxVisible = 3;

  if (total_pages <= maxVisible + 2) {
    for (let i = 1; i <= total_pages; i++) pageNumbers.push(i);
  } else {
    for (let i = 1; i <= maxVisible; i++) pageNumbers.push(i);
    if (page > maxVisible + 1) pageNumbers.push("ellipsis");
    pageNumbers.push(total_pages);
  }

  return (
    <div className="flex flex-col gap-4 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Showing {startIndex} to {endIndex} of {total_records} results
      </p>

      <div className="flex items-center gap-1.5">
        <button
          disabled={!has_previous}
          onClick={() => onPageChange(page - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pageNumbers.map((p, idx) =>
          p === "ellipsis" ? (
            <span key={`ellipsis-${idx}`} className="px-1 text-slate-400">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors ${
                page === p
                  ? "bg-blue-600 text-white font-semibold"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          disabled={!has_next}
          onClick={() => onPageChange(page + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Page size selector */}
        <div className="relative ml-2">
          <select
            value={page_size}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            className="h-8 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-7 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={10}>10 / page</option>
            <option value={25}>25 / page</option>
            <option value={50}>50 / page</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        </div>
      </div>
    </div>
  );
}