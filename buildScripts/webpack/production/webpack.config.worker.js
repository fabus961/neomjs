const path        = require('path'),
      buildTarget = require('./buildTarget.json'),
      processRoot = process.cwd(),
      packageJson = require(path.resolve(processRoot, 'package.json')),
      neoPath     = packageJson.name === 'neo.mjs' ? './' : './node_modules/neo.mjs/',
      config      = require(path.resolve(neoPath, 'buildScripts/webpack/json/build.json')),
      entry       = {};

module.exports = env => {
    if (config.workers) {
        Object.entries(config.workers).forEach(([key, value]) => {
            if (key === env.worker) {
                entry[key] = path.resolve(neoPath, value.input);
            }
        });
    }

    return {
        mode: 'production',
        entry,
        target: 'webworker',


        output: {
            chunkFilename: 'chunks/[id].js',

            filename: chunkData => {
                let name = chunkData.chunk.name;

                if (config.workers.hasOwnProperty(name)) {
                    return config.workers[name].output;
                }
            },

            path: path.resolve(processRoot, buildTarget.folder)
        }
    }
};