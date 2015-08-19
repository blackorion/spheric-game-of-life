var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify'),
    source = require('vinyl-source-stream'),
    streamify = require('gulp-streamify');

gulp.task('build', function () {
    browserify({
        entries   : 'src/main/app.js',
        extensions: ['.js'],
        debug     : true
    })
        .transform(babelify)
        .bundle()
        .on('error', on_error)
        .pipe(source('main.min.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function () {
    gulp.watch('src/main/**/*.js', ['build']);
});

gulp.task('default', ['build', 'watch']);

function on_error(err) {
    console.log(err.message);
}
