"use client";

import { useState } from "react";
import { deleteQuestion } from "@/services/question.service";

export function useDeleteQuestion() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const removeQuestion = async (id: string) => {
    try {
      setLoading(true);
      setError("");

      await deleteQuestion(id);

      return true;
    } catch (err) {
      console.error(err);
      setError("Failed to delete question");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    removeQuestion,
    loading,
    error,
  };
}