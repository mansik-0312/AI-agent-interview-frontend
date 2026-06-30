"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Search, Check, Calendar, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { getToken } from "@/lib/auth";

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/interviews`;

export default function ScheduleInterview() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState({
    candidateApplicationId: "",
    candidateName: "",
    email: "",
    phone: "",
    jobRole: "",
    department: "",
    experience: "",
    location: "",
    application: "",
    resume: "",
  });

  // Fetch shortlisted candidates on mount
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const token = getToken();

        const res = await fetch(`${API_BASE}/candidates/shortlisted`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to load shortlisted candidates.");
        }

        const data = await res.json();

        setCandidates(data.data || []);

        // Optional
        // toast.success("Candidates loaded successfully");
      } catch (err) {
        console.error(err);

        if (err instanceof TypeError) {
          toast.error("Unable to connect to the server.");
        } else {
          toast.error(
            err instanceof Error
              ? err.message
              : "Failed to load shortlisted candidates."
          );
        }
      }
    };

    fetchCandidates();
  }, []);

  // Fetch interview templates on mount
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const token = getToken();

        const res = await fetch(`${API_BASE}/templates`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to load interview templates.");
        }

        const data = await res.json();

        const normalized = (data.data || []).map((t: any) => ({
          id: t.templateId,
          title: t.name,
          description: t.description,
          totalQuestions: t.totalQuestions,
        }));

        setTemplates(normalized);

        // Optional success toast
        // toast.success("Interview templates loaded successfully");
      } catch (err) {
        console.error(err);

        if (err instanceof TypeError) {
          toast.error("Unable to connect to the server.");
        } else {
          toast.error(
            err instanceof Error
              ? err.message
              : "Failed to load interview templates."
          );
        }
      }
    };

    fetchTemplates();
  }, []);

  const nextStep = () => setCurrentStep((prev) => Math.min(3, prev + 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(1, prev - 1));

  const getSelectedTemplate = () => templates.find((t) => t.id === selectedTemplate);

  // When a candidate is picked from the search/dropdown, populate the form
  const handleSelectCandidate = (candidate) => {
    setFormData({
      candidateApplicationId: candidate.applicationId,
      candidateName: candidate.name,
      email: candidate.email,
      phone: candidate.mobile,
      jobRole: candidate.role,
      department: candidate.department || "",
      experience: candidate.experience || "",
      location: candidate.location || "",
      application: candidate.applicationId,
      resume: candidate.resumePath?.split("/").pop() || "",
    });
  };

  const handleSchedule = async () => {
    setError("");

    if (!formData.candidateApplicationId || !selectedTemplate || !scheduledDate || !scheduledTime) {
      toast.error("Please complete all required fields before scheduling.");
      return;
    }

    setSubmitting(true);
    try {
      const token = getToken();

      const res = await fetch(`${API_BASE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          candidateApplicationId: formData.candidateApplicationId,
          templateId: selectedTemplate,
          scheduledDate,
          scheduledTime,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to schedule interview");
      }

      setResult(data.data);
      nextStep();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

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

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

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
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <select
                          value={formData.candidateApplicationId}
                          onChange={(e) => {
                            const candidate = candidates.find((c) => c.applicationId === e.target.value);
                            if (candidate) handleSelectCandidate(candidate);
                          }}
                          className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-violet-500 text-sm appearance-none"
                        >
                          <option value="">Search by name or email</option>
                          {candidates.map((c) => (
                            <option key={c.applicationId} value={c.applicationId}>
                              {c.name}
                            </option>
                          ))}
                        </select>
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
                    disabled={!formData.candidateApplicationId}
                    className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white rounded-lg font-medium transition text-sm"
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
                          <div className="text-2xl mb-2"></div>
                          <h3 className="font-medium text-slate-900 text-sm">{t.title}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">{t.description}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{t.totalQuestions} Questions</p>
                          {selectedTemplate === t.id && (
                            <div className="mt-2 flex items-center gap-1 text-violet-600 font-medium text-xs">
                              <Check size={14} /> Selected
                            </div>
                          )}
                        </div>
                      ))}
                      {templates.length === 0 && (
                        <p className="text-sm text-slate-400 col-span-2">No templates available.</p>
                      )}
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-1 block">Schedule Date *</label>
                      <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                        <Calendar size={16} className="text-slate-400" />
                        <input
                          type="date"
                          value={scheduledDate}
                          onChange={(e) => setScheduledDate(e.target.value)}
                          className="w-full bg-transparent text-sm text-slate-900 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-600 mb-1 block">Schedule Time *</label>
                      <input
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-violet-500 text-sm"
                      />
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
                    disabled={!selectedTemplate || !scheduledDate || !scheduledTime}
                    className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white rounded-lg font-medium transition text-sm"
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
                        {formData.candidateName
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase() || "—"}
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
                        <div className="font-medium text-slate-900 text-sm">
                          {getSelectedTemplate()?.totalQuestions ?? getSelectedTemplate()?.questions} Questions
                        </div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-500 mb-0.5">Schedule</div>
                        <div className="font-medium text-slate-900 text-sm">
                          {scheduledDate} {scheduledTime}
                        </div>
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
                    onClick={handleSchedule}
                    disabled={submitting}
                    className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white rounded-lg font-medium transition text-sm"
                  >
                    {submitting ? "Scheduling..." : "Schedule Interview"}
                  </button>
                </div>
              </>
            )}

            {/* Step 4: Success */}
            {currentStep === 4 && result && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-center">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">Interview Scheduled!</h2>
                <div className="flex items-center justify-center gap-2 text-violet-600 text-sm">
                  <LinkIcon size={14} />
                  <a href={result.interviewLink} target="_blank" rel="noreferrer">
                    {result.interviewLink}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Summary Preview */}
          <div className="col-span-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 sticky top-6">
              <h3 className="font-semibold text-slate-900 text-sm mb-0.5">Summary Preview</h3>
              <p className="text-xs text-slate-500 mb-4">Review interview details before proceeding.</p>

              <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {formData.candidateName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase() || "—"}
                </div>
                <div>
                  <div className="font-medium text-slate-900 text-sm">{formData.candidateName || "No candidate selected"}</div>
                  <div className="text-slate-500 text-xs">{formData.email}</div>
                  <div className="text-slate-500 text-xs">{formData.phone}</div>
                  {formData.candidateName && (
                    <div className="text-emerald-600 text-xs font-medium mt-0.5">Active</div>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500 text-xs">Job Role</span>
                  <span className="font-medium text-slate-900 text-xs">{formData.jobRole || "—"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500 text-xs">Department</span>
                  <span className="font-medium text-slate-900 text-xs">{formData.department || "—"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500 text-xs">Experience Level</span>
                  <span className="font-medium text-slate-900 text-xs">{formData.experience || "—"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500 text-xs">Interview Template</span>
                  <span className="font-medium text-slate-900 text-xs">
                    {getSelectedTemplate()?.title || "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500 text-xs">No. of Questions</span>
                  <span className="font-medium text-slate-900 text-xs">
                    {getSelectedTemplate()
                      ? `${getSelectedTemplate()?.totalQuestions ?? getSelectedTemplate()?.questions} Questions`
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500 text-xs">Schedule</span>
                  <span className="font-medium text-slate-900 text-xs">
                    {scheduledDate && scheduledTime ? `${scheduledDate} ${scheduledTime}` : "To be selected in Step 2"}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 text-xs">Interview Link</span>
                  <span className="font-medium text-slate-900 text-xs">
                    {result?.interviewLink ? "Generated" : "Will be generated after scheduling"}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={currentStep === 3 ? handleSchedule : nextStep}
                  disabled={submitting}
                  className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white py-2.5 rounded-lg font-medium transition text-sm"
                >
                  {currentStep === 3 ? (submitting ? "Scheduling..." : "Schedule Interview") : "Next Step →"}
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
