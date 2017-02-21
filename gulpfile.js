var gulp         = require('gulp'),
	sass         = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS     = require('gulp-clean-css'),
	rename       = require('gulp-rename'),
	plumber      = require('gulp-plumber'),
	notify       = require('gulp-notify'),
	browserSync  = require('browser-sync').create(),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglify'),
	svg          = require('gulp-svg-sprite');

gulp.task('browser-sync', ['styles', 'scripts'], function() {
		browserSync.init({
				server: {
						baseDir: "./app"
				},
				notify: false
		});
});

gulp.task('styles', function () {
	return gulp.src('sass/*.scss')
    .pipe(plumber({errorHandler: notify.onError(function(err){
        return {
            title: 'styles',
            message: err.message
    };})}))
    .pipe(sass({
        sourceMap: true,
        errLogToConsole: true,
        includePaths: require('node-bourbon').includePaths
    }))
    .pipe(rename({suffix: '.min', prefix : ''}))
    .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src([
		'./app/libs/modernizr/modernizr.js',
		'./app/libs/jquery/jquery-1.11.2.min.js',
    './app/libs/swiper/js/swiper.min.js',
    './app/libs/velocity/velocity.min.js',
    './app/libs/snap/classie.js',
    './app/libs/popup/jquery.magnific-popup.js'
		])
		.pipe(concat('libs.js'))
		// .pipe(uglify()) //Minify libs.js
		.pipe(gulp.dest('./app/js/'));
});

gulp.task('svgSprite', function() {
  return gulp.src('app/img/icons/*.svg')
  .pipe(svg({
    shape: {
        spacing: {
            padding: 5
        }
    },
    mode: {
      css: {
        dest: '.',
        bust: false,
        sprite: 'sprite.svg',
        layout: 'vertical',
        prefix: '.',
        dimensions: true,
        render: {
          scss: {
            dest: '_sprite.scss'
          }
        }
      },
      symbol: true
    }
  }))
  .pipe(gulp.dest('sass/'));
});

gulp.task('watch', function () {
	gulp.watch('sass/*.scss', ['styles']);
	gulp.watch('app/libs/**/*.js', ['scripts']);
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
