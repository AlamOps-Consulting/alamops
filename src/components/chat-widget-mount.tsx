"use client";

import { usePathname } from "next/navigation";
import { ChatWidget } from "./chat-widget";

export function ChatWidgetMount() {
  const pathname = usePathname() ?? "";
  if (pathname.startsWith("/admin")) return null;
  return <ChatWidget />;
}
