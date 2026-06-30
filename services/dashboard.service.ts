// services/dashboard.service.ts

import { getToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchWithAuth(url: string) {
  const token = getToken();

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export const getDashboard = async () => {
  const result = await fetchWithAuth(
    `${API_URL}/dashboard`
  );

  return result.data;
};

export const getUpcomingInterviews = async (
  page = 1,
  pageSize = 10
) => {
  const result = await fetchWithAuth(
    `${API_URL}/dashboard/upcoming-interviews?page=${page}&page_size=${pageSize}`
  );

  return result.data;
};

export const getRecentInterviews = async (
  page = 1,
  pageSize = 10
) => {
  const result = await fetchWithAuth(
    `${API_URL}/dashboard/recent-interviews?page=${page}&page_size=${pageSize}`
  );

  return result.data;
};