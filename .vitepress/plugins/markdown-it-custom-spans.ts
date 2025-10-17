import type MarkdownIt from 'markdown-it';

interface SpanRule {
  delimiter: string;
  name: string;
  attrs: string;
}

const SPAN_RULES: SpanRule[] = [
  { delimiter: '++', name: 'kaitag', attrs: 'lang="xdq"' },
  { delimiter: '--', name: 'gloss', attrs: 'class="gloss"' },
];

export default function (md: MarkdownIt) {
  SPAN_RULES.forEach(rule => {
    const { delimiter, name, attrs } = rule;

    md.renderer.rules[`${name}_open`] = () => `<span ${attrs}>`;
    md.renderer.rules[`${name}_close`] = () => '</span>';

    md.inline.ruler.before('emphasis', name, (state, silent) => {
      const { src, pos } = state;
      if (!src.startsWith(delimiter, pos)) {
        return false;
      }

      const contentStart = pos + delimiter.length;
      const contentEnd = src.indexOf(delimiter, contentStart);
      if (contentEnd === -1) return false;
      if (silent) return true;

      // Add opening token
      const openToken = state.push(`${name}_open`, 'span', 1);
      openToken.markup = delimiter;

      // Parse inner content as inline markdown
      const content = src.slice(contentStart, contentEnd);
      md.inline.parse(content, md, state.env, state.tokens);

      // Add closing token
      const closeToken = state.push(`${name}_close`, 'span', -1);
      closeToken.markup = delimiter;

      // Move position past the closing marker
      state.pos = contentEnd + delimiter.length;
      return true;
    });
  });
}
