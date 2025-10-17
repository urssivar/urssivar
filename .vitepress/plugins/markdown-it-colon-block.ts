import type MarkdownIt from 'markdown-it';

const DELIMITER = ':::';

export default function (md: MarkdownIt) {
    md.block.ruler.before('fence', 'colon_container', (state, startLine, endLine, silent) => {
        const lineStart = state.bMarks[startLine] + state.tShift[startLine];
        const lineEnd = state.eMarks[startLine];
        const openingMarker = state.src.slice(lineStart, lineEnd).trim();

        // Must start with exactly 3 colons
        if (openingMarker !== DELIMITER) return false;
        if (silent) return true;

        // Search for closing delimiter
        let closingLine = startLine;
        while (++closingLine < endLine) {
            const line = state.src.slice(
                state.bMarks[closingLine] + state.tShift[closingLine],
                state.eMarks[closingLine]
            ).trim();
            if (line === DELIMITER) break;
        }

        // Closing delimiter not found
        if (closingLine >= endLine) return false;

        // Create opening token
        const openToken = state.push('colon_container_open', 'div', 1);
        openToken.map = [startLine, closingLine];

        // Parse inner content as block-level markdown
        state.md.block.tokenize(state, startLine + 1, closingLine);

        // Create closing token
        state.push('colon_container_close', 'div', -1);

        state.line = closingLine + 1;
        return true;
    });

    // Render opening tag
    md.renderer.rules.colon_container_open = () => '<div class="colon-block">\n';

    // Render closing tag
    md.renderer.rules.colon_container_close = () => '</div>\n';
}
