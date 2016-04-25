var gulp = require('gulp');

gulp.task('default', function() {
  // place code for your default task here
  console.log('coucou gulp');
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;
  gulp.src('app/*.html')
    .pipe(wiredep())
    .pipe(gulp.dest('app'));
});

