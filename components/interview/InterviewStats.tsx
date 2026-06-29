"use client";

import {
  Clock3,
  BookOpen,
  BarChart3,
  ShieldCheck,
  Code2,
} from "lucide-react";

interface Props {
  duration: {
    time: string;
    startTime: string;
    endTime: string;
  };

  questions: {
    total: number;
    answered: number;
    completionPercentage: number;
  };

  technicalScore: {
    score: number;
    outOf: number;
    status: string;
  };

  integrityScore: {
    score: number;
    status: string;
  };

  interviewTemplate: {
    name: string;
    totalQuestions: number;
  };
}

export default function InterviewStats({
  duration,
  questions,
  technicalScore,
  integrityScore,
  interviewTemplate,
}: Props) {
  const cards = [
    {
      icon: Clock3,
      title: "Interview Duration",
      value: duration.time,
      subTitle: `${duration.startTime} - ${duration.endTime}`,
    },
    {
      icon: BookOpen,
      title: "Questions",
      value: `${questions.answered} / ${questions.total}`,
      subTitle: `${questions.completionPercentage}% Completed`,
    },
    {
      icon: BarChart3,
      title: "Technical Score",
      value: `${technicalScore.score} / ${technicalScore.outOf}`,
      subTitle: technicalScore.status,
    },
    {
      icon: ShieldCheck,
      title: "Integrity Score",
      value: `${integrityScore.score}%`,
      subTitle: integrityScore.status,
    },
      {
        icon: Code2,
        title: "Interview Template",
        value: interviewTemplate.name
      },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-100">
                <Icon className="h-7 w-7 text-violet-600" />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-gray-500">{card.title}</p>

                <h3 className="mt-1 text-2xl font-bold text-gray-900 break-words">
                  {card.value}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {card.subTitle}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
