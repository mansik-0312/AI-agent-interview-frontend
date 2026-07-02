"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";

interface Props {
  loading?: boolean;
  disabled?: boolean;
  onSubmit: () => void;
}

export default function CreateTemplateFooter({
  loading = false,
  disabled = false,
  onSubmit,
}: Props) {
  return (
    <div className="sticky bottom-0 z-10 mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div className="flex items-center justify-end gap-3">
        <Link
          href="/templates"
          className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
        >
          Cancel
        </Link>

        <button
          type="button"
          onClick={onSubmit}
          disabled={loading || disabled}
          className="inline-flex min-w-[160px] items-center justify-center rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Template"
          )}
        </button>
      </div>
    </div>
  );
}