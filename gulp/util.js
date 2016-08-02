
var lazypipe = require('lazypipe'),
    config = require('./config'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    templateCache = require('gulp-angular-templatecache'),
    sass = require('gulp-sass'),
    insert = require('gulp-insert'),
    filter = require('gulp-filter'),
    ngAnnotate = require('gulp-ng-annotate'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    constants = require('./const'),
    usemin = require('gulp-usemin'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    IS_DEV = constants.IS_DEV,
    utils = require('../scripts/gulp-utils.js'),
    rev = require('gulp-rev'),
    cssmin = require('gulp-cssmin'),
    series = require('stream-series'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpDocs = require('gulp-ngdocs'),
    gulpNgConfig = require('gulp-ng-config');


exports.buildJs = buildJs;
exports.buildHtml = buildHtml;
exports.buildScss = buildScss;
exports.buildMin = buildMin;
exports.buildVendor = buildVendor;
exports.ngConfig = ngConfig;

/**
 * Builds the entire component library javascript.
 * @param {boolean} isRelease Whether to build in release mode.
 */
function buildJs () {
  gutil.log("building js files...");	
  return gulp
    .src(config.jsFiles)
    .pipe(gulpif(IS_DEV, sourcemaps.init()))
    .pipe(plumber())
    .pipe(ngAnnotate())
    .pipe(utils.addJsWrapper(true))
	  .pipe(concat('app.js'))
    .pipe(gulpif(!IS_DEV, uglify({ preserveComments: 'some' })))
    .pipe(gulpif(IS_DEV, sourcemaps.write()))
    .pipe(gulp.dest('src/vendor'));
}



function buildMinCss() {
  var cssStream = gulp.src([
    'src/vendor/dist.css',
    'src/vendor/app.css',
    'src/vendor/*.css'
  ])
  .pipe(concat('app.min.css'))
  .pipe(gulp.dest('dist/css')),

  copyImgStream = gulp.src(['src/img/**/*'])
  .pipe(gulp.dest('dist/img')),

  copyFontStream = gulp.src(['src/fonts/**/*'])
  .pipe(gulp.dest('dist/fonts')),

  copyAssetsStream = gulp.src(['src/assets/**/*'])
  .pipe(gulp.dest('dist/assets'));

  gulp.src(['src/sound/**/*'])
  .pipe(gulp.dest('dist/sound'))

  return series(cssStream, copyImgStream, copyFontStream, copyAssetsStream);
}

function buildMin() {
  return series(buildMinJs(), buildMinCss());
}

function buildMinJs() {
  var jsStream = gulp.src([
    'src/vendor/dist.js',
    'src/vendor/app.js',
    'src/vendor/ngConfig.js',
    'src/vendor/templates.js'
  ])
  .pipe(concat('app.min.js'))
  .pipe(gulp.dest('dist/js')),

  copyStream = gulp
  .src('src/index.min.html')
  .pipe(rename('index.html'))
  .pipe(gulp.dest('dist'));

  var minLibStream = gulp.src(['src/lib/**/*'])
  .pipe(uglify({ preserveComments: 'some' }))
  .pipe(gulp.dest('dist/lib'));



  return series(buildJs(), jsStream, copyStream, minLibStream);
}

function buildHtml() {
  return gulp.src(config.htmlFiles)
     .pipe(plumber())
     .pipe(templateCache())
     .pipe(gulp.dest('src/vendor'));
}

function buildScss() {
  return gulp.src(config.scssFiles)
    .pipe(gulpif(IS_DEV, sourcemaps.init()))
    .pipe(plumber())
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(gulpif(!IS_DEV, minifyCss()))
    .pipe(gulpif(IS_DEV, sourcemaps.write()))
    .pipe(gulp.dest('src/vendor'));
}

function buildVendor() {
  var copyFontStream = gulp.src(config.vendors.fonts)
  .pipe(gulp.dest('src/fonts')),

  jsStream = gulp.src(config.vendors.js)
  .pipe(concat('dist.js'))
  .pipe(gulp.dest('src/vendor/')),

  cssStream = gulp.src(config.vendors.css)
    .pipe(concat('dist.css'))
    .pipe(gulp.dest('src/vendor'));

  return series(jsStream, cssStream, copyFontStream);
}




function ngdocs() {
  var options = {
    html5Mode: false,
    startPage: '/api',
    title: "Docs",
  }
  return gulpDocs.sections({
      api: {
        glob:['src/**/*.js', '!src/**/*.spec.js'],
        api: true,
        title: 'API Documentation'
      },
      tutorial: {
        glob: ['src/**/*.ngdoc'],
        title: 'Tutorial'
      }
    })
    .pipe(gulpDocs.process(options))
    .pipe(gulp.dest('./docs'));
}


function ngConfig() {
  var env = IS_DEV ? 'local' : 'production';
  return gulp.src('config/ngConfig.json')
  .pipe(gulpNgConfig('config', {
    createModule: false,
    environment: env
  }))
  .pipe(gulp.dest('src/vendor'))
}

function filterNonCodeFiles() {
  return filter(function(file) {
    return !/demo|module\.json|script\.js|\.spec.js|README/.test(file.path);
  });
}