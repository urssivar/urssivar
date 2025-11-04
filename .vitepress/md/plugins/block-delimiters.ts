import type MarkdownIt from 'markdown-it';
import type { DelimiterRule } from './types';

export default function blockDelimiters(
  md: MarkdownIt,
  rules: DelimiterRule[]
) {
  rules.forEach((rule) => {
    const { delimiter, tokenName, tag, attrs } = rule;

    md.block.ruler.before('fence', tokenName, (state, startLine, endLine, silent) => {
      const lineStart = state.bMarks[startLine] + state.tShift[startLine];
      const lineEnd = state.eMarks[startLine];
      const openingMarker = state.src.slice(lineStart, lineEnd).trim();

      // Must start with delimiter
      if (openingMarker !== delimiter) return false;
      if (silent) return true;

      // Search for closing delimiter
      let closingLine = startLine;
      while (++closingLine < endLine) {
        const line = state.src.slice(
          state.bMarks[closingLine] + state.tShift[closingLine],
          state.eMarks[closingLine]
        ).trim();
        if (line === delimiter) break;
      }

      // Closing delimiter not found
      if (closingLine >= endLine) return false;

      // Create opening token
      const openToken = state.push(`${tokenName}_open`, tag, 1);
      openToken.map = [startLine, closingLine];

      // Parse inner content as block-level markdown
      state.md.block.tokenize(state, startLine + 1, closingLine);

      // Create closing token
      state.push(`${tokenName}_close`, tag, -1);

      state.line = closingLine + 1;
      return true;
    });

    const attrsStr = attrs
      ? ' ' + Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ')
      : '';
    md.renderer.rules[`${tokenName}_open`] =
      () => `<${tag}${attrsStr}>\n`;

    md.renderer.rules[`${tokenName}_close`] =
      () => `</${tag}>\n`;
  });
}
