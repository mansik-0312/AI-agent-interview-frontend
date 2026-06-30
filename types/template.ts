export interface Template {
  id: string;
  name: string;
  description: string;
  totalQuestions: number;
  active: boolean;
  createdAt: string;
  createdBy: string;
}

export interface Pagination {
  page: number;
  page_size: number;
  total_records: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface TemplateListResponse {
  records: Template[];
  pagination: Pagination;
}

export interface CreateTemplatePayload {
  name: string;
  description: string;
  totalQuestions: number;
}

export interface CreateTemplateResponse {
  id: string;
  name: string;
  description: string;
  totalQuestions: number;
  active: boolean;
  createdAt: string;
}