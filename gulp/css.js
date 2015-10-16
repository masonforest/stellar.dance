var src = './src/stylesheets/application.scss',
    dest = '.',
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    Eyeglass = require("eyeglass").Eyeglass;

var eyeglass = new Eyeglass({
  importer: function(uri, prev, done) {
    done(sass.compiler.types.NULL);
  }
});

eyeglass.enableImportOnce = false;

gulp.task('css', function() {
  gulp.src(src)
    .pipe(plumber())
    .pipe(sass(eyeglass.sassOptions()).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'ie 9'))
    .pipe(minifycss())
    .pipe(gulp.dest(dest))
});
