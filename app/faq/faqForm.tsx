"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "faq-1",
    question: "What is this application about?",
    answer:
      "This application helps users manage events, allowing them to request, approve, and assign tasks as needed.",
  },
  {
    id: "faq-2",
    question: "How can I request an event?",
    answer:
      "Once logged in, navigate to the Event page, fill out the details, and submit your request.",
  },
  {
    id: "faq-3",
    question: "Who can approve my event requests?",
    answer: "Event requests are reviewed and approved by administrators.",
  },
  {
    id: "faq-4",
    question: "Can I assign multiple workers to an event?",
    answer:
      "Yes, multiple workers can be assigned but only by administrators for an event.",
  },
];

export default function FAQform() {
  return (
    <div style={{ padding: "2px" }}>
      {/* <h1 className="text-xl font-bold pt-3 pb-3">
        Find answers to common questions below:
      </h1> */}

      <Accordion type="multiple">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>
              <p>{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
