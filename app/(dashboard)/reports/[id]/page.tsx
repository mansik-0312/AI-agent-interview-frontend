// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import {
//   Play,
//   Download,
//   Share2,
//   ChevronDown,
//   ChevronUp,
//   Pencil,
//   ThumbsUp,
//   Layers3,
//   Clock,
//   User,
//   HelpCircle,
//   Calendar,
//   PlayCircle,
//   CheckCircle2,
//   Sparkles,
//   AlertTriangle,
//   Users,
//   Mic,
// } from "lucide-react";
// import { getToken } from "@/lib/auth"; // Update the import path if needed

// /* ----------------------------------------------------------------------
//    API Types — matches the REAL, CONFIRMED response of
//    GET /api/reports/:interviewId, e.g.:

//    {
//      "message": "...",
//      "data": {
//        "interview_id": "...",
//        "candidate_id": null,
//        "candidate_name": "Ashish Kande",
//        "video_metrics": { face_visible, multiple_person_detected, ... },
//        "technical_score": 3.47,
//        "communication_score": 4.75,
//        "overall_score": 5.46,
//        "question_analysis": [ { questionId, question, candidateAnswer,
//          expectedAnswer, score, feedback, coverage_score,
//          communication_score, depth_score, technical_score,
//          semantic_score, overall_score }, ... ]
//      }
//    }

//    This is a FLAT shape — there is no nested `analysis` object.
//    `interview_id` here MUST be the same `interviewId` returned by
//    GET /api/interviews?status=completed&page=&limit= (used by the
//    reports list page to build the /reports/[id] route).
// ---------------------------------------------------------------------- */

// interface ApiQuestionAnalysis {
//   questionId: string;
//   question: string;
//   candidateAnswer: string;
//   expectedAnswer: string;
//   score: number; // out of 5
//   feedback: string;
//   coverage_score: number; // out of 10
//   communication_score: number; // out of 10
//   depth_score: number; // out of 10
//   technical_score: number; // out of 10
//   semantic_score: number; // out of 10
//   overall_score: number; // out of 10
// }

// interface ApiVideoMetrics {
//   face_visible: number;
//   multiple_person_detected: boolean;
//   max_person_count: number;
//   multiple_person_frames: number;
//   suspicious_objects: string[];
//   speaking_speed: number;
//   filler_words: number;
// }

// interface ApiReportData {
//   interview_id: string;
//   candidate_id: string | null;
//   candidate_name: string;
//   video_metrics: ApiVideoMetrics;
//   technical_score: number; // out of 10
//   communication_score: number; // out of 10
//   overall_score: number; // out of 10
//   question_analysis: ApiQuestionAnalysis[];
// }

// /* ---------------- Static fallback (not returned by API yet) ---------------- */

// const STATIC_FALLBACK = {
//   jobRole: "Interview",
//   status: "Completed",
//   candidateInfo: {
//     email: "Not available",
//     phone: "Not available",
//     location: "Not available",
//     experience: "Not available",
//     currentRole: "Not available",
//     noticePeriod: "Not available",
//   },
//   recommendation: { label: "Pending Review", subLabel: "Recommendation not yet generated" },
//   date: "Not available",
//   transcript: "Transcript is not available from the API.",
// };

// const TABS = [
//   "Overview",
//   "Question Analysis",
//   "Transcript",
//   "Recording",
//   "Integrity Analysis",
//   "Suspicion Analysis",
// ];

// const QUESTIONS_PER_PAGE = 6;

// /* ---------------- Component ---------------- */

// export default function ReportDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   // Comes from route /reports/[id]. The reports list page must have done
//   // router.push(`/reports/${interview.interviewId}`) using the real
//   // interviewId from GET /api/interviews?status=completed — that exact
//   // string is what gets fetched below.
//   const id = params?.id as string;

//   const [activeTab, setActiveTab] = useState("Overview");
//   const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
//   const [page, setPage] = useState(1);

//   const [report, setReport] = useState<ApiReportData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (id) fetchReport(id);
//   }, [id]);

//   const fetchReport = async (interviewId: string) => {
//     try {
//       setLoading(true);
//       setError("");

//       const token = getToken();

//       const response = await fetch(
//         `http://127.0.0.1:8000/api/reports/${interviewId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 404) {
//         throw new Error(
//           `No report found for interview ID "${interviewId}". Make sure you're navigating from the Reports list.`
//         );
//       }

//       if (!response.ok) {
//         throw new Error("Failed to fetch report.");
//       }

//       const result = await response.json();

//       // The real payload is { message, data: { ...flat report... } }
//       if (!result?.data) {
//         throw new Error("Report response did not contain a 'data' object.");
//       }

//       setReport(result.data as ApiReportData);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-6 bg-[#F8FAFC] min-h-screen flex items-center justify-center text-slate-500 text-sm">
//         Loading report...
//       </div>
//     );
//   }

//   if (error || !report) {
//     return (
//       <div className="p-6 bg-[#F8FAFC] min-h-screen flex flex-col items-center justify-center text-center gap-3">
//         <p className="text-red-500 text-sm max-w-md">{error || "Report not found."}</p>
//         <button
//           onClick={() => router.push("/reports")}
//           className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700"
//         >
//           Back to Reports
//         </button>
//       </div>
//     );
//   }

//   const questions = report.question_analysis || [];
//   const totalPages = Math.max(1, Math.ceil(questions.length / QUESTIONS_PER_PAGE));
//   const paginatedQuestions = questions.slice(
//     (page - 1) * QUESTIONS_PER_PAGE,
//     page * QUESTIONS_PER_PAGE
//   );

//   const candidateName = report.candidate_name || "Unknown Candidate";
//   const interviewCode = report.interview_id;
//   const totalQuestions = questions.length;

//   const overallScoreOutOf5 =
//     totalQuestions > 0
//       ? Number((questions.reduce((sum, q) => sum + q.score, 0) / totalQuestions).toFixed(1))
//       : 0;

