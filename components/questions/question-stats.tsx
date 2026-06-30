import { Layers, CheckCircle2, PauseCircle, TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  stats: {
    totalQuestions: number;
    activeQuestions: number;
    inactiveQuestions: number;
  };
}

const statConfig = [
  {
    key: "totalQuestions" as const,
    label: "Total Questions",
    trend: "+100% vs last month",
    trendUp: true,
    icon: Layers,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    key: "activeQuestions" as const,
    label: "Active Questions",
    trend: "+85% vs last month",
    trendUp: true,
    icon: CheckCircle2,
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
  },
  {
    key: "inactiveQuestions" as const,
    label: "Inactive Questions",
    trend: "-14% vs last month",
    trendUp: false,
    icon: PauseCircle,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-400",
  },
];

export default function QuestionStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {statConfig.map(({ key, label, trend, trendUp, icon: Icon, iconBg, iconColor }) => (
        <div
          key={key}
          className="rounded-2xl border border-slate-200 bg-white px-6 py-5"
        >
          <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} strokeWidth={1.8} />
          </div>

          <p className="text-sm text-slate-500">{label}</p>

          <p className="mt-1 text-4xl font-bold text-slate-800 leading-tight">
            {stats[key]}
          </p>

          <p
            className={`mt-2 flex items-center gap-1 text-xs font-medium ${
              trendUp ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {trendUp ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {trend}
          </p>
        </div>
      ))}
    </div>
  );
}