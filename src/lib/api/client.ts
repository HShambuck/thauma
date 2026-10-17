import { env } from "@/lib/env";

export async function apiPost<T = { ok: boolean }>(path: string, body: unknown): Promise<T> {
  if (!env.apiUrl) {
    // MOCK mode: simulates latency. Set VITE_API_URL to your API Gateway URL to go live.
    console.log("[mock POST]", path, body);
    await new Promise((r) => setTimeout(r, 700));
    return { ok: true } as T;
  }
  const res = await fetch(env.apiUrl + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Request failed: " + res.status);
  return res.json() as Promise<T>;
}
