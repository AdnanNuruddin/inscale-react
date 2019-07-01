import React from 'react';
import './index.css';
import GithubLogo from '../../github.png';

export default () => {
	return (
		<div className="page-footer">
			<div className="footer-container">
				<span>Adnan Nuruddin © 2019</span>
				<a className="footer-link" href="https://react-test-fe2e3.firebaseapp.com/"><span className="pull-right">GitHub</span></a>
				<a href="https://react-test-fe2e3.firebaseapp.com/"><img className="github-logo pull-right" src={GithubLogo} alt="GitHub" /></a>				
			</div>
		</div>
	)
}