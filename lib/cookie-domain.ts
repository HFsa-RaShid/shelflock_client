/** Shared across marketing site + dashboard (e.g. `localhost` or `.ecomfixter.com`). */
export function getSharedCookieDomain(): string | undefined {
  const domain = process.env.COOKIE_DOMAIN?.trim();
  return domain || undefined;
}

export function sharedCookieOptions() {
  const domain = getSharedCookieDomain();
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    ...(domain ? { domain } : {}),
  };
}
