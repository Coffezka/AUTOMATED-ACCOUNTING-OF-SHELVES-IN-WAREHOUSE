import React, { useRef, useEffect, useState } from 'react'
import './style.css'

const Canvas = ({ label, saveCords, anotation, image }: any) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const canvasBackgroundRef = useRef<HTMLCanvasElement>(null)
	const contextRef = useRef<any>(null)
	const contextBackgroundRef = useRef<any>(null)

	const [isDrawing, setIsDrawing] = useState(false)
	const [startCords, setStartCords] = useState({ x: 0, y: 0 })
	const prepareCanvas = () => {
		const canvas = canvasRef.current
		const canvasBackground = canvasBackgroundRef.current

		const background = new Image()
		background.src = URL.createObjectURL(image)
		background.onload = () => {
			setCanvasSize(canvas, canvasBackground, background)

			const context = canvas!.getContext('2d')
			context!.scale(2, 2)
			context!.strokeStyle = label.color
			context!.lineWidth = 1

			const contextBackground = canvasBackground!.getContext('2d')
			contextBackground!.scale(2, 2)
			contextBackground!.lineWidth = 1
			contextBackground!.drawImage(background, 0, 0)

			anotation.forEach((item: any) => {
				contextBackground!.strokeStyle = item.label.color
				contextBackground!.strokeRect(
					item.startX,
					item.startY,
					item.endX - item.startX,
					item.endY - item.startY,
				)
			})

			contextBackground!.strokeStyle = label.color
			contextRef.current = context
			contextBackgroundRef.current = contextBackground
		}
	}

	const setCanvasSize = (canvas: any, canvasBackground: any, background: any) => {
		canvas!.width = background.naturalWidth * 2
		canvas!.height = background.naturalHeight * 2
		canvas!.style.width = `${background.naturalWidth}px`
		canvas!.style.height = `${background.naturalHeight}px`

		canvasBackground!.width = background.naturalWidth * 2
		canvasBackground!.height = background.naturalHeight * 2
		canvasBackground!.style.width = `${background.naturalWidth}px`
		canvasBackground!.style.height = `${background.naturalHeight}px`
	}

	useEffect(() => {
		prepareCanvas()
	}, [])

	useEffect(() => {
		if (contextRef.current === null || contextBackgroundRef.current === null) return
		contextRef.current.strokeStyle = label.color
		contextBackgroundRef.current.strokeStyle = label.color
	}, [label])

	useEffect(() => {
		if (contextRef.current === null || contextBackgroundRef.current === null) return
		prepareCanvas()
	}, [image])

	const startDrawing = ({ nativeEvent }: any) => {
		const { offsetX, offsetY } = nativeEvent
		setStartCords({ x: offsetX, y: offsetY })
		setIsDrawing(true)
	}

	const finishDrawing = ({ nativeEvent }: any) => {
		const { offsetX, offsetY } = nativeEvent
		clearCanvas()
		contextBackgroundRef.current.strokeRect(
			startCords.x,
			startCords.y,
			offsetX - startCords.x,
			offsetY - startCords.y,
		)
		saveCords({
			name: image.name,
			startX: startCords.x,
			startY: startCords.y,
			endX: offsetX,
			endY: offsetY,
			label,
		})
		setIsDrawing(false)
	}

	const draw = ({ nativeEvent }: any) => {
		if (!isDrawing) {
			return
		}
		const { offsetX, offsetY } = nativeEvent
		clearCanvas()
		contextRef.current.strokeRect(startCords.x, startCords.y, offsetX - startCords.x, offsetY - startCords.y)
	}

	const clearCanvas = () => {
		contextRef.current.clearRect(0, 0, canvasRef!.current!.width, canvasRef!.current!.height)
	}

	return (
		<div className="canvas-container">
			<canvas className="canvasBackground" ref={canvasBackgroundRef} />
			<canvas
				className="canvas"
				onMouseDown={startDrawing}
				onMouseMove={draw}
				onMouseUp={finishDrawing}
				ref={canvasRef}
			/>
		</div>
	)
}

export default Canvas
