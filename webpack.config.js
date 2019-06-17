const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env',
            '@babel/preset-react', {
              'plugins': ['@babel/plugin-proposal-class-properties']
            }]
        }
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader',
          // 'sass-loader'
        ],
        // include: [path.resolve('src')]
      },

      {
        test: /\.(jpe?g|png|gif|svg|mp4)$/i,
        /* Exclude fonts while working with images, e.g. .svg can be both image or font. */
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'public/images/'
          }
        }]
      },
    ]



    // {
    //   test: /\.(png|jpe?g|gif)$/,
    //   loader: 'file-loader'
    //   // 'url?limit=10000&mimetype=video/mp4']
    //

  }
};
