import type MarkdownIt from 'markdown-it';

const level = [2, 3, 4];

export default function (md: MarkdownIt) {
  const originalHeadingOpen = md.renderer.rules.heading_open;

  md.renderer.rules.heading_open = (
    tokens, idx, options, env, self
  ) => {
    const token = tokens[idx];
    const li = level.indexOf(+token.tag.charAt(1));

    if (env.frontmatter?.numbered && li >= 0) {
      if (!env._headingCounters) {
        env._headingCounters = Object.fromEntries(level.map((l) => [l, 0]));
      }
      const counter = env._headingCounters as Record<number, number>;

      counter[level[li]]++;
      for (let i = li + 1; i < level.length; i++) {
        counter[level[i]] = 0;
      }

      const numbering = [];
      for (let i = 0; i <= li; i++) {
        numbering.push(counter[level[i]]);
      }
      token.attrSet('data-numbering', numbering.join('.'));
    }

    return originalHeadingOpen
      ? originalHeadingOpen(tokens, idx, options, env, self)
      : self.renderToken(tokens, idx, options);
  };
}
