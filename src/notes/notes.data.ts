import { createContentLoader, type ContentData } from 'vitepress';

declare const data: ContentData[];
export { data };

export default createContentLoader('notes/*.md', {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform(rawData) {
    return rawData
      .filter((page) => !!page.frontmatter.date)
      .sort((a, b) =>
        b.frontmatter.date.getTime()
        - a.frontmatter.date.getTime());
  }
});
