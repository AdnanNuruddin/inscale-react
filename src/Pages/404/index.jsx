import React from 'react';
import './index.css';

function NotFound() {
	return (
		<div class="not-found-container">
			<div className="not-found">
				<h1>404 Not Found</h1>
				<h3>You are in the wrong place</h3>
				<button className="" onClick={() => { window.history.back(); }}>Go back</button>
			</div>
		</div>
	)
}

export default NotFound;