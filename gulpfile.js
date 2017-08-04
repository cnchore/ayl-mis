

var gulp = require('gulp')
var webpack = require('gulp-webpack')
var named = require('vinyl-named')
var webpackConfig = require('./webpack.watch.config.js');

var appList = ['views']


gulp.task('default', ['bundle'], function() {
  console.log('done')
})

gulp.task('bundle', function() {
  return gulp.src(mapFiles(appList, 'vue'))
    .pipe(named())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/'))
})

gulp.task('watch', function() {
  return gulp.src(mapFiles(appList, 'vue'))
    .pipe(named())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/'))
})


/**
 * @private
 */
function getConfig(opt) {
  var config = {
    module: {
      loaders: [
        { test: /\.vue$/, loader: 'vue'}
      ]
    },
    devtool: 'source-map'
  }
  if (!opt) {
    return config
  }
  for (var i in opt) {
    config[i] = opt[i]
  }
  return config
}

/**
 * @private
 */
function mapFiles(list, extname) {
  return list.map(function (app) {return 'src/' + app + '/**/*.' + extname})
}
/*

var gulp = require('gulp');
var webpack = require("webpack");
gulp.task("webpack", function(callback) {
  var myConfig = Object.create(webpackConfig);
  webpack(myConfig, function(err, stats) {
      callback();
    });
});
*/

gulp.task('watchVue',function(){
  //gulp.watch(['src/**/*.vue','src/**/*.js'], ['webpack']);
  gulp.watch(['src/**/*.vue','src/**/*.js'], ['bundle']);
});