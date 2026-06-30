"use client";

import { Search, FilterX } from "lucide-react";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  onClear?: () => void;
}

export default function TemplateFilters({
  search,
  onSearchChange,
  onClear,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Search Template
          </label>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by template name..."
              className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            disabled
            className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-400"
          >
            <option>All Status</option>
          </select>
        </div>

        {/* Role */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Role / Category
          </label>

          <select
            disabled
            className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-400"
          >
            <option>All Roles</option>
          </select>
        </div>

        {/* Experience */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Experience Level
          </label>

          <select
            disabled
            className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-400"
          >
            <option>All Levels</option>
          </select>
        </div>

        {/* Created By */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Created By
          </label>

          <select
            disabled
            className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-400"
          >
            <option>All Users</option>
          </select>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-end">
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <FilterX className="h-4 w-4" />
          Clear Filters
        </button>
      </div>
    </div>
  );
}