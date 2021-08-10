const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const AliasPlugin = require('enhanced-resolve/lib/AliasPlugin')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

const resolveApp = relativePath => path.resolve(__dirname, relativePath)

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
      '@icons': resolveApp('src/components/icons'),
      '@pages': resolveApp('src/pages'),
      '@services': resolveApp('src/hooks'),
      '@hooks': resolveApp('src/hooks'),
      '@utils': resolveApp('src/utils'),
      '@lib': resolveApp('src/lib'),
    },
    configure: (config, { env, paths }) => {
      if (process.env.ANALYZER === 'true') {
        config.resolve.plugins.push(new BundleAnalyzerPlugin())
      }

      config.resolve.plugins = config.resolve.plugins.filter(
        plugin => !(plugin instanceof ModuleScopePlugin)
      )

      config.resolve.plugins.push(
        new AliasPlugin(
          'described-resolve',
          [
            {
              name: '@components',
              alias: [
                resolveApp('src/components'),
                resolveApp('src/components/ui'),
                resolveApp('src/components/common'),
              ],
            },
          ],
          'resolve'
        )
      )

      // config.resolve.plugins.push(new AntdDayjsWebpackPlugin())

      return config
    },
  },
}
