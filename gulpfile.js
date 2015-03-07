var gulp = require('gulp');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var gprint = require('gulp-print');
var clean = require('gulp-clean');
var gprint = require('gulp-print');

var connect = require('gulp-connect');
var wait = require('gulp-wait');

var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var reactify = require('reactify');

var ROOT = __dirname + '/build';

var reactifyES6 = function(file) {
  return reactify(file, {es6: true});
};

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
// http://christianalfoni.github.io/javascript/2014/08/15/react-js-workflow.html
gulp.task('browserify', function() {
    var watcher = watchify(browserify({
        entries: ['./client/js/main.js'],
        debug: true,
        extension: ['.jsx'],
        transform: [reactifyES6],
        cache: {},
        packageCache: {},
        fullPaths: true,
    }));

    watcher.on('log', gutil.log);

    return watcher.on('update', function() {
            var updateStart = Date.now();
            console.log('Updating!');
            watcher.bundle()
                .pipe(source('main.js'))
                .pipe(gulp.dest('./build/js/'))
                .pipe(connect.reload());
            console.log('Updated!', (Date.now() - updateStart) + 'ms');
        })
        .bundle()
        .pipe(source('main.js'))
        .pipe(gprint())
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('clean', function () {
    return gulp.src('build/', {read: false})
    .pipe(clean());
});

gulp.task('styles', function () {
    gulp.src('client/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css/'))
    .pipe(gprint())
    .pipe(connect.reload());
});

gulp.task('copy', function(){
    gulp.src('client/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('watch', function() {
    gulp.watch('client/scss/**/*.scss', [ 'styles' ]);
    gulp.watch('client/*.html', [ 'copy' ]);
});

gulp.task('webserver', function() {
    connect.server({
        livereload: true,
        port: 1234,
        root: 'build'
    });
});

gulp.task('build', ['clean', 'styles', 'browserify', 'copy']);
gulp.task('default', ['build', 'webserver', 'watch']);
