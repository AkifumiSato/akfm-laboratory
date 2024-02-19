"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollUp() {
  const pathname = usePathname();
  useEffect(() => window.document.scrollingElement?.scrollTo(0, 0), [pathname]);

  return null;
}
