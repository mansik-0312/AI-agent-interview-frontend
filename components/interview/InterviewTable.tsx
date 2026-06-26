"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { getToken } from "@/lib/auth";

interface InterviewAnalysis {
  integrityScore?: number;
  createdAt?: string;
}

interface Interview {
  interviewId: string;
  candidateName: string;
  status: string;
  technicalScore: number | null;
  analysis: InterviewAnalysis | null;
}

interface InterviewsResponse {
  items: Interview[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const LIMIT = 10;

export default function InterviewTable() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInterviews(page);
  }, [page]);

  const fetchInterviews = async (pageNumber: number) => {
    try {
      setLoading(true);
      setError(null);

      const token = getToken();

      if (!token) {
        throw new Error("Not authenticated. Please log in.");
      }

      const response = await fetch(
        `http://127.0.0.1:8000/api/interviews?page=${pageNumber}&limit=${LIMIT}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch interviews");
      }

      const result = await response.json();
      const data: InterviewsResponse = result.data;

      setInterviews(data.items || []);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Failed to load interviews."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center text-slate-500">
        Loading interviews...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-4 text-slate-500">
        <p>{error}</p>
        <button
          onClick={() => fetchInterviews(page)}
          className="rounded-xl bg-[#0B1020] px-5 py-3 text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm font-semibold text-slate-600">
              <th className="px-6 py-5">Candidate</th>
              <th className="px-6 py-5">Technical Score</th>
              <th className="px-6 py-5">Integrity</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5">Date</th>
              <th className="px-6 py-5 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {interviews.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-16 text-center text-slate-500">
                  No interviews found.
                </td>
              </tr>
            ) : (
              interviews.map((item) => (
                <tr
                  key={item.interviewId}
                  className="border-t border-slate-100 hover:bg-cyan-50 transition"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold">
                        {item.candidateName
                          .split(" ")
                          .map((x) => x[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {item.candidateName}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {item.interviewId}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    {item.technicalScore === null ? (
                      <span className="text-slate-400">--</span>
                    ) : (
                      <span className="font-semibold text-slate-900">
                        ⭐ {item.technicalScore}
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-5">
                    {item.analysis?.integrityScore === undefined ? (
                      <span className="text-slate-400">--</span>
                    ) : (
                      <span className="font-semibold text-emerald-600">
                        {item.analysis.integrityScore}%
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        item.status === "COMPLETED"
                          ? "bg-emerald-100 text-emerald-700"
                          : item.status === "SCHEDULED"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {item.analysis?.createdAt
                      ? new Date(item.analysis.createdAt).toLocaleDateString()
                      : "--"}
                  </td>

                  <td className="px-6 py-5 text-right">
                    <Link
                      href={`/interviews/${item.interviewId}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#0B1020] px-4 py-2 text-white hover:shadow-lg transition"
                    >
                      <Eye size={16} />
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing page {page} of {totalPages} ({total} total)
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <span className="px-3 text-sm font-semibold text-slate-700">
            {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-40 hover:bg-slate-50 transition"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
