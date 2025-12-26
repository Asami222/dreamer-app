// src/libs/metadata.ts
import type { Metadata, ResolvingMetadata } from "next";

export async function buildPageMetadata(
  pageTitle: string,
  pageDescription?: string,
  parent?: ResolvingMetadata
): Promise<Metadata> {

  const parentMetadata = parent ? await parent : undefined;

  const siteTitle =
    typeof parentMetadata?.title === "string"
      ? parentMetadata.title
      : parentMetadata?.title?.absolute ?? "dreamer app";

  const siteDescription =
    parentMetadata?.description ?? "ご褒美機能を備えたTodoアプリです。";

  return {
    title: `${pageTitle} | ${siteTitle}`,
    description: pageDescription ?? siteDescription,
  };
}