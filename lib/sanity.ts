import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url"; // ✅ 修正了引用方式

export const client = createClient({
  projectId: "d2rxhgbg", 
  dataset: "production",
  apiVersion: "2026-01-19",
  useCdn: true,
});

const builder = createImageUrlBuilder(client); // ✅ 修正了调用方式

export function urlFor(source: any) {
  if (!source) return { url: () => "" };
  return builder.image(source);
}