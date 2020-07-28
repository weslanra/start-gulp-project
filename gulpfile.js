const gulp = require('gulp');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const run = require('gulp-run-command').default;

/** 
 * ============================
 * 				START DEV TASKS
 * ============================ 
 **/

gulp.task('assets', gulp.series((done)=>{
  return gulp.src(['./app/src/assets/**/*'])
    .on('error', gutil.log)
    .pipe(gulp.dest('./app/dist/src/assets'))
		
	done();
}));

gulp.task('scripts', gulp.series((done)=>{
  return gulp.src(['./app/src/js/**/*.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('bundler.js'))
    .on('error', gutil.log)
    .pipe(gulp.dest('./app/dist/src/js'))
		
	done();
}));

gulp.task('styles', gulp.series((done)=>{
  return gulp.src('./app/src/scss/controller.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      errLogToConsole: true
    }))
    .on('error', gutil.log)
    .pipe(concat('bundler.css'))
    .pipe(gulp.dest('./app/dist/src/css'))
		
	done();
}));

gulp.task('default', gulp.series(['assets', 'scripts', 'styles'], function () {
  gulp.watch('./app/src/js/**/*', gulp.series(['scripts']));
  gulp.watch('./app/src/scss/**/*', gulp.series(['styles']));
}));

/** 
 * ============================
 * 				END DEV TASKS
 * ============================ 
 **/

 /** 
 * ============================
 * 				START DEPLOY TASKS
 * ============================ 
 **/

 gulp.task( 'clean', run( 'rm -rf dist' ) );

 const distScaffold = [
	 'mkdir dist',
	 'mkdir dist/src/assets',
	 'mkdir dist/src/css',
	 'mkdir dist/src/js'
 ];

 gulp.task( 'scaffold', run( distScaffold ) );

 // gulp.task('deploy', gulpSequence('clean', 'scaffold', ['scripts-deploy', 'styles-deploy', 'images-deploy'], 'html-deploy'))

 /** 
 * ============================
 * 				END DEPLOY TASKS
 * ============================ 
 **/