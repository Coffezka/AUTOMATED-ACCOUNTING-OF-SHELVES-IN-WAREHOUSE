import React, { useState } from 'react'
import { Canvas, Navbar } from '../../components'
import { styled } from '@mui/material/styles'
import { Button, IconButton } from '@mui/material'
import { useGlobal } from '../../global'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import './styles.css'

const download = (filename: string, text: string) => {
	var element = document.createElement('a')
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
	element.setAttribute('download', filename)

	element.style.display = 'none'
	document.body.appendChild(element)

	element.click()

	document.body.removeChild(element)
}

const Home: React.FC = () => {
	const [labels] = useGlobal('labels')
	const [selectedLabel, setSelectedLabel] = useState<any>(labels?.length ? labels[0] : null)
	const [images, setImages] = useState<any>([])
	const [currentImage, setCurrentImage] = useState<any>(null)
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const [data, setData] = useState<Array<any>>([])

	const handleChange = (event: any) => setSelectedLabel(labels.find((item: any) => item.name === event.target.value))

	const onPrevPress = () => {
		setCurrentImage(images[currentImageIndex - 1])
		setCurrentImageIndex((prevState) => prevState - 1)
	}

	const onNextPress = () => {
		setCurrentImage(images[currentImageIndex + 1])
		setCurrentImageIndex((prev) => prev + 1)
	}

	const saveAnotationCords = (cords: any) => {
		setData((prevState) => {
			return prevState.map((item, index) => (index === currentImageIndex ? [...item, cords] : item))
		})
	}

	const onImageUpload = (event: any) => {
		if (event?.target.files === 0) return
		console.log(event.target.files)
		setData(Array(event.target.files.length).fill([]))
		setCurrentImage(event.target.files[0])
		setImages(event.target.files)
	}

	const onSave = () => {
		let fileContent = ''
		data.forEach((item) => {
			if (item.length === 0) return
			item.forEach((itemData) => {
				fileContent += `${itemData.name},${itemData.label.id},${itemData.startX},${itemData.startY},${itemData.endX},${itemData.endY}\n`
			})
		})
		download('test.txt', fileContent)
		// setCurrentImageIndex(0);
		// setData(Array(tmpImages.length).fill([]));
	}

	const Input: any = styled('input')({
		display: 'none',
	})
	return (
		<>
			<Navbar labels={labels} selectedLabel={selectedLabel} selectLabel={handleChange} />
			<div className="container">
				<div className="btn-container">
					<label htmlFor="contained-button-file">
						<Input
							accept="image/*"
							onChange={onImageUpload}
							multiple
							id="contained-button-file"
							type="file"
						/>
						<Button variant="contained" component="span">
							Upload
						</Button>
					</label>
					{currentImage && images.length > 1 && (
						<div>
							<IconButton
								onClick={onPrevPress}
								disabled={currentImageIndex === 0}
								color="primary"
								component="span"
							>
								<ArrowBackIosIcon />
							</IconButton>
							<IconButton
								onClick={onNextPress}
								disabled={currentImageIndex + 1 >= data.length}
								color="primary"
								component="span"
							>
								<ArrowForwardIosIcon />
							</IconButton>
						</div>
					)}
					{currentImage && <Button onClick={onSave}>Save</Button>}
				</div>
				{currentImage && (
					<Canvas
						label={selectedLabel}
						saveCords={saveAnotationCords}
						anotation={data[currentImageIndex]}
						image={currentImage}
					/>
				)}
			</div>
		</>
	)
}

export default Home
