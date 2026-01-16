import type { MarkdownOptions } from "vitepress";
import anchor from "markdown-it-anchor";
import multimdTable from "markdown-it-multimd-table";

import numbering from "./plugins/numbering";
import kaitagGlossShortcut from "./plugins/kaitag-gloss-shortcut";
import inlineRules from "./plugins/inline-rules";
import breakouts from "./plugins/breakout";

export default <MarkdownOptions>{
  anchor: {
    level: [1, 2, 3, 4],
    permalink: anchor.permalink.linkInsideHeader({
      symbol: '§',
      renderAttrs: () => ({ 'data-pagefind-ignore': '' })
    })
  },
  config: (md) => {
    md.use(multimdTable, {
      multibody: false,
      autolabel: false,
    });

    md.use(numbering, {
      levels: [2, 3, 4]
    });

    md.use(kaitagGlossShortcut);
    md.use(inlineRules, [
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
      },
      {
        delimiter: '==',
        tokenName: 'highlight',
        tag: 'mark'
      }
    ]);
    md.use(breakouts);
  },
};
