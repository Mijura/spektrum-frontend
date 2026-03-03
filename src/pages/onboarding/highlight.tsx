import { Highlight, themes } from "prism-react-renderer"

export default function HighlightComponent({ code, language }: { code: string, language: string }) {
    return (
        <Highlight code={code} language="javascript" theme={themes.nightOwl}>
            {({ tokens, getLineProps, getTokenProps }) => (
                <pre style={{ display: "table", width: "100%" }}>
                {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })} style={{ display: "table-row" }}>
                    <span style={{
                        display: "table-cell",
                        textAlign: "right",
                        paddingRight: "1.5rem",
                        userSelect: "none",
                        opacity: 0.4,
                        width: "1%",
                        whiteSpace: "nowrap",
                        fontSize: "0.85em"
                    }}>
                        {i + 1}
                    </span>
                    <span style={{ display: "table-cell" }}>
                        {line.map((token, j) => (
                        <span key={j} {...getTokenProps({ token })} />
                        ))}
                    </span>
                    </div>
                ))}
                </pre>
            )}
        </Highlight>
    )
}