const gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  pump = require('pump'),
  browserSync = require('browser-sync').create(),
  // sourcemaps = require('gulp-sourcemaps'),
  babel = require('gulp-babel'),
  concatCss = require('gulp-concat-css'),
  autoprefixer = require('gulp-autoprefixer'),
  cssmin = require('gulp-cssmin'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass');

const path_js_files = ['./source/js/main.js'];

const path_css_files = ['./source/css/main.scss'];

gulp.task('dev_compress_js', function(cb) {
  pump(
    [
      gulp.src(path_js_files),
      // sourcemaps.init(),
      babel({
        presets: ['env']
      }),
      uglify({ mangle: false }),
      concat('main.min.js'),
      // sourcemaps.write(),
      gulp.dest('./public/js')
    ],
    cb
  );
});

gulp.task('prod_compress_js', function(cb) {
  pump(
    [
      gulp.src(path_js_files),
      babel({
        presets: ['env']
      }),
      uglify({ mangle: false }),
      concat('main.min.js'),
      gulp.dest('./public/js')
    ],
    cb
  );
});

gulp.task('dev_concat_css', function() {
  return (
    gulp
      .src(path_css_files)
      .pipe(sass().on('error', sass.logError))
      // .pipe(sourcemaps.init())
      .pipe(concatCss('all.min.css'))
      .pipe(
        autoprefixer({
          browsers: ['last 10 version'],
          cascade: false
        })
      )
      // .pipe(sourcemaps.write())
      .pipe(gulp.dest('./public/css/'))
  );
});

gulp.task('prod_minify_css', function() {
  gulp
    .src(path_css_files)
    .pipe(sass().on('error', sass.logError))
    .pipe(concatCss('all.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});
gulp.watch(path_js_files, ['dev_compress_js']).on('change', function() {
  browserSync.reload();
});
gulp.watch(path_css_files, ['dev_concat_css']).on('change', function() {
  browserSync.reload();
});

gulp.task('dev', ['dev_compress_js', 'dev_concat_css', 'browser-sync']);
gulp.task('production', ['prod_compress_js', 'prod_minify_css']);
