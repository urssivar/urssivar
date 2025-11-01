import type { MarkdownOptions } from "vitepress";
import anchor from "markdown-it-anchor";
// @ts-expect-error - markdown-it-mark has no type definitions
import mark from "markdown-it-mark";
import multimdTable from "markdown-it-multimd-table";

import numbering from "./plugins/numbering";
import inlineDelimiters from "./plugins/inline-delimiters";
import blockDelimiters from "./plugins/block-delimiters";

export default <MarkdownOptions>{
  anchor: {
    level: [1, 2, 3, 4],
    permalink: anchor.permalink.linkInsideHeader({
      symbol: '§'
    })
  },
  config: (md) => {
    md.use(mark);
    md.use(multimdTable, {
      multibody: false,
      autolabel: false,
    });

    md.use(numbering, {
      levels: [2, 3, 4]
    });

    md.use(inlineDelimiters, [
      {
        delimiter: '++',
        tokenName: 'kaitag',
        tag: 'span',
        attrs: { lang: 'xdq' }
      },
      {
        delimiter: '--',
        tokenName: 'gloss',
        tag: 'span',
        attrs: { class: 'gloss' }
      }
    ]);

    md.use(blockDelimiters, [
      {
        delimiter: ':::',
        tokenName: 'colon_container',
        tag: 'div',
        attrs: { class: 'colon-block' }
      }
    ]);
  },
};
