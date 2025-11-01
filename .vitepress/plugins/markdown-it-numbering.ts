import type MarkdownIt from 'markdown-it';

interface NumberingConfig {
  levels: number[];
}

function createNumberingPlugin(config: NumberingConfig) {
  const { levels } = config;

  return function (md: MarkdownIt) {
    const originalHeadingOpen = md.renderer.rules.heading_open;

    md.renderer.rules.heading_open = (
      tokens, idx, options, env, self
    ) => {
      const token = tokens[idx];
      const li = levels.indexOf(+token.tag.charAt(1));

      if (env.frontmatter?.numbered && li >= 0) {
        if (!env._headingCounters) {
          env._headingCounters = Object.fromEntries(levels.map((l) => [l, 0]));
        }
        const counter = env._headingCounters as Record<number, number>;

        counter[levels[li]]++;
        for (let i = li + 1; i < levels.length; i++) {
          counter[levels[i]] = 0;
        }

        const numbering = [];
        for (let i = 0; i <= li; i++) {
          numbering.push(counter[levels[i]]);
        }
        token.attrSet('data-numbering', numbering.join('.'));
      }

      return originalHeadingOpen
        ? originalHeadingOpen(tokens, idx, options, env, self)
        : self.renderToken(tokens, idx, options);
    };
  };
}

export default function (md: MarkdownIt) {
  md.use(createNumberingPlugin({ levels: [2, 3, 4] }));
}
