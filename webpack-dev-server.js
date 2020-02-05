/**
 * For in depth instructions about configuration and usage,
 * check https://webpack.js.org/configuration/dev-server/#components/sidebar/sidebar.jsx
 */

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

module.exports = {
  // contentBase: OUTPUT_DIR,
  // publicPath: '/',
  host: '0.0.0.0',
  compress: true,
  port: 9090,
  clientLogLevel: 'warning',
  historyApiFallback: true, // redirects * to index.html
};
