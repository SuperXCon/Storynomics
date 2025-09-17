import React, { useState } from "react";

interface FaqItem {
  id: number;
  question: string;
  answer?: string;
  isExpanded: boolean;
}

export const FaqSection = (): JSX.Element => {
  const [faqItems, setFaqItems] = useState<FaqItem[]>([
    {
      id: 1,
      question: "What is Super?",
      answer:
        "At Super, we understand that design is the heart of any digital product. That's why we provide a vast library of high-quality UI resources, from sleek user interfaces to elegant icons.",
      isExpanded: true,
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      isExpanded: false,
    },
    {
      id: 3,
      question: "Do you offer international shipping?",
      isExpanded: false,
    },
    {
      id: 4,
      question: "What is your return and refund policy?",
      isExpanded: false,
    },
    {
      id: 5,
      question: "Are there any promotions or discounts available?",
      isExpanded: false,
    },
  ]);

  const toggleFaq = (id: number) => {
    setFaqItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isExpanded: !item.isExpanded } : item,
      ),
    );
  };

  return (
    <section
      className="flex flex-col items-start pt-[var(--grid-section-vr-padding)] pr-[var(--grid-section-hr-padding)] pb-[var(--grid-section-vr-padding)] pl-[var(--grid-section-hr-padding)] relative self-stretch w-[var(--grid-width)] flex-[0_0_auto]"
      data-color-mode-mode="light"
      aria-labelledby="faq-heading"
    >
      <div className="flex flex-col items-center gap-[var(--grid-container-gap)] relative self-stretch w-full flex-[0_0_auto]">
        <header className="flex flex-col w-[864px] items-center gap-[var(--primitives-spacing-spacing-05)] relative flex-[0_0_auto]">
          <div className="border border-solid border-color-mode-border-border-secondary-muted inline-flex items-center justify-center pt-[var(--primitives-spacing-spacing-02)] pr-[var(--primitives-spacing-spacing-02)] pb-[var(--primitives-spacing-spacing-02)] pl-[var(--primitives-spacing-spacing-02)] relative flex-[0_0_auto] rounded-[var(--corner-corner-02)] overflow-hidden bg-[color:var(--color-mode-surface-surface-secondary-disabled)]">
            <div className="inline-flex items-center justify-center pr-[var(--primitives-spacing-spacing-02)] pl-[var(--primitives-spacing-spacing-02)] py-0 relative flex-[0_0_auto]">
              <span className="relative w-fit mt-[-1.00px] font-label-small font-[number:var(--label-small-font-weight)] text-[color:var(--color-mode-text-text-primary)] text-[length:var(--label-small-font-size)] tracking-[var(--label-small-letter-spacing)] leading-[var(--label-small-line-height)] whitespace-nowrap [font-style:var(--label-small-font-style)]">
                FAQs
              </span>
            </div>
          </div>

          <h2
            id="faq-heading"
            className="relative self-stretch font-heading-x-large font-[number:var(--heading-x-large-font-weight)] text-[color:var(--color-mode-text-text-primary)] text-[length:var(--heading-x-large-font-size)] text-center tracking-[var(--heading-x-large-letter-spacing)] leading-[var(--heading-x-large-line-height)] [font-style:var(--heading-x-large-font-style)]"
          >
            Need help?
          </h2>

          <p className="relative self-stretch font-paragraph-large font-[number:var(--paragraph-large-font-weight)] text-color-mode-text-text-secondary text-[length:var(--paragraph-large-font-size)] text-center tracking-[var(--paragraph-large-letter-spacing)] leading-[var(--paragraph-large-line-height)] [font-style:var(--paragraph-large-font-style)]">
            Here are answers to our most frequently asked questions.
          </p>
        </header>

        <div
          className="flex flex-col w-auto max-w-[864px] items-start relative flex-[0_0_auto]"
          role="list"
        >
          {faqItems.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col items-center gap-[var(--primitives-spacing-spacing-05)] pt-[var(--primitives-spacing-spacing-05)] pb-[var(--primitives-spacing-spacing-05)] px-0 relative self-stretch w-full flex-[0_0_auto] border-t [border-top-style:solid] border-b [border-bottom-style:solid] border-[color:var(--color-mode-border-border-primary-muted-duplicate)] ${
                index > 0 ? "-mt-px" : ""
              }`}
              role="listitem"
            >
              <button
                className="flex items-center gap-2.5 relative self-stretch w-full flex-[0_0_auto] cursor-pointer bg-transparent border-none p-0 text-left"
                onClick={() => toggleFaq(item.id)}
                aria-expanded={item.isExpanded}
                aria-controls={`faq-answer-${item.id}`}
                type="button"
              >
                <span className="relative flex-1 mt-[-1.00px] font-label-large font-[number:var(--label-large-font-weight)] text-[color:var(--color-mode-text-text-primary)] text-[length:var(--label-large-font-size)] tracking-[var(--label-large-letter-spacing)] leading-[var(--label-large-line-height)] [font-style:var(--label-large-font-style)]">
                  {item.question}
                </span>

                <img
                  className="relative w-6 h-6"
                  alt={item.isExpanded ? "Collapse" : "Expand"}
                  src={
                    item.isExpanded
                      ? "/img/arrow-up.svg"
                      : "/img/arrow-down-3.svg"
                  }
                />
              </button>

              {item.isExpanded && item.answer && (
                <div
                  id={`faq-answer-${item.id}`}
                  className="relative self-stretch"
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                >
                  <p className="font-paragraph-medium font-[number:var(--paragraph-medium-font-weight)] text-color-mode-text-text-secondary text-[length:var(--paragraph-medium-font-size)] tracking-[var(--paragraph-medium-letter-spacing)] leading-[var(--paragraph-medium-line-height)] [font-style:var(--paragraph-medium-font-style)]">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
