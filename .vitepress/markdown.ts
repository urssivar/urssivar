import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

export function renderInline(text: string) {
  return md.renderInline(text);
}
