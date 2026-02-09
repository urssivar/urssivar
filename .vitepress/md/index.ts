import type { MarkdownOptions } from "vitepress";
import anchor from "markdown-it-anchor";
import multimdTable from "markdown-it-multimd-table";
import mark from "markdown-it-mark";

import numbering from "./plugins/numbering";
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

    md.use(mark);
    md.use(breakouts);
  },
};
