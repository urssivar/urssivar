// md-span-syntax.ts
import MarkdownIt from 'markdown-it';
import MdMTables from "markdown-it-multimd-table";
import Token from 'markdown-it/lib/token.mjs';

type spanRule = {
    markerChar: string;
    name: string;
    attrs: string;
};

export default function (md: MarkdownIt) {
    md.use(MdMTables, {
        rowspan: true,
    });

    const spans: spanRule[] = [
        {
            markerChar: '+',
            name: 'kaitag',
            attrs: 'lang="xdq"',
        },
        {
            markerChar: '-',
            name: 'gloss',
            attrs: 'class="gloss"',
        },
        {
            markerChar: '=',
            name: 'highlight',
            attrs: 'class="highlight"',
        }
    ];
    for (const span of spans) {
        registerSpanRule(md, span);
        md.renderer.rules[`${span.name}_open`] =
            () => `<span ${span.attrs}>`;
        md.renderer.rules[`${span.name}_close`] =
            () => '</span>';
    }
}

function registerSpanRule(md: MarkdownIt, rule: spanRule) {
    const { markerChar, name: ruleName } = rule;
    const markerCode = markerChar.charCodeAt(0);
    const fullMarker = markerChar + markerChar;

    md.inline.ruler.before('emphasis', ruleName, (state, silent) => {
        const src = state.src;
        const pos = state.pos;

        // quick bounds check (need at least two chars for opening)
        if (pos + 1 >= src.length) return false;

        // must start with double marker
        if (src.charCodeAt(pos) !== markerCode || src.charCodeAt(pos + 1) !== markerCode) {
            return false;
        }

        // find the closing double marker
        const startInner = pos + 2;
        const end = src.indexOf(fullMarker, startInner);
        if (end === -1) return false;

        // If silent, just report that we can tokenize here.
        if (silent) return true;

        // Push open token
        const open = state.push(`${ruleName}_open`, 'span', 1);
        open.markup = fullMarker;

        // Parse inner as inline markdown into temp tokens, then append them to state.tokens.
        const tempTokens: Token[] = [];
        // md.inline.parse accepts: (src, md, env, outTokens)
        // For `env` use state.env so inline rules can access same env
        state.md.inline.parse(src.slice(startInner, end), state.md, state.env, tempTokens);
        // Append parsed tokens
        for (const t of tempTokens) {
            // push them directly into the current inline token stream
            state.tokens.push(t);
        }

        // Push close token
        const close = state.push(`${ruleName}_close`, 'span', -1);
        close.markup = fullMarker;

        // advance pos
        state.pos = end + 2;
        return true;
    });
}
