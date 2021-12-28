const logger = require("pino")();
const fs = require("fs");
const gulp = require("gulp");
const gulp_all = require("gulp-all");
const sass = require("gulp-sass")(require("sass"));
logger.info("Gulp...");

gulp.task("css", function () {
  const postcss = require("gulp-postcss");
  return gulp
    .src("./src/theme.scss")
    .pipe(
      postcss([
        require("postcss-import"),
        require("tailwindcss/nesting"),
        require("tailwindcss"),
        require("autoprefixer"),
      ])
    )
    .pipe(sass({ sourceComments: true }).on("error", sass.logError))
    .pipe(gulp.dest("build/"));
});

gulp.task("dev", function () {
  return gulp.watch(
    "src/**/*.scss",
    { ignoreInitial: false, events: "all" },
    gulp.series("css")
  );
});
