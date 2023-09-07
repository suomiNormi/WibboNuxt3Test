module.exports = {
    apps: [
      {
        name: 'WibboNuxt3',
        port: '3005',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs'
      }
    ]
  }