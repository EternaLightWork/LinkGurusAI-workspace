"use client";

import { useEffect, useRef, useState } from "react";

type State = "working" | "done" | "invalid";

/**
 * Confirms or cancels a subscription from a link. The token is read from the
 * query string and POSTed once — it never appears in a rendered page, and the
 * URL is cleaned so it does not leak through history or a shared screenshot.
 */
export function TokenAction({
  endpoint,
  labels,
}: {
  endpoint: string;
  labels: { working: string; done: string; invalid: string };
}) {
  const [state, setState] = useState<State>("working");
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const token = new URLSearchParams(window.location.search).get("token");
    window.history.replaceState(null, "", window.location.pathname);

    if (!token) {
      setState("invalid");
      return;
    }

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((response) => setState(response.ok ? "done" : "invalid"))
      .catch(() => setState("invalid"));
  }, [endpoint]);

  return (
    <p
      role="status"
      aria-live="polite"
      className={`border-s-2 p-5 ${
        state === "invalid" ? "border-neutral-400 bg-neutral-25 text-neutral-700" : "border-blue-500 bg-blue-50"
      }`}
    >
      {labels[state]}
    </p>
  );
}
