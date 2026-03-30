import type { PageData } from "vitepress";

const HOSTNAME = "https://urssivar.com";

export default async function transformPageData(pageData: PageData) {
  applyParamsMeta(pageData);
  addOgTags(pageData);
}

function addOgTags(pageData: PageData) {
  const { relativePath, frontmatter } = pageData;
  const title = frontmatter.title as string || pageData.title;
  const description = frontmatter.description as string || pageData.description;
  const isRu = relativePath.startsWith("ru/");
  const isHomepage = relativePath === "index.md" || relativePath === "ru/index.md";

  if (!frontmatter.head) frontmatter.head = [];

  if (title)
    frontmatter.head.push(["meta", { property: "og:title", content: title }]);
  if (description)
    frontmatter.head.push(["meta", { property: "og:description", content: description }]);
  frontmatter.head.push(["meta", { property: "og:type", content: isHomepage ? "website" : "article" }]);
  frontmatter.head.push(["meta", { property: "og:locale", content: isRu ? "ru_RU" : "en_US" }]);
  frontmatter.head.push(["meta", { property: "og:site_name", content: "Urssivar" }]);
  frontmatter.head.push(["meta", { property: "og:image", content: `${HOSTNAME}/og-image.png` }]);
  frontmatter.head.push(["meta", { property: "og:image:width", content: "1200" }]);
  frontmatter.head.push(["meta", { property: "og:image:height", content: "630" }]);
  frontmatter.head.push(["meta", { name: "twitter:card", content: "summary_large_image" }]);

  if (isHomepage) {
    frontmatter.head.push(["script", { type: "application/ld+json" }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Urssivar",
      url: HOSTNAME,
      ...(description && { description }),
    })]);
  }
}

function applyParamsMeta(pageData: PageData) {
  if (pageData.params?.title)
    pageData.title = pageData.params.title;
  if (pageData.params?.description)
    pageData.description = pageData.params.description;
}
