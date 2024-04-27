// webpack.config.js or webpack.dev.js
module.exports = {
    // ... other configurations
    devServer: {
      // ... other devServer options
      setupMiddlewares: (devServer) => {
        // your middleware setup
      },
    },
  };
  