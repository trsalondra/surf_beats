import { useState, useRef } from "react"
import Song from "./components/Song"
import Player from "./components/Player"
import data from "./data"
import Library from "./components/Library"
import Nav from "./components/Nav"


function App() {
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  })
  const [libraryStatus, setLibraryStatus] = useState(false)
  const audioRef = useRef(null)

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime
    const duration = e.target.duration
    setSongInfo({ ...songInfo, currentTime: current, duration })
  }

  const songEndHandler = () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    setCurrentSong(songs[(currentIndex + 1) % songs.length])
  }

  return (
    <div className={`App ${libraryStatus ? "active-App" : ""}`}>
      <Nav
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />

      <Song currentSong={currentSong} />

      <Player
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />

      <Library
        libraryStatus={libraryStatus}
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
      />

      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      />

    </div>
  );
}

export default App
