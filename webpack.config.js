const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

const bannerPack = new webpack.BannerPlugin({
    banner: [
        `Quill Smart Break v${pkg.version}`,
        'https://github.com/simialbi/quill-smart-break',
        'Copyright (c) 2017, Ahad Birang',
        'Copyright (c) 2017, Mike Ackerman',
        'Copyright (c) 2020, Simon Karlen'
    ].join('\n'),
    entryOnly: true
});
const constantPack = new webpack.DefinePlugin({
    QUILL_SMART_BREAK_VERSION: JSON.stringify(pkg.version)
});

const source = [
    'smart-breaker.js',
    'blots'
].map(file => {
    return path.resolve(__dirname, 'src', file);
});

const jsRules = {
    test: /\.js$/,
    include: source,
    use: [
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        '@babel/env',
                        {
                            targets: {
                                browsers: [
                                    'last 2 Chrome major versions',
                                    'last 2 Firefox major versions',
                                    'last 2 Safari major versions',
                                    'last 2 Edge major versions',
                                    'last 2 iOS major versions',
                                    'last 2 ChromeAndroid major versions',
                                ]
                            }
                        }
                    ]
                ]
            }
        }
    ]
};

const baseConfig = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {
        'smart-breaker.js': './smart-breaker.js'
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'dist')
    },
    externals: {
        quill: 'Quill'
    },
    module: {
        rules: [jsRules],
        // noParse: []
    },
    plugins: [
        bannerPack,
        constantPack
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: false,
        port: process.env.npm_package_config_ports_webpack,
        stats: 'minimal',
        disableHostCheck: true
    }
};

module.exports = env => {
    if (env && env.minimize) {
        const { devServer, ...prodConfig } = baseConfig;

        return {
            ...prodConfig,
            mode: 'production',
            entry: { 'smart-breaker.min.js': './smart-breaker.js' },
            devtool: 'source-map'
        };
    }
    if (env && env.coverage) {
        baseConfig.module.rules[0].use[0].options.plugins = ['istanbul'];

        return baseConfig;
    }

    return baseConfig;
};