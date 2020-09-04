import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/core';
import { IRootState, makeStore } from '@web/reducers';
import { IBasePageProps } from '@web/types/base';
// import { globalStyles } from '@web/styles';
import { isDebug } from '@web/utilities/is';
import { NextComponentType } from 'next';
import { createWrapper } from 'next-redux-wrapper';
import App, { AppContext, AppInitialProps, AppProps, NextWebVitalsMetric } from 'next/app';
import 'normalize.css';
import React from 'react';
import { AnyAction } from 'redux';
import stylisRtl from 'stylis-rtl';

export interface IMyAppProps extends IBasePageProps {
    isRTL: boolean;
}

const MyApp: NextComponentType<AppContext, AppInitialProps, IMyAppProps & AppProps> = ({
    Component,
    pageProps,
    isRTL,
    baseObject,
}) => {
    return (
        <CacheProvider
            value={createCache({
                stylisPlugins: isRTL ? [stylisRtl] : [],
            })}
        >
            {/*  {globalStyles} */}
            <Component {...pageProps} baseObject={baseObject} />
        </CacheProvider>
    );
};

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);
    const myAppProps: IMyAppProps = {
        isRTL: false,
        baseObject: { isFromBase: true },
    };
    return { ...appProps, ...myAppProps };
};

const wrapper = createWrapper<IRootState, AnyAction>(makeStore, {
    debug: isDebug(),
});

export function reportWebVitals(metric: NextWebVitalsMetric): void {
    console.log(metric);
}

export default wrapper.withRedux(MyApp);
