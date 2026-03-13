"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Tab = "preview" | "code";

interface PreviewPanelProps {
  code?: string;
  preview?: React.ReactNode;
}

export function PreviewPanel({ code, preview }: PreviewPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("preview");

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("preview")}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
            activeTab === "preview"
              ? "bg-white text-neutral-900 shadow-sm"
              : "text-neutral-500 hover:text-neutral-700"
          )}
        >
          Preview
        </button>
        <button
          onClick={() => setActiveTab("code")}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
            activeTab === "code"
              ? "bg-white text-neutral-900 shadow-sm"
              : "text-neutral-500 hover:text-neutral-700"
          )}
        >
          Code
        </button>
      </div>

      <div className="flex-1 mt-4 overflow-auto">
        {activeTab === "preview" ? (
          <div className="w-full h-full" data-testid="preview-content">
            {preview ?? (
              <div className="flex items-center justify-center h-full text-neutral-400 text-sm">
                No preview available
              </div>
            )}
          </div>
        ) : (
          <pre
            className="w-full h-full p-4 bg-neutral-950 text-neutral-100 rounded-lg text-sm font-mono overflow-auto whitespace-pre-wrap"
            data-testid="code-content"
          >
            {code ?? "// No code generated yet"}
          </pre>
        )}
      </div>
    </div>
  );
}
