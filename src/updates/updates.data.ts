import { createContentLoader } from 'vitepress';

interface UpdatePage {
  title: string;
  date: string;
  summary: string;
  url: string;
}

declare const data: UpdatePage[];
export { data };

export default createContentLoader('updates/*.md', {
  includeSrc: false,
  render: false,
  excerpt: false,
  transform(rawData) {
    return rawData
      .filter((page) => !!page.frontmatter.date)
      .map((page) => ({
        title: page.frontmatter.title,
        date: page.frontmatter.date,
        summary: page.frontmatter.summary,
        url: page.url
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
});
