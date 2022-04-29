
import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import App from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';


import '../styles/globals.css'
import { wrapper } from '../redux/store';

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }) {



    return (

        <CacheProvider value={emotionCache}>

            <Head>

                <meta name="viewport" content="initial-scale=1, width=device-width" />

            </Head>

            <ThemeProvider theme={theme}>

                <CssBaseline />

                <Component {...pageProps} />

            </ThemeProvider>

        </CacheProvider>

    )
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};


export default wrapper.withRedux(MyApp);
