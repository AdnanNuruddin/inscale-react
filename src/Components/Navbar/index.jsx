import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';
import logo from '../../logo.svg';

function Nav(props) {
	// const { location } = props;
	return (
		<nav>
			<img src={logo} height="30" alt="react-logo" />
			<NavLink exact to="/">
				<h3 className="logo"> Inscale</h3>
			</NavLink>
		</nav>
	);
}

export default Nav;
