// --------------------------------------------------------
//  Gulp modules
// --------------------------------------------------------

var gulp = require('gulp'),
    jade = require('gulp-jade'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    usemin = require('gulp-usemin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    optipng = require('gulp-optipng'),
    compass = require('gulp-compass'),
    plumber = require('gulp-plumber'),
    minify = require('gulp-minify-css'),
    bower = require('main-bower-files'),
    gulpFilter = require('gulp-filter'),
    livereload = require('gulp-livereload');

// --------------------------------------------------------
//  Paths
// --------------------------------------------------------

var paths = {
    assets: 'app/assets/',
    public: 'public/',
    views: 'app/views/'
}

// --------------------------------------------------------
//  Gulp Tasks
// --------------------------------------------------------

gulp.task('getBowerAssets', function(){
    var filters = {
        js: gulpFilter('*.js','!*.min.js'),
        css: gulpFilter(['*.css','!*.min.css']),
        fonts: gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf'])
    }
    return gulp.src(bower())

    // Get JS assets
    .pipe(filters.js)
    // .pipe(uglify())
    // .pipe(rename({
    //     suffix: ".min"
    // }))
    .pipe(gulp.dest(paths.assets + 'javascripts/libs/'))
    .pipe(filters.js.restore())

    // Get CSS assets
    .pipe(filters.css)
    .pipe(minify())
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(gulp.dest(paths.assets + 'stylesheets/css/'))
    .pipe(filters.css.restore())

    // Get Font assets
    .pipe(filters.fonts)
    .pipe(gulp.dest(paths.assets + 'fonts/'))
});

gulp.task('compass-sass', function(){

    gulp.src(paths.assets + 'stylesheets/sass/*.sass')
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(compass({
            require: ['susy','breakpoint'],
            import_path: 'bower_components',
            css: paths.assets + 'stylesheets/css',
            sass: paths.assets + 'stylesheets/sass',
        }))
        .pipe(gulp.dest(paths.assets + 'stylesheets/css'))
        .pipe(notify('Sass compiled!'));

});

gulp.task('jade', function(){
    gulp.src(paths.assets + 'templates/jade/*.jade')
        .pipe(jade({ pretty: true }))
        .pipe(gulp.dest(paths.assets + 'templates/'))
        .pipe(notify('Templates compiled!'));
});

gulp.task('dist-css', function(){
    gulp.src(paths.assets + 'stylesheets/css/*.css')
        .pipe(concat('final.css'))
        .pipe(minify())
        .pipe(gulp.dest(paths.public + 'assets/'))
        .pipe(livereload());
});

gulp.task('dist-js', function(){
    gulp.src([paths.assets + 'javascripts/libs/angular.js', paths.assets + 'javascripts/libs/*.js', paths.assets + 'javascripts/*.js'])
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(concat('final.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.public + 'assets/'))
        .pipe(livereload());
});

gulp.task('dist-tpl', function(){

    gulp.src(paths.assets + 'templates/*.html')
        .pipe(gulp.dest(paths.public + 'assets/templates/'));

});

gulp.task('dist-index', function(){

    gulp.src(paths.assets + 'templates/index.html')
        .pipe(rename('index.php'))
        .pipe(gulp.dest(paths.views))
        .pipe(livereload());

});

gulp.task('dist-fonts', function(){

    gulp.src(paths.assets + 'fonts/*')
        .pipe(gulp.dest(paths.public + 'assets/fonts/'))
        .pipe(livereload());

});

gulp.task('dist', ['dist-css','dist-js','dist-tpl','dist-index','dist-fonts']);


gulp.task('watch', function(){
    livereload.listen();
    gulp.watch(paths.assets + 'stylesheets/sass/*.sass', ['compass-sass','dist-css']);
    gulp.watch(paths.assets + '**/*.jade', ['jade','dist-tpl','dist-index']);
    gulp.watch(paths.assets + '**/*.js', ['dist-js']);
});

gulp.task('default', ['watch','compass-sass','dist-css','jade','dist-tpl','dist-index','dist-js']);







