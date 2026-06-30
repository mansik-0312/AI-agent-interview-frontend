"use client";

import { useEffect, useState, useCallback } from "react";
import { getTemplates } from "@/services/template.service";
import { TemplateListResponse } from "@/types/template";

export function useTemplates(
  page = 1,
  pageSize = 10,
  search = "",
  status = ""
) {
  const [data, setData] = useState<TemplateListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getTemplates({
        page,
        pageSize,
        search,
        status,
      });

      setData(response);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load templates"
      );
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, status]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return {
    data,
    loading,
    error,
    refetch: fetchTemplates,
  };
}