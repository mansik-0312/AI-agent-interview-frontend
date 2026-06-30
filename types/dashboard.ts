export interface DashboardStats {
  totalInterviews: number;
  completedInterviews: number;
  upcomingInterviews: number;
  totalCandidates: number;
}

export interface UpcomingInterview {
  interviewId: string;
  candidateName: string;
  jobRole: string;
  scheduledAt: string;
  interviewers: string[];
  type: string;
  status: string;
}

export interface RecentInterview {
  interviewId: string;
  candidateName: string;
  jobRole: string;
  interviewDate: string;
  duration: number;
  status: string;
  overallScore: number;
}

export interface DashboardResponse {
  stats: DashboardStats;
  upcomingInterviews: UpcomingInterview[];
  recentInterviews: RecentInterview[];
}