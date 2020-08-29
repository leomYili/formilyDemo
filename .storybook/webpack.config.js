const path = require("path");
const webpack = require("webpack");
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const theme = require(path.resolve(__dirname, "../src/styles/theme/antdTheme"))
    .default;
// 图标插入
const glob = require("glob");
// 如果需要本地部署图标，需要在此加入本地图标路径，本地部署方式见以下文档
const svgDirs = [];
// 把`antd-mobile/lib`目录下的 svg 文件加入进来，给 svg-sprite-loader 插件处理
glob.sync("node_modules/**/*antd/lib", { dot: true }).forEach((p) => {
    svgDirs.push(new RegExp(p));
});
const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        require.resolve("style-loader"),
        {
            loader: require.resolve("css-loader"),
            options: cssOptions,
        },
        {
            loader: require.resolve("postcss-loader"),
            options: {
                ident: "postcss",
                plugins: () => [
                    require("postcss-flexbugs-fixes"),
                    require("postcss-preset-env")({
                        autoprefixer: {
                            flexbox: "no-2009",
                        },
                        stage: 3,
                    }),
                ],
            },
        },
    ];
    if (preProcessor) {
        loaders.push(require.resolve(preProcessor));
    }
    return loaders;
};

const defaultConfig = {
    plugins: [
        // your custom plugins
    ],
    module: {
        rules: [
            {
                test: cssRegex,
                include: path.resolve(__dirname, "../"),
                exclude: cssModuleRegex,
                use: getStyleLoaders({ importLoaders: 1 }),
            },
            {
                test: cssRegex,
                exclude: [path.resolve(__dirname, "../"), cssModuleRegex],
                use: getStyleLoaders({
                    importLoaders: 1,
                    modules: true,
                }),
            },
            {
                test: cssModuleRegex,
                use: getStyleLoaders({
                    importLoaders: 1,
                    modules: true,
                }),
            },
            {
                test: sassRegex,
                exclude: sassModuleRegex,
                use: [
                    ...getStyleLoaders({
                        modules: true,
                        importLoaders: 1,
                        sourceMap: true,
                    }),
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        },
                    },
                    {
                        loader: "@epegzz/sass-vars-loader",
                        options: {
                            syntax: "scss",
                            files: [
                                path.resolve(
                                    __dirname,
                                    "../src/styles/color/index.js"
                                ),
                            ],
                        },
                    },
                ],
            },
            // less处理
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true,
                            modifyVars: theme,
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: "svg-sprite-loader",
                include: svgDirs,
            },
            {
                test: /\.stories\.jsx?$/,
                loaders: [require.resolve("@storybook/source-loader")],
                enforce: "pre",
            },
        ],
    },
};

module.exports = async ({ config, mode }) => {
    config.node = { fs: "empty" };
    config.module.rules = config.module.rules.filter(
        ({ test }) => !test.test("a.css")
    );
    config.module.rules = [
        ...defaultConfig.module.rules,
        ...config.module.rules,
    ];
    config.plugins = [...config.plugins];
    return config;
};
