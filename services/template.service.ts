import { getToken } from "@/lib/auth";
import { TemplateListResponse,
    CreateTemplatePayload,
    CreateTemplateResponse,
 } from "@/types/template";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTemplates(
    page = 1,
    pageSize = 10
): Promise<TemplateListResponse> {

    const token = getToken();

    const response = await fetch(
        `${API_URL}/templates?page=${page}&page_size=${pageSize}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch templates");
    }

    const result = await response.json();

    return result.data;
}

export async function createTemplate(
  payload: CreateTemplatePayload
): Promise<CreateTemplateResponse> {
  const token = getToken();

  const response = await fetch(
    `${API_URL}/templates`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create template");
  }

  const result = await response.json();

  return result.data;
}