const webpack = require('webpack');

const config = {
    entry:  __dirname + '/js/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
	  use: {
	    loader: 'babel-loader',
	    options: {
		    presets: ['env', 'react'],
		    plugins: ['transform-runtime']

	    }
       	}
	},
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
{
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
    }
      ]
    }
};

module.exports = config;
