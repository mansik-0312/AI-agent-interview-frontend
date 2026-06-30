"use client";

import { useState } from "react";
import {
  createTemplate,
} from "@/services/template.service";
import {
  CreateTemplatePayload,
  CreateTemplateResponse,
} from "@/types/template";

export function useCreateTemplate() {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function submit(
    payload: CreateTemplatePayload
  ): Promise<CreateTemplateResponse | null> {
    try {
      setLoading(true);
      setError("");

      const response =
        await createTemplate(payload);

      return response;
    } catch (err: any) {
      setError(
        err?.message ??
          "Failed to create template"
      );
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    createTemplate: submit,
    loading,
    error,
  };
}