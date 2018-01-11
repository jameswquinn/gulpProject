/**
 *
 * MIT License
 *
 * Copyright (c) 2017
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

'use strict';

const gulp = require('gulp')
const frontMatter = require('gulp-front-matter')
const directoryMap = require("gulp-directory-map")
const realFavicon = require('gulp-real-favicon')
const $ = require('gulp-load-plugins')()
const potrace = require('potrace')
const fs = require('fs')
const runOrder = require('run-sequence')
const structure = require('./config/structure')
const faviconOptions = require('./config/favicon')
const responsiveOpions = require('./config/responsive')
const reporter = require('./config/reporter')

gulp.task('index',  () => {
  gulp.src(structure.src.index)
  .pipe($.plumber(reporter.onError))
    .pipe($.frontMatter())
    .pipe($.markdown())
    .pipe($.wrap({src: 'app/layout/default.ejs'}))
    .pipe($.rename({
      extname: ".html"
    }))
    .pipe($.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
}))
    .pipe(gulp.dest(structure.dest.dir))
});

gulp.task('pages',  () => {
  gulp.src(structure.src.pages)
  .pipe($.plumber(reporter.onError))
    .pipe($.frontMatter())
    .pipe($.markdown())
    .pipe($.wrap({src: 'app/layout/default.ejs'}))
    .pipe($.rename(file => {
        file.dirname = require('path').join(file.dirname, file.basename)
        file.basename = 'index'
        file.extname = '.html'
    }))
    .pipe($.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
}))
    .pipe(gulp.dest(structure.dest.dir))
});

gulp.task('img', () => {
     gulp.src(structure.src.img)
     .pipe($.plumber(reporter.onError))
        .pipe($.responsive(responsiveOpions))
        .pipe(gulp.dest(structure.dest.img))
})

gulp.task('favicon', () => {
     gulp.src('./app/img/logo.png').pipe($.favicons(faviconOptions))
    .pipe(gulp.dest(structure.dest.dir));
});

gulp.task('safari-pinned-tab',  () => {
potrace.trace('./app/img/logo.png', (err, svg) => {
  if (err) throw err;
  fs.writeFileSync('safari-pinned-tab.svg', svg);
  // add "<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">" to head metatags
});
});

gulp.task('inject-favicon', function() {
  gulp.src('./app/layout/master.html')
  .pipe($.inject(gulp.src(['./tmp/meta.html']), {
    starttag: '<!-- inject:head:{{ext}} -->',
    transform: function(filePath, file) {
      return file.contents.toString('utf8'); // return file contents as string
    }
  }))
  .pipe(gulp.dest('.'));
});

gulp.task('inject', function () {
  var target = gulp.src('./src/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest('./src'));
});

gulp.task('default', () => {
    runOrder('favicon', 'pages', 'index', 'img')
})

gulp.task('map', function () {
  gulp.src('.tmp/**/**/*.html')
  .pipe($.plumber(reporter.onError))
    .pipe(directoryMap({
      filename: 'urls.json'
    }))
    .pipe(gulp.dest('config'))
    .pipe(bs.stream())
});
