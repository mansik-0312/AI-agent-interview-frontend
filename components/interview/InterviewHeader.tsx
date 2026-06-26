// "use client";

// import {
//   Calendar,
//   Clock3,
//   Copy,
//   Mail,
//   FileText,
// } from "lucide-react";

// export default function InterviewHeader() {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

//       {/* Breadcrumb */}

//       <p className="text-sm text-gray-500 mb-5">
//         Interviews
//         <span className="mx-2">{">"}</span>
//         <span className="text-gray-800 font-medium">
//           Interview Details
//         </span>
//       </p>

//       <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">

//         {/* Left */}

//         <div>

//           <div className="flex items-center gap-3">

//             <h1 className="text-4xl font-bold text-gray-900">
//               Joey Tribbiani
//             </h1>

//             <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">
//               Completed
//             </span>

//           </div>

//           <p className="text-lg text-gray-600 mt-2">
//             Frontend Developer Interview
//           </p>

//           <div className="flex flex-wrap gap-6 mt-5 text-sm text-gray-500">

//             <div className="flex items-center gap-2">
//               <FileText size={16} />
//               Interview ID :
//               <span className="font-medium text-gray-800">
//                 INT-2024-0612
//               </span>
//             </div>

//             <div className="flex items-center gap-2">
//               <Clock3 size={16} />
//               Scheduled :
//               <span className="font-medium text-gray-800">
//                 Jun 24, 2024 10:00 AM
//               </span>
//             </div>

//           </div>

//         </div>

//         {/* Right */}

//         <div className="flex flex-wrap gap-3">

//           <button className="px-5 py-2 rounded-xl border hover:bg-gray-50 transition flex items-center gap-2">
//             <Copy size={16} />
//             Copy Link
//           </button>

//           <button className="px-5 py-2 rounded-xl border hover:bg-gray-50 transition flex items-center gap-2">
//             <Mail size={16} />
//             Resend Invite
//           </button>

//           <button className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition">
//             View Report
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }
"use client";

import { Clock3, Copy, Mail, FileText } from "lucide-react";

interface InterviewHeaderProps {
  candidateName: string;
  status: string;
  interviewId: string;
  createdAt?: string | null;
}

export default function InterviewHeader({
  candidateName,
  status,
  interviewId,
  createdAt,
}: InterviewHeaderProps) {
  const statusStyles: Record<string, string> = {
    COMPLETED: "bg-green-100 text-green-700",
    SCHEDULED: "bg-amber-100 text-amber-700",
    FAILED: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-5">
        Interviews
        <span className="mx-2">{">"}</span>
        <span className="text-gray-800 font-medium">
          Interview Details
        </span>
      </p>

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
        {/* Left */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold text-gray-900">
              {candidateName}
            </h1>

            <span
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                statusStyles[status] || "bg-gray-100 text-gray-700"
              }`}
            >
              {status}
            </span>
          </div>

          <div className="flex flex-wrap gap-6 mt-5 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <FileText size={16} />
              Interview ID :
              <span className="font-medium text-gray-800">
                {interviewId}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={16} />
              Date :
              <span className="font-medium text-gray-800">
                {createdAt
                  ? new Date(createdAt).toLocaleString()
                  : "--"}
              </span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-wrap gap-3">
          <button className="px-5 py-2 rounded-xl border hover:bg-gray-50 transition flex items-center gap-2">
            <Copy size={16} />
            Copy Link
          </button>

          <button className="px-5 py-2 rounded-xl border hover:bg-gray-50 transition flex items-center gap-2">
            <Mail size={16} />
            Resend Invite
          </button>

          <button className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition">
            View Report
          </button>
        </div>
      </div>
    </div>
  );
}
