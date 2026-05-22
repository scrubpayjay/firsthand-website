"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ServiceFaq } from "@/lib/services-data";

interface FaqAccordionProps {
  items: ServiceFaq[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <Accordion className="w-full">
      {items.map((item, i) => (
        <AccordionItem
          key={`${item.q}-${i}`}
          value={`item-${i}`}
          className="border-b border-border"
        >
          <AccordionTrigger className="text-left text-base font-display font-semibold tracking-tight text-foreground hover:no-underline py-5">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
