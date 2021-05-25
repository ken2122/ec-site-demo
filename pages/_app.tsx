import { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../src/assets/styles/reset.css';
import { Provider } from 'react-redux';
import { useStore } from '../src/redux/store/store';
import { ConnectedRouter } from 'connected-next-router';
import Auth from '../src/Auth';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../src/assets/theme';
import { Header } from '../src/components/Header/index';
import styles from '../src/assets/styles/style.module.css';
import { PageProps } from '../types/index';
import NextNprogress from 'nextjs-progressbar';

type AppPageProps = Omit<AppProps<PageProps>, 'pageProps'> & {
    pageProps: PageProps;
};

export default function App({
    Component,
    pageProps,
}: AppPageProps): JSX.Element {
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    const store = useStore();

    return (
        <Provider store={store}>
            <Auth>
                <ConnectedRouter>
                    <React.Fragment>
                        <Head>
                            <title>デモECサイト</title>
                            <meta
                                name="viewport"
                                content="minimum-scale=1, initial-scale=1, width=device-width"
                            />
                        </Head>
                        <ThemeProvider theme={theme}>
                            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                            <CssBaseline />
                            <NextNprogress
                                options={{
                                    easing: 'ease',
                                    speed: 50,
                                    minimum: 0.25,
                                }}
                            />
                            <Header />
                            <main className={styles.cMain}>
                                <Component {...pageProps} />
                            </main>
                        </ThemeProvider>
                    </React.Fragment>
                </ConnectedRouter>
            </Auth>
        </Provider>
    );
}
