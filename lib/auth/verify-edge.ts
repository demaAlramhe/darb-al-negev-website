function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function getSessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    `${process.env.ADMIN_EMAIL ?? ""}:${process.env.ADMIN_PASSWORD ?? ""}:darb-al-negev`
  );
}

async function signPayload(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return toBase64Url(new Uint8Array(signature));
}

export async function verifySessionTokenEdge(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = await signPayload(payload);
  if (signature.length !== expected.length) return false;

  let valid = true;
  for (let i = 0; i < signature.length; i += 1) {
    if (signature.charCodeAt(i) !== expected.charCodeAt(i)) valid = false;
  }
  if (!valid) return false;

  try {
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))) as {
      email?: string;
      exp?: number;
    };
    if (!json.email || !json.exp || Date.now() > json.exp) return false;
    return json.email === process.env.ADMIN_EMAIL;
  } catch {
    return false;
  }
}
