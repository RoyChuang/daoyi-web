import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en" translate='no' suppressHydrationWarning>
                <Head />
                <body className='bg-slate-100 dark:bg-slate-900 transition-all'>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;