//   const technicalScoreDisplay = {
//     score: Number((report.technical_score ?? 0).toFixed(1)),
//     outOf: 10,
//     label:
//       report.technical_score >= 7
//         ? "Excellent"
//         : report.technical_score >= 5
//         ? "Good"
//         : report.technical_score >= 3
//         ? "Average"
//         : "Needs Improvement",
//   };

//   const communicationScoreDisplay = {
//     score: Number((report.communication_score ?? 0).toFixed(1)),
//     outOf: 10,
//   };

//   const overallScoreDisplay = Number((report.overall_score ?? 0).toFixed(1));

//   const aiSummaryText =
//     totalQuestions > 0
//       ? `${candidateName} answered ${totalQuestions} question(s) with an average score of ${overallScoreOutOf5} / 5. Combined score across technical, communication and semantic evaluation is ${overallScoreDisplay} / 10.`
//       : "No question analysis available yet for this interview.";

//   const scoreColor = (score: number) => {
//     if (score >= 4) return "text-emerald-500 border-emerald-500";
//     if (score >= 3) return "text-amber-500 border-amber-500";
//     return "text-red-500 border-red-500";
//   };

//   const circleProgress = (value: number, max: number, color: string) => {
//     const pct = Math.min(100, (value / max) * 100);
//     const circumference = 2 * Math.PI * 26;
//     const offset = circumference - (pct / 100) * circumference;

//     return (
//       <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
//         <circle cx="32" cy="32" r="26" fill="none" stroke="#E2E8F0" strokeWidth="6" />
//         <circle
//           cx="32"
//           cy="32"
//           r="26"
//           fill="none"
//           stroke={color}
//           strokeWidth="6"
//           strokeDasharray={circumference}
//           strokeDashoffset={offset}
//           strokeLinecap="round"
//         />
//       </svg>
//     );
//   };

//   return (
//     <div className="p-6 bg-[#F8FAFC] min-h-screen">
//       {/* Breadcrumb */}
//       <div className="text-sm text-slate-500 mb-3">
//         <button onClick={() => router.push("/reports")} className="hover:text-violet-600">
//           Reports
//         </button>
//         <span className="mx-2">›</span>
//         <span>
//           {candidateName} - {STATIC_FALLBACK.jobRole}
//         </span>
//       </div>

//       {/* Header */}
//       <div className="flex items-start justify-between mb-6">
//         <div>
//           <div className="flex items-center gap-2">
//             <h1 className="text-2xl font-semibold text-slate-900">{candidateName}</h1>
//             <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
//               {STATIC_FALLBACK.status}
//             </span>
//           </div>
//           <p className="text-slate-500 text-sm mt-0.5">
//             {STATIC_FALLBACK.jobRole} · Interview ID: {interviewCode}
//           </p>
//         </div>

//         <div className="flex items-center gap-2">
//           <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50">
//             <Play size={14} /> Watch Recording
//           </button>
//           <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50">
//             <Download size={14} /> Export
//           </button>
//           <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700">
//             <Share2 size={14} /> Share Report
//           </button>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex items-center justify-between border-b border-slate-200 mb-6">
//         <div className="flex items-center gap-6">
//           {TABS.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
//                 activeTab === tab
//                   ? "border-violet-600 text-violet-600"
//                   : "border-transparent text-slate-500 hover:text-slate-700"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ---------------- Overview Tab ---------------- */}
//       {activeTab === "Overview" && (
//         <div className="grid grid-cols-12 gap-4">
//           <div className="col-span-8 grid grid-cols-4 gap-4">
//             {/* Technical Score (API: technical_score) */}
//             <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center text-center">
//               <p className="text-xs text-slate-500 mb-3">Technical Score</p>
//               <div className="relative w-16 h-16 mb-2">
//                 {circleProgress(technicalScoreDisplay.score, technicalScoreDisplay.outOf, "#10B981")}
//                 <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-900">
//                   {technicalScoreDisplay.score}
//                 </div>
//               </div>
//               <p className="text-sm font-semibold text-slate-900">
//                 {technicalScoreDisplay.score} / {technicalScoreDisplay.outOf}
//               </p>
//               <p className="text-xs text-emerald-600 font-medium mt-1">{technicalScoreDisplay.label}</p>
//             </div>

//             {/* Communication Score (API: communication_score) */}
//             <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center text-center">
//               <p className="text-xs text-slate-500 mb-3">Communication Score</p>
//               <div className="relative w-16 h-16 mb-2">
//                 {circleProgress(communicationScoreDisplay.score, communicationScoreDisplay.outOf, "#10B981")}
//                 <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-900">
//                   {communicationScoreDisplay.score}
//                 </div>
//               </div>
//               <p className="text-sm font-semibold text-slate-900">
//                 {communicationScoreDisplay.score} / {communicationScoreDisplay.outOf}
//               </p>
//               <p className="text-xs text-emerald-600 font-medium mt-1">From communication_score</p>
//             </div>

//             {/* Overall Score (API: overall_score) */}
//             <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center text-center">
//               <p className="text-xs text-slate-500 mb-3">Overall Score</p>
//               <div className="relative w-16 h-16 mb-2">
//                 {circleProgress(overallScoreDisplay, 10, "#F59E0B")}
//                 <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-900">
//                   {overallScoreDisplay}
//                 </div>
//               </div>
//               <p className="text-sm font-semibold text-slate-900">{overallScoreDisplay} / 10</p>
//               <p className="text-xs text-amber-600 font-medium mt-1">From overall_score</p>
//             </div>

//             {/* Recommendation - static, not returned by API */}
//             <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center justify-center text-center">
//               <p className="text-xs text-slate-500 mb-3">Recommendation</p>
//               <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-2">
//                 <ThumbsUp size={20} className="text-emerald-600" />
//               </div>
//               <p className="text-sm font-semibold text-emerald-600">{STATIC_FALLBACK.recommendation.label}</p>
//               <p className="text-[11px] text-slate-400 mt-0.5">{STATIC_FALLBACK.recommendation.subLabel}</p>
//             </div>
//           </div>

