import { DashboardStats } from "@/types/dashboard";
import {
  CalendarCheck,
  CheckSquare,
  Clock,
  Users,
  TrendingUp,
} from "lucide-react";

interface Props {
  stats: DashboardStats;
}

const statConfig = [
  {
    key: "totalInterviews" as const,
    label: "Total Interviews",
    trend: "+18% vs last month",
    icon: CalendarCheck,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    key: "completedInterviews" as const,
    label: "Completed Interviews",
    trend: "+20% vs last month",
    icon: CheckSquare,
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
  },
  {
    key: "upcomingInterviews" as const,
    label: "Upcoming Interviews",
    trend: "+14% vs last month",
    icon: Clock,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-400",
  },
  {
    key: "totalCandidates" as const,
    label: "Total Candidates",
    trend: "+16% vs last month",
    icon: Users,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
  },
];

export default function StatsCards({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statConfig.map(({ key, label, trend, icon: Icon, iconBg, iconColor }) => (
        <div
          key={key}
          className="rounded-2xl border border-slate-200 bg-white px-6 py-5"
        >
          {/* Icon */}
          <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} strokeWidth={1.8} />
          </div>

          {/* Label */}
          <p className="text-sm text-slate-500">{label}</p>

          {/* Number */}
          <p className="mt-1 text-4xl font-bold text-slate-800 leading-tight">
            {stats[key]}
          </p>

          {/* Trend */}
          <p className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </p>
        </div>
      ))}
    </div>
  );
}
