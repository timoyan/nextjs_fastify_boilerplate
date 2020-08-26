import { CacheProvider } from '@emotion/core';
import { IRootState, makeStore } from '@web/reducers';
// import { globalStyles } from '@web/styles';
import { isDebug } from '@web/utilities/is';
import { cache } from 'emotion';
import { NextComponentType } from 'next';
import { createWrapper } from 'next-redux-wrapper';
import { AppContext, AppInitialProps, AppProps, NextWebVitalsMetric } from 'next/app';
import 'normalize.css';
import React from 'react';
import { AnyAction } from 'redux';

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
    Component,
    pageProps,
}) => {
    return (
        <CacheProvider value={cache}>
            {/*  {globalStyles} */}
            <Component {...pageProps} />
        </CacheProvider>
    );
};

const wrapper = createWrapper<IRootState, AnyAction>(makeStore, {
    debug: isDebug(),
});

export function reportWebVitals(metric: NextWebVitalsMetric): void {
    console.log(metric);
}

export default wrapper.withRedux(MyApp);
