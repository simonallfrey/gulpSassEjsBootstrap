var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass')(require('sass'));
var ejs = require("gulp-ejs");
var rename = require("gulp-rename");

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.reload({stream:true}));
});

// Compile ejs into html
gulp.task('ejs', function(){
    return gulp.src('app/ejs/*.ejs')
    // define require function in ejs.
    // perhaps better to resolve the source? e.g.
    // .pipe(ejs({require: source => {return require(someResolveFunction(source))}}))
        .pipe(ejs({require: require}))
        .pipe(rename({ extname: '.html' }))
        .pipe(gulp.dest('app/'));
});

// Static Server + watching scss/html files
// Run chrome in incognito stops caching of css
// so use auto-incognito-mode chrome plugin with filter:  http://localhost/*
// https://chrome.google.com/webstore/detail/auto-incognito-mode/cpjkopihdcgpngcchfhgncmaklfpnemm?hl=en
gulp.task('serve', gulp.series('sass', function() {
    browserSync.init({server: "./app/"});
    gulp.watch("app/scss/*.scss", gulp.series('sass')).on('change',browserSync.reload);
    gulp.watch("app/ejs/*.ejs", gulp.series('ejs')).on('change',browserSync.reload);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("app/css/*.css").on('change', browserSync.reload);

}));

gulp.task('default', gulp.series('ejs','serve'));
