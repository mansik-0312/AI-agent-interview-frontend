// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Search, ChevronRight } from "lucide-react";

// interface CompletedInterview {
//   interviewId: string;
//   candidateName: string;
//   jobRole: string;
//   status: string;
//   date: string;
//   overallScore: number;
//   totalQuestions: number;
// }

// const MOCK_INTERVIEWS: CompletedInterview[] = [
//   {
//     interviewId: "1",
//     candidateName: "Arjun Singh",
//     jobRole: "Frontend Developer",
//     status: "Completed",
//     date: "2024-06-20T10:30:00",
//     overallScore: 3.6,
//     totalQuestions: 12,
//   },
//   {
//     interviewId: "2",
//     candidateName: "Priya Sharma",
//     jobRole: "Backend Developer",
//     status: "Completed",
//     date: "2024-06-18T14:00:00",
//     overallScore: 4.2,
//     totalQuestions: 14,
//   },
//   {
//     interviewId: "3",
//     candidateName: "Rohan Mehta",
//     jobRole: "Full Stack Developer",
//     status: "Completed",
//     date: "2024-06-15T09:15:00",
//     overallScore: 2.8,
//     totalQuestions: 16,
//   },
//   {
//     interviewId: "4",
//     candidateName: "Sneha Iyer",
//     jobRole: "React Developer",
//     status: "Completed",
//     date: "2024-06-10T11:45:00",
//     overallScore: 4.5,
//     totalQuestions: 10,
//   },
// ];

// export default function ReportsListPage() {
//   const router = useRouter();
//   const [search, setSearch] = useState("");

//   const filtered = MOCK_INTERVIEWS.filter((i) =>
//     i.candidateName.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6 bg-[#F8FAFC] min-h-screen">
//       <div className="mb-6">
//         <h1 className="text-2xl font-semibold text-slate-900">Reports</h1>
//         <p className="text-slate-500 text-sm mt-0.5">
//           View detailed analysis reports for completed interviews.
//         </p>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-slate-100">
//         <div className="p-4 border-b border-slate-100">
//           <div className="relative max-w-sm">
//             <Search
//               size={16}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//             />
//             <input
//               type="text"
//               placeholder="Search candidate..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-violet-500"
//             />
//           </div>
//         </div>

//         <table className="w-full text-sm">
//           <thead>
//             <tr className="text-left text-slate-500 text-xs border-b border-slate-100">
//               <th className="px-4 py-3 font-medium">Candidate</th>
//               <th className="px-4 py-3 font-medium">Job Role</th>
//               <th className="px-4 py-3 font-medium">Date</th>
//               <th className="px-4 py-3 font-medium">Questions</th>
//               <th className="px-4 py-3 font-medium">Score</th>
//               <th className="px-4 py-3 font-medium">Status</th>
//               <th className="px-4 py-3 font-medium"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map((interview) => (
//               <tr
//                 key={interview.interviewId}
//                 onClick={() => router.push(`/reports/${interview.interviewId}`)}
//                 className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition"
//               >
//                 <td className="px-4 py-3 font-medium text-slate-900">
//                   {interview.candidateName}
//                 </td>
//                 <td className="px-4 py-3 text-slate-600">{interview.jobRole}</td>
//                 <td className="px-4 py-3 text-slate-600">
//                   {new Date(interview.date).toLocaleDateString("en-US", {
//                     month: "short",
//                     day: "numeric",
//                     year: "numeric",
//                   })}
//                 </td>
//                 <td className="px-4 py-3 text-slate-600">
//                   {interview.totalQuestions} Questions
//                 </td>
//                 <td className="px-4 py-3 font-medium text-slate-900">
//                   {interview.overallScore} / 5
//                 </td>
//                 <td className="px-4 py-3">
//                   <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
//                     {interview.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 text-right">
//                   <ChevronRight size={16} className="text-slate-400" />
//                 </td>
//               </tr>
//             ))}

//             {filtered.length === 0 && (
//               <tr>
//                 <td colSpan={7} className="px-4 py-10 text-center text-slate-400 text-sm">
//                   No completed interviews found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronRight } from "lucide-react";
import { getToken } from "@/lib/auth"; // Update the import path if needed

interface CompletedInterview {
  interviewId: string;
  candidateName: string;
  jobRole: string;
  status: string;
  date: string;
  overallScore: number;
  totalQuestions: number;
}

export default function ReportsListPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [interviews, setInterviews] = useState<CompletedInterview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const LIMIT = 10;


    useEffect(() => {
    fetchCompletedInterviews(page);
    }, [page]);

    const fetchCompletedInterviews = async (pageNumber: number) => {
    try {
        setLoading(true);
        setError("");

        const token = getToken();

        const response = await fetch(
        `http://127.0.0.1:8000/api/interviews?status=completed&page=${pageNumber}&limit=${LIMIT}`,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );

        if (!response.ok) {
        throw new Error("Failed to fetch reports.");
        }

        const result = await response.json();

        setInterviews(result.data.items || []);
        setPage(result.data.page);
        setTotalPages(result.data.totalPages);
        setTotalRecords(result.data.total);
    } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
        setLoading(false);
    }
    };

  const filtered = interviews.filter((interview) =>
    (interview.candidateName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Reports
        </h1>
        <p className="text-slate-500 text-sm mt-0.5">
          View detailed analysis reports for completed interviews.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search candidate..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-10 text-center text-slate-500">
            Loading reports...
          </div>
        ) : error ? (
          <div className="py-10 text-center text-red-500">
            {error}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 text-xs border-b border-slate-100">
                <th className="px-4 py-3 font-medium">Candidate</th>
                <th className="px-4 py-3 font-medium">Job Role</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Questions</th>
                <th className="px-4 py-3 font-medium">Score</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((interview) => (
                <tr
                  key={interview.interviewId}
                  onClick={() =>
                    router.push(`/reports/${interview.interviewId}`)
                  }
                  className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition"
                >
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {interview.candidateName}
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {interview.jobRole}
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {interview.date
                      ? new Date(interview.date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )
                      : "-"}
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {interview.totalQuestions ?? 0} Questions
                  </td>

                  <td className="px-4 py-3 font-medium text-slate-900">
                    {interview.overallScore ?? 0} / 5
                  </td>

                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
                      {interview.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <ChevronRight
                      size={16}
                      className="text-slate-400"
                    />
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-slate-400 text-sm"
                  >
                    No completed interviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <div className="flex items-center justify-between px-4 py-4 border-t border-slate-100">
        <p className="text-sm text-slate-500">
            Showing page <span className="font-medium">{page}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
            {" • "}
            {totalRecords} interviews
        </p>

        <div className="flex items-center gap-2">
        <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
        Previous
        </button>

        <button
        onClick={() =>
            setPage((prev) => Math.min(prev + 1, totalPages))
        }
        disabled={page === totalPages}
        className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
        Next
        </button>
        </div>
        </div>

      </div>
    </div>
  );
}