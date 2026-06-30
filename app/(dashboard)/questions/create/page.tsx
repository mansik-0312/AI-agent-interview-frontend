"use client";

<<<<<<< Updated upstream
import { useState } from "react";
import { ArrowLeft, Search, User, Calendar, Clock, Check } from "lucide-react";
import Link from "next/link";

const templates = [
  {
    id: 1,
    title: "Frontend Developer Interview",
    questions: 12,
    duration: "60 Min",
    icon: "💻",
    selected: true,
  },
  {
    id: 2,
    title: "Backend Developer Interview",
    questions: 14,
    duration: "75 Min",
    icon: "🗄️",
  },
  {
    id: 3,
    title: "Full Stack Developer Interview",
    questions: 16,
    duration: "90 Min",
    icon: "🔄",
  },
  {
    id: 4,
    title: "React Developer Interview",
    questions: 10,
    duration: "45 Min",
    icon: "⚛️",
  },
];

export default function ScheduleInterview() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  const [formData, setFormData] = useState({
    candidateName: "Joey Tribbiani",
    email: "joey.t@example.com",
    phone: "+1 987 654 3210",
    application: "APP-2024-1287",
    jobRole: "Frontend Developer",
    department: "Engineering",
    experience: "Mid Level (2-5 yrs)",
    location: "Remote",
  });

  const handleTemplateSelect = (id: number) => {
    setSelectedTemplate(id);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/interviews"
              className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-2"
            >
              <ArrowLeft size={20} />
              Back to Interviews
            </Link>
            <h1 className="text-3xl font-semibold text-slate-900">Schedule New Interview</h1>
            <p className="text-slate-600 mt-1">Create and schedule an AI interview in a few simple steps.</p>
          </div>
        </div>

        {/* Step Progress */}
        <div className="flex gap-4 mb-10">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex-1 h-2 rounded-full transition-all ${
                step <= currentStep ? "bg-violet-600" : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Form Area */}
          <div className="col-span-8 space-y-8">
            {/* Step 1: Candidate & Role */}
            {currentStep === 1 && (
              <>
                <div className="bg-white rounded-3xl p-8 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold">1</div>
                    Candidate Information
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                        Search Candidate <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
                        <input
                          type="text"
                          value={formData.candidateName}
                          onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:border-violet-500"
                          placeholder="Search by name or email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:border-violet-500"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1.5 block">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:border-violet-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1.5 block">Application ID</label>
                        <input
                          type="text"
                          value={formData.application}
                          className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:border-violet-500"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1.5 block">Resume</label>
                        <div className="border border-dashed border-slate-300 rounded-2xl p-4 text-center text-slate-500 hover:border-violet-300 cursor-pointer">
                          📄 Joey_Resume.pdf
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Requisition */}
                <div className="bg-white rounded-3xl p-8 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">Job Requisition</h2>
                  <div className="grid grid-cols-2 gap-6">
                    {Object.keys(formData).slice(4).map((key, idx) => (
                      <div key={idx}>
                        <label className="text-sm font-medium text-slate-700 mb-1.5 block capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </label>
                        <select
                          value={formData[key as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:border-violet-500"
                        >
                          <option value={formData[key as keyof typeof formData]}>
                            {formData[key as keyof typeof formData]}
                          </option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Template Selection */}
            {currentStep === 2 && (
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h2 className="text-xl font-semibold mb-8">Select Interview Template</h2>
                <div className="grid grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => handleTemplateSelect(template.id)}
                      className={`border-2 rounded-3xl p-6 cursor-pointer transition-all hover:shadow-md ${
                        selectedTemplate === template.id
                          ? "border-violet-600 bg-violet-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="text-4xl mb-4">{template.icon}</div>
                        {selectedTemplate === template.id && (
                          <div className="bg-violet-600 text-white rounded-full p-1">
                            <Check size={18} />
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg">{template.title}</h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {template.questions} Questions • {template.duration}
                      </p>
                      {selectedTemplate === template.id && (
                        <div className="mt-4 inline-block px-4 py-1 bg-violet-100 text-violet-700 text-sm rounded-full font-medium">
                          Selected
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Review & Confirm */}
            {currentStep === 3 && (
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Review & Confirm</h2>
                <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
                  <p className="text-slate-600">Please review all details before scheduling the interview.</p>
                  {/* Summary content can be expanded */}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Summary Preview */}
          <div className="col-span-4">
            <div className="bg-white rounded-3xl p-8 shadow-sm sticky top-8">
              <h3 className="font-semibold text-lg mb-6">Summary Preview</h3>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  JT
                </div>
                <div>
                  <div className="font-semibold">{formData.candidateName}</div>
                  <div className="text-sm text-emerald-600">Active</div>
                  <div className="text-sm text-slate-500">{formData.email}</div>
                </div>
              </div>

              <div className="space-y-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Job Role</span>
                  <span className="font-medium">{formData.jobRole}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Department</span>
                  <span className="font-medium">{formData.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Experience Level</span>
                  <span className="font-medium">{formData.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location</span>
                  <span className="font-medium">{formData.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Interview Template</span>
                  <span className="font-medium">Frontend Developer Interview</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">No. of Questions</span>
                  <span className="font-medium">12 Questions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Duration</span>
                  <span className="font-medium">60 Minutes</span>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-100">
                <button
                  onClick={nextStep}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3.5 rounded-2xl font-medium transition flex items-center justify-center gap-2"
                >
                  {currentStep === 3 ? "Schedule Interview" : "Next Step →"}
                </button>
                {currentStep > 1 && (
                  <button
                    onClick={prevStep}
                    className="w-full mt-3 text-slate-600 hover:text-slate-800 py-3 rounded-2xl font-medium"
                  >
                    Back
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
=======
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

>>>>>>> Stashed changes
      </div>
    </div>
  );
}