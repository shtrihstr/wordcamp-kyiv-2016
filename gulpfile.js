var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var debug = require('gulp-debug');


var path = {
    src: {
        sass: 'src/sass/*.sass',
        images: 'src/images/**/*.{jpg,png,gif,svg}'
    },

    watch: {
        sass: 'src/sass/**/*.sass',
        images: 'src/images/**/*.{jpg,png,gif,svg}'
    },

    built: {
        css: 'built/css/',
        images: 'built/images/'
    }
};


gulp.task('images', function () {
    return gulp.src(path.src.images)
        .pipe(debug({title: 'images:'}))
        .pipe(imagemin({
             progressive: true,
             interlaced: true
         }))
        .pipe(gulp.dest(path.built.images));
});

gulp.task('sass', function () {
    return gulp.src(path.src.sass)
        .pipe(debug({title: 'sass:'}))
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            require('autoprefixer')
        ]))
        .pipe(gulp.dest(path.built.css));
});


gulp.task('watch',function () {

    watch([path.watch.images], function () {
        gulp.start('images');
    });

    watch([path.watch.sass], function () {
        gulp.start('sass');
    });

});

gulp.task('default', ['watch']);