var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify')
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');

var on_error = function(err){
	console.log(err);
}
 
gulp.task('build', function () {
  browserify({
    entries: 'main.js',
    extensions: ['.js'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .on('error',on_error)
  .pipe(source('main.min.js'))
  .pipe(streamify(uglify()))
  .pipe(gulp.dest('js'));
});
 
gulp.task('watch',function() {
	gulp.watch('./*.js',['build']);
});

gulp.task('default', ['build','watch']);
