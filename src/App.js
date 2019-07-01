import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withRouter } from "react-router";
import Campaigns from "./Pages/Campaigns";
import NotFound from "./Pages/404";
import NavMain from './Components/Navbar';
import Footer from './Components/Footer';
import Container from './Components/Container';

function App() {
	const Nav = withRouter(NavMain);

	return (
		<Router>
			<div className="App">
				<Nav />
				<Container>
					<Switch>
						<Route path='/' exact component={Campaigns} />
						<Route path="*" component={NotFound} />
					</Switch>
				</Container>
				<Footer />
			</div>
		</Router >
	);
}

export default App;
