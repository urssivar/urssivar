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

    // 2. Extract the "word" immediately following :::
    // Regex matches ::: followed by optional whitespace and then the first word
    const match = text.match(/^:::\s*([a-zA-Z0-9_-]+)?/);
    if (!match) return false;

    const subClass = match[1] || ''; // 'fig', 'quote', etc.
    if (silent) return true;

    // 3. Search for the closing ::: (must be an exact match to avoid confusion)
    let closingLine = startLine;
    let found = false;

    while (++closingLine < endLine) {
      const lineText = state.src.slice(
        state.bMarks[closingLine] + state.tShift[closingLine],
        state.eMarks[closingLine]
      ).trim();

      if (lineText.trim() === ':::') {
        found = true;
        break;
      }
    }

    if (!found) return false;

    // 4. Push Tokens
    const openToken = state.push('custom_block_open', 'div', 1);
    openToken.map = [startLine, closingLine];
    // Store the subclass on the token so the renderer can see it
    openToken.info = subClass;

    // Parse the inner content
    state.md.block.tokenize(state, startLine + 1, closingLine);

    const closeToken = state.push('custom_block_close', 'div', -1);

    state.line = closingLine + 1;
    return true;
  });

  // 5. Renderer Logic
  md.renderer.rules['custom_block_open'] = (tokens, idx) => {
    const token = tokens[idx];
    const subClass = token.info ? ` ${token.info}` : '';
    return `<div class="breakout${subClass}">\n`;
  };

  md.renderer.rules['custom_block_close'] = () => `</div>\n`;
}
