import { Html, Head, Main, NextScript } from 'next/document'

export default Document;

function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* eslint-disable-next-line @next/next/no-css-tags */}
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" />
            </Head>

            <body>
                <Main />
                <NextScript />

                {/* credits */}
                <div className="text-center mt-4">
                    <p>
                        <a href="http://github.com/alexis-opolka/Mon-Banzaii/tree/alexis/client-auth" target='_blank'>See the GitHub Repository</a>
                    </p>
                    <p>
                        <a href="http://alexis-opolka.github.io" target="_blank">alexis-opolka.github.io</a>
                    </p>
                </div>
            </body>
        </Html>
    );
}
