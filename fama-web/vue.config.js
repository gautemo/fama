module.exports = {
    pwa: {
        themeColor: '#639bb4',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'src/service-worker.js'
            // ...other Workbox options...
        }
    }
}