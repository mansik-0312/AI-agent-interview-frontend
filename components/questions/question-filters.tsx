"use client";

import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

interface Props {
  search: string;
  difficulty: string;
  duration: string;
  templateId: string;
  status: string;
  templates: { id: string; name: string }[];
  onSearchChange: (value: string) => void;
  onDifficultyChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onTemplateChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

const selectClass =
  "h-10 w-full rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function QuestionFilters({
  search,
  difficulty,
  duration,
  templateId,
  status,
  templates,
  onSearchChange,
  onDifficultyChange,
  onDurationChange,
  onTemplateChange,
  onStatusChange,
  onReset,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4">
      <div className="flex flex-wrap items-end gap-4">
        {/* Search */}
        <div className="flex-1 min-w-56">
          <label className="mb-1.5 block text-xs font-medium text-slate-500">
            Search Question
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by question or keyword..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Difficulty */}
        <div className="w-32">
          <label className="mb-1.5 block text-xs font-medium text-slate-500">
            Difficulty
          </label>
          <div className="relative">
            <select
              value={difficulty}
              onChange={(e) => onDifficultyChange(e.target.value)}
              className={selectClass}
            >
              <option value="">All</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Duration */}
        <div className="w-32">
          <label className="mb-1.5 block text-xs font-medium text-slate-500">
            Duration
          </label>
          <div className="relative">
            <select
              value={duration}
              onChange={(e) => onDurationChange(e.target.value)}
              className={selectClass}
            >
              <option value="">All</option>
              <option value="short">Under 5 min</option>
              <option value="medium">5–10 min</option>
              <option value="long">10+ min</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Template */}
        <div className="w-44">
          <label className="mb-1.5 block text-xs font-medium text-slate-500">
            Template
          </label>
          <div className="relative">
            <select
              value={templateId}
              onChange={(e) => onTemplateChange(e.target.value)}
              className={selectClass}
            >
              <option value="">All Templates</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Status */}
        <div className="w-32">
          <label className="mb-1.5 block text-xs font-medium text-slate-500">
            Status
          </label>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              className={selectClass}
            >
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-end gap-2">
          <button className="flex h-10 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            <SlidersHorizontal className="h-4 w-4 text-blue-500" />
            More Filters
          </button>
          <button
            onClick={onReset}
            className="px-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}