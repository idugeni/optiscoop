'use client';

import { useLayoutEffect } from "react";
import { metadata } from "@/lib/Metadata";

interface MetadataParams {
  title: string;
  description: string;
}

export type { MetadataParams };

export function useMetadata(title: string, description: string): void {
  useLayoutEffect(() => {
    let finalTitle: string = "";
    if (title) {
      if (
        metadata.title &&
        typeof metadata.title === "object" &&
        "template" in metadata.title &&
        metadata.title.template
      ) {
        finalTitle = metadata.title.template.replace("%s", title);
      } else {
        finalTitle = title;
      }
    } else if (
      metadata.title &&
      typeof metadata.title === "object" &&
      "default" in metadata.title &&
      metadata.title.default
    ) {
      finalTitle = metadata.title.default;
    } else {
      finalTitle = (metadata.title as string) || "";
    }
    document.title = finalTitle;

    const finalDescription: string = description || metadata.description || "";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", finalDescription);
  }, [title, description]);
}