//           {/* Candidate Information - static, not returned by API */}
//           <div className="col-span-4 bg-white rounded-xl border border-slate-100 shadow-sm p-4">
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="text-sm font-semibold text-slate-900">Candidate Information</h3>
//               <button className="text-slate-400 hover:text-violet-600">
//                 <Pencil size={14} />
//               </button>
//             </div>
//             <div className="grid grid-cols-2 gap-3 text-xs">
//               <div className="space-y-2">
//                 <div className="text-slate-600">{STATIC_FALLBACK.candidateInfo.email}</div>
//                 <div className="text-slate-600">{STATIC_FALLBACK.candidateInfo.phone}</div>
//                 <div className="text-slate-600">{STATIC_FALLBACK.candidateInfo.location}</div>
//               </div>
//               <div className="space-y-2 text-right">
//                 <div>
//                   <p className="text-slate-400">Experience</p>
//                   <p className="text-slate-900 font-medium">{STATIC_FALLBACK.candidateInfo.experience}</p>
//                 </div>
//                 <div>
//                   <p className="text-slate-400">Current Role</p>
//                   <p className="text-slate-900 font-medium">{STATIC_FALLBACK.candidateInfo.currentRole}</p>
//                 </div>
//                 <div>
//                   <p className="text-slate-400">Notice Period</p>
//                   <p className="text-slate-900 font-medium">{STATIC_FALLBACK.candidateInfo.noticePeriod}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* AI Summary - built from API scores (real fields) */}
//           <div className="col-span-12 bg-white rounded-xl border border-slate-100 shadow-sm p-5">
//             <div className="flex items-center gap-2 mb-3">
//               <Sparkles size={16} className="text-violet-600" />
//               <h3 className="text-sm font-semibold text-slate-900">AI Summary</h3>
//             </div>
//             <p className="text-sm text-slate-600 leading-relaxed">{aiSummaryText}</p>
//           </div>

//           {/* Interview Details - questions count from API */}
//           <div className="col-span-6 bg-white rounded-xl border border-slate-100 shadow-sm p-4">
//             <h3 className="text-sm font-semibold text-slate-900 mb-3">Interview Details</h3>
//             <div className="grid grid-cols-2 gap-y-3 text-xs">
//               <div>
//                 <p className="text-slate-400 flex items-center gap-1 mb-0.5">
//                   <Layers3 size={12} /> Candidate ID
//                 </p>
//                 <p className="text-slate-900 font-medium">{report.candidate_id || "Not assigned"}</p>
//               </div>
//               <div>
//                 <p className="text-slate-400 flex items-center gap-1 mb-0.5">
//                   <Clock size={12} /> Duration
//                 </p>
//                 <p className="text-slate-900 font-medium">Not available</p>
//               </div>
//               <div>
//                 <p className="text-slate-400 flex items-center gap-1 mb-0.5">
//                   <User size={12} /> Interviewer
//                 </p>
//                 <p className="text-slate-900 font-medium">AI Interview Agent</p>
//               </div>
//               <div>
//                 <p className="text-slate-400 flex items-center gap-1 mb-0.5">
//                   <HelpCircle size={12} /> Questions
//                 </p>
//                 <p className="text-slate-900 font-medium">{totalQuestions}</p>
//               </div>
//             </div>
//           </div>

//           {/* Video / Integrity quick stats from API video_metrics */}
//           <div className="col-span-6 bg-white rounded-xl border border-slate-100 shadow-sm p-4">
//             <h3 className="text-sm font-semibold text-slate-900 mb-3">Video Metrics Snapshot</h3>
//             <div className="grid grid-cols-2 gap-y-3 text-xs">
//               <div>
//                 <p className="text-slate-400 mb-0.5">Face Visible</p>
//                 <p className="text-slate-900 font-medium">
//                   {report.video_metrics?.face_visible != null
//                     ? `${report.video_metrics.face_visible.toFixed(1)}%`
//                     : "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-slate-400 mb-0.5">Speaking Speed</p>
//                 <p className="text-slate-900 font-medium">
//                   {report.video_metrics?.speaking_speed ?? "N/A"} wpm
//                 </p>
//               </div>
//               <div>
//                 <p className="text-slate-400 mb-0.5">Filler Words</p>
//                 <p className="text-slate-900 font-medium">{report.video_metrics?.filler_words ?? "N/A"}</p>
//               </div>
//               <div>
//                 <p className="text-slate-400 mb-0.5">Multiple Persons</p>
//                 <p className="text-slate-900 font-medium">
//                   {report.video_metrics?.multiple_person_detected ? "Detected" : "Not Detected"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ---------------- Question Analysis Tab ---------------- */}
//       {activeTab === "Question Analysis" && (
//         <div className="space-y-4">
//           <div className="flex items-center justify-end mb-2">
//             <span className="text-sm text-slate-500 mr-2">Overall Average Score</span>
//             <span className="font-semibold text-amber-500 flex items-center gap-1">
//               ★ {overallScoreOutOf5} / 5
//             </span>
//           </div>

//           {questions.length === 0 && (
//             <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 text-center text-sm text-slate-400">
//               No questions found for this interview.
//             </div>
//           )}

//           {paginatedQuestions.map((q, idx) => {
//             const globalIndex = (page - 1) * QUESTIONS_PER_PAGE + idx + 1;
//             const isExpanded = expandedQuestion === q.questionId;

//             return (
//               <div
//                 key={q.questionId}
//                 className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"
//               >
//                 <div
//                   onClick={() => setExpandedQuestion(isExpanded ? null : q.questionId)}
//                   className="flex items-center justify-between p-4 cursor-pointer"
//                 >
//                   <div className="flex items-start gap-3">
//                     <span className="text-slate-400 text-sm font-medium mt-0.5">{globalIndex}</span>
//                     <div>
//                       <p className="text-sm font-medium text-slate-900">{q.question}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <span className="text-slate-500 text-xs">Score</span>
//                     <div
//                       className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-semibold ${scoreColor(
//                         q.score
//                       )}`}
//                     >
//                       {q.score}
//                     </div>
//                     {isExpanded ? (
//                       <ChevronUp size={18} className="text-slate-400" />
//                     ) : (
//                       <ChevronDown size={18} className="text-slate-400" />
//                     )}
//                   </div>
//                 </div>

