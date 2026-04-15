import type MarkdownIt from 'markdown-it';

/**
 * Custom block container plugin for markdown-it
 * Syntax: :::classname ... :::
 *
 * Generates: <div class="band classname">...</div>
 *
 * Note: Nested blocks of the same type are not supported.
 * The first closing ::: will match the first opening :::.
 */
export default function blockContainer(md: MarkdownIt) {
  // We only need one rule now because it handles all ::: cases dynamically
  md.block.ruler.before('fence', 'custom_block', (state, startLine, endLine, silent) => {
    const lineStart = state.bMarks[startLine] + state.tShift[startLine];
    const lineEnd = state.eMarks[startLine];
    const text = state.src.slice(lineStart, lineEnd).trim();

    // 1. Must start with :::
    if (!text.startsWith(':::')) return false;

    // 2. Capture everything after ::: as the info string (e.g. "fig {.hidden}")
    //    markdown-it-attrs will later strip any {.attrs} from it automatically.
    const info = text.slice(3).trim();
    if (silent) return true;

    // 3. Search for the closing :::
    let closingLine = startLine;
    let found = false;

    while (++closingLine < endLine) {
      const lineText = state.src.slice(
        state.bMarks[closingLine] + state.tShift[closingLine],
        state.eMarks[closingLine]
      ).trim();

      if (lineText === ':::') {
        found = true;
        break;
      }
    }

    if (!found) return false;

    // 4. Push tokens
    const openToken = state.push('custom_block_open', 'div', 1);
    openToken.map = [startLine, closingLine];
    openToken.info = info;

    // Parse the inner content
    state.md.block.tokenize(state, startLine + 1, closingLine);

    state.push('custom_block_close', 'div', -1);

    state.line = closingLine + 1;
    return true;
  });

  // 6. Renderer Logic
  md.renderer.rules['custom_block_open'] = (tokens, idx, _options, _env, self) => {
    const token = tokens[idx];
    const subClass = token.info.trim() ? ` ${token.info.trim()}` : '';
    const extraClass = token.attrGet('class');
    token.attrSet('class', `breakout${subClass}${extraClass ? ' ' + extraClass : ''}`);
    return `<div${self.renderAttrs(token)}>\n`;
  };

  md.renderer.rules['custom_block_close'] = () => `</div>\n`;
}
