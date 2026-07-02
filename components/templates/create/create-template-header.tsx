"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function CreateTemplateHeader() {
  return (
    <div className="space-y-3">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm">
        <Link
          href="/templates"
          className="font-semibold text-violet-600 hover:text-violet-700"
        >
          Templates
        </Link>

        <ChevronRight className="mx-2 h-4 w-4 text-slate-400" />

        <span className="font-medium text-slate-600">
          Create Template
        </span>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Create New Template
        </h1>

        <p className="mt-2 text-base font-medium text-slate-600">
          Create an interview template that can be used for scheduling AI
          interviews and organizing question sets.
        </p>
      </div>
    </div>
  );
}