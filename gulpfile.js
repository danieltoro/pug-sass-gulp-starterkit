const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const pug = require('gulp-pug');

// Listen changes on Pug files
gulp.task('pug', () => {
    return gulp.src('src/views/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('dist/'))
});

// Listen changes on SCSS files
gulp.task('sass', () => {
    return gulp.src([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/scss/*.scss'
    ])
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
});

// Listen changes on JS files
gulp.task('js', () => {
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js'
    ])
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream())
})

// 
gulp.task('assets', () => {
    return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/assets/'))
});


gulp.task('default', ['pug', 'sass', 'js', 'assets'], () => {
    browserSync.init({
        server: './dist'
    })
    gulp.watch([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/scss/*.scss'
    ], ['sass'])
    gulp.watch('src/views/**/*.pug', ['pug'])
    gulp.watch(['dist/*.html']).on('change', browserSync.reload)
});

