import gulp from "gulp"
import * as sass from 'sass'
import gulpSass from 'gulp-sass';
import concat from 'gulp-concat';
import uglify from "gulp-uglify"
import browserSync from 'browser-sync';

const sassCompiler = gulpSass(sass);

const sync = browserSync.create();

// Task para compilar arquivos SASS
export function compileSass() {
    return gulp.src('./src/scss/**/*.scss')
      .pipe(sassCompiler().on('error', sassCompiler.logError))
      .pipe(gulp.dest('./dist/css'))
      .pipe(sync.stream());
}

export function minifyJS() {
    return gulp.src('./src/js/**/*.js')
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js'))
      .pipe(sync.stream());
}

export function minifyServicesJS() {
    return gulp.src('./src/services/**/*.js')
      .pipe(concat('services.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist/services'))
      .pipe(sync.stream());
}

export function serve() {
    sync.init({
      server: {
        baseDir: './',
        index: 'index.html'
      }
    });
  
    gulp.watch('./src/scss/**/*.scss', compileSass);

    // observe changes on js files
    gulp.watch('./src/js/**/*.js', minifyJS);
    gulp.watch('./src/services/**/*.js', minifyServicesJS);

    gulp.watch('./*.html').on('change', sync.reload);
}

export default gulp.series(
    gulp.parallel(compileSass, minifyJS, minifyServicesJS),
    serve
);
