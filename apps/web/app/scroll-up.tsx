"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ScrollUp() {
  const pathname = usePathname();
  const [pathnameState] = useState(pathname);
  useEffect(() => {
    if (pathnameState !== pathname) {
      window.document.scrollingElement?.scrollTo(0, 0);
    }
  }, [pathnameState, pathname]);

  return null;
}
