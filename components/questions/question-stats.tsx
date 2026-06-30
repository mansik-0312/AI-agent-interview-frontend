interface Props {
  stats: {
    totalQuestions: number;
    activeQuestions: number;
    inactiveQuestions: number;
  };
}

export default function QuestionStats({
  stats,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-3xl border border-slate-200 bg-white p-8">
        <p className="text-sm text-slate-500">
          Total Questions
        </p>

        <h2 className="mt-3 text-4xl font-bold text-slate-900">
          {stats.totalQuestions}
        </h2>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8">
        <p className="text-sm text-slate-500">
          Active Questions
        </p>

        <h2 className="mt-3 text-4xl font-bold text-slate-900">
          {stats.activeQuestions}
        </h2>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8">
        <p className="text-sm text-slate-500">
          Inactive Questions
        </p>

        <h2 className="mt-3 text-4xl font-bold text-slate-900">
          {stats.inactiveQuestions}
        </h2>
      </div>
    </div>
  );
}