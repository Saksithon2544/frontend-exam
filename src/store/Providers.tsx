"use client"; // ✅ บอกให้ Next.js รู้ว่านี่คือ Client Component

import { Provider } from "react-redux";
import { store } from "./store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
