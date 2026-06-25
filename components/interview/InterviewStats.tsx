"use client";

import {
  Clock3,
  BookOpen,
  BarChart3,
  ShieldCheck,
  Code2,
} from "lucide-react";

const cards = [
  {
    title: "Interview Duration",
    value: "56m 32s",
    subtitle: "10:00 AM - 10:56 AM",
    icon: Clock3,
  },
  {
    title: "Questions",
    value: "12 / 12",
    subtitle: "100% Completed",
    icon: BookOpen,
  },
  {
    title: "Technical Score",
    value: "4.6 / 5",
    subtitle: "Excellent",
    icon: BarChart3,
  },
  {
    title: "Integrity Score",
    value: "94%",
    subtitle: "High",
    icon: ShieldCheck,
  },
  {
    title: "Interview Template",
    value: "Frontend Developer",
    subtitle: "12 Questions",
    icon: Code2,
  },
];

export default function InterviewStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm"
          >

            <div className="flex items-center gap-3">

              <div className="h-12 w-12 rounded-xl bg-violet-100 flex items-center justify-center">

                <Icon className="text-violet-600" size={22} />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h3 className="font-bold text-xl mt-1">
                  {card.value}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {card.subtitle}
                </p>

              </div>

            </div>

          </div>

        );
      })}
    </div>
  );
}