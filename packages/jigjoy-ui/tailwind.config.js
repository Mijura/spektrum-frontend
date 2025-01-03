const colors = {
    surface1: '#151515',
    surface2: '#252525',
    surface3: '#2F2F2F',
    clickable: '#999999',
    base: '#808080',
    disabled: '#4D4D4D',
    outline: '#4D4D4D',
    hover: '#E5FD78',
    selected: '#E1CFF8'
}

module.exports = {
    content: ['./src/**/*.{html,js,ts,jsx,tsx}'], // Adjust paths to match your project structure
    theme: {
        extend: {
            colors: {
                surface1: colors.surface1,
                surface2: colors.surface2,
                surface3: colors.surface3,
                clickable: colors.clickable,
                base: colors.base,
                disabled: colors.disabled,
                outline: colors.outline,
                hover: colors.hover,
                selected: colors.selected,
                error: colors.error,
                errorSurface: colors.errorSurface
            },
            fontFamily: {
                body: [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica',
                    'Arial',
                    'sans-serif',
                    'Apple Color Emoji',
                    'Segoe UI Emoji',
                    'Segoe UI Symbol'
                ],
                mono: [
                    'Fira Mono',
                    'DejaVu Sans Mono',
                    'Menlo',
                    'Consolas',
                    'Liberation Mono',
                    'Monaco',
                    'Lucida Console',
                    'monospace'
                ]
            },
            fontSize: {
                body: '13px'
            },
            lineHeight: {
                body: '20px'
            },
            syntax: {
                plain: '#f0fdaf',
                comment: '#757575',
                keyword: '#e5fd78',
                tag: '#f0fdaf',
                punctuation: '#ffffff',
                definition: '#eeeeee',
                property: '#90e86f',
                static: '#ffffff',
                string: '#dafecf'
            }
        }
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities({
                '.italic-comment': {
                    fontStyle: 'italic',
                    color: '#757575'
                }
            })
        }
    ]
}
