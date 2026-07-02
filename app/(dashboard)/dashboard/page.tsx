"use client";

import { useDashboard } from "@/hooks/useDashboard";
import StatsCards from "@/components/dashboard/stats-card";
import UpcomingInterviews from "@/components/dashboard/upcoming-interviews";
import RecentInterviews from "@/components/dashboard/recent-interviews";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";

interface User {
  fName: string;
  lName: string;
  designation: string;
  profileImg: string;
}

export default function DashboardPage() {
  const { dashboard, loading, error } = useDashboard();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = getUser();
    setUser(userData);
  }, []);


  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
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

  if (!dashboard) return null;

  return (
    <div className="space-y-6 p-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Welcome back, {user?.fName || "User"}!
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here's what's happening with your interviews today.
          </p>
        </div>

        <button
          onClick={() => router.push("/interviews/create")}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Schedule Interview
        </button>
      </div>

      {/* Stats */}
      <StatsCards stats={dashboard.stats} />

      {/* Upcoming */}
      <UpcomingInterviews interviews={dashboard.upcomingInterviews} />

      {/* Recent */}
      <RecentInterviews interviews={dashboard.recentInterviews} />
    </div>
  );
}
