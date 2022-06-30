import React, { PropsWithChildren } from 'react'
import Stack from '@mui/material/Stack'
import './styles.css'

const VideoItem = ({ name, onPlay }: Props) => {
    return (
        <Stack className="container" spacing={2}>
            <img
                onClick={onPlay}
                width='250'
                src='https://duan.edu.ua/images/News/UA/Common/2020/video-icon.png'
            />
            <p>{name}</p>
        </Stack>
    )
}

type Props = {
    name: string
    onPlay: () => void
}

export default VideoItem
