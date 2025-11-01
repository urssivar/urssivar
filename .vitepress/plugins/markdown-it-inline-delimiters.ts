import type MarkdownIt from 'markdown-it';
import type StateInline from 'markdown-it/lib/rules_inline/state_inline.mjs';
import type { DelimiterPluginConfig } from './types';

function createDelimiterPlugin(config: DelimiterPluginConfig) {
  const { delimiter, tokenName, tag, attrs } = config;
  const delimiterCode = delimiter.charCodeAt(0);
  const delimiterLen = delimiter.length;

  return function (md: MarkdownIt) {
    function tokenize(state: StateInline, silent: boolean) {
      const start = state.pos;
      const src = state.src;

      if (silent) return false;
      if (!src.startsWith(delimiter, start)) return false;

      const scanned = state.scanDelims(start, true);
      let len = scanned.length;

      if (len < delimiterLen) return false;

      // Handle odd-length sequences
      if (len % delimiterLen) {
        const token = state.push('text', '', 0);
        token.content = delimiter.slice(0, len % delimiterLen);
        len -= len % delimiterLen;
      }

      for (let i = 0; i < len; i += delimiterLen) {
        const token = state.push('text', '', 0);
        token.content = delimiter;

        if (!scanned.can_open && !scanned.can_close) continue;

        state.delimiters.push({
          marker: delimiterCode,
          length: 0,
          token: state.tokens.length - 1,
          end: -1,
          open: scanned.can_open,
          close: scanned.can_close
        } as any);
      }

      state.pos += scanned.length;
      return true;
    }

    function postProcess(state: StateInline, delimiters: any[]) {
      const max = delimiters.length;

      for (let i = 0; i < max; i++) {
        const startDelim = delimiters[i];

        if (startDelim.marker !== delimiterCode) continue;
        if (startDelim.end === -1) continue;

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
    md.renderer.rules[`${tokenName}_open`] = () => `<${tag}${attrsStr ? ' ' + attrsStr : ''}>`;
    md.renderer.rules[`${tokenName}_close`] = () => `</${tag}>`;

    md.inline.ruler.before('emphasis', tokenName, tokenize);
    md.inline.ruler2.before('emphasis', tokenName, function (state) {
      const tokens_meta = state.tokens_meta;
      const max = (tokens_meta || []).length;

      postProcess(state, state.delimiters);

      for (let curr = 0; curr < max; curr++) {
        if (tokens_meta && tokens_meta[curr]?.delimiters) {
          postProcess(state, tokens_meta[curr].delimiters);
        }
      }
      return false;
    });
  };
}

export default function (md: MarkdownIt) {
  md.use(createDelimiterPlugin({
    delimiter: '++',
    tokenName: 'kaitag',
    tag: 'span',
    attrs: { lang: 'xdq' }
  }));

  md.use(createDelimiterPlugin({
    delimiter: '--',
    tokenName: 'gloss',
    tag: 'span',
    attrs: { class: 'gloss' }
  }));
}
