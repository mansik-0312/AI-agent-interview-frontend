"use client";

import { useEffect, useState } from "react";
import { getDashboard } from "@/services/dashboard.service";
import { DashboardResponse } from "@/types/dashboard";

export const useDashboard = () => {
  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const data =
        await getDashboard();

      setDashboard(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    dashboard,
    loading,
    error,
    refetch: fetchDashboard,
  };
};