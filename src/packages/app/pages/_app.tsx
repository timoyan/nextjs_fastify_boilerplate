import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/core';
import { IRootState, makeStore } from '@web/reducers';
// import { globalStyles } from '@web/styles';
import { isDebug } from '@web/utilities/is';
import { NextComponentType } from 'next';
import { createWrapper } from 'next-redux-wrapper';
import App, { AppContext, AppInitialProps, AppProps, NextWebVitalsMetric } from 'next/app';
import 'normalize.css';
import React from 'react';
import { AnyAction } from 'redux';
import stylisRtl from 'stylis-rtl';

export interface IMyAppProps extends AppProps {
    isRTL: boolean;
}

const MyApp: NextComponentType<AppContext, AppInitialProps, IMyAppProps> = ({
    Component,
    pageProps,
    isRTL,
}) => {
    return (
        <CacheProvider
            value={createCache({
                stylisPlugins: isRTL ? [stylisRtl] : [],
            })}
        >
            {/*  {globalStyles} */}
            <Component {...pageProps} />
        </CacheProvider>
    );
};

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);
    const isRTL = true;
    return { ...appProps, isRTL };
};

const wrapper = createWrapper<IRootState, AnyAction>(makeStore, {
    debug: isDebug(),
});

export function reportWebVitals(metric: NextWebVitalsMetric): void {
    console.log(metric);
}

export default wrapper.withRedux(MyApp);
