import type MarkdownIt from 'markdown-it';
import type StateInline from 'markdown-it/lib/rules_inline/state_inline.mjs';

interface DelimiterConfig {
  marker: string;
  tokenName: string;
  tag: string;
  attrs?: Record<string, string>;
}

function createDelimiterPlugin(config: DelimiterConfig) {
  const { marker, tokenName, tag, attrs } = config;
  const markerCode = marker.charCodeAt(0);
  const markerLen = marker.length;

  return function (md: MarkdownIt) {
    function tokenize(state: StateInline, silent: boolean) {
      const start = state.pos;
      const src = state.src;

      if (silent) return false;
      if (!src.startsWith(marker, start)) return false;

      const scanned = state.scanDelims(start, true);
      let len = scanned.length;

      if (len < markerLen) return false;

      // Handle odd-length sequences
      if (len % markerLen) {
        const token = state.push('text', '', 0);
        token.content = marker.slice(0, len % markerLen);
        len -= len % markerLen;
      }

      for (let i = 0; i < len; i += markerLen) {
        const token = state.push('text', '', 0);
        token.content = marker;

        if (!scanned.can_open && !scanned.can_close) continue;

        state.delimiters.push({
          marker: markerCode,
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

        if (startDelim.marker !== markerCode) continue;
        if (startDelim.end === -1) continue;

        const endDelim = delimiters[startDelim.end];

        const token_o = state.tokens[startDelim.token];
        token_o.type = `${tokenName}_open`;
        token_o.tag = tag;
        token_o.nesting = 1;
        token_o.markup = marker;
        token_o.content = '';

        const token_c = state.tokens[endDelim.token];
        token_c.type = `${tokenName}_close`;
        token_c.tag = tag;
        token_c.nesting = -1;
        token_c.markup = marker;
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
    marker: '++',
    tokenName: 'kaitag',
    tag: 'span',
    attrs: { lang: 'xdq' }
  }));

  md.use(createDelimiterPlugin({
    marker: '--',
    tokenName: 'gloss',
    tag: 'span',
    attrs: { class: 'gloss' }
  }));
}