//                 {isExpanded && (
//                   <div className="border-t border-slate-100 p-4 grid grid-cols-3 gap-4">
//                     <div>
//                       <h4 className="text-xs font-semibold text-red-500 mb-2 flex items-center gap-1">
//                         ✕ Candidate Answer
//                       </h4>
//                       <p className="text-sm text-slate-700 leading-relaxed">
//                         {q.candidateAnswer || "No answer provided."}
//                       </p>
//                     </div>

//                     <div>
//                       <h4 className="text-xs font-semibold text-emerald-600 mb-2 flex items-center gap-1">
//                         ✓ Expected Answer
//                       </h4>
//                       <p className="text-sm text-slate-700 leading-relaxed">{q.expectedAnswer}</p>
//                     </div>

//                     <div className="flex gap-4">
//                       <div className="flex-1">
//                         <h4 className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1">
//                           🤖 AI Feedback
//                         </h4>
//                         <p className="text-xs text-slate-600 leading-relaxed">
//                           {q.feedback || "No feedback provided."}
//                         </p>
//                       </div>

//                       <div className="w-36 border-l border-slate-100 pl-4">
//                         <div className="text-center mb-3">
//                           <div
//                             className={`w-14 h-14 mx-auto rounded-full border-2 flex items-center justify-center text-sm font-semibold ${scoreColor(
//                               q.score
//                             )}`}
//                           >
//                             {q.score}
//                             <span className="text-[10px] text-slate-400">/5</span>
//                           </div>
//                         </div>
//                         <p className="text-xs font-medium text-slate-700 mb-2">Score Breakdown</p>
//                         <div className="flex justify-between text-xs text-slate-500 mb-1">
//                           <span>Coverage</span>
//                           <span className="font-medium text-slate-900">{q.coverage_score} / 10</span>
//                         </div>
//                         <div className="flex justify-between text-xs text-slate-500 mb-1">
//                           <span>Communication</span>
//                           <span className="font-medium text-slate-900">{q.communication_score} / 10</span>
//                         </div>
//                         <div className="flex justify-between text-xs text-slate-500 mb-1">
//                           <span>Depth</span>
//                           <span className="font-medium text-slate-900">{q.depth_score} / 10</span>
//                         </div>
//                         <div className="flex justify-between text-xs text-slate-500 mb-1">
//                           <span>Technical</span>
//                           <span className="font-medium text-slate-900">{q.technical_score} / 10</span>
//                         </div>
//                         <div className="flex justify-between text-xs text-slate-500 mb-1">
//                           <span>Semantic</span>
//                           <span className="font-medium text-slate-900">{q.semantic_score} / 10</span>
//                         </div>
//                         <div className="flex justify-between text-xs text-slate-500 mb-1">
//                           <span>Overall</span>
//                           <span className="font-medium text-slate-900">{q.overall_score} / 10</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}

//           {questions.length > 0 && (
//             <div className="flex items-center justify-between pt-2">
//               <p className="text-xs text-slate-500">
//                 Showing {(page - 1) * QUESTIONS_PER_PAGE + 1} to{" "}
//                 {Math.min(page * QUESTIONS_PER_PAGE, questions.length)} of {questions.length} questions
//               </p>
//               <div className="flex items-center gap-1">
//                 <button
//                   onClick={() => setPage((p) => Math.max(1, p - 1))}
//                   disabled={page === 1}
//                   className="px-2 py-1 rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40 text-sm"
//                 >
//                   ‹
//                 </button>
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//                   <button
//                     key={p}
//                     onClick={() => setPage(p)}
//                     className={`px-3 py-1 rounded-lg text-sm font-medium ${
//                       page === p ? "bg-violet-600 text-white" : "text-slate-500 hover:bg-slate-100"
//                     }`}
//                   >
//                     {p}
//                   </button>
//                 ))}
//                 <button
//                   onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                   disabled={page === totalPages}
//                   className="px-2 py-1 rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40 text-sm"
//                 >
//                   ›
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* ---------------- Transcript Tab - built from question_analysis (API) ---------------- */}
//       {activeTab === "Transcript" && (
//         <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
//           {questions.length === 0 ? (
//             <p className="text-sm text-slate-500">{STATIC_FALLBACK.transcript}</p>
//           ) : (
//             <div className="space-y-6">
//               {questions.map((q, idx) => (
//                 <div key={q.questionId} className={idx > 0 ? "pt-6 border-t border-slate-100" : ""}>
//                   <p className="text-xs font-semibold text-slate-400 mb-2">Q{idx + 1}</p>

//                   <div className="mb-3">
//                     <p className="text-xs font-semibold text-violet-600 mb-1">Interviewer</p>
//                     <p className="text-sm text-slate-900 leading-relaxed">{q.question}</p>
//                   </div>

//                   <div className="mb-3">
//                     <p className="text-xs font-semibold text-red-500 mb-1">Candidate</p>
//                     <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
//                       {q.candidateAnswer || "No answer provided."}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs font-semibold text-emerald-600 mb-1">Expected Answer</p>
//                     <p className="text-sm text-slate-600 leading-relaxed">{q.expectedAnswer}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {/* ---------------- Recording Tab - static, not returned by API ---------------- */}
//       {activeTab === "Recording" && (
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-sm text-slate-500">
//           Recording not available.
//         </div>
//       )}

//       {/* ---------------- Integrity Analysis Tab - built from video_metrics (API) ---------------- */}
//       {activeTab === "Integrity Analysis" && (
//         <div className="grid grid-cols-12 gap-4">
//           <div className="col-span-3 bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center text-center">
//             <p className="text-xs text-slate-500 mb-3">Face Visibility</p>
//             <div className="relative w-16 h-16 mb-2">
//               {circleProgress(report.video_metrics?.face_visible ?? 0, 100, "#10B981")}
//               <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-900">
//                 {Math.round(report.video_metrics?.face_visible ?? 0)}%
//               </div>
//             </div>
//             <p className="text-[11px] text-slate-400 mt-0.5">% of frames with face visible</p>
//           </div>

