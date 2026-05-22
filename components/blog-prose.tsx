import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Renders a string of "prose lite" markdown — `[text](url)` for links and
 * `**text**` for bold. Internal URLs (starting with `/`) render as Next
 * <Link>; external URLs render as anchors with target=_blank.
 *
 * This is intentionally simple — it's not a Markdown parser. The blog data
 * uses it only for inline emphasis and links inside paragraphs and list
 * items. Block-level structure is expressed via the BlogNode type, not
 * Markdown syntax.
 */
export function parseInline(input: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < input.length) {
    // Try [text](url)
    if (input[i] === "[") {
      const closeBracket = input.indexOf("]", i + 1);
      if (closeBracket !== -1 && input[closeBracket + 1] === "(") {
        const closeParen = input.indexOf(")", closeBracket + 2);
        if (closeParen !== -1) {
          const text = input.slice(i + 1, closeBracket);
          const url = input.slice(closeBracket + 2, closeParen);
          if (url.startsWith("/")) {
            nodes.push(
              <Link
                key={`l${key++}`}
                href={url}
                className="text-primary underline underline-offset-4 hover:text-primary-hover"
              >
                {parseInline(text)}
              </Link>
            );
          } else {
            nodes.push(
              <a
                key={`a${key++}`}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 hover:text-primary-hover"
              >
                {parseInline(text)}
              </a>
            );
          }
          i = closeParen + 1;
          continue;
        }
      }
    }

    // Try **bold**
    if (input[i] === "*" && input[i + 1] === "*") {
      const close = input.indexOf("**", i + 2);
      if (close !== -1) {
        const text = input.slice(i + 2, close);
        nodes.push(
          <strong key={`b${key++}`} className="font-semibold text-foreground">
            {parseInline(text)}
          </strong>
        );
        i = close + 2;
        continue;
      }
    }

    // Plain text — accumulate until next special character
    let next = input.length;
    for (let j = i; j < input.length; j++) {
      if (input[j] === "[" || (input[j] === "*" && input[j + 1] === "*")) {
        next = j;
        break;
      }
    }
    nodes.push(input.slice(i, next));
    i = next;
  }

  return nodes;
}
