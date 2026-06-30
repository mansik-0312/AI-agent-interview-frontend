"use client";

import { Template } from "@/types/template";
import {
  Layers3,
  CheckCircle2,
  FileQuestion,
  Star,
} from "lucide-react";

interface Props {
  templates: Template[];
}

export default function TemplateStats({
  templates,
}: Props) {
  const totalTemplates = templates.length;

  const activeTemplates = templates.filter(
    (template) => template.active
  ).length;

  const totalQuestions = templates.reduce(
    (sum, template) => sum + template.totalQuestions,
    0
  );

  const mostUsedTemplate =
    templates.length > 0 ? templates[0].name : "--";

  const cards = [
    {
      title: "Total Templates",
      value: totalTemplates,
      subtitle: "All templates",
      icon: Layers3,
      iconClass:
        "bg-violet-100 text-violet-600",
    },
    {
      title: "Active Templates",
      value: activeTemplates,
      subtitle: `${activeTemplates} active`,
      icon: CheckCircle2,
      iconClass:
        "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Total Questions",
      value: totalQuestions,
      subtitle: "Across templates",
      icon: FileQuestion,
      iconClass:
        "bg-amber-100 text-amber-600",
    },
    {
      title: "Latest Template",
      value: mostUsedTemplate,
      subtitle: "Most recently created",
      icon: Star,
      iconClass:
        "bg-indigo-100 text-indigo-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h3 className="mt-2 text-3xl font-bold text-slate-900 break-words">
                  {card.value}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {card.subtitle}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconClass}`}
              >
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}