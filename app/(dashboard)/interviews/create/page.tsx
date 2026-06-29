"use client";

import { useState } from "react";
import { ArrowLeft, Search, Check, Calendar, Link as LinkIcon, User, Briefcase, MapPin, Clock, FileText } from "lucide-react";
import Link from "next/link";

const templates = [
  { id: 1, title: "Frontend Developer Interview", questions: 12, duration: "60 Min", icon: "💻" },
  { id: 2, title: "Backend Developer Interview", questions: 14, duration: "75 Min", icon: "🗄️" },
  { id: 3, title: "Full Stack Developer Interview", questions: 16, duration: "90 Min", icon: "🔄" },
  { id: 4, title: "React Developer Interview", questions: 10, duration: "45 Min", icon: "⚛️" },
];

export default function ScheduleInterview() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  const [formData, setFormData] = useState({
    candidateName: "Joey Tribbiani",
    email: "joey.t@example.com",
    phone: "+1 987 654 3210",
    jobRole: "Frontend Developer",
    department: "Engineering",
    experience: "Mid Level (2-5 yrs)",
    location: "Remote",
    application: "APP-2024-1287",
    resume: "Joey_Resume.pdf",
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(3, prev + 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(1, prev - 1));

  const getSelectedTemplate = () => templates.find(t => t.id === selectedTemplate);

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-full">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/interviews"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm mb-3 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Interviews
          </Link>
          <h1 className="text-2xl font-semibold text-slate-900">Schedule New Interview</h1>
          <p className="text-slate-500 text-sm mt-0.5">Create and schedule an AI interview in a few simple steps.</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-0 mb-8">
          {[
            { step: 1, label: "Candidate & Role", desc: "Set up a role for the candidate." },
            { step: 2, label: "Interview Configuration", desc: "Set date, time and location." },
            { step: 3, label: "Review & Confirm", desc: "Review results and confirm." },
          ].map((item, idx) => (
            <div key={item.step} className="flex items-center flex-1">
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all mt-0.5 ${
                    currentStep >= item.step
                      ? "bg-violet-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {item.step}
                </div>
                <div>
                  <div className={`text-sm font-medium ${
                    currentStep >= item.step ? "text-slate-900" : "text-slate-400"
                  }`}>
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-400">{item.desc}</div>
                </div>
              </div>
              {idx < 2 && (
                <div className={`flex-1 h-[2px] mx-6 ${
                  currentStep > item.step ? "bg-violet-600" : "bg-slate-200"
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Form Section */}
          <div className="col-span-8 space-y-4">
            {/* Step 1: Candidate & Role */}
            {currentStep === 1 && (
              <>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <h2 className="text-base font-semibold text-slate-900 mb-5">Candidate Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-1 block">Search Candidate *</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.candidateName}
                          onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                          className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-violet-500 text-sm"
                          placeholder="Search by name or email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1 block">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-violet-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1 block">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-violet-500 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1 block">Application</label>
                        <input
                          type="text"
                          value={formData.application}
                          onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-violet-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1 block">Resume</label>
                        <input
                          type="text"
                          value={formData.resume}
                          onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-violet-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <h2 className="text-base font-semibold text-slate-900 mb-5">Job Requisition</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-1 block">Job Role</label>
                      <input
                        type="text"
                        value={formData.jobRole}
                        onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-violet-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-1 block">Department</label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-violet-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-1 block">Experience Level</label>
                      <input
                        type="text"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-violet-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-1 block">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-violet-500 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={nextStep}
                    className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition text-sm"
                  >
                    Next Step →
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Interview Configuration */}
            {currentStep === 2 && (
              <>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <h2 className="text-base font-semibold text-slate-900 mb-5">Select Interview Template</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {templates.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTemplate(t.id)}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedTemplate === t.id
                            ? "border-violet-600 bg-violet-50/50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="text-2xl mb-2">{t.icon}</div>
                        <h3 className="font-medium text-slate-900 text-sm">{t.title}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {t.questions} Questions • {t.duration}
                        </p>
                        {selectedTemplate === t.id && (
                          <div className="mt-2 flex items-center gap-1 text-violet-600 font-medium text-xs">
                            <Check size={14} /> Selected
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-1 block">Schedule</label>
                      <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 text-sm">
                        <Calendar size={16} />
                        To be selected in Step 2
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-1 block">Interview Link</label>
                      <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 text-sm">
                        <LinkIcon size={16} />
                        Will be generated after scheduling
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={prevStep}
                    className="px-6 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition text-sm"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition text-sm"
                  >
                    Next Step →
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Review & Confirm */}
            {currentStep === 3 && (
              <>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <h2 className="text-base font-semibold text-slate-900 mb-1">Review & Confirm</h2>
                  <p className="text-xs text-slate-500 mb-5">Review interview details before proceeding</p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-4 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        JT
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 text-sm">{formData.candidateName}</div>
                        <div className="text-slate-500 text-xs">{formData.email}</div>
                        <div className="text-slate-500 text-xs">{formData.phone}</div>
                        <div className="text-emerald-600 text-xs font-medium mt-0.5">Active</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-500 mb-0.5">Job Role</div>
                        <div className="font-medium text-slate-900 text-sm">{formData.jobRole}</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-500 mb-0.5">Department</div>
                        <div className="font-medium text-slate-900 text-sm">{formData.department}</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-500 mb-0.5">Experience Level</div>
                        <div className="font-medium text-slate-900 text-sm">{formData.experience}</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-500 mb-0.5">Interview Template</div>
                        <div className="font-medium text-slate-900 text-sm">{getSelectedTemplate()?.title}</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-500 mb-0.5">No. of Questions</div>
                        <div className="font-medium text-slate-900 text-sm">{getSelectedTemplate()?.questions} Questions</div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-500 mb-0.5">Estimated Duration</div>
                        <div className="font-medium text-slate-900 text-sm">{getSelectedTemplate()?.duration}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={prevStep}
                    className="px-6 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition text-sm"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition text-sm"
                  >
                    Schedule Interview
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Right Sidebar - Summary Preview */}
          <div className="col-span-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 sticky top-6">
              <h3 className="font-semibold text-slate-900 text-sm mb-0.5">Summary Preview</h3>
              <p className="text-xs text-slate-500 mb-4">Review interview details before proceeding.</p>

              <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  JT
                </div>
                <div>
                  <div className="font-medium text-slate-900 text-sm">{formData.candidateName}</div>
                  <div className="text-slate-500 text-xs">{formData.email}</div>
                  <div className="text-slate-500 text-xs">{formData.phone}</div>
                  <div className="text-emerald-600 text-xs font-medium mt-0.5">Active</div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500 text-xs">Job Role</span>
                  <span className="font-medium text-slate-900 text-xs">{formData.jobRole}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500 text-xs">Department</span>
                  <span className="font-medium text-slate-900 text-xs">{formData.department}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500 text-xs">Experience Level</span>
                  <span className="font-medium text-slate-900 text-xs">{formData.experience}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500 text-xs">Interview Template</span>
                  <span className="font-medium text-slate-900 text-xs">
                    {currentStep >= 2 ? getSelectedTemplate()?.title : "Frontend Developer Interview"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500 text-xs">No. of Questions</span>
                  <span className="font-medium text-slate-900 text-xs">
                    {currentStep >= 2 ? `${getSelectedTemplate()?.questions} Questions` : "12 Questions"}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 text-xs">Estimated Duration</span>
                  <span className="font-medium text-slate-900 text-xs">
                    {currentStep >= 2 ? getSelectedTemplate()?.duration : "60 Minutes"}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={nextStep}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2.5 rounded-lg font-medium transition text-sm"
                >
                  {currentStep === 3 ? "Schedule Interview" : "Next Step →"}
                </button>
                <button
                  onClick={prevStep}
                  className={`w-full py-2.5 rounded-lg font-medium transition text-sm ${
                    currentStep > 1
                      ? "text-slate-600 hover:bg-slate-50"
                      : "text-slate-300 cursor-not-allowed"
                  }`}
                  disabled={currentStep === 1}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
