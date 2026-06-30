"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { useTemplates } from "@/hooks/useTemplates";

import TemplateStats from "@/components/templates/template-stats";
import TemplateFilters from "@/components/templates/template-filters";
import TemplateTable from "@/components/templates/template-table";

export default function TemplatesPage() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState(""); // "" | "Active" | "Inactive"

  // Debounce search input so we don't hit the API on every keystroke.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 350);
    return () => clearTimeout(timeout);
  }, [search]);

  const { data, loading, error } = useTemplates(
    page,
    10,
    debouncedSearch,
      
  );

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const handleClear = () => {
    setSearch("");
    setDebouncedSearch("");
    setStatus("");
    setPage(1);
  };

  if (loading && !data) {
    return (
      <div className="flex h-72 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
        {error}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-medium text-violet-600">Templates</p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Interview Templates
          </h1>

          <p className="mt-2 text-slate-500">
            Create and manage interview templates for different job roles.
          </p>
        </div>

        <Link
          href="/templates/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
        >
          <Plus className="h-4 w-4" />
          Create Template
        </Link>
      </div>

      {/* Stats */}
      <TemplateStats templates={data.records} pagination={data.pagination} />

      {/* Filters */}

      <TemplateFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={handleStatusChange}
        onClear={handleClear}
      />

      {/* Table */}

      <TemplateTable
        templates={data.records}
        pagination={data.pagination}
        loading={loading}
        onPageChange={setPage}
      />
    </div>
  );
}