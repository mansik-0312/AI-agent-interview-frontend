"use client";

import { useState } from "react";
import { useQuestions } from "@/hooks/useQuestions";
import QuestionHeader from "@/components/questions/question-header";
import QuestionStats from "@/components/questions/question-stats";
import QuestionFilters from "@/components/questions/question-filters";
import QuestionTable from "@/components/questions/question-table";
import QuestionPagination from "@/components/questions/question-pagination";
import { Question } from "@/types/question";

// TODO: replace with real templates fetched from /templates for the filter dropdown
const PLACEHOLDER_TEMPLATES = [
  { id: "t1", name: "Frontend Developer Interview" },
  { id: "t2", name: "Backend Developer Interview" },
  { id: "t3", name: "Full Stack Developer Interview" },
  { id: "t4", name: "Python Developer Interview" },
];

export default function QuestionsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [status, setStatus] = useState(""); // "" | "true" | "false"
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const active = status === "" ? undefined : status === "true";

  const { data, loading, error, refetch } = useQuestions(
    page,
    pageSize,
    search,
    difficulty,
    active,
    templateId
  );

  const handleReset = () => {
    setSearch("");
    setDifficulty("");
    setDuration("");
    setTemplateId("");
    setStatus("");
    setPage(1);
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (!data) return;
    const allSelected = data.records.every((r) => selected.has(r.id));
    setSelected(allSelected ? new Set() : new Set(data.records.map((r) => r.id)));
  };

  const handleDelete = (q: Question) => {
    // TODO: wire to deleteQuestion service + refetch
    console.log("delete", q.id);
  };

  const handleDuplicate = (q: Question) => {
    // TODO: wire to duplicateQuestion service + refetch
    console.log("duplicate", q.id);
  };

  if (loading && !data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-4 text-sm text-red-600">
        {error}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-6 p-6">
      <QuestionHeader />

      <QuestionStats stats={data.stats} />

      <QuestionFilters
        search={search}
        difficulty={difficulty}
        duration={duration}
        templateId={templateId}
        status={status}
        templates={PLACEHOLDER_TEMPLATES}
        onSearchChange={(v) => { setSearch(v); setPage(1); }}
        onDifficultyChange={(v) => { setDifficulty(v); setPage(1); }}
        onDurationChange={(v) => { setDuration(v); setPage(1); }}
        onTemplateChange={(v) => { setTemplateId(v); setPage(1); }}
        onStatusChange={(v) => { setStatus(v); setPage(1); }}
        onReset={handleReset}
      />

      <div className="rounded-2xl border border-slate-200 bg-white">
        <QuestionTable
          records={data.records}
          selected={selected}
          onToggleSelect={toggleSelect}
          onToggleAll={toggleAll}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          bare
        />

        <QuestionPagination
          pagination={data.pagination}
          onPageChange={setPage}
          onPageSizeChange={(size) => { setPageSize(size); setPage(1); }}
        />
      </div>
    </div>
  );
}