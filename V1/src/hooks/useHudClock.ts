"use client";

import { useEffect, useState } from "react";

export function useHudClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString("en-GB", { hour12: false });
  const date = now.toISOString().slice(0, 10);

  return { time, date, now };
}
