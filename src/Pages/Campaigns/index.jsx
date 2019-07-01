import React, { useState, useEffect } from 'react';
import CampaignTable from './CampaignTable';
import CampaignFilters from './CampaignFilters';
import './index.css';

const Campaigns = () => {
	const [allCampaigns, setAllCampaigns] = useState([]);
	const [filteredCampaigns, setFilteredCampaigns] = useState([]);
	const [filters, setFilters] = useState({
		startDate: null,
		endDate: null,
		searchKey: ''
	});

	const handleFilterChange = (newFilters) => {
		setFilters(newFilters);
		filterCampaigns(allCampaigns, newFilters);
		updateQueryParameter(newFilters);
	}

	const filterCampaigns = (allCampaigns, newFilters) => {
		let currentFilters = newFilters ? newFilters : filters;

		if (!currentFilters.startDate && !currentFilters.endDate && !currentFilters.searchKey) {
			setFilteredCampaigns(allCampaigns);
			return;
		}

		let filteredCampaigns = allCampaigns.filter(campaign => {
			if ((!!currentFilters.startDate && dateIsSmaller(new Date(campaign.startDate), currentFilters.startDate)) || (!!currentFilters.endDate && dateIsBigger(new Date(campaign.startDate), currentFilters.endDate))) {
				console.log("Start date out of range"); 
				return false; 
			}

			if ((!!currentFilters.startDate && dateIsSmaller(new Date(campaign.endDate), currentFilters.startDate)) || (!!currentFilters.endDate && dateIsBigger(new Date(campaign.endDate), currentFilters.endDate))) {
				console.log("End date out of range"); 
				return false; 
			}

			if (!!currentFilters.searchKey && campaign.name.toLowerCase().indexOf(currentFilters.searchKey.toLowerCase()) === -1) { 
				console.log("Search key not found");
				return false; 
			}
			return true;
		})

		setFilteredCampaigns(filteredCampaigns);
	}

	const updateQueryParameter = (filters) => {
		let queryParam = "?";
		if (!!filters.startDate) { queryParam += ("startDate=" + filters.startDate.toLocaleDateString()) }

		if (!!filters.endDate) {
			queryParam += (queryParam !== "?" ? "&" : "");
			queryParam += ("endDate=" + filters.endDate.toLocaleDateString())
		}

		if (!!filters.searchKey) {
			queryParam += (queryParam !== "?" ? "&" : "");
			queryParam += ("searchKey=" + filters.searchKey)
		}

		let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
		newurl += (queryParam !== "?" ? queryParam : "");

		window.history.pushState({ path: newurl }, '', newurl);
	}

	const dateIsBigger = (date1, date2) => {
		return date1.getTime() >= date2.getTime();
	}

	const dateIsSmaller = (date1, date2) => {
		return date1.getTime() <= date2.getTime();
	}

	const setInitialValue = () => {
		const urlParams = new URLSearchParams(window.location.search);
		let filtersHistory = {}
		filtersHistory.searchKey = urlParams.get("searchKey") ? urlParams.get("searchKey") : "";
		filtersHistory.startDate = urlParams.get("startDate") ? new Date(urlParams.get("startDate")) : null;
		filtersHistory.endDate = urlParams.get("endDate") ? new Date(urlParams.get("endDate")) : null;
		handleFilterChange(filtersHistory);
	}

	const AddCampaigns = (campaignArray) => {
		campaignArray = campaignArray.filter(campaign=>{return dateIsSmaller(new Date(campaign.startDate),new Date(campaign.endDate))});
		setAllCampaigns(prevCampaigns => [...prevCampaigns, ...campaignArray]);
		filterCampaigns([...allCampaigns, ...campaignArray]);
	}

	window.AddCampaigns = AddCampaigns;
	useEffect(() => {
		setInitialValue();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="campaign-container">
			<h1 className="campaign-title">Campaign list</h1>
			<CampaignFilters filters={filters} handleFilterChange={handleFilterChange} />
			<CampaignTable campaigns={filteredCampaigns} />
		</div>
	);
}

export default Campaigns;