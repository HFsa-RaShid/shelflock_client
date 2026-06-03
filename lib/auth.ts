import {
  AUTH_TOKEN_KEY,
  PENDING_REGISTRATION_KEY,
  REFRESH_TOKEN_KEY,
} from "@/lib/auth-constants";
import type { OnboardingNextStep } from "@/services/types/merchant-auth.types";

export { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY, PENDING_REGISTRATION_KEY };

export interface PendingRegistration {
  name: string;
  email?: string;
  phone?: string;
}

export function setAuthTokens(accessToken: string, refreshToken?: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function clearAuthTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setPendingRegistration(data: PendingRegistration) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PENDING_REGISTRATION_KEY, JSON.stringify(data));
}

export function getPendingRegistration(): PendingRegistration | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(PENDING_REGISTRATION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PendingRegistration;
  } catch {
    return null;
  }
}

export function clearPendingRegistration() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(PENDING_REGISTRATION_KEY);
}

export interface SyncAuthSessionPayload {
  accessToken: string;
  refreshToken?: string;
  hasStores?: boolean;
  onboardingNextStep?: OnboardingNextStep;
}

export async function syncAuthSession(payload: SyncAuthSessionPayload): Promise<void> {
  await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function syncOnboardingSession(payload: {
  hasStores: boolean;
  onboardingNextStep: OnboardingNextStep;
}): Promise<void> {
  await fetch("/api/auth/session", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function clearAuthSession(): Promise<void> {
  clearAuthTokens();
  clearPendingRegistration();
  await fetch("/api/auth/session", { method: "DELETE" });
}
