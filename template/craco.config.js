const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  babel: {
    plugins: [
      [
        'babel-plugin-import',
        {
          libraryName: 'antd',
          style: 'css',
        },
      ],
      [
        'babel-plugin-styled-components',
        {
          pure: true,
        },
      ],
    ],
  },
  webpack: {
    alias: {

    },
    plugins: {
      remove: [],
      add: [
        new AntdDayjsWebpackPlugin(),
        process.env.ANALYZER === 'true' && new BundleAnalyzerPlugin(),
      ].filter(Boolean),
    },
  },
}
