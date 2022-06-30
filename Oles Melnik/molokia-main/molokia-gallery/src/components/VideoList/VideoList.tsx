import React, { useEffect, useState, useRef } from 'react'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Close from '@mui/icons-material/Close'
import Stack from '@mui/material/Stack'
import { client, baseUrl } from '../../client'
import './styles.css'

import { VideoItem } from '../VideoItem'

const VideoList = () => {
    const [data, setData] = useState([])
    const [showDialog, setShowDialog] = useState(false)
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

    const hideDialog = () => setShowDialog(false)

    const onSelect = (video: Video) => {
        setSelectedVideo(video)
        setShowDialog(true)
        const videoElm: any = document.getElementById('player')
        const videoSourceElm: any = document.getElementById('videoSource')

        videoSourceElm!.src = `${baseUrl}/record/${video?.name}`
        videoSourceElm!.type = 'video/mp4'

        videoElm.load()
        videoElm.play()
    }

    useEffect(() => {
        client.get('/record.json').then((response) => setData(response.data))
    }, [])
    return (
        <>
            {!!data.length ? (
                <Grid container className='grid' spacing={2}>
                    {data.map((item: Video) => (
                        <Grid
                            key={item.name}
                            className='grid-element'
                            item
                            md={4}
                            lg={3}
                            xl={2}
                        >
                            <VideoItem
                                name={item.name}
                                onPlay={() => {
                                    onSelect(item)
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <h1>Opps something went wrong or you don't have videous</h1>
            )}

            <Dialog
                open={showDialog}
                keepMounted
                fullWidth={true}
                maxWidth={'md'}
            >
                <DialogContent className='dialog-content'>
                    <video id='player' width='640' height='480' controls>
                        <source id='videoSource' />
                    </video>
                    <Stack m={2} spacing={2}>
                        <IconButton className="close-icon" component='span' onClick={hideDialog}>
                            <Close />
                        </IconButton>
                        <p>name: {selectedVideo?.name}</p>
                        <p>type: {selectedVideo?.type}</p>
                        <p>mtime: {selectedVideo?.mtime}</p>
                        <p>size: {selectedVideo?.size}</p>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    )
}

type Video = {
    name: string
    type: string
    mtime: string
    size: number
}

export default VideoList
