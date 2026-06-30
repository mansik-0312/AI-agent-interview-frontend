"use client";

import {
  useState,
} from "react";
import {
  createQuestion,
} from "@/services/question.service";
import {
  CreateQuestionPayload,
} from "@/types/question";

export function useCreateQuestion() {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(
      null
    );

  const submit = async (
    payload: CreateQuestionPayload
  ) => {
    try {
      setLoading(true);
      setError(null);

      return await createQuestion(
        payload
      );
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    submit,
  };
}