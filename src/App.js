import React, { useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default function App() {

	const apiKey = process.env.REACT_APP_NEWS_API;
	const [progress, setProgress] = useState(0)
	return (
		<>
			<Router>
				<Navbar />
				<LoadingBar
					height={3}
					color='#f11946'
					progress={progress}
				/>
				<Routes>
					<Route exact path="/" element={<News apiKey={apiKey} setProgress={setProgress}  key={'general'} pageSize={8} country={'in'} category={'general'} />}></Route>
					<Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress} key={'business'} pageSize={8} country={'in'} category={'business'} />}></Route>
					<Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} key={'entertainment'} pageSize={8} country={'in'} category={'entertainment'} />}></Route>
					<Route exact path="/general" element={<News apiKey={apiKey} setProgress={setProgress} key={'general'} pageSize={8} country={'in'} category={'general'} />}></Route>
					<Route exact path="/health" element={<News apiKey={apiKey} setProgress={setProgress} key={'health'} pageSize={8} country={'in'} category={'health'} />}></Route>
					<Route exact path="/science" element={<News apiKey={apiKey} setProgress={setProgress} key={'science'} pageSize={8} country={'in'} category={'science'} />}></Route>
					<Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} key={'sports'} pageSize={8} country={'in'} category={'sports'} />}></Route>
					<Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} key={'technology'} pageSize={8} country={'in'} category={'technology'} />}></Route>
				</Routes>
			</Router>
		</>
	)
}