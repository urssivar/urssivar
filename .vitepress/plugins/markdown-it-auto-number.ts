import type MarkdownIt from 'markdown-it';
import type { MarkdownItEnv } from '@mdit-vue/types';

export default function (md: MarkdownIt) {
  const originalHeadingOpen = md.renderer.rules.heading_open;

  md.renderer.rules.heading_open = (
    tokens, idx, options, env: MarkdownItEnv, self
  ) => {
    const token = tokens[idx];
    const level = parseInt(token.tag.substring(1));

    // Add data-numbered attribute to h2-h4 when frontmatter.numbered is true
    if (env.frontmatter?.numbered && level >= 2 && level <= 4) {
      token.attrSet('data-numbered', 'true');
    }

    return originalHeadingOpen
      ? originalHeadingOpen(tokens, idx, options, env, self)
      : self.renderToken(tokens, idx, options);
  };
}
