"use client";

import { useEffect, useState } from "react";
import { getRecentInterviews } from "@/services/dashboard.service";

export function useUpcomingInterviews(
  page = 1,
  pageSize = 10
) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");

  useEffect(() => {
    fetchData();
  }, [page]);

  async function fetchData() {
    try {
      setLoading(true);

      const response =
        await getRecentInterviews(
          page,
          pageSize
        );

      setData(response);
    } catch (err) {
      setError("Failed to load interviews");
    } finally {
      setLoading(false);
    }
  }

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}