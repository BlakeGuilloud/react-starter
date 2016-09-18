const paths = {
  styles: {
    app: './client/app/less/app.less',
    build: './client/build/less',
    less: './client/app/less/*.less',
  },
  client: {
    jsx: './client/app/**/*.jsx',
    js: './client/app/**/*.js',
  },
  server: {
    js: './server/src/**/*.js',
  },
};

// ----------------------
// Gulp dependencies
// ----------------------
const babel     = require('gulp-babel');
const duration  = require('gulp-duration');
const nodemon   = require('gulp-nodemon');
const gulp      = require('gulp');
const open      = require('gulp-open');

// ----------------------
// CSS dependencies
// ----------------------
const autoprefixer  = require('autoprefixer');
const cssnano       = require('cssnano');
const less          = require('gulp-less');
const postcss       = require('gulp-postcss');

// ----------------------
// BrowserSync
// ----------------------
const browserSync = require('browser-sync');
const reload      = browserSync.reload;

// ----------------------
// Webpack dependencies
// ----------------------
const webpack       = require('webpack');
const webpackConfig = require('./webpack.config');


// ----------------------
// Task serve:all
// ----------------------
gulp.task('serve:all', ['serve:client', 'serve:server']);

// ----------------------
// Task serve:client
// ----------------------
gulp.task('serve:client', ['watch:styles', 'watch:client', 'browserSync:open']);

// ----------------------
// Task serve:server
// ----------------------
gulp.task('serve:server', ['watch:server']);

// ----------------------
// Task browserSync
// ----------------------
gulp.task('browserSync', () => {
  browserSync.init({
     logSnippet: false,
     socket: {
       domain: 'localhost:3000',
     },
     notify: false,
   });
});

// ----------------------
// Task browserSync:open
// ----------------------
gulp.task('browserSync:open', ['browserSync'], () => {
  gulp.src('./client/index.html')
   .pipe(open({ uri: 'http://localhost:8080/' }));
});


// ----------------------
// Task watch:styles
// ----------------------
gulp.task('watch:styles', ['build:styles'], () => {
  gulp.watch(paths.styles.less, ['build:styles', reload]);
});

// ----------------------
// Task watch:client
// ----------------------
gulp.task('watch:client', ['build:client'], () => {
  gulp.watch([paths.client.jsx, paths.client.js], ['build:client', reload]);
});

// ----------------------
// Task watch:server
// ----------------------
gulp.task('watch:server', ['build:server'], () => {
  nodemon({
    script: 'server/lib/server.js',
    watch: 'server/src',
    tasks: ['build:server'],
  }).on('restart', () => {
    console.log('Server restarted');
  });
});

// ----------------------
// Task build:styles
// ----------------------
gulp.task('build:styles', () => {
  const processors = [
    autoprefixer({ browsers: ['last 2 versions', 'ie 10'], cascade:false }),
    cssnano(),
  ];
  return gulp.src([paths.styles.app])
    .pipe(less({ compress: true }))
    .pipe(postcss(processors))
    .pipe(gulp.dest(paths.styles.build))
    .pipe(reload({ stream: true }))
    .pipe(duration(console.log('Styles built successfully')));
});

// ----------------------
// Task build:client
// ----------------------
gulp.task('build:client', (callback) => {
  webpack(webpackConfig, (err, stats) => {
    if (err) throw new Error('build:client', err);
    console.log(stats.toString({
      colors: true,
      exclude: 'node_modules',
    }));
    callback();
  });
});

// ----------------------
// Task build:server
// ----------------------
gulp.task('build:server', () => {
  return gulp.src([paths.server.js])
    .pipe(babel())
    .pipe(gulp.dest('./server/lib'))
    .pipe(duration(console.log('Server built successfully')));
});
