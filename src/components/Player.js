import React, { useEffect } from "react"
import { FontAwesomeIcon, FrontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faPlay,
    faAngleLeft,
    faPause,
    faAngleRight
} from "@fortawesome/free-solid-svg-icons"

const Player = ({
    songs,
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    audioRef,
    songInfo,
    setSongInfo
}) => {
    useEffect(() => {
        songs.map((song) => {
            if(song.active){
                song.active = false
            } 
        })

        // change the active property of the selected song to true
        currentSong.active = true

        // check if the song is playing
        if(isPlaying){
            audioRef.current.play()
        }
    }, [currentSong])

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(!isPlaying)
        } else {
            audioRef.current.play()
            setIsPlaying(!isPlaying)
        }
    }

    const dragHandler = async (e) => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({ ...songInfo, currentTime: e.target.value })
    }

    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
        if (direction === "skip-forward") {
            setCurrentSong(songs[(currentIndex + 1) % songs.length])
        } else if (direction === "skip-back") {
            setCurrentSong((currentIndex - 1) % songs.length === -1 ?
                songs[songs.length - 1] :
                songs[(currentIndex - 1) % songs.length])
        }
    }

    const getTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        const secondsWithZero = String(seconds).padStart(2, "0")
        return `${minutes}:${secondsWithZero}`
    }

    return (
        <div className="player-container">
            <div className="time-control">
                <span>{getTime(songInfo.currentTime)}</span>
                {/* <progress max={songInfo.duration} value={songInfo.currentTime}/> */}
                <input
                    min={0}
                    max={songInfo.duration || 0}
                    value={songInfo.currentTime}
                    onChange={dragHandler}
                    // add mouseup event
                    type="range" />
                <span>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</span>
            </div>

            <div className="play-control">
                <FontAwesomeIcon
                    className="skip-back"
                    onClick={() => skipTrackHandler("skip-back")}
                    size="2x"
                    icon={faAngleLeft} />

                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className="play"
                    size="2x"
                    icon={isPlaying ? faPause : faPlay} />

                <FontAwesomeIcon
                    className="skip-forward"
                    onClick={() => skipTrackHandler("skip-forward")}
                    size="2x"
                    icon={faAngleRight} />
            </div>

        </div>
    )
}

export default Player