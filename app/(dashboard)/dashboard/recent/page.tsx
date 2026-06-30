"use client";

import RecentInterviews from "@/components/dashboard/recent-interviews";
import { useUpcomingInterviews } from "@/hooks/useRecentInterviews";

export default function RecentPage() {
  const {
    data,
    loading,
    error,
  } = useUpcomingInterviews();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <RecentInterviews
      interviews={data?.records ?? []}
    />
  );
}