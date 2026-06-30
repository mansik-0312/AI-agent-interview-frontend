"use client";

import { useEffect, useState, useCallback } from "react";
import { getQuestions } from "@/services/question.service";
import { QuestionsResponse } from "@/types/question";

export function useQuestions(
  page = 1,
  pageSize = 10,
  search = "",
  difficulty = "",
  active?: boolean,
  templateId?: string
) {
  const [data, setData] = useState<QuestionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getQuestions({
        page,
        page_size: pageSize,
        search,
        difficulty,
        active,
        templateId,
      });

      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, difficulty, active, templateId]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return {
    data,
    loading,
    error,
    refetch: fetchQuestions,
  };
}