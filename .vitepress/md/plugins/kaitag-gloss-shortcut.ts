import type MarkdownIt from 'markdown-it';
import type StateInline from 'markdown-it/lib/rules_inline/state_inline.mjs';

export default function kaitagGlossShortcut(md: MarkdownIt) {
  function tokenize(state: StateInline, silent: boolean) {
    const start = state.pos;
    const src = state.src;

    // Must start with ++
    if (!src.startsWith('++', start)) return false;

    // Find closing ++
    const end = src.indexOf('++', start + 2);
    if (end === -1) return false;

    // Extract content between delimiters
    const content = src.slice(start + 2, end);

    // Must contain exactly one colon
    const parts = content.split(':');
    if (parts.length !== 2) return false;

    const [kaitag, gloss] = parts;

    // Both parts must have content
    if (!kaitag.trim() || !gloss.trim()) return false;

    // If we're in silent mode (checking if pattern matches), return true
    if (silent) return true;

    // Emit kaitag span
    let token = state.push('kaitag_open', 'span', 1);
    token.attrSet('lang', 'xdq');

    token = state.push('text', '', 0);
    token.content = kaitag;

    state.push('kaitag_close', 'span', -1);

    // Emit space
    token = state.push('text', '', 0);
    token.content = ' ';

    // Emit gloss span with quotes
    token = state.push('gloss_open', 'span', 1);
    token.attrSet('class', 'gloss');

    token = state.push('text', '', 0);
    token.content = `"${gloss}"`;

    state.push('gloss_close', 'span', -1);

    // Move position past the closing ++
    state.pos = end + 2;

    return true;
  }

  md.inline.ruler.before('emphasis', 'kaitag_gloss_shortcut', tokenize);
}
