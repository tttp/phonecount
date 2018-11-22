var gulp = require('gulp'),
  cleanCSS = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  zip=require('gulp-gzip');

gulp.task('css',function(){
  return gulp
    .src([
      ,'assets/main.css'
      ,'assets/theme.css'
      //,'node_modules/odometer/themes/odometer-theme-default.css'
//      ,'node_modules/odometer/themes/odometer-theme-car.css'
//      ,'node_modules/odometer/themes/odometer-theme-train-station.css'
    ], { base: 'node_modules' })
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css/'))
    .pipe(zip({gzipOptions: { level: 9 } }))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('js',function(){
  return gulp
    .src([
      'node_modules/socket.io-client/dist/socket.io.slim.js',
      'node_modules/odometer/odometer.js'
    ], { base: 'node_modules' })
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/js/'))
    .pipe(zip({gzipOptions: { level: 9 } }))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('css-minify',['css-compile'], function() {
    gulp.src(['./dist/css/*.css', '!dist/css/*.min.css'])
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./public/css'))
      .pipe(zip({gzipOptions: { level: 9 } }))
      .pipe(gulp.dest('./public/css/'));
});

gulp.task('default', ['js']);

