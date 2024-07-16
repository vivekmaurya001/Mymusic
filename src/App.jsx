import "./App.css";
import PLayBar from "./components/PLayBar";
import LeftSection from "./components/LeftSection";
import RightSection from "./components/RightSection";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import SearchPage from "./components/SearchPage";
import { useEffect, useState } from "react";

function App() {
  const [audioFiles, setAudioFiles] = useState([]);
  const [audioNames, setaudioNames] = useState([]);
  const [currentSongIdx, setcurrentSongIdx] = useState(0);
  const [audioDurations, setAudioDurations] = useState([]);
  const [SongRunning, setSongRunning] = useState(false);
  const playFxn = (idx) => {
    if (SongRunning && idx === currentSongIdx) {
      audioFiles[currentSongIdx].pause();
      setSongRunning(false);
    } else if (SongRunning) {
      audioFiles[currentSongIdx].pause();
      audioFiles[currentSongIdx].currentTime = 0;
      audioFiles[idx].play();
      setcurrentSongIdx(idx);
    } else {
      audioFiles[idx].play();
      setcurrentSongIdx(idx);
      setSongRunning(true);
    }
  };

  return (
    <main className="conatiner">
      <div className="scroll">
        <LeftSection
          setSongRunning={setSongRunning}
          SongRunning={SongRunning}
          audioDurations={audioDurations}
          audioFiles={audioFiles}
          audioNames={audioNames}
          currentSongIdx={currentSongIdx}
          setAudioFiles={setAudioFiles}
          setAudioDurations={setAudioDurations}
          setaudioNames={setaudioNames}
          setcurrentSongIdx={setcurrentSongIdx}
          playFxn={playFxn}
        />
        <Routes>
          <Route element={<RightSection />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
        </Routes>
      </div>
      <PLayBar
        setSongRunning={setSongRunning}
        SongRunning={SongRunning}
        audioDurations={audioDurations}
        audioFiles={audioFiles}
        audioNames={audioNames}
        currentSongIdx={currentSongIdx}
        setAudioFiles={setAudioFiles}
        setAudioDurations={setAudioDurations}
        setaudioNames={setaudioNames}
        setcurrentSongIdx={setcurrentSongIdx}
        playFxn={playFxn}
      />
    </main>
  );
}

export default App;
