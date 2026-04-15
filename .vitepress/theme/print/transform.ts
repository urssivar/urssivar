export function transformPrintDom(root: HTMLElement) {
  const sections = Array.from(
    root.querySelectorAll<HTMLElement>(".print-section")
  );

  // Derive the content root from the current URL — no hardcoded paths.
  // e.g. localhost:5173/language/_print → localhost:5173/language
  const siteBase = location.href.slice(0, location.href.lastIndexOf("/"));
  const rootSection = new URL(siteBase).pathname.split("/").pop()!; // e.g. "language"
  const sectionPaths = new Set(sections.map(s => s.dataset.path ?? ""));

  for (const section of sections) {
    const path = section.dataset.path ?? "";
    section.id = toSlug(path || rootSection);

    const shift = parseInt(section.dataset.shift ?? "0", 10);
    if (shift > 0) {
      for (const h of section.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5")) {
        const level = Math.min(parseInt(h.tagName[1], 10) + shift, 6);
        h.outerHTML = h.outerHTML.replace(/(<\/?)h\d/g, `$1h${level}`);
      }
    }

    for (const el of section.querySelectorAll<HTMLElement>("[id]")) {
      if (el === section) continue;
      el.id = `${section.id}--${el.id}`;
    }

    for (const a of section.querySelectorAll<HTMLAnchorElement>("a[href]")) {
      if (a.classList.contains("header-anchor")) continue;

      const link = resolveLink(a.getAttribute("href")!, path, siteBase);
      if (link && sectionPaths.has(link.path)) {
        const slug = toSlug(link.path || rootSection);
        a.href = link.fragment ? `#${slug}--${link.fragment}` : `#${slug}`;
      }
    }
  }

  if (import.meta.env.DEV) warnUnresolvedFragments(root);
}

function resolveLink(href: string, sectionPath: string, siteBase: string) {
  if (href.startsWith("#")) {
    return { path: sectionPath, fragment: href.slice(1) };
  }

  let parsed: URL;
  try {
    const top = sectionPath.split("/")[0];
    parsed = new URL(href, `${siteBase}${top ? `/${top}` : ""}/`);
  } catch {
    return null;
  }

  if (!parsed.href.startsWith(siteBase)) return null;

  return {
    path: decodeURIComponent(parsed.pathname)
      .slice(siteBase.length - parsed.origin.length)
      .replace(/^\/|\/$/g, ""),
    fragment: decodeURIComponent(parsed.hash.slice(1)),
  };
}

function toSlug(p: string) {
  return p.replace(/\//g, "-");
}

function warnUnresolvedFragments(root: HTMLElement) {
  const allIds = new Set(Array.from(root.querySelectorAll("[id]"), el => el.id));
  for (const a of root.querySelectorAll<HTMLAnchorElement>("a[href^='#']")) {
    if (a.classList.contains("header-anchor")) continue;
    const id = a.getAttribute("href")!.slice(1);
    if (!allIds.has(id)) console.warn(`[print transform] unresolved fragment: #${id}`, a);
  }
}
