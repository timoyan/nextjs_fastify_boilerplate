import { IServerRuntimeConfig } from '@web/types/base';
import { extractCritical } from 'emotion-server';
import getConfig from 'next/config';
import Document, {
    DocumentContext,
    DocumentInitialProps,
    Head,
    Main,
    NextScript,
} from 'next/document';
import React from 'react';

interface IMyDocumentProps {
    isRTL: boolean;
}

class MyDocument extends Document<IMyDocumentProps> {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps & IMyDocumentProps> {
        const initialProps = await Document.getInitialProps(ctx);
        const styles = extractCritical(initialProps.html);
        const isRTL = false;

        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    <style
                        data-emotion-css={styles.ids.join(' ')}
                        dangerouslySetInnerHTML={{ __html: styles.css }}
                    />
                </>
            ),
            isRTL,
        };
    }

    render(): JSX.Element {
        const {
            serverRuntimeConfig,
        }: { serverRuntimeConfig: IServerRuntimeConfig } = getConfig();

        const { isRTL } = this.props;

        return (
            <html lang={'en'} dir={isRTL ? 'rtl' : 'ltr'}>
                <title>Website</title>
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="description" content="Web" />
                    <link rel="icon" type="image/png" href="/images/fastify.png" />
                    <meta
                        httpEquiv="Accept-CH"
                        content="DPR, Width, Viewport-Width, Downlink"
                    ></meta>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}

export default MyDocument;
