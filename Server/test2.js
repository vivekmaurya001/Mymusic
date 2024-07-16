// getAudioFiles.js
const walk = require("walk");
const path = require("path");

const musicFolderPath = "C:/Users/ADMIN/Music"; // Change this to your music folder path
const audioFiles = [];

const walker = walk.walk(musicFolderPath, { followLinks: false });

walker.on("file", (root, stat, next) => {
  const filePath = path.join(root, stat.name);
  if (path.extname(filePath).toLowerCase() === ".mp3") {
    audioFiles.push(filePath);
  }
  next();
});

walker.on("end", () => {
  console.log("All audio files:", audioFiles);
});
