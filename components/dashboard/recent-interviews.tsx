import { RecentInterview } from "@/types/dashboard";
import { ArrowRight, MoreVertical } from "lucide-react";
import Link from "next/link";

interface Props {
  interviews: RecentInterview[];
}

const avatarColors: Record<string, string> = {
  A: "bg-blue-100 text-blue-600",
  B: "bg-orange-100 text-orange-600",
  C: "bg-green-100 text-green-600",
  D: "bg-pink-100 text-pink-600",
  E: "bg-purple-100 text-purple-600",
  F: "bg-teal-100 text-teal-600",
  G: "bg-yellow-100 text-yellow-600",
  H: "bg-red-100 text-red-600",
  I: "bg-cyan-100 text-cyan-600",
  J: "bg-lime-100 text-lime-600",
  K: "bg-indigo-100 text-indigo-600",
  L: "bg-rose-100 text-rose-600",
  M: "bg-amber-100 text-amber-600",
  N: "bg-violet-100 text-violet-600",
  default: "bg-slate-100 text-slate-600",
};

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

function getAvatarColor(name: string) {
  const firstLetter = name[0]?.toUpperCase() ?? "default";
  return avatarColors[firstLetter] ?? avatarColors.default;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getScoreColor(score: number) {
  if (score >= 90) return "text-emerald-600";
  if (score >= 75) return "text-blue-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-500";
}

export default function RecentInterviews({ interviews }: Props) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5">
        <h2 className="text-lg font-bold text-slate-800">Recent Interviews</h2>
          <Link
            href="/dashboard/recent"
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-t border-slate-100 bg-slate-50/60">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                Candidate Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                Job Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                Interview Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                Duration
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                Overall Score
              </th>
              <th className="px-6 py-3" />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {interviews.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-slate-500"
                >
                  No recent interviews found.
                </td>
              </tr>
            ) : interviews.map((item) => {
              const initials = getInitials(item.candidateName);
              const colorClass = getAvatarColor(item.candidateName);

              return (
                <tr key={item.interviewId} className="group hover:bg-slate-50/50 transition-colors">
                  {/* Candidate */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${colorClass}`}
                      >
                        {initials}
                      </span>
                      <span className="font-medium text-slate-700">{item.candidateName}</span>
                    </div>
                  </td>

                  {/* Job Role */}
                  <td className="px-4 py-4 text-slate-600">{item.jobRole}</td>

                  {/* Date */}
                  <td className="px-4 py-4 text-slate-600">{formatDate(item.interviewDate)}</td>

                  {/* Duration */}
                  <td className="px-4 py-4 text-slate-600">{item.duration} min</td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center rounded-lg px-3 py-1 text-xs font-semibold ${
                        item.status === "Completed"
                          ? "bg-emerald-50 text-emerald-600"
                          : item.status === "Cancelled"
                          ? "bg-red-50 text-red-500"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Score */}
                  <td className={`px-4 py-4 font-semibold ${getScoreColor(item.overallScore)}`}>
                    {item.overallScore}/100
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <button className="rounded-lg p-1 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-slate-100 hover:text-slate-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
