import React from "react";

export function JsonLd({ data }: { data: Record<string, any> }) {
  const jsonString = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
