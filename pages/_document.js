import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Set meta description */}
                <meta
                    name="description"
                    content="Discover GooAdmin, your reliable source for top-quality software development and education services. Trust our professional team to serve you with dedication and excellence. Explore our offerings today."
                />

                {/* Set Open Graph meta tags for social sharing */}
                <meta property="og:title" content="Top-Quality Software Development and Education Services | GooAdmin" />
                <meta
                    property="og:description"
                    content="Discover GooAdmin, your reliable source for top-quality software development and education services. Trust our professional team to serve you with dedication and excellence. Explore our offerings today."
                />
                <meta property="og:url" content="https://gooadmin.com/" />

                {/* Set explicit Open Graph image */}
                <meta property="og:image" content="/programming.png" />
                <meta property="og:image:secure_url" content="/programming.png" />

                {/* Set favicon */}
                <link rel="icon" type="image/x-icon" href="/favicon.png" />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    );
}
