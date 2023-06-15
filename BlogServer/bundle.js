const { buildSync } = require("esbuild");
const nodemon = require("nodemon");

// Function to build the project
const buildProject = async () => {
  console.log("Blog Building...");

  try {
    buildSync({
      platform: "node",
      bundle: true,
      entryPoints: ["src/index.ts"],
      outdir: "build",
    });
  } catch (error) {
    console.error("Build failed:", error);
  }

  console.log("Blog Build completed successfully.");
};

// Watch for file changes and trigger the build
nodemon({
  ext: "json,ts", // Specify the file extensions to watch
  watch: ["./src"], // Specify the directories to watch for changes
  script: "build/index.js",
})
  .on("restart", buildProject)
  .once("start", buildProject);
