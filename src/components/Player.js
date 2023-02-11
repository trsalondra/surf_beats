import React, { useRef } from "react"
import { FontAwesomeIcon, FrontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {

    const audioRef = useRef(null)

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(!isPlaying)

        } else {
            audioRef.current.play()
            setIsPlaying(!isPlaying)
        }

    }

    return (
        <div className="player-container">
            <div className="time-control">
                <span>Start Time</span>
                <input type="range" />
                <span>End Time</span>
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
                    icon={faPlay} />

                <FontAwesomeIcon
                    className="skip-forward"
                    size="2x"
                    icon={faAngleRight} />
            </div>
            <audio ref={audioRef} src={currentSong.audio}></audio>
        </div>
    )
}

export default Player