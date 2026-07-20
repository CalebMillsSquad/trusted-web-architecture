"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNavigation } from "@/lib/site-content";

export function PrimaryNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation">
      {primaryNavigation.map(([label, href]) => {
        const isCurrent = pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link href={href} key={href} aria-current={isCurrent ? "page" : undefined}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
