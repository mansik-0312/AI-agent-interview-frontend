import { getToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getQuestions(params?: {
  page?: number;
  page_size?: number;
  search?: string;
  difficulty?: string;
  active?: boolean;
  templateId?: string;
}) {
  const token = getToken();

  if (!token) {
    throw new Error("Not authenticated");
  }

  const query = new URLSearchParams();

  if (params?.page)
    query.append("page", String(params.page));

  if (params?.page_size)
    query.append(
      "page_size",
      String(params.page_size)
    );

  if (params?.search)
    query.append(
      "search",
      params.search
    );

  if (params?.difficulty)
    query.append(
      "difficulty",
      params.difficulty
    );

  if (params?.active !== undefined)
    query.append(
      "active",
      String(params.active)
    );

  if (params?.templateId)
    query.append(
      "templateId",
      params.templateId
    );

  const response = await fetch(
    `${API_URL}/questions?${query.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch questions"
    );
  }

  const result = await response.json();

  return result.data;
}

import { CreateQuestionPayload } from "@/types/question";

export async function createQuestion(
  payload: CreateQuestionPayload
) {
  const token = getToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/questions`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  const result =
    await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ??
        "Failed to create question"
    );
  }

  return result.data;
}