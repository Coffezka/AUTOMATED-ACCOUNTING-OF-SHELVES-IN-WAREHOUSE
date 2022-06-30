import React, { useState, useEffect, useRef } from 'react'
import { Navbar } from '../../components'
import { useGlobal } from '../../global'
import axios from 'axios'
import { TextField, Button, Stack } from '@mui/material'
import './styles.css'

const baseUrl = 'http://localhost:8000'
const Labels: React.FC = () => {
	// const [labels, setLabels] = useGlobal('labels')
	const [labelsList, setLabelsList] = useState<any>([])
	const labelNameField = useRef<HTMLInputElement>(null)
	const labelColorField = useRef<HTMLInputElement>(null)

	// const addNewLabel = () => {
	// 	if (!labelNameField.current?.value || !labelColorField.current?.value) return
	// 	const newLabelId = labels.length ? labels.length : 0
	// 	setLabels([
	// 		...labels,
	// 		{ id: newLabelId, name: labelNameField.current.value, color: labelColorField.current.value },
	// 	])
	// }

	const addNewLabel = async () => {
		console.log('name', labelNameField?.current!.value)
		console.log('color', labelColorField?.current!.value)

		const response = await axios.post(`${baseUrl}/label/`, {
			name: labelNameField?.current?.value,
			color: labelColorField?.current?.value,
		})
		if (response.status === 201) {
			setLabelsList([...labelsList, response.data])
			labelNameField!.current!.value = ''
			labelColorField!.current!.value = ''
		}
	}

	useEffect(() => {
		axios.get(`${baseUrl}/label/`).then((response) => setLabelsList(response.data))
	}, [])
	return (
		<>
			<Navbar />
			<div className="labels-container">
				<Stack className="form" spacing={2}>
					<TextField inputRef={labelNameField} label="Label name" color="primary" focused />
					<TextField inputRef={labelColorField} label="Label color" color="primary" focused />
					<Button variant="contained" onClick={addNewLabel}>
						Save
					</Button>
				</Stack>

				{labelsList && !!labelsList.length ? (
					<div className="labels">
						<div className="header-row">
							<div className="name">
								<p>name</p>
							</div>
							<div className="color">
								<p>color</p>
							</div>
						</div>
						{labelsList.map((item: any) => (
							<div key={item.name} className="row">
								<div className="name">
									<span>{item.name}</span>
								</div>
								<div className="color">
									<span>{item.color}</span>
								</div>
							</div>
						))}
					</div>
				) : (
					<h3 className="empty-area">Seems like here is empty, please add new labels</h3>
				)}
			</div>
		</>
	)
}

export default Labels
