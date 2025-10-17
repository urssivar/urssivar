import type MarkdownIt from 'markdown-it';

export default function (md: MarkdownIt) {
    md.block.ruler.before('fence', 'colon_container', (state, startLine, endLine, silent) => {
        const startPos = state.bMarks[startLine] + state.tShift[startLine]
        const maxPos = state.eMarks[startLine]
        const marker = state.src.slice(startPos, maxPos).trim()

        // Must start with exactly 3 colons
        if (marker !== ':::') return false
        if (silent) return true

        let nextLine = startLine
        // Find closing :::
        while (++nextLine < endLine) {
            const line = state.src.slice(state.bMarks[nextLine] + state.tShift[nextLine], state.eMarks[nextLine]).trim()
            if (line === ':::') break
        }

        if (nextLine >= endLine) return false

        // Open container token
        const openToken = state.push('colon_container_open', 'div', 1)
        openToken.map = [startLine, nextLine]

        // Parse inner content
        state.md.block.tokenize(state, startLine + 1, nextLine)

        // Close container token
        state.push('colon_container_close', 'div', -1)

        state.line = nextLine + 1
        return true
    })

    // Define renderer
    md.renderer.rules.colon_container_open = () => `<div class="colon-block">\n`
    md.renderer.rules.colon_container_close = () => `</div>\n`
}
