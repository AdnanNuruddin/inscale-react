import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './index.css';


const CampaignFilters = ({ filters, handleFilterChange }) => {

	const [searchKey, setSearchKey] = useState("");
	const handleChangeStart = (date) => {
		filters.startDate = date;
		handleFilterChange(filters);
	}

	const handleChangeEnd = (date) => {
		filters.endDate = date;
		handleFilterChange(filters);
	}

	const handleSearchChange = () => {
		filters.searchKey = searchKey;
		handleFilterChange(filters);
	}

	const updateSearchFilter = (event) => {
		setSearchKey(event.target.value);
	}

	useEffect(() => {
		setSearchKey(filters.searchKey);
	}, [filters.searchKey])

	return (
		<div className="campaign-filters">
			<div className="filter-block">
				<DatePicker
					selected={filters.startDate}
					selectsStart
					startDate={filters.startDate}
					endDate={filters.endDate}
					onChange={handleChangeStart}
					isClearable={true}
					placeholderText="Start Date"
				/>

				<DatePicker
					selected={filters.endDate}
					selectsEnd
					startDate={filters.startDate}
					endDate={filters.endDate}
					onChange={handleChangeEnd}
					minDate={filters.startDate}
					isClearable={true}
					placeholderText="End Date"
				/>
			</div>
			<div className="filter-block search-filter">
				<input value={searchKey} onChange={updateSearchFilter} type="text" placeholder="Search Campaign" />
				<button onClick={handleSearchChange}>Search</button>
			</div>
		</div>
	)
}

export default CampaignFilters;