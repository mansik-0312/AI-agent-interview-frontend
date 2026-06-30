"use client";

import { Template, Pagination } from "@/types/template";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreVertical,
  Pencil,
} from "lucide-react";

interface Props {
  templates: Template[];
  pagination: Pagination;
  loading: boolean;
  onPageChange: (page: number) => void;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function TemplateTable({
  templates,
  pagination,
  loading,
  onPageChange,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Template
              </th>

              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Description
              </th>

              <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Questions
              </th>

              <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Created
              </th>

              <th className="w-16 px-4 py-4" />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-16 text-center text-slate-500"
                >
                  Loading templates...
                </td>
              </tr>
            ) : templates.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-16 text-center text-slate-500"
                >
                  No templates found.
                </td>
              </tr>
            ) : (
              templates.map((template) => (
                <tr
                  key={template.id}
                  className="group hover:bg-slate-50 transition-colors"
                >
                  {/* Name */}
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-semibold text-slate-800">
                        {template.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        ID: {template.id.slice(-8)}
                      </p>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="max-w-sm px-4 py-5 text-sm text-slate-600">
                    {template.description || "--"}
                  </td>

                  {/* Questions */}
                  <td className="px-4 py-5 text-center">
                    <span className="rounded-lg bg-violet-50 px-3 py-1 text-sm font-semibold text-violet-700">
                      {template.totalQuestions}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-5 text-center">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        template.active
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {template.active
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  {/* Created */}
                  <td className="px-4 py-5 text-sm text-slate-600">
                    {formatDate(template.createdAt)}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-5">
                    <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <button className="rounded-lg p-2 hover:bg-slate-100">
                        <Eye className="h-4 w-4 text-slate-500" />
                      </button>

                      <button className="rounded-lg p-2 hover:bg-slate-100">
                        <Pencil className="h-4 w-4 text-slate-500" />
                      </button>

                      <button className="rounded-lg p-2 hover:bg-slate-100">
                        <MoreVertical className="h-4 w-4 text-slate-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && pagination.total_pages > 0 && (
        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
          <div className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold">
              {templates.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold">
              {pagination.total_records}
            </span>{" "}
            templates
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={!pagination.has_previous}
              onClick={() =>
                onPageChange(pagination.page - 1)
              }
              className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            <div className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium">
              {pagination.page} /{" "}
              {pagination.total_pages}
            </div>

            <button
              disabled={!pagination.has_next}
              onClick={() =>
                onPageChange(pagination.page + 1)
              }
              className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-50"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}