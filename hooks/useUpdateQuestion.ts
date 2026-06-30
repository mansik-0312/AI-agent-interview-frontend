"use client";

import { useState } from "react";
import {
  updateQuestion,
} from "@/services/question.service";

export function useUpdateQuestion() {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function mutate(
    id: string,
    payload: any
  ) {
    try {
      setLoading(true);
      setError("");

      return await updateQuestion(
        id,
        payload
      );
    } catch (err: any) {
      setError(
        err.message ??
          "Failed to update question"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    updateQuestion: mutate,
    loading,
    error,
  };
}   