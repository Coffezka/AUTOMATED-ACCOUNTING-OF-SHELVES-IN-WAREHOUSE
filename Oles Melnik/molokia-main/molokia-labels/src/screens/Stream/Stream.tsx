import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components'
import axios from 'axios'
import videojs from 'video.js'
import './styles.css'

const baseUrl = 'http://localhost:8000'
export const Stream: React.FC = () => {
	const [productList, setProductList] = useState<any>([])
	const [error, setError] = useState(false)
	useEffect(() => {
		const player = videojs('hls-example')
		player.play()
		setInterval(() => {
			if (error) return
			axios
				.get(`${baseUrl}/state/`)
				.then((response) => setProductList(response.data))
				.catch(() => setError(true))
		}, 10000)
	}, [])
	return (
		<>
			<Navbar />
			<div className="labels-container">
				<video id="hls-example" className="video-js vjs-default-skin player" width="400" height="300" controls>
					<source type="application/x-mpegURL" src="http://localhost:80/hls/cam.m3u8" />
				</video>

				{productList && !!productList.length ? (
					<div className="labels">
						<div className="header-row">
							<div className="name">
								<p>name</p>
							</div>
							<div className="color">
								<p>amount</p>
							</div>
						</div>
						{productList.map((item: any) => (
							<div key={item.name} className="row">
								<div className="name">
									<span>{item?.product?.name}</span>
								</div>
								<div className="color">
									<span>{item?.amount}</span>
								</div>
							</div>
						))}
					</div>
				) : (
					<h3 className="empty-area">Seems like here is empty, please add some products</h3>
				)}
			</div>
		</>
	)
}
