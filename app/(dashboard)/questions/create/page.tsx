"use client";

import {
  useState,
} from "react";

export default function CreateQuestionPage() {
  const [
    questionText,
    setQuestionText,
  ] = useState("");

  const [
    expectedAnswer,
    setExpectedAnswer,
  ] = useState("");

  const [
    difficulty,
    setDifficulty,
  ] = useState("MEDIUM");

  const [
    duration,
    setDuration,
  ] = useState(120);

  const [
    weight,
    setWeight,
  ] = useState(1);

  const [
    templateId,
    setTemplateId,
  ] = useState("");

  return (
    <div className="space-y-10">

      {/* header */}

    <div className="flex items-center gap-2 text-sm">
    <span className="font-medium text-violet-600">
        Questions
    </span>

    <span className="text-slate-400">
        &gt;
    </span>

    <span className="text-slate-500">
        Create Question
    </span>
    </div>

      {/* body */}

      <div className="grid gap-8 xl:grid-cols-12">

        {/* left */}

        <div className="xl:col-span-5 rounded-[24px] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
            Question Details
            </h2>

          <div className="mt-6 space-y-5">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Question Text
              </label>

              <textarea
                rows={8}
                value={questionText}
                onChange={(e) =>
                  setQuestionText(
                    e.target.value
                  )
                }
                className="
                    mt-2
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-5
                    py-4
                    text-slate-900
                    placeholder:text-slate-400
                    focus:border-violet-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-violet-100
                    "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Expected Answer
              </label>

              <textarea
                rows={8}
                value={
                  expectedAnswer
                }
                onChange={(e) =>
                  setExpectedAnswer(
                    e.target.value
                  )
                }
                className="
                    mt-2
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-5
                    py-4
                    text-slate-900
                    placeholder:text-slate-400
                    focus:border-violet-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-violet-100
                    "
              />
            </div>
          </div>
        </div>

        {/* configuration */}

        <div className="xl:col-span-3 rounded-[24px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="font-semibold">
            Configuration
          </h2>

          <div className="mt-6 space-y-5">

            <div>
              <label>
                Difficulty
              </label>

              <select
                value={
                  difficulty
                }
                onChange={(e) =>
                  setDifficulty(
                    e.target.value
                  )
                }
                className="
                    mt-2
                    h-14
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    text-slate-900
                    placeholder:text-slate-400
                    focus:border-violet-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-violet-100
                    "
              >
                <option value="EASY">
                  Easy
                </option>

                <option value="MEDIUM">
                  Medium
                </option>

                <option value="HARD">
                  Hard
                </option>
              </select>
            </div>

            <div>
              <label>
                Duration
              </label>

              <input
                type="number"
                value={duration}
                onChange={(e) =>
                  setDuration(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="
                mt-2
                h-14
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                text-slate-900
                placeholder:text-slate-400
                focus:border-violet-500
                focus:outline-none
                focus:ring-2
                focus:ring-violet-100
                "
              />
            </div>

            <div>
              <label>
                Weight
              </label>

              <input
                type="number"
                value={weight}
                onChange={(e) =>
                  setWeight(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="
                mt-2
                h-14
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                text-slate-900
                placeholder:text-slate-400
                focus:border-violet-500
                focus:outline-none
                focus:ring-2
                focus:ring-violet-100
                "
              />
            </div>

            <div>
              <label>
                Template
              </label>

              <select
                value={
                  templateId
                }
                onChange={(e) =>
                  setTemplateId(
                    e.target.value
                  )
                }
                className="
                mt-2
                h-14
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                text-slate-900
                placeholder:text-slate-400
                focus:border-violet-500
                focus:outline-none
                focus:ring-2
                focus:ring-violet-100
                "
              >
                <option value="">
                  Select Template
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* preview */}

        <div className="xl:col-span-4 rounded-[24px] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-violet-600">
            Live Preview
            </h2>

          <div className="mt-8 space-y-6">

            <div>
              <p className="text-sm text-slate-500">
                Question
              </p>

              <p className="mt-3 text-[18px] font-semibold leading-8 text-slate-900">
                {questionText ||
                  "Enter question"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Expected Answer
              </p>

              <p className="mt-2 text-sm whitespace-pre-wrap">
                {expectedAnswer ||
                  "Enter answer"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-5">
                <p className="mb-2 block text-sm font-medium text-slate-700">
                  Difficulty
                </p>

                <p className="mt-2 font-medium">
                  {difficulty}
                </p>
              </div>

              <div className="rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-5">
                <p className="mb-2 block text-sm font-medium text-slate-700">
                  Duration
                </p>

                <p className="mt-2 font-medium">
                  {duration / 60} min
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}