export interface Question {
  id: string;
  templateId: string;
  templateName: string;
  questionText: string;
  expectedAnswer: string;
  duration: number;
  weight: number;
  difficulty: string;
  tag?: string;            // e.g. "JavaScript", "React", "System Design" — shown under question text
  active: boolean;
  createdAt: string;
  createdByName?: string;  // e.g. "Mansi Kakade" — shown under created date
}

export interface QuestionStats {
  totalQuestions: number;
  activeQuestions: number;
  inactiveQuestions: number;
}

export interface Pagination {
  page: number;
  page_size: number;
  total_records: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface QuestionsResponse {
  stats: QuestionStats;
  records: Question[];
  pagination: Pagination;
}

export interface CreateQuestionPayload {
  templateId: string;
  questionText: string;
  expectedAnswer: string;
  duration: number;
  weight: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tag?: string;
}

export interface UpdateQuestionPayload {
  questionText?: string;
  expectedAnswer?: string;
  duration?: number;
  weight?: number;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  active?: boolean;
}