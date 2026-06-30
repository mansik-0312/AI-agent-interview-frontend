"use client";

interface Props {
  name: string;
  description: string;
  loading?: boolean;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export default function BasicInformation({
  name,
  description,
  loading = false,
  onNameChange,
  onDescriptionChange,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Basic Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Configure the basic details for your interview template.
        </p>
      </div>

      <div className="space-y-6">
        {/* Template Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Template Name
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            type="text"
            value={name}
            disabled={loading}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="e.g. Frontend Developer Interview"
            className="h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:bg-slate-50"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Description
          </label>

          <textarea
            rows={5}
            value={description}
            disabled={loading}
            onChange={(e) =>
              onDescriptionChange(e.target.value)
            }
            placeholder="Describe what this interview template evaluates..."
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:bg-slate-50"
          />
        </div>

        {/* Read-only information */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>

            <div className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              Active
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Questions Count
            </label>

            <input
              type="text"
              value="0"
              disabled
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}