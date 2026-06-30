"use client";

import { useState } from "react";
import { Pencil, Trash2, Star } from "lucide-react";
import { Question } from "@/types/question";

interface Props {
  records: Question[];
  selected: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleAll: () => void;
  onEdit?: (q: Question) => void;
  onDelete?: (q: Question) => void;
  /** When true, renders without its own border/rounded wrapper (for nesting inside a parent card). */
  bare?: boolean;
}

const difficultyStyles: Record<string, string> = {
  EASY: "bg-emerald-50 text-emerald-700",
  MEDIUM: "bg-amber-50 text-amber-700",
  HARD: "bg-red-50 text-red-600",
};

function formatCreatedAt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StarRating({ weight }: { weight: number }) {
  // weight is expected 0-5
  const rounded = Math.round(weight * 2) / 2; // nearest half
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => {
          const filled = i + 1 <= rounded;
          const half = !filled && i + 0.5 === rounded;
          return (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                filled || half ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"
              }`}
            />
          );
        })}
      </div>
      <span className="text-sm text-slate-600">{weight}</span>
    </div>
  );
}

export default function QuestionTable({
  records,
  selected,
  onToggleSelect,
  onToggleAll,
  onEdit,
  onDelete,
  bare = false,
}: Props) {
  const allSelected = records.length > 0 && records.every((r) => selected.has(r.id));

  return (
    <div className={bare ? "" : "overflow-hidden rounded-2xl border border-slate-200 bg-white"}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleAll}
                  className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-normal text-slate-400">
                Question
              </th>
              <th className="px-4 py-3 text-left text-sm font-normal text-slate-400">
                Difficulty
              </th>
              <th className="px-4 py-3 text-left text-sm font-normal text-slate-400">
                Duration
              </th>
              <th className="px-4 py-3 text-left text-sm font-normal text-slate-400">
                Weightage
              </th>
              <th className="px-4 py-3 text-left text-sm font-normal text-slate-400">
                Template
              </th>
              <th className="px-4 py-3 text-left text-sm font-normal text-slate-400">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-normal text-slate-400">
                Created At
              </th>
              <th className="px-4 py-3 text-left text-sm font-normal text-slate-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {records.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-sm text-slate-400">
                  No questions found.
                </td>
              </tr>
            ) : (
              records.map((q) => (
                <tr key={q.id} className="group hover:bg-slate-50 transition-colors">
                  {/* Checkbox */}
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selected.has(q.id)}
                      onChange={() => onToggleSelect(q.id)}
                      className="h-4 w-4 rounded border-slate-300 accent-blue-600"
                    />
                  </td>

                  {/* Question + tag */}
                  <td className="px-4 py-4 max-w-xs">
                    <p className="text-sm font-medium text-slate-800">{q.questionText}</p>
                    {q.tag && (
                      <p className="mt-0.5 text-xs text-slate-400">{q.tag}</p>
                    )}
                  </td>

                  {/* Difficulty */}
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium capitalize ${
                        difficultyStyles[q.difficulty] ?? "bg-slate-50 text-slate-600"
                      }`}
                    >
                      {q.difficulty.charAt(0) + q.difficulty.slice(1).toLowerCase()}
                    </span>
                  </td>

                  {/* Duration */}
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {Math.round(q.duration / 60)} min
                  </td>

                  {/* Weightage */}
                  <td className="px-4 py-4">
                    <StarRating weight={q.weight} />
                  </td>

                  {/* Template */}
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {q.templateName}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                        q.active ? "text-emerald-600" : "text-slate-400"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          q.active ? "bg-emerald-500" : "bg-slate-300"
                        }`}
                      />
                      {q.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Created At */}
                  <td className="px-4 py-4 text-xs text-slate-500 whitespace-nowrap">
                    {formatCreatedAt(q.createdAt)}
                    {q.createdByName && (
                      <>
                        <br />
                        by {q.createdByName}
                      </>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        title="Edit"
                        onClick={() => onEdit?.(q)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => onDelete?.(q)}
                        className="rounded-lg p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}