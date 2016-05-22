// Requis
var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json
var merge = require('merge-stream');
var del = require('del');
var htmlreplace = require('gulp-html-replace');

// Variables de chemins
var source = './src'; // dossier de travail
var destination = './dist'; // dossier à livrer

gulp.task('clean', function () {
  return del(['dist']);
});

gulp.task('css', ['clean'], function () {
  return gulp.src(source + '/assets/css/style.css')
    .pipe(plugins.csscomb())
    .pipe(plugins.cssbeautify({indent: '  '}))
    .pipe(plugins.autoprefixer())
    .pipe(plugins.csso())
    .pipe(plugins.concat('style.min.css'))
    .pipe(gulp.dest(destination + '/assets/css/'));
});

gulp.task('js', ['clean'], function () {
  return gulp.src(source + '/assets/js/init.js')
    .pipe(plugins.uglify())
    .pipe(plugins.concat('script.min.js'))
    .pipe(gulp.dest(destination + '/assets/js/'));
});

gulp.task('img', ['clean'], function () {
  return gulp.src(source + '/assets/img/*.{ico,png,jpg,jpeg,gif,svg}')
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(destination + '/assets/img'));
});

gulp.task('copy', ['clean'], function () {
  var css = gulp.src(source + '/assets/css/materialize.css')
    .pipe(gulp.dest(destination + '/assets/css'));

  var jquery = gulp.src(source + '/assets/js/jquery.js')
    .pipe(gulp.dest(destination + '/assets/js'));

  var materialize = gulp.src(source + '/assets/js/materialize.js')
    .pipe(gulp.dest(destination + '/assets/js'));

  var html = gulp.src(source + '/*.html')
    .pipe(gulp.dest(destination));

  var font = gulp.src(source + '/assets/font/*/*')
    .pipe(gulp.dest(destination + '/assets/font'));

  var fonts = gulp.src(source + '/assets/fonts/*/*')
    .pipe(gulp.dest(destination + '/assets/fonts'));

  return merge(css, jquery, materialize, html, font, fonts);
});

gulp.task('replace', ['clean', 'copy'], function () {
  gulp.src(destination + '/index.html')
    .pipe(htmlreplace({
      'css': './assets/css/style.min.css',
      'js': './assets/js/script.min.js'
    }))
    .pipe(gulp.dest(destination));
});

// Tâche "build"
gulp.task('build', ['css', 'js', 'img', 'copy', 'replace']);

// Tâche "watch" = je surveille *less
gulp.task('watch', function () {
  gulp.watch(source + '/assets/css/*.css', ['build']);
});

// Tâche par défaut
gulp.task('default', ['build']);