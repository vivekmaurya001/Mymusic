import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
import { Button } from "antd";

const LeftSection = ({
  audioFiles,
  audioNames,
  audioDurations,
  currentSongIdx,
  setAudioDurations,
  setAudioFiles,
  setaudioNames,
  setcurrentSongIdx,
  playFxn,
  SongRunning,
}) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    console.log(e.target.files);
    const selectedFiles = Array.from(e.target.files);
    const AudioElements = selectedFiles.map(
      (file) => new Audio(URL.createObjectURL(file))
    );

    const audiosName = selectedFiles.map((file) => file.name);

    setAudioFiles((prevArray1) => [...prevArray1, ...AudioElements]);
    setaudioNames((prevArray1) => [...prevArray1, ...audiosName]);

    const decodePromises = selectedFiles.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const buffer = await audioContext.decodeAudioData(arrayBuffer);
      return buffer.duration;
    });
    try {
      const durations = await Promise.all(decodePromises);
      setAudioDurations((prevDurations) => [...prevDurations, ...durations]);
      console.log(durations);
      // You can also set other state or perform additional logic here
    } catch (error) {
      console.error("Error decoding audio data:", error.message);
    }

    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
  };
  return (
    <div class="left_content">
      <section class="sectn1">
        <Link to="/search">
          <div class="search" style={{ color: "white" }}>
            <img height="34px" src="barsvg/search.svg" alt="photo" />
            <li>Search</li>
          </div>
        </Link>
        <Link to="/">
          <div class="home" style={{ color: "white" }}>
            <img height="34px" src="barsvg/home.svg" alt="photo" />
            <li>Home</li>
          </div>
        </Link>
      </section>
      <section class="sectn2">
        <header>
          <div class="part1">
            <div>
              <img height="25px" src="barsvg/library.svg" alt="svg" />
              Your Library
            </div>
            <div class="icon1">
              <img height="20px" src="barsvg/plus.svg" alt="photo" />
              <img height="20px" src="barsvg/rightarrw.svg" alt="photo" />
            </div>
          </div>
          <div class="part2">
            <button>Playlist</button>
            <button>Artist</button>
            <button>Albums</button>
            <button>Podcast</button>
          </div>
        </header>
        <div class="search_bar">
          <img height="34px" src="/barsvg/search.svg" alt="photo" />
          <div class="recent">
            <button
              onClick={handleButtonClick}
              style={{ display: "flex", gap: "7px", alignItems: "center" }}
            >
              <UploadOutlined />
              Upload
            </button>
            <input
              type="file"
              accept="audio/*"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div class="collection">
          {audioFiles?.map((audio, index) => {
            return (
              <div
                class="song"
                key={index}
                onClick={() => {
                  playFxn(index);
                }}
              >
                <div class="cover_name">
                  <div class="song_name">
                    {audioNames[index].slice(0, 15) + "..."}
                  </div>
                </div>
                <div class="play_state">
                  <div class="sond_length">
                    {(audioDurations[index] / 60).toFixed(2)}
                  </div>
                  <div class="play">
                    {SongRunning && currentSongIdx === index ? (
                      <PauseOutlined />
                    ) : (
                      <CaretRightOutlined />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default LeftSection;
