var gulp = require('gulp');

gulp.task('watch', function() {
  gulp.watch('src/stylesheets/**/*.scss', ['css']);
});

gulp.task('default', function() {
  gulp.start('css', 'watch');
});
