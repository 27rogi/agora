const logger = require("pino")();
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

// Babel stuff
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const rollup = require('@rollup/stream');
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { uglify } = require("rollup-plugin-uglify");
const eslint = require('@rollup/plugin-eslint');
const cleanCSS = require('gulp-csso');

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
    // Point to the entry file
    input: './src/index.jsx',

    // Apply plugins
    plugins: [eslint(), babel({
      babelHelpers: 'bundled'
    }), nodeResolve(), uglify()],

    // Use cache for better performance
    cache,

    // Note: these options are placed at the root level in older versions of Rollup
    output: {

      // Output bundle is intended for use in browsers
      // (iife = "Immediately Invoked Function Expression")
      format: 'iife',

      // Show source code when debugging in browser
      sourcemap: false

    }
  })
    .on('bundle', (bundle) => {
      // Update cache data after every bundle is created
      cache = bundle;
    })
    // Name of the output file.
    .pipe(source('app.js'))
    .pipe(buffer())

    // Where to send the output file
    .pipe(gulp.dest('./dist'));
});

gulp.task("dev", () => {
  return gulp.watch(
    "src/**/*",
    { ignoreInitial: false, events: "all" },
    gulp.series(["css", "babel"])
  );
});
