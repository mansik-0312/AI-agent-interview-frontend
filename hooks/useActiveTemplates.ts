"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";

interface TemplateOption {
  id: string;
  name: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useActiveTemplates() {
  const [templates, setTemplates] = useState<TemplateOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const token = getToken();
        const res = await fetch(
          `${API_URL}/templates?active=true&page_size=100`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) return;
        const result = await res.json();
        const records: TemplateOption[] = (result.data?.records ?? []).map(
          (t: any) => ({ id: t.id, name: t.name })
        );
        setTemplates(records);
      } catch {
        // silently fail — user will just see an empty dropdown
      } finally {
        setLoading(false);
      }
    }
    fetchTemplates();
  }, []);

  return { templates, loading };
}
