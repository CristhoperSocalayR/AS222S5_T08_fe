module.exports = function (config) {
    config.set({
      frameworks: ["jasmine", "@angular-devkit/build-angular"],
      plugins: [
        require("karma-jasmine"),
        require("karma-chrome-launcher"),
        require("karma-jasmine-html-reporter"),
        require("karma-coverage")
      ],
      coverageReporter: {
        dir: require("path").join(__dirname, "./coverage"),
        subdir: ".",
        reporters: [{ type: "lcov", subdir: "." }]
      }
    });
  };
  