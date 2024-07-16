import { Button, Slider } from "antd";
import React, { useEffect, useState } from "react";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";

const PLayBar = ({
  audioFiles,
  audioNames,
  audioDurations,
  currentSongIdx,
  playFxn,
  SongRunning,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const formatter = (value) => `${value}%`;

  // const handleTimeUpdate = () => {
  //   // Update the current time whenever the audio time changes

  // };
  const [intervalId, setintervalId] = useState(0);
  useEffect(() => {
    if (SongRunning) {
      clearInterval(intervalId);
      setintervalId(
        setInterval(() => {
          setCurrentTime(audioFiles[currentSongIdx].currentTime);
        }, 1000)
      );
    } else {
      clearInterval(intervalId);
    }
  }, [SongRunning, currentSongIdx]);
  return (
    <div class="play_section">
      <div class="content">
        <div class="current_song">
          <div class="txt">
            <div class="song_name2">
              {audioNames[currentSongIdx]?.slice(0, 20) + "..."}
            </div>
            <div class="singer">Singer</div>
          </div>

          <div class="icon">
            <i class="far fa-heart"></i>
          </div>
        </div>
        <div class="play_bar">
          <div class="play_control">
            <div class="play_left">
              <img
                id="shuffle"
                height="17px"
                src="barsvg/shuffle.svg"
                alt="shuffle"
              />
              <img
                id="prev_butn"
                height="17px"
                src="barsvg/back.svg"
                alt="photo"
                onClick={() => {
                  playFxn(
                    currentSongIdx !== 0
                      ? currentSongIdx - 1
                      : audioFiles.length - 1
                  );
                }}
              />
            </div>
            <div class="play_main">
              <Button
                onClick={() => {
                  playFxn(currentSongIdx);
                }}
              >
                {SongRunning ? <PauseOutlined /> : <CaretRightOutlined />}
              </Button>
            </div>
            <div class="play_right">
              <img
                id="next_butn"
                height="17px"
                src="barsvg/next.svg"
                alt="next"
                onClick={() => {
                  playFxn(
                    currentSongIdx !== audioFiles.length - 1
                      ? currentSongIdx + 1
                      : 0
                  );
                }}
              />
              <img
                id="redo"
                height="17px"
                src="barsvg/repeat.svg"
                alt="photo"
              />
            </div>
          </div>
          <div class="play_veiw">
            <div class="time"> {(currentTime / 60).toFixed(2)}</div>
            <div class="barNew" style={{ width: "100%" }}>
              <Slider
                value={(currentTime * 100) / audioDurations[currentSongIdx]}
                tooltip={{
                  formatter,
                }}
              />
            </div>
            <div class="song_length">
              {" "}
              {(audioDurations[currentSongIdx] / 60).toFixed(2)}
            </div>
          </div>
        </div>
        <div class="more_icons">
          <img height="18px" src="barsvg/nowplaying.svg" alt="photo" />
          <img height="18px" src="barsvg/lyrics.svg" alt="photo" />
          <img height="18px" src="barsvg/queve.svg" alt="photo" />
          <img height="18px" src="barsvg/connecttodevice.svg" alt="photo" />
          <img height="18px" src="barsvg/mute.svg" alt="photo" />
          <div class="bar"></div>
        </div>
      </div>
    </div>
  );
};

export default PLayBar;
