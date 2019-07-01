import React from 'react';
import './index.css';

const CampaignTable = (props) => {
	const campaigns = props.campaigns;
	const checkCampaignStatus = (campaign) => {
		return (Date.parse(campaign.startDate) < Date.now() && Date.parse(campaign.endDate) > Date.now()) ? "Active" : "Inactive";
	}

	const formatBudget = (budget) => {
		if ((Number(budget)) >= 1.0e+9) { return (Math.round((Number(budget)) / 1.0e+8)) / 10 + "B" }
		if ((Number(budget)) >= 1.0e+6) { return (Math.round((Number(budget)) / 1.0e+5)) / 10 + "M" }
		if ((Number(budget)) >= 1.0e+3) { return (Math.round((Number(budget)) / 1.0e+2)) / 10 + "K" }
		return (Number(budget));
	}

	return (
		<table className="campaign-table">
			<thead>
				<tr>
					<th className="text-left">Name</th>
					<th>Start Date</th>
					<th>End Date</th>
					<th>Active</th>
					<th className="text-right">Budget</th>
				</tr>
			</thead>
			<tbody>
				{
					campaigns.map(campaign => {
						return (
							<tr key={campaign.id}>
								<td className="text-left">{campaign.name}</td>
								<td >{campaign.startDate}</td>
								<td>{campaign.endDate}</td>
								<td>
									<span className={checkCampaignStatus(campaign)}></span>
									{checkCampaignStatus(campaign)}
								</td>
								<td className="text-right">{formatBudget(campaign.Budget)} USD</td>
							</tr>
						)
					})
				}
				{campaigns.length === 0 ? <tr><td colSpan="5" className="text-center">No Campaign found</td></tr> : null}
			</tbody>
		</table>
	)
}

export default CampaignTable;