"use client";

import UpcomingInterviews from "@/components/dashboard/upcoming-interviews";
import { useUpcomingInterviews } from "@/hooks/useUpcomingInterviews";

export default function UpcomingPage() {
  const {
    data,
    loading,
    error,
  } = useUpcomingInterviews();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <UpcomingInterviews
      interviews={data?.records ?? []}
    />
  );
}