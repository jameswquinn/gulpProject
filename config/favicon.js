const $ = require('gulp-load-plugins')()

module.exports = {

  appName: "My App",
  appDescription: "This is my application",
  developerName: "James Quinn",
  developerURL: "http://jameswquinn.me/",
  background: "#020307",
  path: "/",
  url: "http://jameswquinn.me/",
  display: "standalone",
  orientation: "portrait",
  start_url: "/?homescreen=1",
  version: 1.0,
  logging: false,
  online: false,
  html: "meta.html",
  pipeHTML: true,
  replace: true,
  icons: {
      // Platform Options:
      // - offset - offset in percentage
      // - shadow - drop shadow for Android icons, available online only
      // - background:
      //   * false - use default
      //   * true - force use default, e.g. set background for Android icons
      //   * color - set background for the specified icons
      //
      android: true,              // Create Android homescreen icon. `boolean` or `{ offset, background, shadow }`
      appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset, background }`
      appleStartup: false,         // Create Apple startup images. `boolean` or `{ offset, background }`
      coast: { offset: 25 },      // Create Opera Coast icon with offset 25%. `boolean` or `{ offset, background }`
      favicons: true,             // Create regular favicons. `boolean`
      firefox: false,              // Create Firefox OS icons. `boolean` or `{ offset, background }`
      windows: true,              // Create Windows 8 tile icons. `boolean` or `{ background }`
      yandex: false                // Create Yandex browser icon. `boolean` or `{ background }`
  }

}
