module.exports = {
    pwa: {
        themeColor: '#8BB8A8',
        backgroundColor: '#B47EB3',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'src/service-worker.js'
            // ...other Workbox options...
        }
    }
}