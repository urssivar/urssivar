import type MarkdownIt from 'markdown-it';
import type { MarkdownItEnv } from '@mdit-vue/types';

interface ExtendedEnv extends MarkdownItEnv {
  _headingCounters?: {
    h2: number;
    h3: number;
    h4: number;
  };
}

/**
 * Markdown-it plugin that adds header numbering as data attributes.
 * Computes actual numbers (e.g., "1.2") during markdown compilation
 * and stores them in data-numbering attribute for CSS and JS to read.
 *
 * This is the single source of truth for header numbering.
 */
export default function (md: MarkdownIt) {
  const originalHeadingOpen = md.renderer.rules.heading_open;

  md.renderer.rules.heading_open = (
    tokens, idx, options, env: ExtendedEnv, self
  ) => {
    const token = tokens[idx];
    const level = parseInt(token.tag.substring(1));

    // Reset counters at h1 (page title)
    if (level === 1) {
      env._headingCounters = { h2: 0, h3: 0, h4: 0 };
    }

    // Compute and add numbering for h2-h4 when frontmatter.numbered is true
    if (env.frontmatter?.numbered && level >= 2 && level <= 4) {
      // Initialize counters if not present
      if (!env._headingCounters) {
        env._headingCounters = { h2: 0, h3: 0, h4: 0 };
      }

      const counters = env._headingCounters;
      let numbering: number[] = [];

      if (level === 2) {
        counters.h2++;
        counters.h3 = 0;
        counters.h4 = 0;
        numbering = [counters.h2];
      } else if (level === 3) {
        counters.h3++;
        counters.h4 = 0;
        numbering = [counters.h2, counters.h3];
      } else if (level === 4) {
        counters.h4++;
        numbering = [counters.h2, counters.h3, counters.h4];
      }

      // Store computed number as data-numbering attribute
      token.attrSet('data-numbering', numbering.join('.'));
    }

    return originalHeadingOpen
      ? originalHeadingOpen(tokens, idx, options, env, self)
      : self.renderToken(tokens, idx, options);
  };
}
