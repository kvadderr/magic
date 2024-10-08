/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useEffect } from "react";

export function CustomPageContent({ html }: { html: string }) {
  useEffect(() => {
    // @ts-ignore
    window.copy = function (text: string) {
      navigator.clipboard.writeText(text);
    };
  }, []);

  return (
    <div className="question-text" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
