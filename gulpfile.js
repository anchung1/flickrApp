var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

var path = {
    HTML: 'src/index.html',
    STYLES: 'src/styles/*.css',
    MINIFIED_OUT: 'build.min.js',
    OUT: 'build.js',
    DEST: 'dist',
    DEST_BUILD: 'dist/build',
    DEST_SRC: 'dist/src',
    ENTRY_POINT: './src/js/App.js',
    PUBLIC: 'src/public/*'
};

gulp.task('buildCSS', function () {
    gulp.src(path.STYLES).pipe(concat('main.css')).pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('css', function () {
    watch(path.STYLES, batch(function (events, done) {
        gulp.start('buildCSS', done);
    }));
});

gulp.task('replaceHTML', function() {
    gulp.src(path.HTML).pipe(htmlreplace({
        'js': 'src/' + path.OUT
    })).pipe(gulp.dest(path.DEST));
});

gulp.task('index', function() {
    watch(path.HTML, batch(function(events, done) {
        gulp.start('replaceHTML', done);
    }));
});

gulp.task('copy', function() {
    gulp.src(path.HTML).pipe(htmlreplace({
        'js': 'src/' + path.OUT
    })).pipe(gulp.dest(path.DEST));

    //gulp.src(path.HTML).pipe(gulp.dest(path.DEST));
    gulp.src(path.PUBLIC).pipe(gulp.dest(path.DEST_SRC));
    gulp.src(path.STYLES).pipe(concat('main.css')).pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('watch', function() {

    var watcher = watchify( browserify( {
        entries: [path.ENTRY_POINT],
        transform: [reactify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    }));

    return watcher.on('update', function() {
        watcher.bundle()
            .pipe(source(path.OUT))
            .pipe(gulp.dest(path.DEST_SRC))
        console.log('Updated');
    })
        .bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST_SRC));
});

//use this command to find errors in build
//browserify -t reactify -r react -r ./src/js/App.js > dist/src/bundle.js
gulp.task('default', ['watch', 'copy', 'css', 'index']);