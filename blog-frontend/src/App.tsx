import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppContextProvider from '@context/AppContextProvider';
import NavBar from '@layout/navbar/NavBar';
import AlertManager from '@layout/alert/AlertManager';
import routes from '@routes/Routes';

const App: React.FC = () => {
    return (
        <>
			<Router>
				<AppContextProvider>
					<div className='App'>
						<AlertManager />
						<NavBar />
						<Routes>
							{Object.values(routes).map((route: any) => (
								<Route key={route.path} path={route.path} element={route.element} />
							))}
						</Routes>
					</div>
				</AppContextProvider>
			</Router>
        </>
  )
}

export default App
