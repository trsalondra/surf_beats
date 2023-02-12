import React from "react"
import LibrarySong from "./LibrarySong"

const Library = ({ songs, setCurrentSong, audioRef, isPlaying }) => {
    return (
        <div className="library">
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => <LibrarySong
                    setCurrentSong={setCurrentSong}
                    isPlaying={isPlaying}
                    songs={songs}
                    song={song}
                    audioRef={audioRef}
                    key={song.id}
                />)}
            </div>
        </div>
    )
}

export default Library