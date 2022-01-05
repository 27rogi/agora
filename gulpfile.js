const logger = require("pino")();
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

// Babel stuff
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const rollup = require('@rollup/stream');
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const eslint = require('@rollup/plugin-eslint');
const cleanCSS = require('gulp-csso');
const commonjs = require('@rollup/plugin-commonjs');

// Cache needs to be initialized outside of the Gulp task
let cache;

gulp.task("css", () => {
  const postcss = require("gulp-postcss");
  return gulp
    .src(["./src/styles/base.scss", "./src/styles/theme.scss"])
    .pipe(
      postcss([
        require("postcss-import"),
        require("postcss-import-url"),
        require("tailwindcss/nesting"),
        require("tailwindcss"),
        require("autoprefixer"),
      ])
    )

    .pipe(sass({ outputStyle: 'compressed' }).on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest("dist/"));
});

gulp.task("babel", () => {
  return rollup({
    input: './src/index.jsx',
    plugins: [eslint(), commonjs(), babel({
      babelHelpers: 'bundled'
    }), nodeResolve(), terser({
      ecma: 2016
    })],

    // Use cache for better performance
    cache,

    output: {
      format: 'iife',
      sourcemap: false
    }
  })
    .on('bundle', (bundle) => {
      cache = bundle;
    })
    .pipe(source('app.js'))
    .pipe(buffer())

    .pipe(gulp.dest('./dist'));
});

gulp.task("dev", () => {
  return gulp.watch(
    "src/**/*",
    { ignoreInitial: false, events: "all" },
    gulp.series(["css", "babel"])
  );
});
