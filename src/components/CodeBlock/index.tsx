
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import { combineClasses } from "../../utils/utils";
import classes from './style.module.scss';

const CodeBlock = ({ code, className }: { code: string, className?: string }) => {
    return (
        <div className={combineClasses("bg-blue-500 md:p-5 p-2", className)}>
            <div className="shadow-lg">
                <Highlight {...defaultProps} theme={theme} code={code} language="tsx">
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                        <pre className={combineClasses(classes.pre, className)} style={style}>
                            {tokens.map((line, i) => (
                                <div {...getLineProps({ line, key: i })} key={Math.random()}>
                                    {line.map((token, key) => (
                                        <span {...getTokenProps({ token, key })} key={Math.random()} />
                                    ))}
                                </div>
                            ))}
                        </pre>
                    )}
                </Highlight>
            </div>
        </div>
    )
}

export default CodeBlock
