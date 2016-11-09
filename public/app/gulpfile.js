'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;


var path = {
    build: {
        js: 'build/js/',
        style: 'build/css/',
        fonts:'build/fonts/',
        js_controllers: 'build/js/controllers',
        js_services: 'build/js/services',
        js_directives: 'build/js/directives',
    },
    src: {
        js: 'assembly/main.js',
        style: 'assembly/main.scss',
        fonts:'src/fonts/**/*.*',
        js_controllers: 'src/js/controllers/**/*.js',
        js_services: 'src/js/services/**/*.js',
        js_directives: 'src/js/directives/**/*.js',
    },
    watch: {
        js: 'src/**/*.js',
        style: 'src/css/**/*.scss',
        fonts:'src/fonts/**/*.*',
    },
    clean: './build'
};

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});
gulp.task('js:build_controllers', function () {
    gulp.src(path.src.js_controllers)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest(path.build.js_controllers))
        .pipe(reload({stream: true}));
});
gulp.task('js:build_services', function () {
    gulp.src(path.src.js_services)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest(path.build.js_services))
        .pipe(reload({stream: true}));
});
gulp.task('js:build_directives', function () {
    gulp.src(path.src.js_directives)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest(path.build.js_directives))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix:'.min'}))
        .pipe(replace('../bower_components/materialize/fonts', '../fonts'))
        .pipe(gulp.dest(path.build.style))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});


gulp.task('build', function() {
    gulp.start('js:build');
    gulp.start('js:build_controllers');
    gulp.start('js:build_services');
    gulp.start('js:build_directives');
    gulp.start('style:build');
    gulp.start('fonts:build');
});

gulp.task('watch', function(){

    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
        gulp.start('js:build_controllers');
        gulp.start('js:build_services');
        gulp.start('js:build_directives');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });

    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });

});
