interface Props {
  records: any[];
}

export default function QuestionTable({
  records,
}: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="text-left text-sm font-semibold text-slate-600">
            <th className="px-6 py-5">
              Question
            </th>

            <th className="px-6 py-5">
              Difficulty
            </th>

            <th className="px-6 py-5">
              Duration
            </th>

            <th className="px-6 py-5">
              Template
            </th>

            <th className="px-6 py-5">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {records.map((question) => (
            <tr
              key={question.id}
              className="border-t border-slate-100 hover:bg-slate-50"
            >
              <td className="px-6 py-5 font-medium">
                {question.questionText}
              </td>

              <td className="px-6 py-5">
                <span className="rounded-lg bg-amber-100 px-3 py-1 text-sm text-amber-700">
                  {question.difficulty}
                </span>
              </td>

              <td className="px-6 py-5">
                {question.duration / 60} min
              </td>

              <td className="px-6 py-5">
                {question.templateName}
              </td>

              <td className="px-6 py-5">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    question.active
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {question.active
                    ? "Active"
                    : "Inactive"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}