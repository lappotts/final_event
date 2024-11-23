"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function WorkerPage() {
  return (
    <div style={{ padding: "2px" }}>
      <h1 className="text-xl font-bold pt-3 pb-3">Admin Panel</h1>
      <p>All your assigned events are:</p>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>User Management</AccordionTrigger>
          <AccordionContent>
            <p>View, edit, or remove user accounts from this section.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
