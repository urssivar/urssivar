import type MarkdownIt from 'markdown-it';
import type StateInline from 'markdown-it/lib/rules_inline/state_inline.mjs';

export interface InlineRule {
  delimiter: string;
  tokenName: string;
  tag: string;
  attrs?: Record<string, string>;
}

export default function inlineDelimiters(
  md: MarkdownIt,
  rules: InlineRule[]
) {
  rules.forEach((rule) => {
    const { delimiter, tokenName, tag, attrs } = rule;
    const delimiterCode = delimiter.charCodeAt(0);
    const delimiterLen = delimiter.length;

    function tokenize(state: StateInline, silent: boolean) {
      const start = state.pos;
      const src = state.src;

      if (silent) return false;
      if (!src.startsWith(delimiter, start)) return false;

      // Custom delimiter scanning without punctuation restrictions
      let pos = start;
      let count = 0;

      // Count consecutive delimiter sequences
      while (pos < src.length && src.slice(pos, pos + delimiterLen) === delimiter) {
        count++;
        pos += delimiterLen;
      }

      const len = count * delimiterLen;
      if (len < delimiterLen) return false;

      // Determine can_open and can_close based on adjacent characters
      const charBefore = start > 0 ? src.charCodeAt(start - 1) : 0x20;
      const charAfter = pos < src.length ? src.charCodeAt(pos) : 0x20;

      // Can open if not preceded by same delimiter character
      const can_open = charBefore !== delimiterCode;
      // Can close if not followed by same delimiter character
      const can_close = charAfter !== delimiterCode;

      // Handle odd-length sequences
      let actualLen = len;
      if (len % delimiterLen) {
        const token = state.push('text', '', 0);
        token.content = delimiter.slice(0, len % delimiterLen);
        actualLen -= len % delimiterLen;
      }

      for (let i = 0; i < actualLen; i += delimiterLen) {
        const token = state.push('text', '', 0);
        token.content = delimiter;

        if (!can_open && !can_close) continue;

        state.delimiters.push({
          marker: delimiterCode,
          length: 0,
          token: state.tokens.length - 1,
          end: -1,
          open: can_open,
          close: can_close
        } as any);
      }

      state.pos += len;
      return true;
    }

    function postProcess(state: StateInline, delimiters: any[]) {
      // Phase 1: Match opening and closing delimiters
      for (let closingIdx = delimiters.length - 1; closingIdx >= 0; closingIdx--) {
        const closingDelim = delimiters[closingIdx];

        if (closingDelim.marker !== delimiterCode) continue;
        if (!closingDelim.close) continue;
        if (closingDelim.end !== -1) continue; // Already matched

        // Search backwards for matching opening delimiter
        for (let openingIdx = closingIdx - 1; openingIdx >= 0; openingIdx--) {
          const openingDelim = delimiters[openingIdx];

          if (openingDelim.marker !== delimiterCode) continue;
          if (!openingDelim.open) continue;
          if (openingDelim.end !== -1) continue; // Already matched

          // Found a match - pair them
          openingDelim.end = closingIdx;
          closingDelim.end = openingIdx;
          break;
        }
      }

      // Phase 2: Render matched pairs
      const max = delimiters.length;
      for (let i = 0; i < max; i++) {
        const startDelim = delimiters[i];

        if (startDelim.marker !== delimiterCode) continue;
        if (startDelim.end === -1) continue;
        if (startDelim.end < i) continue; // Only process opening delimiters

        const endDelim = delimiters[startDelim.end];

        const token_o = state.tokens[startDelim.token];
        token_o.type = `${tokenName}_open`;
        token_o.tag = tag;
        token_o.nesting = 1;
        token_o.markup = delimiter;
        token_o.content = '';

        const token_c = state.tokens[endDelim.token];
        token_c.type = `${tokenName}_close`;
        token_c.tag = tag;
        token_c.nesting = -1;
        token_c.markup = delimiter;
        token_c.content = '';
      }
    }

    // Renderer rules
    const attrsStr = attrs
      ? Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ')
      : '';
    md.renderer.rules[`${tokenName}_open`] =
      () => `<${tag}${attrsStr ? ' ' + attrsStr : ''}>`;
    md.renderer.rules[`${tokenName}_close`] =
      () => `</${tag}>`;

    md.inline.ruler.before('emphasis', tokenName, tokenize);
    md.inline.ruler2.before('emphasis', tokenName, function (state) {
      const tokens_meta = state.tokens_meta;
      const max = (tokens_meta || []).length;

      postProcess(state, state.delimiters);

      for (let curr = 0; curr < max; curr++) {
        const delimeters = tokens_meta[curr]?.delimiters;
        if (delimeters) {
          postProcess(state, delimeters);
        }
      }
      return false;
    });
  });
}
