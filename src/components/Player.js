import React, { useState } from "react"
import { FontAwesomeIcon, FrontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, 
    faAngleLeft, 
    faPause, 
    faAngleRight } from "@fortawesome/free-solid-svg-icons"

const Player = ({ currentSong, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo}) => {
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(!isPlaying)
        } else {
            audioRef.current.play()
            setIsPlaying(!isPlaying)
        }
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({ ...songInfo, currentTime: e.target.value })
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
                <input
                    min={0}
                    max={songInfo.duration}
                    value={songInfo.currentTime}
                    onChange={dragHandler}
                    type="range" />
                <span>{getTime(songInfo.duration)}</span>
            </div>

            <div className="play-control">
                <FontAwesomeIcon
                    className="skip-back"
                    size="2x"
                    icon={faAngleLeft} />

                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className="play"
                    size="2x"
                    icon={isPlaying ? faPause : faPlay} />

                <FontAwesomeIcon
                    className="skip-forward"
                    size="2x"
                    icon={faAngleRight} />
            </div>

        </div>
    )
}

export default Player