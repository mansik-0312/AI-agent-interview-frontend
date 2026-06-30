import { getToken } from "@/lib/auth";
import {
  TemplateListResponse,
  CreateTemplatePayload,
  CreateTemplateResponse,
} from "@/types/template";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface GetTemplatesParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string; // "" | "Active" | "Inactive"
}

export async function getTemplates({
  page = 1,
  pageSize = 10,
  search,
  status,
}: GetTemplatesParams = {}): Promise<TemplateListResponse> {
  const token = getToken();

  const query = new URLSearchParams();
  query.append("page", String(page));
  query.append("page_size", String(pageSize));

  if (search) {
    query.append("search", search);
  }

  // Backend expects ?active=true|false (confirmed working).
  if (status === "Active") query.append("active", "true");
  if (status === "Inactive") query.append("active", "false");

  const response = await fetch(`${API_URL}/templates?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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

  const response = await fetch(`${API_URL}/templates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create template");
  }

  const result = await response.json();

  return result.data;
}