module.exports = function (api) {
    api.cache(true);

    const presets = [
        'next/babel',
        ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
        [
            '@emotion/babel-preset-css-prop',
            {
                sourceMap: true,
                autoLabel: process.env.NODE_ENV !== 'production',
                // labelFormat: '[local]',
            },
        ],
    ];

    // const plugins = [['emotion']];
    const plugins = [];

    return {
        presets,
        plugins,
    };
};
