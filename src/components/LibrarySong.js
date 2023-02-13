import React from "react"

const LibrarySong = ({ song, songs, setCurrentSong, audioRef, isPlaying }) => {
    const songSelectHandler = async () => {
        await setCurrentSong(song)

        // change all active property of all songs to false
        songs.map((song) => {
            if(song.active){
                song.active = false
            }
        })

        // change the active property of the selected song to true
        song.active = true

        // check if the song is playing
        if(isPlaying){
            audioRef.current.play()
        }
    }

    return (
        <div
            className={`library-song ${song.active ? "selected" : ""}`}
            onClick={songSelectHandler}
        >
            <img src={song.cover} alt={`${song.cover} cover`} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>

        </div>
    )
}

export default LibrarySong