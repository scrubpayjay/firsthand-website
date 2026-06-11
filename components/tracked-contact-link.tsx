"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

export function TrackedContactLink({
  href,
  onClick,
  children,
  ...rest
}: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined") {
      const event = href.startsWith("tel:")
        ? "phone_click"
        : href.startsWith("mailto:")
          ? "email_click"
          : null;
      if (event) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event,
          click_url: href,
          page_path: window.location.pathname,
        });
      }
    }
    onClick?.(e);
  };

  return (
    <a href={href} {...rest} onClick={handleClick}>
      {children}
    </a>
  );
}
