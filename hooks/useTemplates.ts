"use client";

import { useEffect, useState } from "react";
import { getTemplates } from "@/services/template.service";
import { TemplateListResponse } from "@/types/template";

export function useTemplates(
  page = 1,
  pageSize = 10
) {
  const [data, setData] =
    useState<TemplateListResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    fetchTemplates();
  }, [page, pageSize]);

  async function fetchTemplates() {
    try {
      setLoading(true);

      const response =
        await getTemplates(
          page,
          pageSize
        );

      setData(response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load templates"
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    data,
    loading,
    error,
    refetch: fetchTemplates,
  };
}