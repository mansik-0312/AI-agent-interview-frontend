"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useCreateQuestion } from "@/hooks/useCreateQuestion";
import { useUpdateQuestion } from "@/hooks/useUpdateQuestion";
import { useActiveTemplates } from "@/hooks/useActiveTemplates";

export default function CreateQuestionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const questionId = searchParams.get("id");
  const isEdit = Boolean(questionId);

  const [questionText, setQuestionText] = useState("");
  const [expectedAnswer, setExpectedAnswer] = useState("");
  const [difficulty, setDifficulty] = useState("MEDIUM");
  const [duration, setDuration] = useState(120);
  const [weight, setWeight] = useState(1);
  const [templateId, setTemplateId] = useState("");

  const [loading, setLoading] = useState(false);

  const { submit: createQuestion } = useCreateQuestion();
  const { submit: updateQuestion } = useUpdateQuestion();

  // Fetch active templates to populate the dropdown
  const { templates, loading: templatesLoading } = useActiveTemplates();

  useEffect(() => {
    if (!questionId) return;

    const loadQuestion = async () => {
      try {
        setLoading(true);

        /**
         * TODO
         *
         * const question = await getQuestionById(questionId);
         *
         * setQuestionText(question.questionText);
         * setExpectedAnswer(question.expectedAnswer);
         * setDifficulty(question.difficulty);
         * setDuration(question.duration);
         * setWeight(question.weight);
         * setTemplateId(question.templateId);
         */

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestion();
  }, [questionId]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (isEdit) {
        await updateQuestion(questionId!, {
          questionText,
          expectedAnswer,
          difficulty: difficulty as "EASY" | "MEDIUM" | "HARD",
          duration,
          weight,
        });
      } else {
        await createQuestion({
          templateId,
          questionText,
          expectedAnswer,
          difficulty: difficulty as "EASY" | "MEDIUM" | "HARD",
          duration,
          weight,
        });
      }

      router.push("/questions");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const inputClass =
    "mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors";

  const textareaClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors resize-y";

  const labelClass = "block text-sm font-medium text-slate-700";

  // Resolve selected template name for Live Preview
  const selectedTemplateName =
    templates.find((t) => t.id === templateId)?.name ?? "—";

  return (
    <div className="space-y-6 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link
          href="/questions"
          className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          Questions
        </Link>

        <ChevronRight className="h-4 w-4 text-slate-300" />

        <span className="text-slate-500">
          {isEdit ? "Edit Question" : "Create Question"}
        </span>
      </div>

      {/* Body */}
      <div className="grid gap-6 xl:grid-cols-12">

        {/* Question Details */}

        <div className="xl:col-span-5 rounded-2xl border border-slate-200 bg-white p-6">

          <h2 className="text-base font-bold text-slate-800">
            {isEdit ? "Edit Question" : "Question Details"}
          </h2>

          <div className="mt-5 space-y-5">

            <div>
              <label className={labelClass}>Question Text</label>
              <textarea
                rows={8}
                placeholder="Enter the interview question..."
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className={textareaClass}
              />
            </div>

            <div>
              <label className={labelClass}>Expected Answer</label>
              <textarea
                rows={8}
                placeholder="Describe what a strong answer looks like..."
                value={expectedAnswer}
                onChange={(e) => setExpectedAnswer(e.target.value)}
                className={textareaClass}
              />
            </div>
          </div>
        </div>

        {/* Configuration */}

        <div className="xl:col-span-3 rounded-2xl border border-slate-200 bg-white p-6">

          <h2 className="text-base font-bold text-slate-800">
            Configuration
          </h2>

          <div className="mt-5 space-y-5">

            <div>
              <label className={labelClass}>Difficulty</label>
              <div className="relative">

                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className={`${inputClass} appearance-none pr-9`}
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>

                <ChevronRight className="pointer-events-none absolute right-3.5 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400" />

              </div>

            </div>

            {/* Duration */}
            <div>
              <label className={labelClass}>Duration (seconds)</label>
              <input
                type="number"
                min={0}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className={inputClass}
              />
              <p className="mt-1.5 text-xs text-slate-400">
                {duration > 0 ? `${(duration / 60).toFixed(1)} min` : "—"}
              </p>

            </div>

            <div>
              <label className={labelClass}>Weight</label>
              <input
                type="number"
                min={1}
                max={5}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className={inputClass}
              />
            </div>

            {/* Template — now populated from the API */}
            <div>
              <label className={labelClass}>Template</label>
              <div className="relative">

                <select
                  value={templateId}
                  onChange={(e) => setTemplateId(e.target.value)}
                  disabled={templatesLoading}
                  className={`${inputClass} appearance-none pr-9 disabled:bg-slate-50 disabled:text-slate-400 ${
                    templateId === "" ? "text-slate-400" : "text-slate-800"
                  }`}
                >
                  <option value="">
                    {templatesLoading ? "Loading templates..." : "Select Template"}
                  </option>
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>

                <ChevronRight className="pointer-events-none absolute right-3.5 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400" />

              </div>

            </div>
          </div>
        </div>

        {/* Preview */}

        <div className="xl:col-span-4 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-base font-bold text-blue-600">Live Preview</h2>

          <div className="mt-6 space-y-5">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Question</p>
              <p className="mt-2 text-base font-semibold leading-relaxed text-slate-800">
                {questionText || (
                  <span className="font-normal text-slate-400">
                    Your question will appear here
                  </span>
                )}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Expected Answer</p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
                {expectedAnswer || (
                  <span className="text-slate-400">
                    Your expected answer will appear here
                  </span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">Difficulty</p>
                <p className="mt-1.5 text-sm font-semibold text-slate-800 capitalize">
                  {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">Duration</p>
                <p className="mt-1.5 text-sm font-semibold text-slate-800">
                  {(duration / 60).toFixed(1)} min
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">Weight</p>
                <p className="mt-1.5 text-sm font-semibold text-slate-800">{weight}</p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">Template</p>
                <p className="mt-1.5 text-sm font-semibold text-slate-800 truncate" title={selectedTemplateName}>
                  {selectedTemplateName}
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Footer */}

      <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6">

        <Link
          href="/questions"
          className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </Link>

        <button
          onClick={handleSubmit}
          disabled={loading || (!isEdit && !templateId)}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : isEdit
            ? "Update Question"
            : "Create Question"}
        </button>

      </div>
    </div>
  );
}