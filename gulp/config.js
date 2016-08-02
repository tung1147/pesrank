var args = require('minimist')(process.argv.slice(2)),
    VERSION = args.version || require('../package.json').version;

module.exports = {
  banner:
  '/*!\n' +
  ' * Application\n' +
  ' * v' + VERSION + '\n' +
  ' */\n',

  vendors: {
    css: [
      'bower_components/bootstrap/dist/css/bootstrap.min.css',
      'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
      'bower_components/angular-bootstrap/ui-bootstrap-csp.css',
      'bower_components/angular-material/angular-material.min.css'
    ],
    js: [ 
      //Jquery
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/bootstrap/dist/js/bootstrap.min.js',
      'bower_components/moment/min/moment-with-locales.min.js',
      'bower_components/underscore/underscore-min.js',
      'bower_components/jquery-ui/jquery-ui.min.js',

      //Angular
      'bower_components/angular/angular.min.js',
      'bower_components/angular-resource/angular-resource.min.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'bower_components/angular-material/angular-material.min.js',
      'bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'bower_components/angular-messages/angular-messages.min.js',
      'bower_components/angular-animate/angular-animate.min.js',
      'bower_components/angular-aria/angular-aria.min.js',,
      'bower_components/angular-moment/angular-moment.min.js', 
      'bower_components/ngstorage/ngStorage.min.js',
      'bower_components/oclazyload/dist/ocLazyLoad.min.js',

      
      //EaselJS
      'bower_components/EaselJS/lib/easeljs-0.8.2.min.js',
      'bower_components/PreloadJS/lib/preloadjs-0.6.2.min.js',
      'bower_components/TweenJS/lib/tweenjs-0.6.2.min.js',
      'bower_components/SoundJS/lib/soundjs-0.6.2.min.js',

       //Lib
      'bower_components/eventEmitter/EventEmitter.min.js',
      'src/lib/Global.js',
      'src/lib/md5.js',

       //Other
       'bower_components/satellizer/satellizer.min.js',


       // Iscroll
       'bower_components/iscroll/build/iscroll.js',

    ],
    fonts: [
      'bower_components/bootstrap/fonts/**/*'
    ],
  },
  gbjsFiles: [
    'src/lib/gbjs/**/*.js'
  ],
  jsBaseFiles: [
    'src/js/core/**/*.js'
  ],
  jsFiles: [
    'src/js/**/*.js',
    '!src/js/**/*.spec.js',
  ],

  scssFiles: [
    'src/css/scss/**/*.scss',
    'src/js/**/*.scss'
  ],
  htmlFiles: [
    'web/**/*.html',
    'src/js/**/*.html'
  ],

  ngConfigFile: 'config/ngConfig.json',
  outputDir: 'dist',
};