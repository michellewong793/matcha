// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en"> {/* Set the language attribute for accessibility */}
        <Head>
          {/* Link to Google Fonts */}
          <link
            href="https://fonts.googleapis.com/css?family=Spartan:400,400i,700&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
            rel="stylesheet"
          />
          {/* Inline styles */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
                body {
                  background-color: #3C5642;
                  margin: 0;
                  padding: 0;
                  font-family: 'Inter', sans-serif;
                }
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;