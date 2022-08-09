// @flow

// Specifically using Flow's comment syntax so we needn't worry about
// transpiling the Flow config.
/*::
type WebpackConfigLoader = {
  loader: string,
  options?: mixed,
}

type WebpackConfigRule = {
  test: RegExp | string,
  exclude: RegExp | string | Array<RegExp | string>,
  include: RegExp | string | Array<RegExp | string>,
  use: Array<string | WebpackConfigLoader>,
}
*/

module.exports = ({
  test: /\.tsx?$/,
  exclude: [
    /node_modules/,
  ],
  include: /client|shared/,
  use: [
    'ts-loader',
  ],
}/*: WebpackConfigRule */)
