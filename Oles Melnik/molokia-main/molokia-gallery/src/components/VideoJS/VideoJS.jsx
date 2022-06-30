import React, {useEffect} from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export const VideoJS = (props) => {
    const videoRef = React.useRef(null)
    const playerRef = React.useRef(null)
    const { options, onReady } = props

    useEffect(() => {
            const videoElement = videoRef.current

            const player = playerRef.current = videojs(
                videoElement,
                options,
                () => {
                    player.log('player is ready')
                    onReady && onReady(player)
                }
            )
    }, [options, videoRef])

    // Dispose the Video.js player when the functional component unmounts
    useEffect(() => {
        const player = playerRef.current

        return () => {
            if (player) {
                player.dispose()
                playerRef.current = null
            }
        }
    }, [playerRef])

    return (
        <div data-vjs-player>
            <h1>hello</h1>
            <video ref={videoRef} className='video-js vjs-big-play-centered' />
        </div>
    )
}

export default VideoJS
