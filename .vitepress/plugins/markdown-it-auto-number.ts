import type MarkdownIt from 'markdown-it';
import type { MarkdownItEnv } from '@mdit-vue/types';

interface HeaderCounters {
  h2: number;
  h3: number;
  h4: number;
}

export default function(md: MarkdownIt) {
  const originalHeadingOpen = md.renderer.rules.heading_open;

  md.renderer.rules.heading_open = (
    tokens, idx, options, env: MarkdownItEnv, self
  ) => {
    const token = tokens[idx];
    const level = parseInt(token.tag.substring(1));

    // Only auto-number h2-h4 when frontmatter.numbered is true
    if (!env.frontmatter?.numbered || level < 2 || level > 4) {
      return originalHeadingOpen
        ? originalHeadingOpen(tokens, idx, options, env, self)
        : self.renderToken(tokens, idx, options);
    }

    // Initialize counters
    if (!env.headerCounters) {
      env.headerCounters = { h2: 0, h3: 0, h4: 0 } as HeaderCounters;
    }

    const counters = env.headerCounters as HeaderCounters;

    // Update counters
    if (level === 2) {
      counters.h2++;
      counters.h3 = 0;
      counters.h4 = 0;
    } else if (level === 3) {
      counters.h3++;
      counters.h4 = 0;
    } else if (level === 4) {
      counters.h4++;
    }

    // Generate number
    const number = level === 2 ? `${counters.h2}`
      : level === 3 ? `${counters.h2}.${counters.h3}`
        : `${counters.h2}.${counters.h3}.${counters.h4}`;

    // Prepend number to heading text using HTML tokens
    const inlineToken = tokens[idx + 1];
    if (inlineToken?.type === 'inline' && inlineToken.children) {
      const Token = tokens[0].constructor;

      // Create HTML tokens for the span
      const openSpan = new Token('html_inline', '', 0);
      openSpan.content = '<span class="header-number">';

      const numberText = new Token('text', '', 0);
      numberText.content = number;

      const closeSpan = new Token('html_inline', '', 0);
      closeSpan.content = '</span>';

      // Prepend the tokens
      inlineToken.children.unshift(openSpan, numberText, closeSpan);
    }

    // Set anchor ID
    token.attrSet('id', number);

    return originalHeadingOpen
      ? originalHeadingOpen(tokens, idx, options, env, self)
      : self.renderToken(tokens, idx, options);
  };
}
