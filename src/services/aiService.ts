import { Resume } from '../types';
import { BoostRequest, BoostResponse } from '../types/ai';

/**
 * Calls the real AI boost endpoint.
 * Falls back to a mock implementation if the endpoint is not configured.
 */
export const boostResume = async (resume: Resume, targetRole?: string): Promise<Resume> => {
  const endpoint = import.meta.env.VITE_AI_ENDPOINT;
  const apiKey = import.meta.env.VITE_AI_API_KEY;

  if (!endpoint) {
    throw new Error('AI endpoint not configured');
  }

  const body: BoostRequest = { resume, targetRole };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000); // 8 s timeout

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify(body),
    signal: controller.signal,
  });

  clearTimeout(timeout);

  if (!response.ok) {
    const txt = await response.text();
    throw new Error(`AI service error ${response.status}: ${txt}`);
  }

  const data: BoostResponse = await response.json();
  if (!data.boostedResume) {
    throw new Error('Invalid AI response: missing boostedResume');
  }
  return data.boostedResume;
};
