import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Close from '@mui/icons-material/Close'
import Stack from '@mui/material/Stack'
import { Navbar } from '../../components'
import { client, baseUrl } from '../../api'
import './styles.css'

import { VideoItem } from '../../components'

const Gallery: React.FC = () => {
	const [data, setData] = useState<Array<Video> | null>(null)
	const [error, setError] = useState(false)
	const [showDialog, setShowDialog] = useState(false)
	const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
	const hideDialog = () => setShowDialog(false)

	useEffect(() => {
		client
			.get('/record.json')
			.then((response) => setData(response.data))
			.catch(() => setError(true))
	}, [])

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

	return (
		<>
			<Navbar />
			{data && !!data?.length ? (
				<Grid container className="grid" spacing={2}>
					{data.map((item: Video) => (
						<Grid key={item.name} className="grid-element" item md={4} lg={3} xl={2}>
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
				<div>
					{error && <h3 className="message">Sorry can't connect to server</h3>}
					{data?.length === 0 && <h3 className="message">Seems like gallery is empty</h3>}
				</div>
			)}

			<Dialog open={showDialog} keepMounted fullWidth={true} maxWidth={'md'}>
				<DialogContent className="dialog-content">
					<video id="player" width="640" height="480" controls>
						<source id="videoSource" />
					</video>
					<Stack m={2} spacing={2}>
						<IconButton className="close-icon" component="span" onClick={hideDialog}>
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

export default Gallery
