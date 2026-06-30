import { UpcomingInterview } from "@/types/dashboard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  interviews: UpcomingInterview[];
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

function formatDateTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }) + " • " + d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export default function UpcomingInterviews({ interviews }: Props) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5">
        <h2 className="text-lg font-bold text-slate-800">Upcoming Interviews</h2>
          <Link
            href="/dashboard/upcoming"
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
                Interview Date &amp; Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                Interviewers
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {interviews.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-sm font-medium text-slate-500"
                >
                  No upcoming interviews found.
                </td>
              </tr>
            ) : 
              interviews.map((item) => {
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

                  {/* Date & Time */}
                  <td className="px-4 py-4 text-slate-600">{formatDateTime(item.scheduledAt)}</td>

                  {/* Interviewers */}
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      {item.interviewers.slice(0, 3).map((name, idx) => (
                        <span
                          key={idx}
                          title={name}
                          className={`-ml-1 first:ml-0 inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-semibold ${getAvatarColor(name)}`}
                        >
                          {getInitials(name)}
                        </span>
                      ))}
                      {item.interviewers.length > 3 && (
                        <span className="-ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[10px] font-semibold text-slate-500">
                          +{item.interviewers.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-4 py-4 text-slate-600">{item.type}</td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                      {item.status}
                    </span>
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
