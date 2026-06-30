export default function QuestionFilters() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="grid gap-4 lg:grid-cols-5">
        <input
          placeholder="Search by question..."
          className="rounded-xl border border-slate-200 px-4 py-3"
        />

        <select className="rounded-xl border border-slate-200 px-4 py-3">
          <option>All Difficulty</option>
        </select>

        <select className="rounded-xl border border-slate-200 px-4 py-3">
          <option>All Duration</option>
        </select>

        <select className="rounded-xl border border-slate-200 px-4 py-3">
          <option>All Templates</option>
        </select>

        <select className="rounded-xl border border-slate-200 px-4 py-3">
          <option>All Status</option>
        </select>
      </div>
    </div>
  );
}