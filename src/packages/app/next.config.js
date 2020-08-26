require('dotenv').config();

const nextBuildId = require('next-build-id');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    reactStrictMode: true,
    distDir: '../../../app-dist',
    serverRuntimeConfig: {
        basePath: process.env.BASE_PATH || '456',
    },
    // Fix contenthash of commons chunks differs on different machines https://git.io/JJsVp
    generateBuildId: () => nextBuildId({ dir: __dirname }),
    webpack(config, options) {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                },
            },
        });
        return config;
    },
});
