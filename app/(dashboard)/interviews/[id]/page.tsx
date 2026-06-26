"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getToken } from "@/lib/auth";

import InterviewHeader from "@/components/interview/InterviewHeader";
import InterviewStats from "@/components/interview/InterviewStats";
// import InterviewAnalysisSection from "@/components/interview/InterviewAnalysisSection";
import InterviewAnalysisSection from "@/components/interview/InterviewAnalysisSection";

interface QuestionResult {
  questionId: string;
  question: string;
  candidateAnswer: string;
  expectedAnswer: string;
  score: number;
  feedback: string;
}

interface Analysis {
  technicalScore?: number;
  integrityScore?: number;
  recruiterSummary?: string;
  questionWiseResult?: QuestionResult[];
  recordingUrl?: string;
  createdAt?: string;
}

interface InterviewDetails {
  interviewId: string;
  candidateName: string;
  status: string;
  technicalScore: number | null;
  analysis: Analysis | null;
}

export default function InterviewDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [interview, setInterview] = useState<InterviewDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchInterview(id);
    }
  }, [id]);

  const fetchInterview = async (interviewId: string) => {
    try {
      setLoading(true);
      setError(null);

      const token = getToken();

      if (!token) {
        throw new Error("Not authenticated. Please log in.");
      }

      const response = await fetch(
        `http://127.0.0.1:8000/api/interviews/${interviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch interview details");
      }

      const result = await response.json();

      setInterview(result.data);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load interview details."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center text-slate-500">
        Loading interview details...
      </div>
    );
  }

  if (error || !interview) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-4 text-slate-500">
        <p>{error || "Interview not found."}</p>
        <button
          onClick={() => id && fetchInterview(id)}
          className="rounded-xl bg-[#0B1020] px-5 py-3 text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <InterviewHeader
        candidateName={interview.candidateName}
        status={interview.status}
        interviewId={interview.interviewId}
        createdAt={interview.analysis?.createdAt}
      />

      <InterviewStats
        technicalScore={interview.technicalScore}
        integrityScore={interview.analysis?.integrityScore}
        questionCount={interview.analysis?.questionWiseResult?.length || 0}
      />

      <InterviewAnalysisSection
        recruiterSummary={interview.analysis?.recruiterSummary}
        questionWiseResult={interview.analysis?.questionWiseResult}
        recordingUrl={interview.analysis?.recordingUrl}
      />
    </div>
  );
}
