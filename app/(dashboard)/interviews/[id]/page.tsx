"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getToken } from "@/lib/auth";

import InterviewHeader from "@/components/interview/InterviewHeader";
import InterviewStats from "@/components/interview/InterviewStats";
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
  recruiterSummary?: string;
  recordingUrl?: string;
  questionWiseResult?: QuestionResult[];
  emotionMetrics?: Record<string, unknown>;
  suspicionMetrics?: Record<string, unknown>;
  transcript?: string;
}

interface Duration {
  time: string;
  startTime: string;
  endTime: string;
}

interface Questions {
  total: number;
  answered: number;
  completionPercentage: number;
}

interface TechnicalScore {
  score: number;
  outOf: number;
  status: string;
}

interface IntegrityScore {
  score: number;
  status: string;
}

interface InterviewTemplate {
  id: string;
  name: string;
  description: string;
  totalQuestions: number;
} 

interface InterviewDetails {
  interviewId: string;
  candidateName: string;
  status: string;
  date: string;

  duration: Duration;
  questions: Questions;
  technicalScore: TechnicalScore;
  integrityScore: IntegrityScore;
  interviewTemplate: InterviewTemplate;

  analysis: Analysis | null;
}

export default function InterviewDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [interview, setInterview] =
    useState<InterviewDetails | null>(null);

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

      const token = getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/interviews/${interviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch interview.");
      }

      const result = await response.json();

      setInterview(result.data);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!interview || error) {
    return (
      <div className="flex h-96 items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <InterviewHeader
        candidateName={interview.candidateName}
        status={interview.status}
        interviewId={interview.interviewId}
      />

      <InterviewStats
        duration={interview.duration}
        questions={interview.questions}
        technicalScore={interview.technicalScore}
        integrityScore={interview.integrityScore}
        interviewTemplate={interview.interviewTemplate}
      />

      <InterviewAnalysisSection
        analysis={interview.analysis}
      />

    </div>
  );
}
