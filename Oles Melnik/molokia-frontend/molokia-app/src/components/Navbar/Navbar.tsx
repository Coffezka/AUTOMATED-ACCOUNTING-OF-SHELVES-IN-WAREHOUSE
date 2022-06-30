import React from 'react'
import { Link } from 'react-router-dom'
import { Label } from '../../typings'
import AppBar from '@mui/material/AppBar'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import './styles.css'

const Navbar: React.FC<{ labels?: Label[]; selectedLabel?: Label; selectLabel?: (event: any) => void }> = ({
	labels,
	selectedLabel,
	selectLabel,
}) => {
	return (
		<>
			<AppBar>
				<Toolbar className="toolbar">
					{/* <img src="https://molokija.com/img/logo.png" height="40px"/> */}
					<Stack direction="row" spacing={2} mx={2}>
						<Link to="/" className="link">
							home
						</Link>
						<Link to="/labels" className="link">
							labels
						</Link>
						<Link to="/gallery" className="link">
							gallery
						</Link>
						<Link to="/stream" className="link">
							stream
						</Link>
					</Stack>
					{labels && !!labels.length && selectedLabel && (
						<FormControl className="form-select" variant="filled">
							<InputLabel>Label</InputLabel>
							<Select
								className="select"
								defaultValue={selectedLabel?.name}
								value={selectedLabel.name}
								onChange={selectLabel}
							>
								{labels.map((item) => (
									<MenuItem className="menu-item" key={item.name} value={item.name}>
										{item.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}
				</Toolbar>
			</AppBar>
			<Toolbar />
		</>
	)
}

export default Navbar
