const path = require('path'),
      production = process.env.NODE_ENV === 'production',
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      autoprefixer = require('autoprefixer'),
      precss = require('precss');

const postCSSLoader = {
    loader:  'postcss-loader',
    options: {
        sourceMap: !production,
        plugins: [ precss(), autoprefixer({ browsers: [
            'FireFox 30',
            'Chrome 25',
            'ChromeAndroid 25',
            'Edge 12',
            'Explorer 9',
            'Opera 20',
            'Safari 7',
            'last 5 versions'
        ] }) ]
    }
};

const extractCSS = new ExtractTextPlugin({
    filename: '[name].css'
});

module.exports = {

    mode: production ? 'production' : 'development',

    entry: {
        app: [
            'babel-polyfill', 'whatwg-fetch', 'react', 'prop-types', 'react-dom',
            path.resolve(__dirname, 'src', 'app.js')
        ]
    },

    output: {

        path: path.resolve(__dirname, 'build'),
        filename: 'app.js'

    },

    module: {

        rules: [

            {
                test: /.jsx?$/,
                include: /src/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        'es2015',
                        'babel-preset-react',
                        'babel-preset-stage-0',
                        'babel-preset-stage-2',
                        'babel-preset-stage-3'
                    ]
                }
            },

            {
                test: /\.scss$/,
                oneOf: [
                    {
                        include: /src/,
                        exclude: /node_modules/,
                        use: extractCSS.extract({
                            use: [
                                {
                                    loader: "css-loader",
                                    options: {
                                        modules: true,
                                        sourceMap: production
                                    }
                                },
                                postCSSLoader,
                                {
                                    loader: "sass-loader"
                                }
                            ]
                        })
                    },

                    {
                        include: /node_modules/,
                        use: extractCSS.extract({
                            use: [
                                {
                                    loader: "css-loader",
                                    options:  {
                                        sourceMap: false
                                    }
                                },
                                postCSSLoader,
                                {
                                    loader: "sass-loader"
                                }
                            ]
                        })
                    }
                ]
            },

            {
                test: /\.css$/,
                oneOf: [
                    {
                        include: /src/,
                        exclude: /node_modules/,
                        use: extractCSS.extract({
                            fallback: "style-loader",
                            use: [
                                {
                                    loader: "css-loader",
                                    options:  {
                                        modules: true,
                                        sourceMap: production
                                    }
                                },
                                {
                                    loader: 'resolve-url-loader'
                                },
                                postCSSLoader
                            ]
                        })
                    },

                    {
                        include: /node_modules/,
                        use: extractCSS.extract({
                            fallback: "style-loader",
                            use: [
                                {
                                    loader: "css-loader",
                                    options: {
                                        sourceMap: false
                                    }
                                },
                                {
                                    loader: 'resolve-url-loader'
                                },
                                postCSSLoader
                            ]
                        })
                    }

                ]

            },

            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/'
                        }
                    }
                ]
            },

            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: production ? '[hash].[ext]' : '[name].[ext]',
                        outputPath: 'assets/'
                    }
                }]
            }

        ]

    },

    resolve: {
        symlinks: true,
        modules: [
            path.join(__dirname, "node_modules"),
            path.join(__dirname, "src")
        ],
        extensions: ['.js', '.es6', 'jsx', '.ts', '.webpack.js', '.web.js']
    },

    plugins: [
        new CleanWebpackPlugin(path.resolve(__dirname, 'build')),
        new HtmlWebpackPlugin({
            title: 'Qumodo Draw'
        }),
        extractCSS
    ]

};