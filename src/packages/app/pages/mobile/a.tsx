import { PlatformType } from '@web/types/base';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

interface IDemoProps {
    platform: PlatformType;
    userAgent: string;
    chUAMobile: string;
}

const Demo: NextPage<IDemoProps> = ({ platform, userAgent, chUAMobile }) => {
    return (
        <>
            <Head>
                <title>Mobile A</title>
            </Head>
            <p>HI This is {platform} </p>
            <p>User Agent is {userAgent}</p>
            <p>Client Hint ua-mobile is {chUAMobile}</p>
        </>
    );
};

Demo.displayName = 'Demo';

export const getServerSideProps: GetServerSideProps<IDemoProps> = async (context) => {
    return {
        props: {
            platform: 'MOBILE',
            userAgent: context.req.headers['user-agent']?.toString() || '',
            chUAMobile: context.req.headers['sec-ch-ua-mobile']?.toString() || '',
        },
    };
};

export default Demo;
