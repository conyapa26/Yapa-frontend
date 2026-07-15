"use client";

import {
  useState,
  useRef,
  ReactNode,
  useLayoutEffect,
} from "react";

export interface AccordionItemData {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
}

export default function Accordion({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id)
          ? prev.filter((itemId) => itemId !== id)
          : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <AccordionItem
            key={item.id}
            title={item.title}
            isOpen={isOpen}
            onToggle={() => toggleItem(item.id)}
          >
            {item.content}
          </AccordionItem>
        );
      })}
    </div>
  );
}

/* ================= ITEM ================= */

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

function AccordionItem({
  title,
  isOpen,
  onToggle,
  children,
}: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">(0);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isOpen) {
      const scrollHeight = el.scrollHeight;
      setHeight(scrollHeight);

      const timeout = setTimeout(() => {
        setHeight("auto");
      }, 300);

      return () => clearTimeout(timeout);
    } else {
      const currentHeight = el.scrollHeight;
      setHeight(currentHeight);

      requestAnimationFrame(() => {
        setHeight(0);
      });
    }
  }, [isOpen]);

  return (
    <div
      className="
        bg-white
        border border-gray-200
        rounded-2xl
        transition-all duration-300
        hover:shadow-md
        overflow-hidden
      "
    >
      <button
        onClick={onToggle}
        className="
          w-full flex justify-between items-center
          p-6 text-left
          transition
          hover:bg-gray-50
        "
      >
        <span className="text-lg md:text-xl font-semibold text-gray-900">
          {title}
        </span>

        <span
          className={`
            text-blue-600 text-2xl font-light
            transition-transform duration-300
            ${isOpen ? "rotate-45" : ""}
          `}
        >
          +
        </span>
      </button>

      <div
        ref={contentRef}
        style={{
          height: height === "auto" ? "auto" : `${height}px`,
          transition: "height 300ms ease",
          overflow: "hidden",
        }}
      >
        <div className="px-6 pb-6 text-gray-600 font-bold text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}