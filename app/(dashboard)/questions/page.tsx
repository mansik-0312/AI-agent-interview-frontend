"use client";

import { useQuestions } from "@/hooks/useQuestions";
import QuestionHeader from "@/components/questions/question-header";
import QuestionStats from "@/components/questions/question-stats";
import QuestionFilters from "@/components/questions/question-filters";
import QuestionTable from "@/components/questions/question-table";

export default function QuestionsPage() {
  const {
    data,
    loading,
    error,
  } = useQuestions();

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center text-slate-500">
        Loading questions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-8">
      <QuestionHeader />

      <QuestionStats
        stats={data.stats}
      />

      <QuestionFilters />

      <QuestionTable
        records={data.records}
        pagination={data.pagination}
      />
    </div>
  );
}