//           <div className="col-span-3 bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center text-center">
//             <p className="text-xs text-slate-500 mb-3">Speaking Speed</p>
//             <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center mb-2">
//               <Mic size={20} className="text-violet-600" />
//             </div>
//             <p className="text-sm font-semibold text-slate-900">
//               {report.video_metrics?.speaking_speed ?? 0} wpm
//             </p>
//             <p className="text-[11px] text-slate-400 mt-0.5">Words per minute</p>
//           </div>

//           <div className="col-span-3 bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center text-center">
//             <p className="text-xs text-slate-500 mb-3">Filler Words</p>
//             <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-2">
//               <AlertTriangle size={20} className="text-amber-600" />
//             </div>
//             <p className="text-sm font-semibold text-slate-900">{report.video_metrics?.filler_words ?? 0}</p>
//             <p className="text-[11px] text-slate-400 mt-0.5">Count detected during interview</p>
//           </div>

//           <div className="col-span-3 bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center text-center">
//             <p className="text-xs text-slate-500 mb-3">Multiple Persons</p>
//             <div
//               className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
//                 report.video_metrics?.multiple_person_detected ? "bg-red-50" : "bg-emerald-50"
//               }`}
//             >
//               <Users
//                 size={20}
//                 className={report.video_metrics?.multiple_person_detected ? "text-red-600" : "text-emerald-600"}
//               />
//             </div>
//             <p className="text-sm font-semibold text-slate-900">
//               {report.video_metrics?.multiple_person_detected ? "Detected" : "Not Detected"}
//             </p>
//             <p className="text-[11px] text-slate-400 mt-0.5">
//               Max {report.video_metrics?.max_person_count ?? 0} person(s) in{" "}
//               {report.video_metrics?.multiple_person_frames ?? 0} frame(s)
//             </p>
//           </div>

//           <div className="col-span-12 bg-white rounded-xl border border-slate-100 shadow-sm p-4">
//             <h3 className="text-sm font-semibold text-slate-900 mb-2">Suspicious Objects Detected</h3>
//             {report.video_metrics?.suspicious_objects && report.video_metrics.suspicious_objects.length > 0 ? (
//               <div className="flex flex-wrap gap-1.5">
//                 {report.video_metrics.suspicious_objects.map((obj, i) => (
//                   <span key={i} className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-medium">
//                     {obj}
//                   </span>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-sm text-slate-400">No suspicious objects detected.</p>
//             )}
//           </div>
//         </div>
//       )}

//       {/* ---------------- Suspicion Analysis Tab - static, not returned by API ---------------- */}
//       {activeTab === "Suspicion Analysis" && (
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-sm text-slate-500">
//           Suspicion analysis content goes here.
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Play,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  Pencil,
  ThumbsUp,
  Layers3,
  Clock,
  User,
  HelpCircle,
  Calendar,
  PlayCircle,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Users,
  Mic,
} from "lucide-react";
import { getToken } from "@/lib/auth"; // Update the import path if needed

// Base host for the backend API — used to resolve relative media paths
// (e.g. recordingUrl: "/recordings/xyz.mp4") into playable absolute URLs.
const API_BASE_URL = "${process.env.NEXT_PUBLIC_API_URL}";

