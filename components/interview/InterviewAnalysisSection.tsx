"use client";

interface QuestionResult {
  questionId: string;
  question: string;
  candidateAnswer: string;
  expectedAnswer: string;
  score: number;
  feedback: string;
}

interface InterviewAnalysisSectionProps {
  recruiterSummary?: string;
  questionWiseResult?: QuestionResult[];
  recordingUrl?: string;
}

export default function InterviewAnalysisSection({
  recruiterSummary,
  questionWiseResult,
  recordingUrl,
}: InterviewAnalysisSectionProps) {
  if (!recruiterSummary && !questionWiseResult?.length && !recordingUrl) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm text-gray-500">
        No analysis available for this interview yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {recruiterSummary && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="font-bold text-lg text-gray-900 mb-3">
            Recruiter Summary
          </h2>
          <p className="text-gray-600 leading-relaxed">{recruiterSummary}</p>
        </div>
      )}

      {recordingUrl && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="font-bold text-lg text-gray-900 mb-3">
            Interview Recording
          </h2>
          <video
            src={`http://127.0.0.1:8000${recordingUrl}`}
            controls
            className="w-full rounded-xl border border-gray-200"
          />
        </div>
      )}

      {questionWiseResult && questionWiseResult.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="font-bold text-lg text-gray-900 mb-5">
            Question-wise Results
          </h2>

          <div className="space-y-5">
            {questionWiseResult.map((q, idx) => (
              <div
                key={`${q.questionId}-${idx}`}
                className="border border-gray-200 rounded-xl p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-gray-900">
                    {q.question}
                  </h3>

                  <span className="shrink-0 rounded-lg bg-violet-100 text-violet-700 px-3 py-1 text-sm font-medium">
                    Score: {q.score}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Candidate Answer</p>
                    <p className="text-gray-800">
                      {q.candidateAnswer || (
                        <span className="text-gray-400">No answer</span>
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 mb-1">Expected Answer</p>
                    <p className="text-gray-800">{q.expectedAnswer}</p>
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-500">
                  Feedback: {q.feedback}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}