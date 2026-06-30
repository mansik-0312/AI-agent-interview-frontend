"use client";

interface QuestionResult {
  questionId: string;
  question: string;
  candidateAnswer: string;
  expectedAnswer: string;
  score: number;
  feedback: string;
}

interface Analysis {
  transcript?: string | null;
  technicalScore?: number;
  integrityScore?: number;
  recruiterSummary?: string;
  questionWiseResult?: QuestionResult[];
  emotionMetrics?: Record<string, unknown>;
  suspicionMetrics?: Record<string, unknown>;
  readingRisk?: string;
  recordingUrl?: string;
  createdAt?: string;
}

interface Props {
  analysis: Analysis | null;
}

export default function InterviewAnalysisSection({
  analysis,
}: Props) {
  if (!analysis) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-gray-500">
        No analysis available for this interview yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Recruiter Summary */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-bold text-gray-900">
          Recruiter Summary
        </h2>

        <p className="leading-7 text-gray-600">
          {analysis.recruiterSummary || "No summary available."}
        </p>
      </div>

      {/* AI Metrics */}
      <div className="grid gap-5 md:grid-cols-3">

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            AI Technical Score
          </p>

          <h3 className="mt-2 text-3xl font-bold text-gray-900">
            {analysis.technicalScore ?? 0}/5
          </h3>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            AI Integrity Score
          </p>

          <h3 className="mt-2 text-3xl font-bold text-gray-900">
            {analysis.integrityScore ?? 0}/10
          </h3>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Reading Risk
          </p>

          <h3 className="mt-2 text-3xl font-bold text-gray-900">
            {analysis.readingRisk ?? "--"}
          </h3>
        </div>

      </div>

      {/* Recording */}
      {analysis.recordingUrl && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            Interview Recording
          </h2>

          <video
            controls
            className="w-full rounded-xl border border-gray-200"
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${analysis.recordingUrl}`}
          />
        </div>
      )}

      {/* Transcript */}
      {analysis.transcript && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Transcript
          </h2>

          <p className="whitespace-pre-wrap leading-7 text-gray-600">
            {analysis.transcript}
          </p>
        </div>
      )}

      {/* Question-wise Analysis */}
      {analysis.questionWiseResult &&
        analysis.questionWiseResult.length > 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-bold text-gray-900">
              Question-wise Analysis
            </h2>

            <div className="space-y-5">
              {analysis.questionWiseResult.map((question, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {question.question}
                    </h3>

                    <span className="rounded-lg bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700">
                      {question.score}/5
                    </span>
                  </div>

                  <div className="mt-5 grid gap-5 md:grid-cols-2">

                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Candidate Answer
                      </p>

                      <div className="mt-2 rounded-lg border border-gray-100 bg-gray-50 p-4">
                        <p className="text-gray-700">
                          {question.candidateAnswer || "No answer provided."}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Expected Answer
                      </p>

                      <div className="mt-2 rounded-lg border border-gray-100 bg-gray-50 p-4">
                        <p className="text-gray-700">
                          {question.expectedAnswer}
                        </p>
                      </div>
                    </div>

                  </div>

                  <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 p-4">
                    <p className="font-medium text-blue-700">
                      Feedback
                    </p>

                    <p className="mt-2 text-gray-700">
                      {question.feedback}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}