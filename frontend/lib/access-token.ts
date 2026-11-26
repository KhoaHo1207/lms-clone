type AccessTokenPayload = {
  exp?: unknown;
};

function decodePayload(token: string): AccessTokenPayload | null {
  const segment = token.split(".")[1];
  if (!segment) return null;

  try {
    const base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "=",
    );
    return JSON.parse(atob(padded)) as AccessTokenPayload;
  } catch {
    return null;
  }
}

export function hasValidAccessToken(token: string | undefined): boolean {
  if (!token) return false;

  const exp = decodePayload(token)?.exp;
  return typeof exp === "number" && exp * 1000 > Date.now();
}