const resolveMediaUrl = (url?: string | null) => {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url; // already absolute
  return `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

/* ----------------------------------------------------------------------
   API Types — matches the REAL, CONFIRMED response of
   GET /api/reports/:interviewId, e.g.:

   {
     "message": "...",
     "data": {
       "interview_id": "...",
       "candidate_id": null,
       "candidate_name": "Ashish Kande",
       "video_metrics": { face_visible, multiple_person_detected, ... },
       "technical_score": 3.47,
       "communication_score": 4.75,
       "overall_score": 5.46,
       "question_analysis": [ { questionId, question, candidateAnswer,
         expectedAnswer, score, feedback, coverage_score,
         communication_score, depth_score, technical_score,
         semantic_score, overall_score }, ... ]
     }
   }

   This is a FLAT shape — there is no nested `analysis` object.
   `interview_id` here MUST be the same `interviewId` returned by
   GET /api/interviews?status=completed&page=&limit= (used by the
   reports list page to build the /reports/[id] route).
---------------------------------------------------------------------- */

interface ApiQuestionAnalysis {
  questionId: string;
  question: string;
  candidateAnswer: string;
  expectedAnswer: string;
  score: number; // out of 5
  feedback: string;
  coverage_score: number; // out of 10
  communication_score: number; // out of 10
  depth_score: number; // out of 10
  technical_score: number; // out of 10
  semantic_score: number; // out of 10
  overall_score: number; // out of 10
}

interface ApiVideoMetrics {
  face_visible: number;
  multiple_person_detected: boolean;
  max_person_count: number;
  multiple_person_frames: number;
  suspicious_objects: string[];
  speaking_speed: number;
  filler_words: number;
}

interface ApiReportData {
  interview_id: string;
  candidate_id: string | null;
  candidate_name: string;
  video_metrics: ApiVideoMetrics;
  technical_score: number; // out of 10
  communication_score: number; // out of 10
  overall_score: number; // out of 10
  question_analysis: ApiQuestionAnalysis[];
  // Optional — not present in every /api/reports/:id response yet, but
  // mirrors the `recordingUrl` field returned by /api/interviews/:id
  // (e.g. "/recordings/interview_xxx.mp4", relative to API_BASE_URL).
  recordingUrl?: string | null;
}

/* ---------------- Static fallback (not returned by API yet) ---------------- */

const STATIC_FALLBACK = {
  jobRole: "Interview",
  status: "Completed",
  candidateInfo: {
    email: "Not available",
    phone: "Not available",
    location: "Not available",
    experience: "Not available",
    currentRole: "Not available",
    noticePeriod: "Not available",
  },
  recommendation: { label: "Pending Review", subLabel: "Recommendation not yet generated" },
  date: "Not available",
  transcript: "Transcript is not available from the API.",
};

const TABS = [
  "Overview",
  "Question Analysis",
  "Transcript",
  "Recording",
  "Integrity Analysis",
  "Suspicion Analysis",
];

const QUESTIONS_PER_PAGE = 6;

/* ---------------- Component ---------------- */

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  // Comes from route /reports/[id]. The reports list page must have done
  // router.push(`/reports/${interview.interviewId}`) using the real
  // interviewId from GET /api/interviews?status=completed — that exact
  // string is what gets fetched below.
  const id = params?.id as string;

  const [activeTab, setActiveTab] = useState("Overview");
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const [report, setReport] = useState<ApiReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) fetchReport(id);
  }, [id]);

  const fetchReport = async (interviewId: string) => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reports/${interviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 404) {
        throw new Error(
          `No report found for interview ID "${interviewId}". Make sure you're navigating from the Reports list.`
        );
      }

      if (!response.ok) {
        throw new Error("Failed to fetch report.");
      }

      const result = await response.json();

      // The real payload is { message, data: { ...flat report... } }
      if (!result?.data) {
        throw new Error("Report response did not contain a 'data' object.");
      }

      setReport(result.data as ApiReportData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-[#F8FAFC] min-h-screen flex items-center justify-center text-slate-500 text-sm">
        Loading report...
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="p-6 bg-[#F8FAFC] min-h-screen flex flex-col items-center justify-center text-center gap-3">
        <p className="text-red-500 text-sm max-w-md">{error || "Report not found."}</p>
        <button
          onClick={() => router.push("/reports")}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700"
        >
          Back to Reports
        </button>
      </div>
    );
  }

  const questions = report.question_analysis || [];
  const totalPages = Math.max(1, Math.ceil(questions.length / QUESTIONS_PER_PAGE));
  const paginatedQuestions = questions.slice(
    (page - 1) * QUESTIONS_PER_PAGE,
    page * QUESTIONS_PER_PAGE
  );

  const candidateName = report.candidate_name || "Unknown Candidate";
  const interviewCode = report.interview_id;
  const totalQuestions = questions.length;

  const overallScoreOutOf5 =
    totalQuestions > 0
      ? Number((questions.reduce((sum, q) => sum + q.score, 0) / totalQuestions).toFixed(1))
      : 0;

  const technicalScoreDisplay = {
    score: Number((report.technical_score ?? 0).toFixed(1)),
    outOf: 10,
    label:
      report.technical_score >= 7
        ? "Excellent"
        : report.technical_score >= 5
        ? "Good"
        : report.technical_score >= 3
        ? "Average"
        : "Needs Improvement",
  };

  const communicationScoreDisplay = {
    score: Number((report.communication_score ?? 0).toFixed(1)),
    outOf: 10,
  };

  const overallScoreDisplay = Number((report.overall_score ?? 0).toFixed(1));

  const resolvedRecordingUrl = resolveMediaUrl(report.recordingUrl);

  const aiSummaryText =
    totalQuestions > 0
      ? `${candidateName} answered ${totalQuestions} question(s) with an average score of ${overallScoreOutOf5} / 5. Combined score across technical, communication and semantic evaluation is ${overallScoreDisplay} / 10.`
      : "No question analysis available yet for this interview.";

  const scoreColor = (score: number) => {
    if (score >= 4) return "text-emerald-500 border-emerald-500";
    if (score >= 3) return "text-amber-500 border-amber-500";
    return "text-red-500 border-red-500";
  };

  const circleProgress = (value: number, max: number, color: string) => {
    const pct = Math.min(100, (value / max) * 100);
    const circumference = 2 * Math.PI * 26;
    const offset = circumference - (pct / 100) * circumference;

    return (
      <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
        <circle cx="32" cy="32" r="26" fill="none" stroke="#E2E8F0" strokeWidth="6" />
        <circle
          cx="32"
          cy="32"
          r="26"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen">
      {/* Breadcrumb */}
      <div className="text-sm text-slate-500 mb-3">
        <button onClick={() => router.push("/reports")} className="hover:text-violet-600">
          Reports
        </button>
        <span className="mx-2">›</span>
        <span>
          {candidateName} - {STATIC_FALLBACK.jobRole}
        </span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-slate-900">{candidateName}</h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
              {STATIC_FALLBACK.status}
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-0.5">
            {STATIC_FALLBACK.jobRole} · Interview ID: {interviewCode}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("Recording")}
            disabled={!resolvedRecordingUrl}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Play size={14} /> Watch Recording
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50">
            <Download size={14} /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700">
            <Share2 size={14} /> Share Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 mb-6">
        <div className="flex items-center gap-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-violet-600 text-violet-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ---------------- Overview Tab ---------------- */}
      {activeTab === "Overview" && (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8 grid grid-cols-4 gap-4">
            {/* Technical Score (API: technical_score) */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center text-center">
              <p className="text-xs text-slate-500 mb-3">Technical Score</p>
              <div className="relative w-16 h-16 mb-2">
                {circleProgress(technicalScoreDisplay.score, technicalScoreDisplay.outOf, "#10B981")}
                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-900">
                  {technicalScoreDisplay.score}
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-900">
                {technicalScoreDisplay.score} / {technicalScoreDisplay.outOf}
              </p>
              <p className="text-xs text-emerald-600 font-medium mt-1">{technicalScoreDisplay.label}</p>
            </div>

            {/* Communication Score (API: communication_score) */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center text-center">
              <p className="text-xs text-slate-500 mb-3">Communication Score</p>
              <div className="relative w-16 h-16 mb-2">
                {circleProgress(communicationScoreDisplay.score, communicationScoreDisplay.outOf, "#10B981")}
                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-900">
                  {communicationScoreDisplay.score}
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-900">
                {communicationScoreDisplay.score} / {communicationScoreDisplay.outOf}
              </p>
              <p className="text-xs text-emerald-600 font-medium mt-1">From communication_score</p>
            </div>

            {/* Overall Score (API: overall_score) */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center text-center">
              <p className="text-xs text-slate-500 mb-3">Overall Score</p>
              <div className="relative w-16 h-16 mb-2">
                {circleProgress(overallScoreDisplay, 10, "#F59E0B")}
                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-900">
                  {overallScoreDisplay}
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-900">{overallScoreDisplay} / 10</p>
              <p className="text-xs text-amber-600 font-medium mt-1">From overall_score</p>
            </div>

            {/* Recommendation - static, not returned by API */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center justify-center text-center">
              <p className="text-xs text-slate-500 mb-3">Recommendation</p>
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-2">
                <ThumbsUp size={20} className="text-emerald-600" />
              </div>
              <p className="text-sm font-semibold text-emerald-600">{STATIC_FALLBACK.recommendation.label}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{STATIC_FALLBACK.recommendation.subLabel}</p>
            </div>
          </div>

          {/* Candidate Information - static, not returned by API */}
          <div className="col-span-4 bg-white rounded-xl border border-slate-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-900">Candidate Information</h3>
              <button className="text-slate-400 hover:text-violet-600">
                <Pencil size={14} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-2">
                <div className="text-slate-600">{STATIC_FALLBACK.candidateInfo.email}</div>
                <div className="text-slate-600">{STATIC_FALLBACK.candidateInfo.phone}</div>
                <div className="text-slate-600">{STATIC_FALLBACK.candidateInfo.location}</div>
              </div>
              <div className="space-y-2 text-right">
                <div>
                  <p className="text-slate-400">Experience</p>
                  <p className="text-slate-900 font-medium">{STATIC_FALLBACK.candidateInfo.experience}</p>
                </div>
                <div>
                  <p className="text-slate-400">Current Role</p>
                  <p className="text-slate-900 font-medium">{STATIC_FALLBACK.candidateInfo.currentRole}</p>
                </div>
                <div>
                  <p className="text-slate-400">Notice Period</p>
                  <p className="text-slate-900 font-medium">{STATIC_FALLBACK.candidateInfo.noticePeriod}</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Summary - built from API scores (real fields) */}
          <div className="col-span-12 bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-violet-600" />
              <h3 className="text-sm font-semibold text-slate-900">AI Summary</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{aiSummaryText}</p>
          </div>

          {/* Interview Details - questions count from API */}
          <div className="col-span-6 bg-white rounded-xl border border-slate-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Interview Details</h3>
            <div className="grid grid-cols-2 gap-y-3 text-xs">
              <div>
                <p className="text-slate-400 flex items-center gap-1 mb-0.5">
                  <Layers3 size={12} /> Candidate ID
                </p>
                <p className="text-slate-900 font-medium">{report.candidate_id || "Not assigned"}</p>
              </div>
              <div>
                <p className="text-slate-400 flex items-center gap-1 mb-0.5">
                  <Clock size={12} /> Duration
                </p>
                <p className="text-slate-900 font-medium">Not available</p>
              </div>
              <div>
                <p className="text-slate-400 flex items-center gap-1 mb-0.5">
                  <User size={12} /> Interviewer
                </p>
                <p className="text-slate-900 font-medium">AI Interview Agent</p>
              </div>
              <div>
                <p className="text-slate-400 flex items-center gap-1 mb-0.5">
                  <HelpCircle size={12} /> Questions
                </p>
                <p className="text-slate-900 font-medium">{totalQuestions}</p>
              </div>
            </div>
          </div>

          {/* Video / Integrity quick stats from API video_metrics */}
          <div className="col-span-6 bg-white rounded-xl border border-slate-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Video Metrics Snapshot</h3>
            <div className="grid grid-cols-2 gap-y-3 text-xs">
              <div>
                <p className="text-slate-400 mb-0.5">Face Visible</p>
                <p className="text-slate-900 font-medium">
                  {report.video_metrics?.face_visible != null
                    ? `${report.video_metrics.face_visible.toFixed(1)}%`
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-slate-400 mb-0.5">Speaking Speed</p>
                <p className="text-slate-900 font-medium">
                  {report.video_metrics?.speaking_speed ?? "N/A"} wpm
                </p>
              </div>
              <div>
                <p className="text-slate-400 mb-0.5">Filler Words</p>
                <p className="text-slate-900 font-medium">{report.video_metrics?.filler_words ?? "N/A"}</p>
              </div>
              <div>
                <p className="text-slate-400 mb-0.5">Multiple Persons</p>
                <p className="text-slate-900 font-medium">
                  {report.video_metrics?.multiple_person_detected ? "Detected" : "Not Detected"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Question Analysis Tab ---------------- */}
      {activeTab === "Question Analysis" && (
        <div className="space-y-4">
          <div className="flex items-center justify-end mb-2">
            <span className="text-sm text-slate-500 mr-2">Overall Average Score</span>
            <span className="font-semibold text-amber-500 flex items-center gap-1">
              ★ {overallScoreOutOf5} / 5
            </span>
          </div>

          {questions.length === 0 && (
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 text-center text-sm text-slate-400">
              No questions found for this interview.
            </div>
          )}

          {paginatedQuestions.map((q, idx) => {
            const globalIndex = (page - 1) * QUESTIONS_PER_PAGE + idx + 1;
            const isExpanded = expandedQuestion === q.questionId;

            return (
              <div
                key={q.questionId}
                className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"
              >
                <div
                  onClick={() => setExpandedQuestion(isExpanded ? null : q.questionId)}
                  className="flex items-center justify-between p-4 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-slate-400 text-sm font-medium mt-0.5">{globalIndex}</span>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{q.question}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 text-xs">Score</span>
                    <div
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-semibold ${scoreColor(
                        q.score
                      )}`}
                    >
                      {q.score}
                    </div>
                    {isExpanded ? (
                      <ChevronUp size={18} className="text-slate-400" />
                    ) : (
                      <ChevronDown size={18} className="text-slate-400" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-slate-100 p-4 grid grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-xs font-semibold text-red-500 mb-2 flex items-center gap-1">
                        ✕ Candidate Answer
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {q.candidateAnswer || "No answer provided."}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-emerald-600 mb-2 flex items-center gap-1">
                        ✓ Expected Answer
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed">{q.expectedAnswer}</p>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-1">
                        <h4 className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1">
                          🤖 AI Feedback
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {q.feedback || "No feedback provided."}
                        </p>
                      </div>

                      <div className="w-36 border-l border-slate-100 pl-4">
                        <div className="text-center mb-3">
                          <div
                            className={`w-14 h-14 mx-auto rounded-full border-2 flex items-center justify-center text-sm font-semibold ${scoreColor(
                              q.score
                            )}`}
                          >
                            {q.score}
                            <span className="text-[10px] text-slate-400">/5</span>
                          </div>
                        </div>
                        <p className="text-xs font-medium text-slate-700 mb-2">Score Breakdown</p>
                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                          <span>Coverage</span>
                          <span className="font-medium text-slate-900">{q.coverage_score} / 10</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                          <span>Communication</span>
                          <span className="font-medium text-slate-900">{q.communication_score} / 10</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                          <span>Depth</span>
                          <span className="font-medium text-slate-900">{q.depth_score} / 10</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                          <span>Technical</span>
                          <span className="font-medium text-slate-900">{q.technical_score} / 10</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                          <span>Semantic</span>
                          <span className="font-medium text-slate-900">{q.semantic_score} / 10</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                          <span>Overall</span>
                          <span className="font-medium text-slate-900">{q.overall_score} / 10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {questions.length > 0 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-slate-500">
                Showing {(page - 1) * QUESTIONS_PER_PAGE + 1} to{" "}
                {Math.min(page * QUESTIONS_PER_PAGE, questions.length)} of {questions.length} questions
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-2 py-1 rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40 text-sm"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      page === p ? "bg-violet-600 text-white" : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-2 py-1 rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40 text-sm"
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ---------------- Transcript Tab - built from question_analysis (API) ---------------- */}
      {activeTab === "Transcript" && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          {questions.length === 0 ? (
            <p className="text-sm text-slate-500">{STATIC_FALLBACK.transcript}</p>
          ) : (
            <div className="space-y-6">
              {questions.map((q, idx) => (
                <div key={q.questionId} className={idx > 0 ? "pt-6 border-t border-slate-100" : ""}>
                  <p className="text-xs font-semibold text-slate-400 mb-2">Q{idx + 1}</p>

                  <div className="mb-3">
                    <p className="text-xs font-semibold text-violet-600 mb-1">Interviewer</p>
                    <p className="text-sm text-slate-900 leading-relaxed">{q.question}</p>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs font-semibold text-red-500 mb-1">Candidate</p>
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {q.candidateAnswer || "No answer provided."}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-emerald-600 mb-1">Expected Answer</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{q.expectedAnswer}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ---------------- Recording Tab - from API (recording_url, resolved to absolute) ---------------- */}
      {activeTab === "Recording" && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          {resolvedRecordingUrl ? (
            <video controls className="w-full rounded-lg max-h-[480px] bg-black">
              <source src={resolvedRecordingUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p className="text-sm text-slate-500">Recording not available.</p>
          )}
        </div>
      )}

      {/* ---------------- Integrity Analysis Tab - built from video_metrics (API) ---------------- */}
      {activeTab === "Integrity Analysis" && (
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3 bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center text-center">
            <p className="text-xs text-slate-500 mb-3">Face Visibility</p>
            <div className="relative w-16 h-16 mb-2">
              {circleProgress(report.video_metrics?.face_visible ?? 0, 100, "#10B981")}
              <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-900">
                {Math.round(report.video_metrics?.face_visible ?? 0)}%
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">% of frames with face visible</p>
          </div>

          <div className="col-span-3 bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center text-center">
            <p className="text-xs text-slate-500 mb-3">Speaking Speed</p>
            <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center mb-2">
              <Mic size={20} className="text-violet-600" />
            </div>
            <p className="text-sm font-semibold text-slate-900">
              {report.video_metrics?.speaking_speed ?? 0} wpm
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Words per minute</p>
          </div>

          <div className="col-span-3 bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center text-center">
            <p className="text-xs text-slate-500 mb-3">Filler Words</p>
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-2">
              <AlertTriangle size={20} className="text-amber-600" />
            </div>
            <p className="text-sm font-semibold text-slate-900">{report.video_metrics?.filler_words ?? 0}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Count detected during interview</p>
          </div>

          <div className="col-span-3 bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col items-center text-center">
            <p className="text-xs text-slate-500 mb-3">Multiple Persons</p>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                report.video_metrics?.multiple_person_detected ? "bg-red-50" : "bg-emerald-50"
              }`}
            >
              <Users
                size={20}
                className={report.video_metrics?.multiple_person_detected ? "text-red-600" : "text-emerald-600"}
              />
            </div>
            <p className="text-sm font-semibold text-slate-900">
              {report.video_metrics?.multiple_person_detected ? "Detected" : "Not Detected"}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Max {report.video_metrics?.max_person_count ?? 0} person(s) in{" "}
              {report.video_metrics?.multiple_person_frames ?? 0} frame(s)
            </p>
          </div>

          <div className="col-span-12 bg-white rounded-xl border border-slate-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-2">Suspicious Objects Detected</h3>
            {report.video_metrics?.suspicious_objects && report.video_metrics.suspicious_objects.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {report.video_metrics.suspicious_objects.map((obj, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-medium">
                    {obj}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">No suspicious objects detected.</p>
            )}
          </div>
        </div>
      )}

      {/* ---------------- Suspicion Analysis Tab - static, not returned by API ---------------- */}
      {activeTab === "Suspicion Analysis" && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-sm text-slate-500">
          Suspicion analysis content goes here.
        </div>
      )}
    </div>
  );
}
