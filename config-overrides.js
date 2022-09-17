// config-overrides.js
module.exports = function override(config, env) {
  // New config, e.g. config.plugins.push...
  // config.module.rules = [
  //   ...config.module.rules,
  //   {
  //     test: /\.worker\.(js|ts)$/i,
  //     use: [
  //       {
  //         loader: "comlink-loader",
  //         options: {
  //           singleton: true,
  //         },
  //       },
  //     ],
  //   },
  // ];
  return config
}
