import React, { useState } from 'react'
import { Canvas, Navbar } from './components'
import { Home, Labels, Gallery, Stream } from './screens'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/labels" element={<Labels />} />
				<Route path="/home" element={<Home />} />
				<Route path="/gallery" element={<Gallery />} />
				<Route path="/stream" element={<Stream />} />
				<Route path="*" element={<Navigate to="/home" replace />} />
			</Routes>
		</Router>
	)
}

export default App
